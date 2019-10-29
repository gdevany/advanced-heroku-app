import React from "react";
import { geolocated } from "react-geolocated";
import GoogleMap from "./GoogleMap";
import CurrentLocationMapped from "./CurrentLocationMapped";

class ZipcodeSetter extends React.Component {
  constructor() {
    super();
    this.state = {
      myZip: 0,
      loading: true,
      pos: {
        lat: 0,
        lng: 0
      }
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
            this.setState({
              pos
            });

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
      let myZip = "";
      results[0].address_components.map(adcom => {
        if (adcom.types.indexOf("postal_code") > -1) {
          myZip = Number(adcom.short_name);
          return true;
        } else return false;
      });

      console.log(myZip);
      this.setState({ myZip });
      this.props.setZip(myZip);
    });
  };

  render() {
    const { pos, myZip } = this.state;

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
        {pos.lat !== 0 && pos.lng !== 0 && myZip !== 0 ? (
          <CurrentLocationMapped pos={pos} myZip={myZip} />
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
