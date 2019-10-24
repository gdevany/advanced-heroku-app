import React, { Component } from "react";
import GoogleMap from "./GoogleMap";

const text = "you";

class GetTheZip extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    center: { lat: 30.26, lng: -97.74 },
    zoom: 15
  };

  render() {
    return (
      <GoogleMap
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <div className="mapMedium" lat={30.26} lng={-97.74}>
          {text}
        </div>
      </GoogleMap>
    );
  }
}

export default GetTheZip;
