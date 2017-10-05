import React from 'react';
import {geolocated} from 'react-geolocated';
// import GoogleMap from './GoogleMap';
const zips = require('zips');


class ZipcodeSetter extends React.Component {
  constructor() {
    super();
    this.state = {
      myZip: 0,
      loading: false
    }
  }

  // load geolocation before DOM renders
  componentWillMount() {
    this.setState({ loading: true });
    this.loadData()
    .then((myZip) => {
      this.setState({
        myZip: myZip,
        loading: false
      });
    });
  }

  // action of loading geolocation
  loadData = () => {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
            var myLocation = (zips.getByLocation(
              this.props.coords.latitude,
              this.props.coords.longitude));
            var myZip = myLocation.zip;
            this.props.setZip(myZip);
            // this.props.loadGoogleAddress(this.props.coords.latitude,this.props.coords.longitude);
            resolve(myZip);
            // <GoogleMap />
            // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=30.255926,-97.929054&location_type=ROOFTOP&result_type=street_address&key=AIzaSyDKe93_qxr2uLLUgZclCAjHO2AG2cQdAcs`)
            // fetch(`https://maps.googleapis.com/maps/api/js?key=AIzaSyDKe93_qxr2uLLUgZclCAjHO2AG2cQdAcs`)
fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDKe93_qxr2uLLUgZclCAjHO2AG2cQdAcs')
            .then(response => {
              response.setHeader("Access-Control-Allow-Origin", "*");
              response.setHeader("Access-Control-Allow-Credentials", "true");
              response.setHeader('Access-Control-Expose-Headers', 'Authorization');
              response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
              response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
              console.log(response.json());
              return response.json();
            });
          }
      }, 5000);
    });
    return promise;
  }

  render() {

  return !this.props.isGeolocationAvailable
    ? <div>Your browser does not support Geolocation</div>
    : !this.props.isGeolocationEnabled
      ? <div>Geolocation is not enabled</div>
      : this.props.coords
        ? <div className="margin30Bottom borderIt">
            <div>
            Your current zipcode
            </div>
            <span className="zipBox">
              {this.props.zip}
            </span>
          </div>
        : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ZipcodeSetter);
