import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import convertAddressToLatLng from "./ConvertAddressToLatLng";
import { Animated } from "react-animated-css";

const UserLocation = ({ myZip }) => (
  <div className="userLocMarkerContainer userLocMCTransform">
    <div className="userLocMarker">You</div>
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

const defaultProps = {
  center: { lat: 30.26, lng: -97.74 },
  zoom: 10
};

class CurrentLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bizLocations: [],
      filteredCoupons: [],
      usersCoupons: [],
      center: {},
      showMap: false
    };
  }

  // If zipEnabledBy user, convertAdd (returns {lat,lng}), set to state center and Redux
  componentDidMount = async () => {
    let currentCenter = await this.calculateCenter();
    this.setState({ center: currentCenter });
    this.props.setZip(currentCenter);
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
    if (this.props.myZip !== prevProps.myZip) {
      await this.calculateCenter();
    }
  }

  calculateCenter = async () => {
    if (this.props.zipEnabledBy === "userDidEnterZip") {
      let centerForUserEnteredZip = await this.convertAdd(this.props.myZip);
      return centerForUserEnteredZip;
    } else {
      let lat = this.props.pos.lat;
      let lng = this.props.pos.lng;
      return { lat, lng };
    }
  };

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
        return { pos: newEntry, coupon: coupon };
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

  showMapHeader = heading => {
    return (
      <div className="mapHeader">
        <span className="thirdWidth">{heading}</span>
        {this.props.searchCoupons ? (
          <span className="thirdWidth marginAutos mapHeaderZip">{this.props.myZip}</span>
        ) : (
          <span
            className="thirdWidth marginAutos mapHeaderZip"
            onClick={() => this.props._onClick()}
          >
            {this.props.myZip}
          </span>
        )}
        <span
          className="thirdWidth arrowContainer mapArrow"
          onClick={() => this.toggleShowMap()}
        >
          <span className="mapHeaderToggler">
            {this.state.showMap ? "hide map" : "show map"}
          </span>
          <i
            className={this.state.showMap ? "arrow upArrow" : "arrow downArrow"}
          />
        </span>
      </div>
    );
  };

  render() {
    const { myZip, searchCoupons, loggedIn } = this.props;
    const { bizLocations, center, showMap } = this.state;

    return (
      <div className="locationMapContainer">
        {!searchCoupons && (
          <Animated
            animationIn="bounceInLeft"
            animationOut="fadeOutDown"
            isVisible={myZip && !searchCoupons ? true : false}
            animationInDuration={1000}
            animationOutDuration={1000}
          >
            <div className="buttonBox">
              {this.showMapHeader("Your location")}
              {showMap && (
                <GoogleMap
                  center={center ? center : defaultProps.center}
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
              {searchCoupons && this.showMapHeader(searchCoupons)}
              {showMap && (
                <GoogleMap
                  center={center}
                  size={"mapGen mapSizeWideShort"}
                  yesIWantToUseGoogleMapApiInternals
                  onGoogleApiLoaded={({ map, maps }) =>
                    this.apiIsLoaded(map, maps)
                  }
                >
                  {bizLocations[0].map((address, i) => {
                    return (
                      <BizMarkers
                        logo={address.coupon.bizLogo}
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
