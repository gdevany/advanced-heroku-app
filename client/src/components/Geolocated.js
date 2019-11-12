import React from "react";
import { geolocated } from "react-geolocated";
import GoogleMap from "./GoogleMap";
import CurrentLocationMapped from "./CurrentLocationMapped";

class ZipcodeSetter extends React.Component {
  constructor() {
    super();
    this.state = {
      userPosition: {
        zip: 0,
        lat: 0,
        lng: 0
      },
      loadingWarning: false,
      userEnteredZip: 0
    };
  }

  // load geolocation
  componentDidMount() {
    this.loadGeolocation();
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
      this.setState({ userPosition });
      this.props.setZip(userPosition);
    });
  };

  showInputZip = message => {
    let choice = (
      <div>
        <div>{message}</div>
        <div>or</div>
        <input
          type="text"
          placeholder="5-digit zip..."
          className="inputZip zipBox"
          onChange={e => {
            let userEnteredZip = e.target.value;
            this.setState({
              userEnteredZip
            });
          }}
        />
      </div>
    );
    // this.props.setZip();
    return choice;
  };

  render() {
    // console.log(this.state.userEnteredZip.length)
    const { userPosition, userEnteredZip } = this.state;
    const {
      loggedIn,
      searchCoupons,
      filteredCoupons,
      usersCoupons
    } = this.props;

    return !this.props.isGeolocationAvailable ? (
      this.showInputZip("Your browser does not support Geolocation")
    ) : !this.props.isGeolocationEnabled ? (
      this.showInputZip("Geolocation is not enabled")
    ) : this.props.coords ? (
      <div className="margin30Bottom">
        <div className="borderIt smallText marginBottom1">
          Offers will be filtered on your current zipcode
        </div>
        <GoogleMap size={"mapSizeNone"}></GoogleMap>
        {(userPosition.lat !== 0 && userPosition.lng !== 0) ||
        userEnteredZip.length >= 5 ? (
          <CurrentLocationMapped
            pos={userPosition}
            myZip={userPosition.zip !== 0 ? userPosition.zip : userEnteredZip}
            loggedIn={loggedIn}
            searchCoupons={searchCoupons}
            filteredCoupons={filteredCoupons}
            usersCoupons={usersCoupons}
            setZip={this.props.setZip}
          />
        ) : this.state.loadingWarning ? (
          this.showInputZip("Hit Refresh")
        ) : (
          <div>...Loading</div>
        )}
      </div>
    ) : (
      <div>Getting the location data</div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(ZipcodeSetter);
