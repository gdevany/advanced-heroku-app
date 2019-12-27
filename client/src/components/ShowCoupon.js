import React, { Component } from "react";
import BusinessLocationMapped from "./BusinessLocationMapped";
import { Animated } from "react-animated-css";

class ShowCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandHeader: false,
      couponID: ""
    };
  }

  componentDidMount() {}

  calculateDistance = () => {
    return "0.3 miles";
  };

  expandIt = couponID => {
    if (!this.props.loggedIn) {
      this.setState({ expandHeader: !this.state.expandHeader });
      this.props.expandThisCoupon(couponID);
      this.state.couponID === ""
        ? this.setState({ couponID })
        : this.setState({ couponID: "" });
    }
  };

  renderMap = coupon => {
    return (
      <Animated
        animationInDelay="1000"
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={true}
        animationInDuration={2000}
        animationOutDuration={1000}
      >
        <div className="row">
          {this.state.expandHeader === true && (
            <BusinessLocationMapped
              address={coupon.streetAndNum + coupon.zip}
              distance={this.calculateDistance()}
              userPosition={this.props.userPosition}
              coupon={coupon}
            />
          )}
        </div>
        {this.renderOfferInfo(coupon)}
      </Animated>
    );
  };

  renderOfferInfo = coupon => {
    return (
      <div>
        <div className="row">
          <div className="text-center">
            {coupon.notDeletable && <div className="sampler">sample</div>}
            <address>
              <strong>{coupon.bizName}</strong>
              <br />
              {coupon.streetAndNum} {coupon.city} <br />
              <strong>{coupon.zip}</strong>
              <br />
              <small>{coupon.bizPhone}</small>
            </address>
          </div>
        </div>
        <div className="row bizInfoBlock text-left">
          <ul>
            <li>{coupon.couponDesc}</li>
          </ul>
          <ul>
            {coupon.restrictions.map(rest => {
              return <li key={rest.key}>{rest.restriction}</li>;
            })}
          </ul>
          <div className="offerID text-center margin30top">
            Offer ID: {coupon._id}
          </div>
        </div>
      </div>
    );
  };

  renderExpandableOffer = coupon => {
    return (
      <div className="couponShort">
        <div
          className={
            this.state.couponID === coupon._id ||
            this.props.couponsExpanded.length < 1
              ? "container"
              : "container couponFade"
          }
        >
          <div className="row offer" onClick={() => this.expandIt(coupon._id)}>
            {this.state.couponID === coupon._id && (
              <div className="col-xs-12 offerShrinkArrow text-center">
                <span className="arrowContainer">
                  <i className="arrow offerArrowSize upArrow" />
                </span>
              </div>
            )}
            <div className="col-xs-6 couponHeadline">
              <span className="bizLogoContainer">
                <img
                  className="imageInContainer"
                  src={coupon.bizLogo}
                  alt="bizLogo"
                ></img>
              </span>
              {this.props.loggedIn === "" ? (
                <span className="itemImageContainer">
                  <img
                    className="imageInContainer"
                    src={coupon.image}
                    alt="itemImage"
                  ></img>
                </span>
              ) : (
                <span>{this.props.deleteButton(coupon)}</span>
              )}
            </div>
            <div className="col-xs-6 text-center">
              <div className="">Buy One</div>
              <div className="biggerText">{coupon.heading}</div>
              <div className="">Get One Free</div>
            </div>
            {this.state.couponID !== coupon._id && (
              <div className="col-xs-12 offerExpArrow text-center">
                <span className="arrowContainer">
                  <i className={"arrow offerArrowSize downArrow"} />
                </span>
              </div>
            )}
          </div>
          {this.state.expandHeader === true && this.renderMap(coupon)}
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderExpandableOffer(this.props.coupon)}</div>;
  }
}

export default ShowCoupon;
