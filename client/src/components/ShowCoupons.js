import React from 'react';


function ShowCoupons(props) {
  console.log(props);

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
        <div key={coupon.id} className="coupon container">

          <div className="couponRowBizName">
            <div className="bigText">{coupon.bizName}</div>
            <div className="tightAddress">
              {coupon.bizAddress.streetAndNum}
              {coupon.bizAddress.city}
              {coupon.bizAddress.zip}
            </div>
            <div>{coupon.bizLogo}</div>
          </div>

          <div className="row couponRowInfo">
            <div className="tightLines">Buy One</div>
            <div className="biggerText">{coupon.heading}</div>
            <div className="tightLines">Get One</div>
            <div className="bigText">Free</div>
            <div>{coupon.couponDesc}</div>
            <div>{coupon.restrictions}</div>
          </div>
        </div>
      )
    })
  } else couponDiv = <div></div>

  return (
    <div>
      {couponDiv}
    </div>
  )
}

export default ShowCoupons;
