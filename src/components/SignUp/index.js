import React, {Component} from 'react';
import Link from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}
class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE};
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase.doCreateUserWithEmailAndPassword(email,passwordOne)
        .then(authUser => {
            this.setState({ ...INITIAL_STATE});
        })
        .catch(error => {
            this.setState({error});
        });

        event.preventDefault();
        
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,error
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit = {this.onSubmit}>
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

                <input name="PasswordTwo"
                       value={PasswordTwo}
                       onChange = {this.onChange}
                       type="password"
                       placeholder="Confirm Password"
                />

                <button type="submit" disabled={isInvalid}>Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
)