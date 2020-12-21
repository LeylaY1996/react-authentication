import React , { Component } from "react";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import Navigation from "../Navigation";
import { withFirebase } from '../Firebase';
import { SignInForm } from "../SignIn";
import  { AuthUserContext } from "../Session";
import  SignUpPage  from "../SignUp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    console.log("ilk burada");
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser 
      ? this.setState({ authUser })
      : this.setState({ authUser: null })
      console.log("authUser",this.state.authUser);
    });
    console.log(this.state.authUser);
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route path="/signin" component={SignInForm}>
              </Route>
              <Route path="/signup" component={SignUpPage}>
              </Route>
            </Switch>
          </div>
        </Router>
      </AuthUserContext.Provider>
    )
  }
}

export default withFirebase(App);
