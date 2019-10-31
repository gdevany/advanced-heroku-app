import React, { Component } from "react";
import GoogleMap from "./GoogleMap";

const UserLocation = ({ myZip, lat, lng }) => (
  <div className="greyTextMarker">{myZip}</div>
);

class CurrentLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pos, myZip } = this.props;
    return (
      <div className="buttonBox">
      <GoogleMap
        center={{ lat: pos.lat, lng: pos.lng }}
        size={"mapSizeWideShort"}
      >
        <UserLocation myZip={myZip} lat={pos.lat} lng={pos.lng} />
      </GoogleMap>
      </div>
    );
  }
}

export default CurrentLocationMapped;
