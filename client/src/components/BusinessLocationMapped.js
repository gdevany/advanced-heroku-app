import React, { Component } from "react";
import GoogleMap from "./GoogleMap";

const UserLocation = ({ myZip, lat, lng }) => (
  <div className="greyTextMarker">{myZip}</div>
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

  render() {
    const { pos } = this.props;
    return (
      <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        center={{ lat: pos.lat, lng: pos.lng }}
        styles={"mapGenSize"}
      >
        <UserLocation myZip={myZip} lat={pos.lat} lng={pos.lng} />
      </GoogleMap>
    );
  }
}

export default BusinessLocationMapped;