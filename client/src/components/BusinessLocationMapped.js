import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import convertAddressToLatLng from "./ConvertAddressToLatLng";

const BizDistance = ({ distance }) => (
  <div className="greyTextMarker">{distance} mi</div>
);

class BusinessLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bizLat: 0,
      bizLng: 0,
      distanceUserToBiz: 0
    };
  }

  static defaultProps = {
    center: { lat: 30.26, lng: -97.74 },
    zoom: 10
  };

  componentDidMount() {
    this.getBizLatLng(this.props.address);
  }

  getBizLatLng = async address => {
    console.log(address);
    try {
      let location = await convertAddressToLatLng(address);
      this.setState({ bizLat: location.lat(), bizLng: location.lng() });
    } catch (err) {
      console.warn(err);
    }
  };

  handleApiLoaded = (map, maps) => {
    if (map) {
      // Instantiate a directions service.
      var directionsService = new maps.DirectionsService();

      // Create a renderer for directions and bind it to the map.
      var directionsRenderer = new maps.DirectionsRenderer();

      // Display the route between the initial start and end selections.
      this.calculateAndDisplayRoute(
        directionsRenderer,
        directionsService,
        map,
        maps
      );
    }
  };

  calculateAndDisplayRoute = (
    directionsRenderer,
    directionsService,
    map,
    maps
  ) => {
    // Retrieve the start and end locations and create a DirectionsRequest using
    // DRIVING directions.
    directionsService.route(
      {
        origin: {
          lat: this.props.userPosition.lat,
          lng: this.props.userPosition.lng
        },
        destination: { lat: this.state.bizLat, lng: this.state.bizLng },
        travelMode: "DRIVING"
      },
      (response, status) => {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          // let distance = response.routes[0].legs[0].distance.text
          console.log(response.routes[0].legs[0].distance);
          this.setDistanceUserToBiz(response.routes[0].legs[0].distance.value);
          directionsRenderer.setDirections(response);
          const routePolyline = new maps.Polyline({
            path: response.routes[0].overview_path
          });
          routePolyline.setMap(map);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };

  setDistanceUserToBiz = metersTotal => {
    // Convert meters to miles
    let miles = Math.round((metersTotal / 1609.34 + 0.00001) * 10) / 10;
    this.setState({
      distanceUserToBiz: miles
    });
  };

  render() {
    const { bizLat, bizLng, distanceUserToBiz } = this.state;
    return (
      <div>
        {bizLat !== 0 && bizLng !== 0 ? (
          <div className="buttonBox">
            <GoogleMap
              defaultCenter={this.props.center}
              defaultZoom={11}
              center={{ lat: bizLat, lng: bizLng }}
              size={"mapSizeWideShort"}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                this.handleApiLoaded(map, maps)
              }
            >
              <BizDistance
                distance={distanceUserToBiz}
                lat={bizLat}
                lng={bizLng}
              />
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
