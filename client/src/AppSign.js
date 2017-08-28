import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./AppSign.css";
import SignUpSignIn from "./SignUpSignIn";
import TopNavbar from "./TopNavbar";
import Secret from "./Secret";

class AppSign extends Component {
  constructor() {
    super();
    this.state = {
      signUpSignInError: "",
      authenticated: localStorage.getItem("token") || false,
      clickedSignIn: false
    };
  }

  handleSignUp = (credentials) => {
    const { username, password, confirmPassword } = credentials;
    if (!username.trim() || !password.trim() ) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } else if (password !== confirmPassword ) {
      this.setState({
        signUpSignInError: "Passwords do not match"
      });
    } else {

      fetch("/api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then((res) => {
        return res.json();
      }).then((data) => {
        if(data.error){
          this.setState({
            signUpSignInError: data.error
          });
          return;
        }
        const { token } = data;
        localStorage.setItem("token", token);
        this.setState({
          signUpSignInError: "",
          authenticated: token
        });
      });
    }
  }

  handleSignIn = (credentials) => {
    const { username, password } = credentials;
    if (!username.trim() || !password.trim() ) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } else {
      fetch("/api/signin", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials)
      }).then((res) => {
        if (res.status === 401) {
          this.setState({
            signUpSignInError: "Invalid Login"
          });
        } else {
          return res.json();
        }
      }).then((data) => {
        const { token } = data;
        localStorage.setItem("token", token);
        this.setState({
          signUpSignInError: "",
          authenticated: token
        });
      });
    }
  }

  handleSignOut = () => {
    localStorage.removeItem("token");
    this.setState({
      authenticated: false,
      clickedSignIn: false
    });
  }

  renderSignUpSignIn = () => {
    return (
      <SignUpSignIn
        error={this.state.signUpSignInError}
        onSignUp={this.handleSignUp}
        onSignIn={this.handleSignIn}
      />
    );
  }

  signInClicked = () => {
    this.setState({
      clickedSignIn: true
    });
  }

  renderApp() {
    return (
      // If signed in, show the User Welcome
      <div>
        <Switch>
          <Route exact path="/" render={() => <h1>I am protected!</h1>} />
          <Route exact path="/secret" component={Secret} />
          <Route render={() => <h1>NOT FOUND!</h1>} />
        </Switch>
      </div>
    );
  }

  render() {
    let whatToShow = "";
    if (this.state.authenticated) {
      whatToShow = this.renderApp();
    } else if (this.state.clickedSignIn) {
      whatToShow = this.renderSignUpSignIn();
    }

    return (
      <BrowserRouter>
        <div className="AppSign">
          <TopNavbar
            showNavItems={this.state.authenticated}
            onSignOut={this.handleSignOut}
            signInClicked={this.signInClicked} />
          {whatToShow}
        </div>
      </BrowserRouter>
    );
  }
}

export default AppSign;
