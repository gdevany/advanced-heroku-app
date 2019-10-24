import React from "react";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ children, ...props }) => (
  <div className="genMap">
    <GoogleMapReact
      bootstrapURLKeys={{
        key: "AIzaSyDU0RdP86Lah-317lEyXzfVrHPisuCgJow"
      }}
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
