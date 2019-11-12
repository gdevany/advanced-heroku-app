import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import convertAddressToLatLng from "./ConvertAddressToLatLng";

const UserLocation = ({ myZip }) => (
  <div className="userLocMarkerContainer userLocMCTransform">
    <div className="userLocMarker">{myZip}</div>
  </div>
);

const BizMarkers = ({ logo }) => (
  <div className="mapLogoMarkerContainer userLocMCTransform">
    <img className="imageInContainer blink2" src={logo} alt="bizLogo"></img>
  </div>
);

// Return map bounds based on list of biz's and myLocation
const getMapBounds = (map, maps, places, myLocation) => {
  const bounds = new maps.LatLngBounds();
  // Add each bizLocation to bounds list
  places.forEach(place => {
    bounds.extend(
      // new maps.LatLng(place.geometry.location.lat, place.geometry.location.lng)
      new maps.LatLng(place.pos.lat, place.pos.lng)
    );
  });
  // Add myLocation to bounds list
  myLocation && bounds.extend(new maps.LatLng(myLocation.lat, myLocation.lng));
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, "idle", () => {
    maps.event.addDomListener(window, "resize", () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places, myLocation) => {
  console.log(places, myLocation);
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places, myLocation);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

class CurrentLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bizLocations: [],
      filteredCoupons: [],
      usersCoupons: [],
      center: {}
    };
  }

  // If userEnteredZip, convertAdd (returns {lat,lng}), set to state center and Redux
  componentDidMount = async () => {
    if (
      this.props.pos.lat === 0 &&
      this.props.pos.lng === 0 &&
      this.props.myZip.length >= 5
    ) {
      let centerForUserEnteredZip = await this.convertAdd(this.props.myZip);
      this.setState({ center: centerForUserEnteredZip });
      this.props.setZip(centerForUserEnteredZip);
    } else {
      let lat = this.props.pos.lat;
      let lng = this.props.pos.lng;
      this.setState({ center: { lat, lng } });
    }
  };

  // If filteredCoupons(props) changes, change state
  // TODO: If userCoupons changes, change state
  async componentDidUpdate(prevProps) {
    if (this.props.filteredCoupons !== prevProps.filteredCoupons) {
      let newMarkers = await this.setMarkers();
      this.setState({
        filteredCoupons: [
          this.props.filteredCoupons,
          ...this.state.filteredCoupons
        ],
        usersCoupons: [],
        bizLocations: [newMarkers, ...this.state.bizLocations]
      });
    }
    if (this.props.usersCoupons !== prevProps.usersCoupons) {
      this.setState({
        usersCoupons: [...this.state.usersCoupons, this.props.usersCoupons]
      });
    }
  }

  // Return ( { pos: {lat, lng}, bizLogoLink} )
  setMarkers = () => {
    let addressList = Promise.all(
      (this.props.filteredCoupons || []).map(async coupon => {
        let fullAddress = `${coupon.streetAndNum}${" "}${coupon.city}${" "}${
          coupon.zip
        }`;
        let newEntry = await this.convertAdd(fullAddress);
        let logo = coupon.bizLogo;
        return { pos: newEntry, bizLogo: logo };
      })
    );
    return addressList;
  };

  // Convert address (as you would type in google maps) to { { pos: {lat, lng} } }
  convertAdd = async fullAddress => {
    let pos = {};
    await convertAddressToLatLng(fullAddress).then(async res => {
      pos.lat = await res.lat();
      pos.lng = await res.lng();
    });
    return pos;
  };

  render() {
    const { myZip } = this.props;
    const { bizLocations, center } = this.state;

    return (
      <div>
        {myZip && bizLocations.length < 1 && (
          <div className="userLocMarkerContainer">
            <div className="userLocMarker">{myZip}</div>
          </div>
        )}
        {bizLocations.length > 0 && (
          <div className="buttonBox">
            <GoogleMap
              center={center}
              // center={{ lat: pos.lat, lng: pos.lng }}
              size={"mapSizeWideShort"}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                apiIsLoaded(map, maps, bizLocations[0], center)
              }
            >
              {bizLocations[0].map((address, i) => {
                return (
                  <BizMarkers
                    logo={address.bizLogo}
                    lat={address.pos.lat}
                    lng={address.pos.lng}
                    key={i}
                  />
                );
              })}
              <UserLocation myZip={myZip} lat={center.lat} lng={center.lng} />
            </GoogleMap>
          </div>
        )}
      </div>
    );
  }
}

export default CurrentLocationMapped;
