// TODO line 37ish- onClick to deleteCoupon()
// TODO line 19ish- create loadFilteredCoupons()

import React from 'react';


function ShowCoupons(props) {

console.log(props.usersCoupons);
  var filterCoupons = "";
  //if loggedIn, filter coupons against username
  //if NOT logged in, filter coupons against subtopic chosen (searchCoupons)
  if (props.loggedIn === "" && props.searchCoupons !== "") {
    // filterCoupons = props.coupons.filter((c) => {
    //   if(c.searchWords.indexOf(props.searchCoupons) > -1) {
    //     return true;
    //   } else return false;
    // });
    filterCoupons = props.loadFilteredCoupons(props.searchCoupons);
  } else {
    // filterCoupons = props.coupons.filter((c) => {
    //   if(c.username.indexOf(props.loggedIn) > -1) {
    //     return true;
    //   } else return false;
    // });
    filterCoupons = props.usersCoupons;
  }

  //if loggedIn, show delete button. if NOT logged in, show nothing
  const deleteButton = (coupon) => {
    if (props.loggedIn === "") {
      return <div></div>
    } else {
      return <button
        className="bizLogo buttonDelete"
        onClick={ (e) => {
          e.preventDefault();
          console.log(`coupon _id: ${coupon._id}`);
          props.deleteCoupon(coupon._id);
          props.loadUsersCoupons(props.loggedIn);
        }}>DELETE COUPON</button>
    }
  }


  var couponDiv = "";
  // if loggenIn, filter on username and show
  // if NOT logged in && if subtopic chosen (searchCoupons), map them (filtered)
  if (props.searchCoupons !== "" || props.loggedIn !== "") {

    couponDiv = props.usersCoupons.map((coupon) => {
      return (
        <div key={coupon._id} className="col-md-6 col-lg-4">
        <div className="coupon">
          <div className="container">
            <div className="row">
              <div className="col-xs-7 col-xs-offset-1 text-center offer">
                <div className="">Buy One</div>
                <div className="biggerText">{coupon.heading}</div>
                <div className="">Get One</div>
                <div className="bigText">Free</div>
              </div>
              <div className="col-xs-4 verticle">
                <div>
                  <img
                    className="bizLogo pull-right"
                    src={coupon.bizLogo}
                    alt="">
                  </img>
                </div><br />
                <div>
                  <img
                    className="bizLogo pull-right"
                    src={coupon.bizQR}
                    alt="">
                  </img>
                </div><br />
                <div>
                  {deleteButton(coupon)}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center">
                <address>
                  <strong>{coupon.bizName}</strong><br />
                  {coupon.streetAndNum}{" "}
                  {coupon.city}{" "}<br />
                  <strong>{coupon.zip}</strong><br />
                  <small>{coupon.bizPhone}</small>
                </address>
              </div>
            </div>
            <div className="row text-center">
              <div>{"* "}{coupon.couponDesc}{" *"}</div>
              <div>{"* "}{coupon.restrictions}</div>
              <div>Coupon ID:{" "}{coupon._id}</div>
            </div>
          </div>
        </div>
        </div>
      )
    })
  } else couponDiv = <div></div>

  return (
    <div className="couponMargin">
      {couponDiv}
    </div>
  )
}

export default ShowCoupons;
