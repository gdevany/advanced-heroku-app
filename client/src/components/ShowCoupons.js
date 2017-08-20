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
      return <div className="chosenCat">ffff</div>
    })
  } else couponDiv = <div></div>


    return (
      <div>
        {couponDiv}
      </div>
    )
  }

export default ShowCoupons;
