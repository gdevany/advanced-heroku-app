import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import convertAddressToLatLng from "./ConvertAddressToLatLng";
import { Animated } from "react-animated-css";

const UserLocation = ({ myZip }) => (
  <div className="userLocMarkerContainer userLocMCTransform">
    <div className="userLocMarker">{myZip}</div>
  </div>
);

const BizMarkers = ({ logo }) => (
  <Animated
    animationIn="bounceInLeft"
    animationOut="fadeOutDown"
    isVisible={true}
    animationInDuration={1000}
    animationOutDuration={1000}
  >
    <div className="mapLogoMarkerContainer userLocMCTransform">
      <img className="imageInContainer" src={logo} alt="bizLogo"></img>
    </div>
  </Animated>
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

class CurrentLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bizLocations: [],
      filteredCoupons: [],
      usersCoupons: [],
      center: {},
      showMap: true
    };
  }

  // If zipEnabledBy user, convertAdd (returns {lat,lng}), set to state center and Redux
  componentDidMount = async () => {
    if (this.props.zipEnabledBy === "userDidEnterZip") {
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

  toggleShowMap = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }));
  };

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

  // Fit map to its bounds after the api is loaded
  // Wrap in timeout due to state variable conversion delay
  apiIsLoaded = (map, maps) => {
    setTimeout(() => {
      // Get bounds by our places
      const bounds = getMapBounds(
        map,
        maps,
        this.state.bizLocations[0],
        this.state.center
      );
      // Fit map to bounds
      map.fitBounds(bounds);
      // Bind the resize listener
      bindResizeListener(map, maps, bounds);
    }, 1000);
  };

  render() {
    const { myZip, searchCoupons, loggedIn } = this.props;
    const { bizLocations, center, showMap } = this.state;

    return (
      <div>
        {!searchCoupons && (
          <Animated
            animationIn="bounceInLeft"
            animationOut="fadeOutDown"
            isVisible={myZip && !searchCoupons ? true : false}
            animationInDuration={1000}
            animationOutDuration={1000}
          >
            <div className="buttonBox">
              <div
                className="floatLeftWithPadding"
                onClick={() => this.toggleShowMap()}
              >
                Your location
                <span
                  className="arrowContainer mapArrow"
                  // onClick={() => this.toggleShowMap()}
                >
                  <i
                    className={showMap ? "arrow upArrow" : "arrow downArrow"}
                  />
                </span>
              </div>
              {showMap && (
                <GoogleMap
                  center={center}
                  size={
                    searchCoupons
                      ? "mapGen mapSizeWideShort"
                      : "mapGen mapSize100"
                  }
                >
                  <UserLocation
                    myZip={myZip}
                    lat={center.lat}
                    lng={center.lng}
                  />
                </GoogleMap>
              )}
            </div>
          </Animated>
        )}
        {bizLocations.length > 0 &&
          searchCoupons &&
          !loggedIn &&
          (bizLocations[0].length > 0 ? (
            <div className="buttonBox">
              {searchCoupons && (
                <div
                  className="floatLeftWithPadding"
                  onClick={() => this.toggleShowMap()}
                >
                  {searchCoupons}
                  <span
                    className="arrowContainer mapArrow"
                    // onClick={() => this.toggleShowMap()}
                  >
                    <i
                      className={showMap ? "arrow upArrow" : "arrow downArrow"}
                    />
                  </span>
                </div>
              )}
              {showMap && (
                <GoogleMap
                  center={center}
                  // center={{ lat: pos.lat, lng: pos.lng }}
                  size={"mapGen mapSizeWideShort"}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) =>
                    this.apiIsLoaded(map, maps)
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
                  <UserLocation
                    myZip={myZip}
                    lat={center.lat}
                    lng={center.lng}
                  />
                </GoogleMap>
              )}
            </div>
          ) : (
            <div>Sorry, there are no results</div>
          ))}
      </div>
    );
  }
}

export default CurrentLocationMapped;
