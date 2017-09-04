import React from 'react';


function ShowCoupons(props) {
  // filter coupons against subtopic chosen (searchCoupons)
  var filterCoupons = props.coupons.filter((c) => {
      if(c.searchWords.indexOf(props.searchCoupons) > -1) {
        return true;
      } else return false;
    });

  var couponDiv = "";

  // if subtopic chosen (searchCoupons), map them (filtered)
  if (props.searchCoupons !== "") {
    couponDiv = filterCoupons.map((coupon) => {
      return (
        <div key={coupon.id} className="col-md-6 col-lg-4">
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
                    className="bizLogo outline pull-right"
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
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center">
                <address>
                  <strong>{coupon.bizName}</strong><br />
                  {coupon.bizAddress.streetAndNum}{" "}
                  {coupon.bizAddress.city}{" "}<br />
                  <strong>{coupon.bizAddress.zip}</strong><br />
                  <small>{coupon.bizPhone}</small>
                </address>
              </div>
            </div>
            <div className="row text-center">
              <div>{"* "}{coupon.couponDesc}{" *"}</div>
              <div>{"* "}{coupon.restrictions}</div>
              <div>Coupon ID:{" "}{coupon.id}</div>
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
