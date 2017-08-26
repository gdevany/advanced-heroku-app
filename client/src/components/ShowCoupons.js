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


        <div key={coupon.id} className="coupon">
          <div className="container">
            <div className="row">
              <div className="col-xs-4 text-left">
                <address>
                  <strong>{coupon.bizName}</strong><br />
                  {coupon.bizAddress.streetAndNum}<br />
                  {coupon.bizAddress.city}<br />
                  <strong>{coupon.bizAddress.zip}</strong><br />
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </div>
              <div className="col-xs-4 text-center">
                <div className="tightLines">Buy One</div>
                <div className="biggerText">{coupon.heading}</div>
                <div className="">Get One</div>
                <div className="bigText">Free</div>
              </div>
              <div className="col-xs-4">
                <img
                  className="bizLogo outline pull-right"
                  src={coupon.bizLogo}>
                </img>
              </div>
            </div>
            <div className="row text-center">
              <div>{coupon.couponDesc}</div>
              <div>{coupon.restrictions}</div>
            </div>
          </div>
        </div>
      )
    })
  } else couponDiv = <div></div>

  return (
    <div className="">
      {couponDiv}
    </div>
  )
}

export default ShowCoupons;
