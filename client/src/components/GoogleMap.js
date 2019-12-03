import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import { Animated } from "react-animated-css";

const defaultProps = {
  center: { lat: 30.26, lng: -97.74 },
  zoom: 10
};

const GoogleMap = ({ children, ...props }) => (
  <Animated
    animationIn="fadeIn"
    animationOut="fadeOutDown"
    isVisible={true}
    animationInDuration={1000}
    animationOutDuration={1000}
  >
    <div className={props.size ? props.size : "mapGen mapSizeWideShort"}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDU0RdP86Lah-317lEyXzfVrHPisuCgJow"
        }}
        defaultCenter={
          props.defaultCenter ? props.defaultCenter : defaultProps.center
        }
        defaultZoom={props.zoom ? props.zoom : defaultProps.zoom}
        {...props}
      >
        {children}
      </GoogleMapReact>
    </div>
  </Animated>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

GoogleMap.defaultProps = {
  children: null
};

export default GoogleMap;
