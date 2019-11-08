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
      loading: true
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
            this.convertGeolocationToZip(pos);
          });
        }
      }, 5000);
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

  render() {
    const { userPosition } = this.state;

    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div className="margin30Bottom">
        <div>
          <small>Offers will be filtered on your current zipcode</small>
        </div>
        <GoogleMap size={"mapSizeNone"}></GoogleMap>
        {userPosition.lat !== 0 &&
        userPosition.lng !== 0 &&
        userPosition.zip !== 0 ? (
          <CurrentLocationMapped
            pos={userPosition}
            myZip={userPosition.zip}
            loggedIn={this.props.loggedIn}
            searchCoupons={this.props.searchCoupons}
            filteredCoupons={this.props.filteredCoupons}
            usersCoupons={this.props.usersCoupons}
          />
        ) : (
          <div>....loading</div>
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
