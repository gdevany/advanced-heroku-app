import React from "react";

class CreateCoupons extends React.Component {
  constructor() {
    super();
    this.state = {
      coupon: {
          id: 0,
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
    return (
      <div>
        <div>
          <h1>Create New Coupon</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (this.props.createCoupon) {
              this.props.createCoupon(this.state.coupon);
            }
          }}>
            <div>
              Business Name: <input onChange={(e) => {
                const coupon = {bizName: e.target.value};
                this.setState({
                  coupon: Object.assign(this.state.coupon,coupon)
                });
              }} />
            </div>
            <div>
              Business QR Link: <input onChange={(e) => {
                const coupon = {bizQR: e.target.value};
                this.setState({
                  coupon: Object.assign(this.state.coupon,coupon)
                });
              }} />
            </div>
            <div>
              Business Logo Link: <input onChange={(e) => {
                const coupon = {bizLogo: e.target.value};
                this.setState({
                  coupon: Object.assign(this.state.coupon,coupon)
                });
              }} />
            </div>
            <div>
              Buy One: <input onChange={(e) => {
                const coupon = {heading: e.target.value};
                this.setState({
                  coupon: Object.assign(this.state.coupon,coupon)
                });
              }} /> Get One Free
            </div>
            <div>
              Coupon Description: <input onChange={(e) => {
                const coupon = {couponDesc: e.target.value};
                this.setState({
                  coupon: Object.assign(this.state.coupon,coupon)
                });
              }} />
            </div>
            <div>
              Restrictions: <input onChange={(e) => {
                const coupon = {restrictions: e.target.value};
                this.setState({
                  coupon: Object.assign(this.state.coupon,coupon)
                });
              }} />
            </div>
            <div>
              Search Words: <input onChange={(e) => {
                const coupon = {searchWords: e.target.value};
                this.setState({
                  coupon: Object.assign(this.state.coupon,coupon)
                });
              }} />
            </div>
            <div>Business Address:
              <div>
                Number and Street Name:<input onChange={(e) => {
                  const coupon = {streetAndNum: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} />
              </div>
              <div>
                City:<input onChange={(e) => {
                  const coupon = {city: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} />
              </div>
              <div>
                Zipcode:<input onChange={(e) => {
                  const coupon = {zip: e.target.value};
                  this.setState({
                    coupon: Object.assign(this.state.coupon,coupon)
                  });
                }} />
              </div>
            </div>
            <div>
              Phone#: <input onChange={(e) => {
                const coupon = {phone: e.target.value};
                this.setState({
                  coupon: Object.assign(this.state.coupon,coupon)
                });
              }} />
            </div>
            <button>Create</button>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateCoupons;
