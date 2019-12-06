import React, { Component } from "react";
import { Animated } from "react-animated-css";
import AppSign from "../containers/AppSignContainer";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedSignIn: false
    };
  }

  signInClicked = () => {
    this.setState(prevState => ({
      clickedSignIn: !prevState.clickedSignIn
    }));
  };

  resetClickedSignIn = () => {
    this.setState({
      clickedSignIn: false
    });
  };

  render() {
    const { clickedSignIn } = this.state;
    return (
      <Animated
        animationIn="zoomIn"
        animationOut="fadeOut"
        isVisible={true}
        animationInDuration={1000}
        animationOutDuration={1000}
      >
        <div
          className={
            "text-center headingContainer " +
            (!clickedSignIn ? "headingContainerInline" : "")
          }
        >
            {!this.props.searchCoupons ? (
              <div>
                <div className="headingLogoMain">BOGO</div>
                <div className="headingLogoSub">by zip</div>
              </div>
            ) : (
              <div>
                <span className="headingLogoMainSmall">BOGO</span>
                <span className="headingLogoSubSmall">by zip</span>
              </div>
            )}
          <AppSign
            signInClicked={this.signInClicked}
            clickedSignIn={this.state.clickedSignIn}
            resetClickedSignIn={this.resetClickedSignIn}
          />
        </div>
      </Animated>
    );
  }
}

export default Header;
