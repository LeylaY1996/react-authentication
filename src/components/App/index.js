import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import SignUpPage from "../SignUp";
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
// import * as ROUTES from '../../constants/routes';
import { withAuthentication } from "../Session";

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />

      <Route exact path="/" component={LandingPage} /> 
      <Route path="/signup" component={SignUpPage} />
      <Route path="/signin" component={SignInPage} />
      <Route
        path="/pw-forget"
        component={PasswordForgetPage}
      />
      <Route path="/home" component={HomePage} />
      <Route path="/account" component={AccountPage} />
      <Route path="/admin" component={AdminPage} />
    </div>
  </Router>

)

export default withAuthentication(App);
