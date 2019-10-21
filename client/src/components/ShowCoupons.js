import React from "react";

function ShowCoupons(props) {
  const cantDelete = () => {
    alert(
      "You can't delete this coupon because it's permanent. Try creating your own coupon, then delete it."
    );
  };

  var filterCoupons = "";
  //if loggedIn, filter coupons against username
  //if NOT logged in, filter coupons against subtopic chosen (searchCoupons)
  if (props.loggedIn === "" && props.searchCoupons !== "") {
    filterCoupons = props.filteredCoupons;
  } else {
    filterCoupons = props.usersCoupons;
  }

  //if loggedIn, show delete button. if NOT logged in, show nothing
  const deleteButton = coupon => {
    if (props.loggedIn === "") {
      return <div></div>;
    } else {
      return (
        <button
          className="bizLogo buttonDelete"
          onClick={e => {
            e.preventDefault();
            // props.deleteCoupon(coupon._id);

            if (!coupon.notDeletable) {
              props.deleteCoupon(coupon);
              props.loadUsersCoupons(props.loggedIn);
            } else {
              cantDelete();
            }
          }}
        >
          DELETE COUPON
        </button>
      );
    }
  };

  var couponDiv = "";
  // if loggenIn, filter on username and show
  // if NOT logged in && if subtopic chosen (searchCoupons), map them (filtered)
  if (props.searchCoupons !== "" || props.loggedIn !== "") {
    couponDiv = filterCoupons.map(coupon => {
      return (
        <div key={coupon._id} className="col-sm-6 col-lg-4">
          <div className="coupon">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 couponHeadline">
                  <span className="bizLogo pull-left">
                    <img
                      className=""
                      src={coupon.bizLogo}
                      alt=""
                    ></img>
                  </span>
                  <span className="distance text-center">1.2 miles</span>
                  <span className="bizLogo pull-right">
                    <img
                      className=""
                      src={coupon.bizQR}
                      alt=""
                    ></img>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 text-center offer">
                  <div className="">Buy One</div>
                  <div className="biggerText">{coupon.heading}</div>
                  <div className="">Get One</div>
                  <div className="bigText">Free</div>
                </div>
                <br />
                <div>{deleteButton(coupon)}</div>
              </div>
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
              <div className="row text-center">
                <div>
                  {"* "}
                  {coupon.couponDesc}
                  {" *"}
                </div>
                <div>
                  {"* "}
                  {coupon.restrictions}
                </div>
                <div>Coupon ID: {coupon._id}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  } else couponDiv = <div></div>;

  // if (props.searchCoupons !== "" || props.loggedIn !== "") {

  //   couponDiv = filterCoupons.map((coupon) => {
  //     return (
  //       <div key={coupon._id} className="col-sm-6 col-lg-4">
  //       <div className="coupon">
  //         <div className="container">
  //           <div className="row">
  //             <div className="col-xs-7 col-xs-offset-1 text-center offer">
  //               <div className="">Buy One</div>
  //               <div className="biggerText">{coupon.heading}</div>
  //               <div className="">Get One</div>
  //               <div className="bigText">Free</div>
  //             </div>
  //             <div className="col-xs-4 verticle">
  //               <div>
  //                 <img
  //                   className="bizLogo pull-right"
  //                   src={coupon.bizLogo}
  //                   alt="">
  //                 </img>
  //               </div><br />
  //               <div>
  //                 <img
  //                   className="bizLogo pull-right"
  //                   src={coupon.bizQR}
  //                   alt="">
  //                 </img>
  //               </div><br />
  //               <div>
  //                 {deleteButton(coupon)}
  //               </div>
  //             </div>
  //           </div>
  //           <div className="row">
  //             <div className="col-xs-12 text-center">
  //               <address>
  //                 <strong>{coupon.bizName}</strong><br />
  //                 {coupon.streetAndNum}{" "}
  //                 {coupon.city}{" "}<br />
  //                 <strong>{coupon.zip}</strong><br />
  //                 <small>{coupon.bizPhone}</small>
  //               </address>
  //             </div>
  //           </div>
  //           <div className="row text-center">
  //             <div>{"* "}{coupon.couponDesc}{" *"}</div>
  //             <div>{"* "}{coupon.restrictions}</div>
  //             <div>Coupon ID:{" "}{coupon._id}</div>
  //           </div>
  //         </div>
  //       </div>
  //       </div>
  //     )
  //   })
  // } else couponDiv = <div></div>

  return <div className="couponMargin">{couponDiv}</div>;
}

export default ShowCoupons;
