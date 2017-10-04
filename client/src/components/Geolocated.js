import React from 'react';
import {geolocated} from 'react-geolocated';
// const zips = require('zips');
const { geo2zip } = require('geo2zip')

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
            var myLocation = geo2zip({
              latitude: this.props.coords.latitude,
              longitude: this.props.coords.longitude
            }).then(zip => {
              this.props.setZip(zip);
            })
            var myZip = myLocation;
            resolve(myZip);
            // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=30.255926,-97.929054&location_type=ROOFTOP&result_type=street_address&key=AIzaSyDJCfbffpjDLex3dBPv7coAs4SZkrMOFYs`)
            // .then(response => {
            //   console.log(response.json())
            // });
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



// import React from 'react';
// import {geolocated} from 'react-geolocated';
// const zips = require('zips');
//
//
// class ZipcodeSetter extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       myZip: 0,
//       loading: false
//     }
//   }
//
//   // load geolocation before DOM renders
//   componentWillMount() {
//     this.setState({ loading: true });
//     this.loadData()
//     .then((myZip) => {
//       this.setState({
//         myZip: myZip,
//         loading: false
//       });
//     });
//   }
//
//   // action of loading geolocation
//   loadData = () => {
//     var promise = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
//             var myLocation = (zips.getByLocation(
//               this.props.coords.latitude,
//               this.props.coords.longitude));
//             var myZip = myLocation.zip;
//             this.props.setZip(myZip);
//             resolve(myZip);
//             // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=30.255926,-97.929054&location_type=ROOFTOP&result_type=street_address&key=AIzaSyDJCfbffpjDLex3dBPv7coAs4SZkrMOFYs`)
//             // .then(response => {
//             //   console.log(response.json())
//             // });
//           }
//       }, 5000);
//     });
//     return promise;
//   }
//
//   render() {
//
//   return !this.props.isGeolocationAvailable
//     ? <div>Your browser does not support Geolocation</div>
//     : !this.props.isGeolocationEnabled
//       ? <div>Geolocation is not enabled</div>
//       : this.props.coords
//         ? <div className="margin30Bottom">
//             <div>
//             Your current zipcode
//             </div>
//             <span className="zipBox">
//               {this.props.zip}
//             </span>
//           </div>
//         : <div>Getting the location data&hellip; </div>;
//   }
// }
//
// export default geolocated({
//   positionOptions: {
//     enableHighAccuracy: false,
//   },
//   userDecisionTimeout: 5000,
// })(ZipcodeSetter);
