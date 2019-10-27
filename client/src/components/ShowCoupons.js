import React from "react";
import GoogleMap from "./GoogleMap";

function ShowCoupons(props) {
  const cantDelete = () => {
    alert(
      "You can't delete this coupon because it's permanent. Try creating your own coupon, then delete it."
    );
  };

  let filterCoupons = "";
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

  // Convert address to lan and lng for google maps
  const convertAddressToLatLng = address => {
    let geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: "10800 superview" }, function(results, status) {
      if (status === "OK") {
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        console.log(lat, lng);
        return { lat, lng };
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const bizMapSelected = changeFromDefaultPropsToPOS => {
    console.log(changeFromDefaultPropsToPOS);
    <GoogleMap
      center={{
        lat: changeFromDefaultPropsToPOS.lat,
        lng: changeFromDefaultPropsToPOS.lng
      }}
    >
      <BusinessLocation
        lat={changeFromDefaultPropsToPOS.lat}
        lng={changeFromDefaultPropsToPOS.lng}
      />
    </GoogleMap>;
  };

  const defaultProps = {
    lat: 30.263,
    lng: -97.744
  };

  const BusinessLocation = ({ address }) => (
    <div className="greyTextMarker">{address}</div>
  );

  let couponDiv = "";
  // if loggenIn, filter on username and show
  // if NOT logged in && if subtopic chosen (searchCoupons), map them (filtered)
  if (props.searchCoupons !== "" || props.loggedIn !== "") {
    couponDiv = filterCoupons.map(coupon => {
      console.log(coupon);
      const pos = convertAddressToLatLng(coupon.streetAndNum);
      console.log(pos);
      return (
        <div key={coupon._id} className="col-sm-6 col-lg-4">
          <div className="coupon">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 couponHeadline">
                  <span className="bizLogo pull-left">
                    <img className="" src={coupon.bizLogo} alt="bizLogo"></img>
                  </span>
                  {props.loggedIn === "" ? (
                    // TODO: calculate distance with geolocation
                    <div>
                      <span className="distance text-center">0.4 miles</span>
                      <span
                        className="bizLogo pull-right"
                        // onClick={() => bizMapSelected(defaultProps)}
                      >
                        <img
                          className=""
                          // src={coupon.bizQR}
                          src={
                            "https://png2.cleanpng.com/sh/43591cc4cc9b0369f77e9c5a09d2b21d/L0KzQYm3VMI4N6NrfZH0aYP2gLBuTfdwd5hxfZ92YYD2PbL3ib1ud6ZzjNNybj35ebbATgRpbaNqRadqZUO7dLfoUcA1bWo9RqUCMUS4RomAUcUzPGk7SqYAOEC5Rom1kP5o/kisspng-google-maps-api-mountain-view-there-5ae38dfa104e98.3714568715248624580668.png"
                          }
                          alt=""
                        ></img>
                        <GoogleMap
                          center={{
                            lat: defaultProps.lat,
                            lng: defaultProps.lng
                          }}
                          size={"mapSize6em mapSizeNoShow"}
                          zoom={15}
                        >
                          <BusinessLocation
                            lat={defaultProps.lat}
                            lng={defaultProps.lng}
                            address={coupon.streetAndNum}
                          />
                        </GoogleMap>
                      </span>
                    </div>
                  ) : (
                    <span>{deleteButton(coupon)}</span>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 text-center offer">
                  <div className="">Buy One</div>
                  <div className="biggerText">{coupon.heading}</div>
                  <div className="">Get One Free</div>
                </div>
                <br />
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
              <div className="row text-left">
                <div>
                  {"* "}
                  {coupon.couponDesc}
                  {" *"}
                </div>
                <div>
                  {"* "}
                  {coupon.restrictions}
                </div>
                <div className="">Coupon ID: {coupon._id}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  } else couponDiv = <div></div>;

  return <div className="container-fluid couponMargin">{couponDiv}</div>;
}

export default ShowCoupons;
