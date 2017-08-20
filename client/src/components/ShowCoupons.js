import React from 'react';


function ShowCoupons(props) {
  console.log(props);

  var filterCoupons = props.coupons.filter((c) => {
      if(c.searchWords.indexOf(props.searchCoupons) > -1) {
        return true;
      } else return false;
    });

  var couponDiv = "";

  if (props.searchCoupons !== "") {
    couponDiv = filterCoupons.map((coupon) => {
      return <div key={coupon.id} className="coupon">{couponFormat(coupon)}</div>
    })
  } else couponDiv = <div></div>

function couponFormat(coupon) {
  return (<div>
    <div>{coupon.bizName}</div><br />
    <div>{coupon.bizLogo}</div>
    <div>{coupon.heading}</div><br />
    <div>{coupon.couponDesc}</div><br />
    <div>{coupon.restrictions}</div>
    <div>{coupon.bizAddress.streetAndNum}</div>
    <div>{coupon.bizAddress.city}</div>
    <div>{coupon.bizAddress.zip}</div>
    </div>
  )
}

  return (
    <div>
      {couponDiv}
    </div>
  )
}

export default ShowCoupons;
