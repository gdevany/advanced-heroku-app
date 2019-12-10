import React from "react";
import { geolocated } from "react-geolocated";
import GoogleMap from "./GoogleMap";
import CurrentLocationMapped from "./CurrentLocationMapped";

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
      <div className="customBox">
        <div className="margin30Bottom">{message}</div>
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
        <div className="margin30Bottom">
          <small>Enter your zip</small>
        </div>
        <button type="submit" onClick={() => this.zipSubmitted()}>
          submit
        </button>
      </div>
    );
    return choice;
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
      <div className="containerShort margin30top text-center">
        {!searchCoupons && geolocateSuccessful && (
          <div>
            {this.state.userWantsToEnterZip ? (
              this.showInputZip()
            ) : (
              <div
                className="smallText margin30Bottom"
                onClick={() => this.userToEnterZip()}
              >
                Click here to enter zip
              </div>
            )}
          </div>
        )}

        <GoogleMap size={"mapSizeNone"}></GoogleMap>
        {(geolocateSuccessful || userDidEnterZip) && !userWantsToEnterZip ? (
          <CurrentLocationMapped
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
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Geolocated);
