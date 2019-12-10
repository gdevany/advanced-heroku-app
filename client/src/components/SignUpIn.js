import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUpSignIn from "../SignUpSignIn";
import TopNavbar from "./TopNavbar";
import Secret from "../Secret";

class SignUpIn extends Component {
  constructor() {
    super();
    this.state = {
      signUpSignInError: "",
      authenticated: localStorage.getItem("token") || false,
      username: ""
    };
  }

  handleSignUp = credentials => {
    const { username, password, confirmPassword } = credentials;
    if (!username.trim() || !password.trim()) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } else if (password !== confirmPassword) {
      this.setState({
        signUpSignInError: "Passwords do not match"
      });
    } else {
      fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.error) {
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
  };

  handleSignIn = credentials => {
    const { username, password } = credentials;
    if (!username.trim() || !password.trim()) {
      this.setState({
        signUpSignInError: "Must Provide All Fields"
      });
    } else {
      fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      })
        .then(res => {
          if (res.status === 401) {
            this.setState({
              signUpSignInError: "Invalid Login"
            });
          } else {
            return res.json();
          }
        })
        .then(data => {
          const { token } = data;
          localStorage.setItem("token", token);
          this.setState({
            signUpSignInError: "",
            authenticated: token,
            username: data.username
          });
          this.props.loadUser(this.state.username);
          this.props.loadUsersCoupons(this.state.username);
        });
    }
  };

  handleSignOut = () => {
    localStorage.removeItem("token");
    this.setState({
      authenticated: false,
      username: ""
    });
    this.props.resetClickedSignIn();
    this.props.loadUser("");
  };

  renderSignUpSignIn = () => {
    return (
      <SignUpSignIn
        error={this.state.signUpSignInError}
        onSignUp={this.handleSignUp}
        onSignIn={this.handleSignIn}
        backClicked={this.props.signInClicked}
      />
    );
  };

  renderApp() {
    return (
      // If signed in, show the User Welcome
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="text-center welcomeText">
                <div>Hi</div>
                <div>{this.state.username}</div>
              </div>
            )}
          />
          <Route exact path="/secret" component={Secret} />
          <Route render={() => <h1>NOT FOUND!</h1>} />
        </Switch>
      </div>
    );
  }

  render() {
    let whatToShow = "";
    // If signed in, show the User Welcome
    if (this.state.authenticated) {
      whatToShow = this.renderApp();
      // If NOT signed in, show the SignUpSignIn IF clickedSignIn
    } else if (this.props.clickedSignIn) {
      whatToShow = this.renderSignUpSignIn();
    }

    return (
      <BrowserRouter>
        <div className="signUpIn">
          <TopNavbar
            showNavItems={this.state.authenticated}
            onSignOut={this.handleSignOut}
            signInClicked={this.props.signInClicked}
          />
          {whatToShow}
        </div>
      </BrowserRouter>
    );
  }
}

export default SignUpIn;
