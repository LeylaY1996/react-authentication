import React , { Component } from "react";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import Navigation from "../Navigation";
import { withFirebase } from '../Firebase';
import { SignInForm } from "../SignIn";
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
    });
    console.log(this.state.authUser);
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div>
       
          <Navigation authUser={this.state.authUser} />
          <Switch>
            <Route path="/signin">
              <SignInForm />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withFirebase(App);
