import React from 'react';
import {geolocated} from 'react-geolocated';
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
            resolve(myZip);
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
        ? <div className="margin30Bottom">
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
