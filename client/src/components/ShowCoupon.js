import React, { Component } from "react";
import BusinessLocationMapped from "./BusinessLocationMapped";

class ShowCoupon extends Component {
  constructor(props) {
    super();
    this.state = {
      showBizMap: false
    };
  }

  componentDidMount() {
    // TODO: calculate distance from user to address and set to state
  }

  toggleBizMap = () => {
    this.setState({ showBizMap: !this.state.showBizMap });
  };

  calculateDistance = () => {
    return "0.3 miles";
  };

  renderCoupon = coupon => {
    return (
      <div className="col-sm-6 col-lg-4">
        <div className="coupon">
          <div className="container">
            <div className="row">
            {this.state.showBizMap === true ? (
                  <BusinessLocationMapped
                    address={coupon.streetAndNum + coupon.zip}
                    distance={this.calculateDistance()}
                  />
                ) : (
                  <div></div>
                )}
              <div className="col-xs-12 couponHeadline">
               
                <span className="bizLogo">
                  <img className="" src={coupon.bizLogo} alt="bizLogo"></img>
                </span>
                {this.props.loggedIn === "" ? (
                  // TODO: calculate distance with geolocation
                  <span className="distance text-center">
                    {this.calculateDistance()}
                  </span>
                ) : (
                  <span>{this.props.deleteButton(coupon)}</span>
                )}
                <span
                  className="bizLogo"
                  onClick={() => this.toggleBizMap()}
                >
                  {this.state.showBizMap === false ? (
                    <img
                      className=""
                      src={
                        "https://png2.cleanpng.com/sh/43591cc4cc9b0369f77e9c5a09d2b21d/L0KzQYm3VMI4N6NrfZH0aYP2gLBuTfdwd5hxfZ92YYD2PbL3ib1ud6ZzjNNybj35ebbATgRpbaNqRadqZUO7dLfoUcA1bWo9RqUCMUS4RomAUcUzPGk7SqYAOEC5Rom1kP5o/kisspng-google-maps-api-mountain-view-there-5ae38dfa104e98.3714568715248624580668.png"
                      }
                      alt="genMapIcon"
                    ></img>
                  ) : (
                    <div>Close Map</div>
                  )}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center offer">
                <div className="">Buy One</div>
                <div className="biggerText">{coupon.heading}</div>
                <div className="">Get One Free</div>
              </div>
              <br />
            </div>
            <div className="row">
              <div className="col-xs-12 text-center">
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
            <div className="row text-left">
              <div>
                {"* "}
                {coupon.couponDesc}
                {" *"}
              </div>
              <div>
                {"* "}
                {coupon.restrictions}
              </div>
              <div className="">Coupon ID: {coupon._id}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderCoupon(this.props.coupon)}</div>;
  }
}

export default ShowCoupon;
