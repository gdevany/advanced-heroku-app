import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import convertAddressToLatLng from "./ConvertAddressToLatLng";

const BizDistance = ({ distance, logo }) => (
  <div>
    <div className="blink2 mapLogoMarkerContainer userLocMCTransform">
      <img className="imageInContainer" src={logo} alt="bizLogo"></img>
    </div>
    <div className="userLocMarkerContainer userLocMCTransform">
      <div className="userLocMarker">{distance} mi</div>
    </div>
  </div>
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
    try {
      let location = await convertAddressToLatLng(address);
      this.setState({ bizLat: location.lat(), bizLng: location.lng() });
    } catch (err) {
      console.warn(err);
    }
  };

  getMapBounds = (map, maps, bizLat, bizLng) => {
    const bounds = new maps.LatLngBounds();
    bounds.extend(new maps.LatLng(bizLat, bizLng));
    bounds.extend(
      new maps.LatLng(this.props.userPosition.lat, this.props.userPosition.lng)
    );
    return bounds;
  };

  // Re-center map when resizing the window
  bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, "idle", () => {
      maps.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  // Set bounds and display polyline directions from user to biz
  handleApiLoaded = (map, maps, bizLat, bizLng) => {
    if (map) {
      // Add bizLocation and myLocation to bounds list
      const bounds = this.getMapBounds(map, maps, bizLat, bizLng);

      // Fit map to bounds
      map.fitBounds(bounds);

      // Bind the resize listener
      this.bindResizeListener(map, maps, bounds);

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
    // Retrieve the start and end locations and create a DirectionsRequest
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
        // Route the polylines to the map
        if (status === "OK") {
          directionsRenderer.setDirections(response);
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
    const { coupon } = this.props;
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
                this.handleApiLoaded(map, maps, bizLat, bizLng)
              }
            >
              <BizDistance
                distance={distanceUserToBiz}
                logo={coupon.bizLogo}
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
