import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from '../SignOut'; 
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SignInForm } from "../SignIn";
import SignUpPage from "../SignUp";

const Navigation = ({ authUser }) => (
<div>{ authUser ? <NavigationAuth/> : <NavigationNonAuth/> }</div>
);

const NavigationAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li>
                <SignOutButton/>
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
<ul>
    <li>
        <Link to={ROUTES.SIGN_IN}>Sign in</Link>
    </li>
    <li>
        <Link to={ROUTES.SIGN_UP}>Sign up</Link>
    </li>
    <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
</ul>


)
export default Navigation;
