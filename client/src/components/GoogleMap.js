import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

const defaultProps = {
  center : { lat: 30.26, lng: -97.74 },
  zoom: 10
}

const GoogleMap = ({ children, ...props }) => (
  <div className={props.size ? props.size : "mapSize200"}>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: "AIzaSyDU0RdP86Lah-317lEyXzfVrHPisuCgJow"
      }}
      defaultCenter={props.defaultCenter ? props.defaultCenter : defaultProps.center}
      defaultZoom={props.zoom ? props.zoom : defaultProps.zoom}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </div>
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
