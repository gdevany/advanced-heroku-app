import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import convertAddressToLatLng from "./ConvertAddressToLatLng";

const UserLocation = ({ myZip }) => (
  <div className="greyTextMarker">{myZip}</div>
);

const BizMarkers = ({ logo }) => (
  <div className="mapLogoMarkerContainer">
    <img className="imageInContainer" src={logo} alt="bizLogo"></img>
  </div>
);

class CurrentLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bizLocations: [],
      filteredCoupons: [],
      usersCoupons: []
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.props.filteredCoupons !== prevProps.filteredCoupons) {
      let newMarkers = await this.setMarkers();
      console.log(newMarkers);
      this.setState({
        filteredCoupons: [
          this.props.filteredCoupons,
          ...this.state.filteredCoupons
        ],
        usersCoupons: [],
        bizLocations: [newMarkers, ...this.state.bizLocations]
      });
    }
    if (this.props.usersCoupons !== prevProps.usersCoupons) {
      this.setState({
        usersCoupons: [...this.state.usersCoupons, this.props.usersCoupons]
      });
    }
  }

  setMarkers = () => {
    console.log(this.state.filteredCoupons);
    let addressList = Promise.all(
      (this.props.filteredCoupons || []).map(async coupon => {
        let fullAddress = coupon.streetAndNum + coupon.city + coupon.zip;
        let searchArray = await this.convertAdd(fullAddress, coupon.bizLogo);
        console.log(searchArray);
        return searchArray;
      })
    );
    return addressList;
  };

  convertAdd = async (fullAddress, bizLogo) => {
    console.log(fullAddress);
    let pos = {};
    await convertAddressToLatLng(fullAddress).then(async res => {
      pos.lat = await res.lat();
      pos.lng = await res.lng();
    });
    let newLocation = { pos, bizLogo };
    return newLocation;
  };

  render() {
    console.log(this.state.bizLocations);

    const { pos, myZip } = this.props;

    return (
      <div className="buttonBox">
        <GoogleMap
          center={{ lat: pos.lat, lng: pos.lng }}
          size={"mapSizeWideShort"}
        >
          {this.state.bizLocations.length > 0 &&
            this.state.bizLocations[0].map((address, i) => {
              return (
                <BizMarkers
                  logo={address.bizLogo}
                  lat={address.pos.lat}
                  lng={address.pos.lng}
                  key={i}
                />
              );
            })}
          <UserLocation myZip={myZip} lat={pos.lat} lng={pos.lng} />
        </GoogleMap>
      </div>
    );
  }
}

export default CurrentLocationMapped;
