import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import convertAddressToLatLng from "./ConvertAddressToLatLng";

const UserLocation = ({ myZip }) => (
  <div className="userLocMarkerContainer">
    <div className="innerUserLocationMarker">{myZip}</div>
  </div>
);

const BizMarkers = ({ logo }) => (
  <div className="mapLogoMarkerContainer">
    <img className="imageInContainer" src={logo} alt="bizLogo"></img>
  </div>
);

// Return map bounds based on list of places
const getMapBounds = (map, maps, places, myLocation) => {
  console.log(places, myLocation);
  const bounds = new maps.LatLngBounds();

  places.forEach(place => {
    console.log(place);
    bounds.extend(
      // new maps.LatLng(place.geometry.location.lat, place.geometry.location.lng)
      new maps.LatLng(place.pos.lat, place.pos.lng)
    );
  });
  myLocation && bounds.extend(new maps.LatLng(myLocation.lat, myLocation.lng))
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
  console.log(places);
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
      usersCoupons: []
    };
  }

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
        let newEntry = await this.convertAdd(fullAddress, coupon.bizLogo);
        return newEntry;
      })
    );
    return addressList;
  };

  // Convert address (as you would type in google maps) to { { pos: {lat, lng} } }
  convertAdd = async (fullAddress, bizLogo) => {
    let pos = {};
    await convertAddressToLatLng(fullAddress).then(async res => {
      pos.lat = await res.lat();
      pos.lng = await res.lng();
    });
    let newLocation = { pos, bizLogo };
    return newLocation;
  };

  render() {
    const { pos, myZip } = this.props;
    const { bizLocations } = this.state;
    console.log(bizLocations);
    console.log(pos)

    return (
      bizLocations.length > 0 && (
        <div className="buttonBox">
          <GoogleMap
            center={{ lat: pos.lat, lng: pos.lng }}
            size={"mapSizeWideShort"}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              apiIsLoaded(map, maps, bizLocations[0], pos && pos)
            }
          >
            {bizLocations.length > 0 &&
              bizLocations[0].map((address, i) => {
                return (
                  <BizMarkers
                    logo={address.bizLogo}
                    lat={address.pos.lat}
                    lng={address.pos.lng}
                    key={i}
                  />
                );
              })}
            <UserLocation myZip={myZip} lat={pos.lat} lng={pos.lng} />
          </GoogleMap>
        </div>
      )
    );
  }
}

export default CurrentLocationMapped;
