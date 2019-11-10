import React, { Component } from "react";
import BusinessLocationMapped from "./BusinessLocationMapped";
// import googlemapicon from "../../img/googlemapicon.png";

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
    this.setState({ expandHeader: !this.state.expandHeader });
    this.props.expandThisCoupon(couponID);
    this.state.couponID === ""
      ? this.setState({ couponID })
      : this.setState({ couponID: "" });
  };

  renderMap = coupon => {
    return (
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
    );
  };

  renderOfferInfo = coupon => {
    return (
      <div>
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
          <div className="">Offer ID: {coupon._id}</div>
        </div>
      </div>
    );
  };

  renderExpandableOffer = coupon => {
    return (
      <div
        className={
          this.state.couponID === coupon._id ||
          this.props.couponsExpanded.length < 1
            ? "couponShort"
            : "couponShort couponFade"
        }
      >
        <div className="container">
          {/* {this.state.expandHeader === true && this.renderMap(coupon)} */}
          <div className="row offer" onClick={() => this.expandIt(coupon._id)}>
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
                // <span className="distance text-center">
                //   {this.calculateDistance()}
                // </span>
                <span>{this.props.deleteButton(coupon)}</span>
              )}
            </div>
            <div className="col-xs-6 text-center">
              <div className="">Buy One</div>
              <div className="biggerText">{coupon.heading}</div>
              <div className="">Get One Free</div>
            </div>
            <br />
          </div>
          {this.state.expandHeader === true && this.renderMap(coupon)}

          {this.state.expandHeader === true && this.renderOfferInfo(coupon)}
        </div>
      </div>
    );
  };

  // renderCoupon = coupon => {
  //   return (
  //     <div className="col-sm-6 col-lg-4">
  //       <div className="coupon">
  //         <div className="container">
  //           <div className="row">
  //             {this.state.showBizMap === true ? (
  //               <BusinessLocationMapped
  //                 address={coupon.streetAndNum + coupon.zip}
  //                 distance={this.calculateDistance()}
  //               />
  //             ) : (
  //               <div></div>
  //             )}
  //             <div className="col-xs-12 couponHeadline">
  //               <span className="bizLogo">
  //                 <img className="" src={coupon.bizLogo} alt="bizLogo"></img>
  //               </span>
  //               {this.props.loggedIn === "" ? (
  //                 // TODO: calculate distance with geolocation
  //                 <span className="distance text-center">
  //                   {this.calculateDistance()}
  //                 </span>
  //               ) : (
  //                 <span>{this.props.deleteButton(coupon)}</span>
  //               )}
  //               <span className="bizLogo" onClick={() => this.toggleBizMap()}>
  //                 {this.state.showBizMap === false ? (
  //                   <img
  //                     className=""
  //                     src={googlemapicon}
  //                     alt="genMapIcon"
  //                   ></img>
  //                 ) : (
  //                   <div>Close Map</div>
  //                 )}
  //               </span>
  //             </div>
  //           </div>
  //           <div className="row">
  //             <div className="col-xs-12 text-center offer">
  //               <div className="">Buy One</div>
  //               <div className="biggerText">{coupon.heading}</div>
  //               <div className="">Get One Free</div>
  //             </div>
  //             <br />
  //           </div>
  //           <div className="row">
  //             <div className="col-xs-12 text-center">
  //               <address>
  //                 <strong>{coupon.bizName}</strong>
  //                 <br />
  //                 {coupon.streetAndNum} {coupon.city} <br />
  //                 <strong>{coupon.zip}</strong>
  //                 <br />
  //                 <small>{coupon.bizPhone}</small>
  //               </address>
  //             </div>
  //           </div>
  //           <div className="row text-left">
  //             <div>
  //               {"* "}
  //               {coupon.couponDesc}
  //               {" *"}
  //             </div>
  //             <div>
  //               {"* "}
  //               {coupon.restrictions}
  //             </div>
  //             <div className="">Coupon ID: {coupon._id}</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  render() {
    return <div>{this.renderExpandableOffer(this.props.coupon)}</div>;
  }
}

export default ShowCoupon;
