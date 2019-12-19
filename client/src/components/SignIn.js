import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSignIn({
      username: this.state.username,
      password: this.state.password
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="email"
            name="username"
            onChange={e => {
              this.setState({[e.target.name]: e.target.value});
            }}
            placeholder="Enter Username"
            value={this.state.username}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            onChange={e => {
              this.setState({[e.target.name]: e.target.value});
            }}
            placeholder="Enter Password"
            value={this.state.password}
          />
        </FormGroup>
        <Button type="submit">
         Sign In
       </Button>
      </form>
    );
  }
}

SignUp.propTypes = {
  onSignIn: PropTypes.func.isRequired
};

export default SignUp;
