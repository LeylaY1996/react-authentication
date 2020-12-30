import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { SignUpLink } from '../SignUp/index';
import Button from '@material-ui/core/Button';
import { CssBaseline, Link, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Grid from '@material-ui/core/Grid';
import { PasswordForgetLink } from '../PasswordForget';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';


const signStyle = {
  color: 'pink',
  padding: '0 30px',
  textAlign: 'center',
};

const iconStyle = {
  marginLeft: '450px',
};

const SignInPage = () => (
  <div>
    <Avatar style={{ 
      height: '200px', 
      width: '200px', 
      lineHeight: '10px', 
      position: 'center',
  }} >
      <LockOutlinedIcon />
    </Avatar>
    <h1 style={signStyle}>
      SignIn
    </h1>
    <SignInForm />

    {/* <SignUpLink /> */}
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    console.log(this.state)
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("email,password", email, password)
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {

    this.setState({ [event.target.name]: event.target.value });
  }


  render() {

    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    // We can use inline-style
    const style = {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    };

    // const classes = useStyles();
    return (
      <Container component="main" maxWidth="xs" >

        <CssBaseline />

        <div>

          <form onSubmit={this.onSubmit}>
            <TextField variant="outlined" margin="normal" name="email" value={email} fullWidth onChange={this.onChange} label="Email Address" />

            <TextField variant="outlined" margin="normal" name="password" value={password} fullWidth onChange={this.onChange} label="Password" />

            <Button type="submit" style={style} variant="contained">
              Submit
            </Button>

            <Grid container>
              <Grid item xs>
                <PasswordForgetLink></PasswordForgetLink>

              </Grid>
              <Grid item>
                <SignUpLink></SignUpLink>
              </Grid>
            </Grid>


            <Box mt={8}>
              {error && <p>{error.message}</p>}
            </Box>
          </form>
        </div>
      </Container>
    );
  }

};

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };