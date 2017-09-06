//TODO - createCoupon, show success

import React from "react";

class CreateCoupons extends React.Component {
  constructor() {
    super();
    this.state = {
      coupon: {
          username: "",
          bizName: "",
          bizQR: "",
          bizLogo: "",
          heading: "",
          couponDesc: "",
          restrictions: "",
          searchWords: [],
          bizAddress:
            {
              streetAndNum: "",
              city: "",
              zip: 0
            },
          bizPhone: ""
        }
    };
  }
  render() {
    //if 'Create New Coupon' NOT clicked, show nothing
    if (this.props.showCreateCoupon === false) {
      return (<div></div>);
    //if 'Create New Coupon' clicked, show form
    } else {
      return (
        <div>
          <div>
            <button
              className="backButton"
              onClick={this.props.toggleShow}>back
            </button>
            <h1>Create New Coupon</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (this.props.createCoupon) {
                this.props.createCoupon(this.state.coupon);
              };
              this.props.toggleShow();
            }}>
              <div>
                Business Name: <br /><input onChange={(e) => {
                  const coupon = {bizName: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} /><br />
              </div>
              <div>
                Business QR Link: <br /><input onChange={(e) => {
                  const coupon = {bizQR: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} /><br />
              </div>
              <div>
                Business Logo Link: <br /><input onChange={(e) => {
                  const coupon = {bizLogo: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} /><br />
              </div>
              <div>
                Buy One: <br /><input onChange={(e) => {
                  const coupon = {heading: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} /><br /><small>Get One Free</small>
              </div>
              <div>
                Coupon Description: <br /><input onChange={(e) => {
                  const coupon = {couponDesc: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} /><br />
              </div>
              <div>
                Restrictions: <br /><input onChange={(e) => {
                  const coupon = {restrictions: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} /><br />
              </div>
              <div>
                Search Words: <br /><input onChange={(e) => {
                  const coupon = {searchWords: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} /><br /><br />
              </div>
              <div>Business Address:<br />
                <div>
                  Number and Street Name:<br /><input onChange={(e) => {
                    const coupon = {streetAndNum: e.target.value};
                    this.setState({
                      coupon: Object.assign(this.state.coupon,coupon)
                    });
                  }} /><br />
                </div>
                <div>
                  City:<br /><input onChange={(e) => {
                    const coupon = {city: e.target.value};
                    this.setState({
                      coupon: Object.assign(this.state.coupon,coupon)
                    });
                  }} /><br />
                </div>
                <div>
                  Zipcode:<br /><input onChange={(e) => {
                    const coupon = {zip: e.target.value};
                    this.setState({
                      coupon: Object.assign(this.state.coupon,coupon)
                    });
                  }} /><br />
                </div>
              </div>
              <div>
                Phone#: <br /><input onChange={(e) => {
                  const coupon = {phone: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} /><br /><br />
              </div>
              <button
                className="backButton"
                onClick={this.props.toggleShow}>back
              </button>
              <button className="chosenCat bigText">Create</button>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default CreateCoupons;
