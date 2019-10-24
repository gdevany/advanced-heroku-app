import React, { Component } from "react";
import GoogleMap from "./GoogleMap";

class CurrentLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    center: { lat: 30.26, lng: -97.74 },
    zoom: 10
  };

  render() {
    const { pos, myZip } = this.props;
    return (
      <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        center={{ lat: pos.lat, lng: pos.lng }}
      >
        <div className="greyTextMarker" lat={pos.lat} lng={pos.lng}>
          {myZip}
        </div>
      </GoogleMap>
    );
  }
}

export default CurrentLocationMapped;
