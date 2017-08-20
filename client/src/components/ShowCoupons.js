import React from 'react';


function ShowCoupons(props) {
  console.log(props);

  var filterCoupons = props.coupons.filter((c) => {
      if(c.searchWords.indexOf(props.searchCoupons) > -1) {
        return true;
      } else return false;
    });

  var couponDiv = "";

//   if (props.searchCoupons !== "") {
//     couponDiv = filterCoupons.map((coupon) => {
//       return <div key={coupon.id}>{couponFormat(coupon)}</div>
//     })
//   } else couponDiv = <div></div>
//
// function couponFormat(coupon) {
//   return (<div className="coupon">
//     <h2>{coupon.bizName}</h2>
//     <div>{coupon.bizLogo}</div>
//     <div>{coupon.bizAddress.streetAndNum}</div>
//     <div>{coupon.bizAddress.city}</div>
//     <div>{coupon.bizAddress.zip}</div>
//     <div>{coupon.heading}</div>
//     <div>{coupon.couponDesc}</div>
//     <div>{coupon.restrictions}</div>
//     </div>
//   )

  if (props.searchCoupons !== "") {
    couponDiv = filterCoupons.map((coupon) => {
      return (
        <div key={coupon.id} className="coupon container">
          <div className="row">
            <h5>{coupon.bizName}</h5>
            <div>{coupon.bizLogo}</div>
          </div>
          <div className="row">
            <div>{coupon.bizAddress.streetAndNum}</div>
            <div>{coupon.bizAddress.city}</div>
            <div>{coupon.bizAddress.zip}</div>
          </div>
          <div>{coupon.heading}</div>
          <div>{coupon.couponDesc}</div>
          <div>{coupon.restrictions}</div>
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
