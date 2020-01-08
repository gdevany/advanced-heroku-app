import React from "react";
import { geolocated } from "react-geolocated";
import GoogleMap from "./GoogleMap";
import CurrentLocationMapped from "./CurrentLocationMapped";
import { Animated } from "react-animated-css";

class Geolocated extends React.Component {
  constructor() {
    super();
    this.state = {
      userPosition: {
        zip: 0,
        lat: 0,
        lng: 0
      },
      geolocateSuccessful: false,
      loadingWarning: false,
      userEnteredZip: 0,
      userDidEnterZip: false,
      userWantsToEnterZip: false
    };
  }

  // load geolocation
  componentDidMount() {
    this.loadGeolocation().then(() => this.setState({ loadingWarning: true }));
  }

  // action of loading geolocation
  loadGeolocation = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.setState({ loadingWarning: true });
            this.convertGeolocationToZip(pos);
          });
        }
      }, 2000);
    });
    return promise;
  };

  convertGeolocationToZip = pos => {
    let geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: pos }, (results, status) => {
      let userPosition = {};
      results[0].address_components.map(adcom => {
        if (adcom.types.indexOf("postal_code") > -1) {
          userPosition.zip = Number(adcom.short_name);
          userPosition.lat = pos.lat;
          userPosition.lng = pos.lng;
          return true;
        } else return false;
      });
      console.log(userPosition);
      this.setState({ userPosition, geolocateSuccessful: true });
      this.props.setZip(userPosition);
    });
  };

  handleZipEntered = e => {
    this.setState({
      userEnteredZip: e.target.value
    });
  };

  zipSubmitted = () => {
    this.setState({
      userDidEnterZip: true,
      userWantsToEnterZip: false
    });
  };

  showInputZip = message => {
    let choice = (
      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={true}
        animationInDuration={2000}
        animationOutDuration={1000}
      >
        <div className="customBox">
          <div className="margin30bottom">{message}</div>
          <div>
            <input
              type="text"
              placeholder="5-digit zip..."
              className="inputZip zipBox"
              onChange={e => {
                this.handleZipEntered(e);
              }}
            />
          </div>
          <div className="margin30bottom">
            <small>Enter your zip</small>
          </div>
          <button
            className="buttonBox white"
            type="submit"
            onClick={() => this.zipSubmitted()}
          >
            submit
          </button>
          {this.resetUserWantsToEnterZip()}
        </div>
      </Animated>
    );
    return choice;
  };

  resetUserWantsToEnterZip = () => {
    return (
      <div onClick={() => this.userToEnterZip()}>
        <span className="arrowContainer">
          <i className="arrow backArrow" />
          back
        </span>
      </div>
    );
  };

  userToEnterZip = () => {
    this.setState({ userWantsToEnterZip: !this.state.userWantsToEnterZip });
  };

  render() {
    const {
      userPosition,
      userEnteredZip,
      userDidEnterZip,
      geolocateSuccessful,
      userWantsToEnterZip
    } = this.state;
    const {
      loggedIn,
      searchCoupons,
      filteredCoupons,
      usersCoupons,
      isGeolocationAvailable,
      isGeolocationEnabled
    } = this.props;

    let message = !isGeolocationAvailable
      ? "Your browser does not support Geolocation"
      : !isGeolocationEnabled
      ? "Geolocation is not enabled"
      : "Try refreshing your browser";

    return (
      !loggedIn && (
        <div className="containerShort padding20top text-center">
          {!searchCoupons &&
            geolocateSuccessful &&
            this.state.userWantsToEnterZip && <div>{this.showInputZip()}</div>}

          <GoogleMap size={"mapSizeNone"}></GoogleMap>
          {(geolocateSuccessful || userDidEnterZip) && !userWantsToEnterZip ? (
            <CurrentLocationMapped
              _onClick={() => this.userToEnterZip()}
              pos={userPosition}
              myZip={userDidEnterZip ? userEnteredZip : userPosition.zip}
              loggedIn={loggedIn}
              searchCoupons={searchCoupons}
              filteredCoupons={filteredCoupons}
              usersCoupons={usersCoupons}
              setZip={this.props.setZip}
              zipEnabledBy={
                userDidEnterZip ? "userDidEnterZip" : "geolocateSuccessful"
              }
            />
          ) : !isGeolocationAvailable || !isGeolocationEnabled ? (
            this.showInputZip(message)
          ) : (
            !userWantsToEnterZip && <div>...loading</div>
          )}
          <div
            className={
              "smallText padding20bottom zipChangeMsg " +
              ((searchCoupons ||
                !geolocateSuccessful ||
                this.state.userWantsToEnterZip) &&
                "noShow")
            }
          >
            Click zip to change
          </div>
        </div>
      )
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Geolocated);
