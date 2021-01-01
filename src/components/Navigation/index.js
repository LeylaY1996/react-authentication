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

  const style = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
            <li style={signStyle}>
                <Link  style={signStyle} to={ROUTES.HOME}>Home</Link>
            </li>
            <li  style={signStyle}>
                <Link  style={signStyle} to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            <li  style={signStyle}>
                <Link  style={signStyle} to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li  style={signStyle}>
                <SignOutButton />
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
</ul>


)
export default Navigation;
