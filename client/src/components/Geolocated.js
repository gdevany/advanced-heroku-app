import React from 'react';
import {geolocated} from 'react-geolocated';
import {geo2zip} from 'geo2zip';

class Demo extends React.Component {

    // showZip = (lat, lon) => {
    //   const { geo2zip } = require('geo2zip')
    //
    //   const here = {
    //     latitude: lat,
    //     longitude: lon
    //   }
    //
    //   const showIt = geo2zip(here).then(zip => {
    //     console.log(zip);
    //     return zip;
    //   });
    //
    //
    //   return showIt;
    //
    // }

    showZip = (lat, lon) => {
      const { geo2zip } = require('geo2zip')

      const here = {
        latitude: lat,
        longitude: lon
      }

      const showIt = geo2zip(here)
        .then(zip => {
          console.log(zip);
          const zipIt = JSON.stringify(zip);
          console.log(`stringified zip: ${zipIt}`);
          return zipIt;
        })
      console.log(`zipped: ${showIt}`);

      return showIt;
    }
    render() {

// console.log(this.props.coords);
// console.log(this.props.coords.longitude);

    // return !this.props.isGeolocationAvailable
    //   ? <div>Your browser does not support Geolocation</div>
    //   : !this.props.isGeolocationEnabled
    //     ? <div>Geolocation is not enabled</div>
    //     : this.props.coords
    //       ? <table>
    //         <tbody>
    //           <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
    //           <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
    //           {this.showZip(this.props.coords.latitude,this.props.coords.longitude)};
    //         </tbody>
    //       </table>
    //       : <div>Getting the location data&hellip; </div>;

    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <div>
              <div>
                <div>latitude{this.props.coords.latitude}</div>
                <div>longitude{this.props.coords.longitude}</div>
                <div>{this.showZip(this.props.coords.latitude,this.props.coords.longitude)}</div>
              </div>
            </div>
          : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo);
