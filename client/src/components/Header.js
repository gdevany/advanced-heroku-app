import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      !this.props.searchCoupons &&
      <div className="container text-center">
        <div className="headingLogo">BOGO</div>
        <div className="headingLogoMini">by zip</div>
      </div>
    );
  }
}

export default Header;
