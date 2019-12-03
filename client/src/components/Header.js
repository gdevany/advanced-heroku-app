import React, { Component } from "react";
import { Animated } from "react-animated-css";

class Header extends Component {
  render() {
    return !this.props.searchCoupons ? (
      <Animated
        animationIn="zoomIn"
        animationOut="fadeOut"
        isVisible={true}
        animationInDuration={1000}
        animationOutDuration={1000}
      >
        <div className="container text-center">
          <div className="headingLogoMain">BOGO</div>
          <div className="headingLogoSub">by zip</div>
        </div>
      </Animated>
    ) : (
      <Animated
        animationIn="zoomIn"
        animationOut="fadeOut"
        isVisible={true}
        animationInDuration={1000}
        animationOutDuration={1000}
      >
        <div className="row text-center">
          <span className="headingLogoMainSmall">BOGO</span>
          <span className="headingLogoSubSmall">by zip</span>
        </div>
      </Animated>
    );
  }
}

export default Header;
