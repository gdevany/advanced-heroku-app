import React, { Component } from "react";
import {Animated} from "react-animated-css";


class Header extends Component {
  render() {
    return (
      !this.props.searchCoupons && (
        <Animated
          animationIn="bounceInLeft"
          animationOut="fadeOut"
          isVisible={true}
          animationInDuration={1000}
          animationOutDuration={1000}
        >
          <div className="container text-center">
            <div className="headingLogo">BOGO</div>
            <div className="headingLogoMini">by zip</div>
          </div>
        </Animated>
      )
    );
  }
}

export default Header;
