// import React, { Component } from "react";

const ConvertAddressToLatLng = address => {
  console.log(address)
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

export default ConvertAddressToLatLng;
