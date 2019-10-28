import React, { Component } from "react";
import GoogleMap from "./GoogleMap";

const BizDistance = ({ distance, lat, lng }) => (
  <div className="greyTextMarker">{distance}</div>
);

class BusinessLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    center: { lat: 30.26, lng: -97.74 },
    zoom: 10
  };

  convertAddressToLatLng = address => {
    let geocoder = new window.google.maps.Geocoder();

    let answer = geocoder.geocode(
      { address: "701 Brazos Austin" },
      (results, status) => {
        if (status === "OK") {
          let lat = results[0].geometry.location.lat();
          let lng = results[0].geometry.location.lng();
          console.log(lat, lng);
          return { lat, lng };
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
    console.log(answer);
  };

  render() {
    const { address } = this.props;
    return (
      <GoogleMap
        defaultCenter={address.center}
        defaultZoom={12}
        center={{ lat: address.lat, lng: address.lng }}
        styles={"mapSize200"}
      >
        <BizDistance distance={'0.3 miles'} lat={address.lat} lng={address.lng} />
      </GoogleMap>
    );
  }
}

export default BusinessLocationMapped;