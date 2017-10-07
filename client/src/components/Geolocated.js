import React from 'react';
import {geolocated} from 'react-geolocated';
// import GoogleMap from './GoogleMap';
// const zips = require('zips');


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
    this.props.setZip(this.state.myZip);
  }

  // action of loading geolocation
  loadData = () => {
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        var myZip = 0;
        // if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
            // var myLocation = (zips.getByLocation(
            //   this.props.coords.latitude,
            //   this.props.coords.longitude));
            // myZip = myLocation.zip;
            // this.props.setZip(myZip);
            // resolve(myZip);
        // }
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            var pos = {lat: position.coords.latitude,lng: position.coords.longitude};
            console.log(pos.lat);
            console.log(pos.lng);
            var geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({'location': pos}, (results, status) => {
              myZip = Number(results[0].address_components[7].short_name);
              this.setState({ myZip });
              this.props.setZip(myZip);
              console.log(myZip);
              console.log(results);
            });
          })
        };

      }, 5000);
    });
    return promise;
  };

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

// loadData = () => {
//   var promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
//           var myLocation = (zips.getByLocation(
//             this.props.coords.latitude,
//             this.props.coords.longitude));
//           var myZip = myLocation.zip;
//           this.props.setZip(myZip);
//           resolve(myZip);
//
//           if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function(position) {
//               var pos = {lat: position.coords.latitude,lng: position.coords.longitude};
//               console.log(pos.lat);
//               console.log(pos.lng);
//               var geocoder = new window.google.maps.Geocoder();
//               geocoder.geocode({
//                 'location': pos
//               }, function(results, status) {
//                 console.log(results[0].address_components[7].short_name);
//               });
//             })
//           };
//         }
//     }, 5000);
//   });
//   return promise;
// };
