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

  componentWillMount() {
    // this.setTheZip(myZip);
    this.setState({ loading: true });
    this.loadData()
    .then((myZip) => {
      this.setState({
        myZip: myZip,
        loading: false
      });
    });
  }

  loadData = () => {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
            var myLocation = (zips.getByLocation(
              this.props.coords.latitude,
              this.props.coords.longitude));
            var myZip = myLocation.zip;
            console.log(myZip);
            this.setTheZip(myZip);
            console.log(this.props.zip);
            resolve(myZip);
          }
      }, 5000);
    });
    return promise;
  }

  setTheZip = (myZip) => {
    console.log('here');
    this.props.setZip(myZip)
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
//
// // constructor() {
// //   super();
// //   this.state = {
// //     myZip: 0
// //   }
// // }
//
// // componentWillMount() {
// //   this.setTheZip(myZip);
// //
// // }
//
//
// // setTheZip = (lat, lon) => {
//   // const here = {
//   //   latitude: lat,
//   //   longitude: lon
//   // }
//
//   setTheZip = (myZip) => {
//     console.log('here');
//     this.props.setZip(myZip)
//   }
//   //
//   // const x = zips.getByLocation(lat,lon);
//   // console.log(x.zip);
//   // this.setState({myZip:x.zip});
//   // this.props.setZip(x.zip);
//
//   // geo2zip(here)
//   //   .then(zip => {
//   //     this.props.setZip(zip);
//   //   })
// // }
//
// render() {
//   var zipView = "";
//   if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
//       var myLocation = (zips.getByLocation(
//         this.props.coords.latitude,
//         this.props.coords.longitude));
//       var myZip = myLocation.zip;
//       console.log(myZip);
//       // debugger;
//       this.setTheZip(myZip);
//       // debugger;
//
//       console.log(this.props.zip);
//
//       zipView = myZip;
//     }
// return !this.props.isGeolocationAvailable
//   ? <div>Your browser does not support Geolocation</div>
//   : !this.props.isGeolocationEnabled
//     ? <div>Geolocation is not enabled</div>
//     : this.props.coords
//       ? <div className="margin30Bottom">
//           <div>
//           {zipView}
//           Your current zipcode
//           </div>
//           <span className="zipBox">
//             {this.props.zip}
//           </span>
//         </div>
//       : <div>Getting the location data&hellip; </div>;


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ZipcodeSetter);
