import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { SignUpLink} from '../SignUp/index';
import Button from '@material-ui/core/Button';
import { CssBaseline, Link, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { PasswordForgetLink } from '../PasswordForget';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    {/* <SignUpLink /> */}
  </div>
);

const INITIAL_STATE = {
  email:'',
  password:'',
  error: null,
}; 

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    backgroundColor : 'blue'
  }
}))
class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE};
  }
 
  onSubmit = event => {
    const { email,password } = this.state;
    console.log(this.state)
    this.props.firebase
          .doSignInWithEmailAndPassword(email,password)
          .then(() => {
            console.log("email,password",email,password)
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({error});
          });
        
          event.preventDefault();
  }

  onChange = event => {
  
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    
    const {email,password,error } = this.state;
  
    const isInvalid = password === '' || email === '';

    const classes = useStyles();
    return (
      <Container component="main" maxWidth="xs">

        <CssBaseline/>

        <div className={classes.paper}>

          <form onSubmit={this.onSubmit}>
            <TextField variant="outlined" margin="normal" name="email" value={email} fullWidth onChange={this.onChange} label="Email Address"/>

            <TextField variant="outlined" margin="normal" name="password" value={password} fullWidth onChange={this.onChange} label="Password"/>
            
          
            <Button disabled={isInvalid} type="submit" variant="contained" color="primary">
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