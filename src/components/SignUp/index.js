import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import FirebaseContext from '../Firebase';
import Button from '@material-ui/core/Button';
import { CssBaseline, TextField } from '@material-ui/core';
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
const SignUpPage = () => (
    <div>
        <h1 style={signStyle}>SignUp</h1>
{/*         <FirebaseContext.Consumer>
            {firebase => <SignUpForm firebase={firebase}/>}
        </FirebaseContext.Consumer> */}

        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    confirmPassword: '',
    error: null
}


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE};
    }

    onSubmit = event => {
        console.log(this.state);
        const { username, email, passwordOne } = this.state;

        this.props.firebase.doCreateUserWithEmailAndPassword(email,passwordOne)
        .then(authUser => {
            //veritabanına kaydetme işlemi olacak
            /*  (uid) sağlayarak Firebase sınıfından önceden oluşturulmuş referansı kullanır.
             Daha sonra set()yöntem, "kullanıcılar / uid" için tahsis edilen bu varlık için veri sağlamak için kullanılabilir.  */
            return this.props.firebase  
                .user(authUser.user.uid)
                .set({
                    username,email
                });
        })
        .then(authUser => {
            this.setState({ ...INITIAL_STATE});
            this.props.history.push(ROUTES.HOME)
        })
        .catch(error => {
            this.setState({error});
        });

        event.preventDefault();
        
    }

    onChange = event => {
        console.log("Selam",event)
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            confirmPassword,
            error
        } = this.state;

        const isInvalid =
            passwordOne !== confirmPassword ||
            passwordOne === '' ||
            email === '' ||
            username === '';

            const style = {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              };
        return (
            <Container component="main" maxWidth="xs" >

        <CssBaseline />

        <div>

          <form onSubmit={this.onSubmit}>
            <TextField variant="outlined" margin="normal" name="username" value={username} fullWidth onChange={this.onChange} label="Username" />

            <TextField variant="outlined" margin="normal" name="email" value={email} fullWidth onChange={this.onChange} label="Email" />

            <TextField variant="outlined" margin="normal" name="passwordOne" value={passwordOne} fullWidth onChange={this.onChange} label="Password" />

            <TextField variant="outlined" margin="normal" name="confirmPassword" value={confirmPassword} fullWidth onChange={this.onChange} label="Confirm Password" />

            <Button type="submit" disabled={isInvalid} style={style} variant="contained">
              Sign Up
            </Button>
           
            <Grid container >
              <Grid item xs>
                <PasswordForgetLink></PasswordForgetLink>

              </Grid>
              <Grid item >
                <SignUpLink></SignUpLink>
              </Grid>
            </Grid>


            <Box mt={8}>
              {error && <p>{error.message}</p>}
            </Box>
          </form>
        </div>
      </Container>
            /* <form onSubmit = {this.onSubmit}>
                <input name="username"
                       value={username}
                       onChange = {this.onChange}
                       type="text"
                       placeholder="Full Name"
                />

                <input name="email"
                       value={email}
                       onChange = {this.onChange}
                       type="text"
                       placeholder="Email Adress"
                />

                
                <input name="passwordOne"
                       value={passwordOne}
                       onChange = {this.onChange}
                       type="password"
                       placeholder="Password"
                />

                <input name="confirmPassword"
                    value={confirmPassword}
                    onChange = {this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                

                <button type="submit" disabled={isInvalid}>Sign Up</button>

                {error && <p>{error.message}</p>}
            </form> */
        );
    }
}

const SignUpLink = () => (
   <Link to={ROUTES.SIGN_UP}> <p>Don't have an account?</p> Sign Up</Link>
)

const SignUpForm = compose(withFirebase,withRouter)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };