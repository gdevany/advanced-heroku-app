import React, { Component } from "react";
import GoogleMap from "./GoogleMap";

const BizDistance = ({ distance, lat, lng }) => (
  <div className="greyTextMarker">{distance}</div>
);

class BusinessLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    };
  }

  static defaultProps = {
    center: { lat: 30.26, lng: -97.74 },
    zoom: 10
  };

  componentDidMount() {
    this.getLatLng(this.props.address);
  }

  getLatLng = async address => {
    console.log(address);
    try {
      let location = await this.getAddress(address);
      this.setState({ lat: location.lat(), lng: location.lng() });
    } catch (err) {
      console.warn(err);
    }
  };

  getAddress = address => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          resolve(results[0].geometry.location);
        } else {
          reject(status);
        }
      });
    });
  };

  render() {
    console.log(this.state.lat, this.state.lng);
    const { address } = this.props;
    const { lat, lng } = this.state;
    return (
      <div>
        <GoogleMap size={"mapSizeNone"}></GoogleMap>
        {lat !== 0 && lng !== 0 ? (
          <div className="buttonBox">
          <GoogleMap
            defaultCenter={address.center}
            defaultZoom={15}
            center={{ lat: lat, lng: lng }}
            size={"mapSizeWideShort"}
          >
            <BizDistance distance={"0.3 miles"} lat={lat} lng={lng} />
          </GoogleMap>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default BusinessLocationMapped;
