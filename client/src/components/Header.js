import React, { Component } from "react";
import { Animated } from "react-animated-css";
import SignUpIn from "../containers/SignUpInContainer";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedSignIn: false
    };
  }

  toggleSignIn = () => {
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
    // const { searchCoupons } = this.props;

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
            (!clickedSignIn && "headingContainerInline")
          }
        >
          <div className="logoSpinner">
            <span className="headingLogoMainSmall">BOGO</span>
            <span className="headingLogoSubSmall">board</span>
          </div>
          {/* {!searchCoupons ? (
              <div className="logoSpinner">
                <div className="headingLogoMain">BOGO</div>
                <div className="headingLogoSub">by zip</div>
              </div>
            ) : (
              <div>
                <span className="headingLogoMainSmall">BOGO</span>
                <span className="headingLogoSubSmall">by zip</span>
              </div>
            )} */}
          <SignUpIn
            toggleSignIn={this.toggleSignIn}
            clickedSignIn={this.state.clickedSignIn}
            resetClickedSignIn={this.resetClickedSignIn}
          />
        </div>
      </Animated>
    );
  }
}

export default Header;
