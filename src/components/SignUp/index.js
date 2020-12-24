import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import FirebaseContext from '../Firebase';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
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

                <input name="confirmPassword"
                    value={confirmPassword}
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

const SignUpForm = compose(withFirebase,withRouter)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };