import React, { Component } from "react";

class Secret extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}

export default Secret;
