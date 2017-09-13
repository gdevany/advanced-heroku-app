import React from 'react';
import {geolocated} from 'react-geolocated';
const { geo2zip } = require('geo2zip')


class ZipcodeSetter extends React.Component {

  setTheZip = (lat, lon) => {
    const here = {
      latitude: lat,
      longitude: lon
    }

    geo2zip(here)
      .then(zip => {
        // const zipIt = JSON.stringify(zip);
        this.props.setZip(zip);
      })
  }

  render() {

  return !this.props.isGeolocationAvailable
    ? <div>Your browser does not support Geolocation</div>
    : !this.props.isGeolocationEnabled
      ? <div>Geolocation is not enabled</div>
      : this.props.coords
        ? <div className="margin30Bottom">
            <div>
            {this.setTheZip(this.props.coords.latitude,this.props.coords.longitude)}
            Your current zipcode
            </div>
            <span className="zipBox">
              {this.props.zip}
            </span>
          </div>
        : <div>Getting the location data&hellip; </div>;
  }
}
// <div><small>latitude{this.props.coords.latitude}</small></div>
// <div className="tightLines">
//   <small>longitude{this.props.coords.longitude}</small>
// </div>
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ZipcodeSetter);
