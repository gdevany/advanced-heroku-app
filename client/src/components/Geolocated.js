import React from "react";
import { geolocated } from "react-geolocated";
import GoogleMap from "./GoogleMap";

//NOTE:  the commented out parts are from the transformation from using npm
// node_modules zip and react-geolocated to Google Maps API
// These commented out parts should be deleted once sufficient testing completed

class ZipcodeSetter extends React.Component {
  constructor() {
    super();
    this.state = {
      myZip: 0,
      loading: false,
      pos: {
        lat: 30.26,
        lng: -97.74
      }
    };
  }

  // load geolocation
  componentDidMount() {
    this.setState({ loading: true });
    this.loadGeolocation().then(myZip => {
      this.setState({
        loading: false
      });
    });
    this.props.setZip(this.state.myZip);
  }

  // action of loading geolocation
  loadGeolocation = () => {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log(pos.lat);
            console.log(pos.lng);
            this.setState({
              pos
            });
            let geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({ location: pos }, (results, status) => {
              let zipzip = "";
              results[0].address_components.map(adcom => {
                if (adcom.types.indexOf("postal_code") > -1) {
                  zipzip = Number(adcom.short_name);
                  return true;
                } else return false;
              });

              console.log(zipzip);
              this.setState({ myZip: zipzip });
              this.props.setZip(zipzip);
            });
          });
        }
      }, 5000);
    });
    return promise;
  };

  static defaultProps = {
    center: { lat: 30.26, lng: -97.74 },
    zoom: 15
  };

  render() {
    console.log(this.state.pos);
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <div className="margin30Bottom">
        <div>
          <small>Offers will be filtered on your current zipcode</small>
        </div>
        <GoogleMap
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={{ lat: this.state.pos.lat, lng: this.state.pos.lng }}
        >
          <div
            className="mapMedium"
            lat={this.state.pos.lat}
            lng={this.state.pos.lng}
          >
            {this.state.myZip}
          </div>
        </GoogleMap>
        {/* <span className="zipBox">
              {this.props.zip}
            </span> */}
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(ZipcodeSetter);
