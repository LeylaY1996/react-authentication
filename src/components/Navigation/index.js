import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import SignOutButton from '../SignOut'; 
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthUserContext } from '../Session';
const signStyle = {
    color: 'pink',
    fontSize:'25px',
    fontWeight: "bolder"
  };
  
const Navigation = ({ authUser }) => (
<div>
    <AuthUserContext.Consumer>
        {authUser => 
            authUser ? <NavigationAuth/>:<NavigationNonAuth/>    
        }
    </AuthUserContext.Consumer>
</div>
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
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
                <SignOutButton/>
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
<ul>
    <li  style={signStyle}>
        <Link to={ROUTES.SIGN_IN}  style={signStyle}>Sign in</Link>
    </li>
    <li  style={signStyle}>
        <Link to={ROUTES.SIGN_UP} style={signStyle}>Sign up</Link>
    </li>
    <li  style={signStyle}>
        <Link to={ROUTES.LANDING} style={signStyle}>Landing</Link>
    </li>
</ul>


)
export default Navigation;
