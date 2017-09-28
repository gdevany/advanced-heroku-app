import React from 'react';
import {geolocated} from 'react-geolocated';
// const { geo2zip } = require('geo2zip');
// var gps = require('gps2zip');
const zips = require('zips');


class ZipcodeSetter extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     myZip: 0
  //   }
  // }


  // const zipView = "";
  // if (this.props.isGeolocationAvailable &&
  //   this.props.isGeolocationEnabled &&
  //   this.props.coords) {
  //     const myLocation = (zips.getByLocation(
  //       this.props.coords.latitude,
  //       this.props.coords.longitude));
  //     const myZip = myLocation.zip;
  //     zipView = myZip;
  //   }

  // setTheZip = (lat, lon) => {
    // const here = {
    //   latitude: lat,
    //   longitude: lon
    // }
    debugger;
    //
    // const x = zips.getByLocation(lat,lon);
    // console.log(x.zip);
    // this.setState({myZip:x.zip});
    // this.props.setZip(x.zip);

    // geo2zip(here)
    //   .then(zip => {
    //     this.props.setZip(zip);
    //   })
  // }

  render() {
    var zipView = "";
    if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
        var myLocation = (zips.getByLocation(
          this.props.coords.latitude,
          this.props.coords.longitude));
        var myZip = myLocation.zip;
        zipView = myZip;
      }
  return !this.props.isGeolocationAvailable
    ? <div>Your browser does not support Geolocation</div>
    : !this.props.isGeolocationEnabled
      ? <div>Geolocation is not enabled</div>
      : this.props.coords
        ? <div className="margin30Bottom">
            <div>
            {zipView}
            Your current zipcode
            </div>
            <span className="zipBox">
              {this.props.zip}
            </span>
          </div>
        : <div>Getting the location data&hellip; </div>;
  }
}
//{this.setTheZip(this.props.coords.latitude,this.props.coords.longitude)}
export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ZipcodeSetter);
