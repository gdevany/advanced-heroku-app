import React, { Component } from "react";
import GoogleMap from "./GoogleMap";
import convertAddressToLatLng from "./ConvertAddressToLatLng";

const UserLocation = ({ myZip }) => (
  <div className="greyTextMarker">{myZip}</div>
);

const BizMarkers = ({ text }) => <div className="greyTextMarker">{text}</div>;

class CurrentLocationMapped extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bizLocations: [],
      filteredCoupons: [],
      usersCoupons: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.filteredCoupons !== prevProps.filteredCoupons) {
      this.setState({
        filteredCoupons: [
          this.props.filteredCoupons,
          ...this.state.filteredCoupons
        ],
        usersCoupons: []
      });
      console.log(this.state.filteredCoupons)
      this.setMarkers();
    }
    if (this.props.usersCoupons !== prevProps.usersCoupons) {
      this.setState({
        usersCoupons: [...this.state.usersCoupons, this.props.usersCoupons]
      });
    }
  }

  // mapIt = () => {
  //    //if loggedIn, filter on username and show
  //   //if NOT logged in, filter coupons against subtopic chosen (searchCoupons)
  //   let filterCoupons =
  //     this.props.loggedIn === "" && this.props.searchCoupons !== ""
  //       ? this.props.filteredCoupons
  //       : this.props.usersCoupons;
  //       console.log(filterCoupons, this.props.loggedIn, this.props.searchCoupons)

  //       if (filterCoupons.length > 0) {
  //         filterCoupons.map(coupon => {
  //           console.log(coupon)
  //         })
  //         // }
  //       }
  // }

  setMarkers = () => {
    console.log(this.state.filteredCoupons)
    let addressList = (this.props.filteredCoupons || []).map(coupon => {
      let fullAddress = coupon.streetAndNum + coupon.city + coupon.zip;
      this.convertAdd(fullAddress);
    });
console.log(addressList)
    // return addressList.map( (address,i) => {
    //   console.log(address)
    //   return (
    //     <BizMarkers text={'bizAddress'} lat={address.lat} lng={address.lng} key={i}/>
    //   )
    // })
  };

  convertAdd = async fullAddress => {
    console.log(fullAddress);
    let pos = {};
    let location = await convertAddressToLatLng(fullAddress);
    pos.lat = location.lat();
    pos.lng = location.lng();
    console.log(pos);
    this.setState({
      bizLocations: [pos, ...this.state.bizLocations]
    });
  };

  render() {
    console.log(this.state.filteredCoupons)
    console.log(this.state.bizLocations)
    // this.mapIt()

    const { pos, myZip } = this.props;
    // const { filteredCoupons, usersCoupons } = this.state;

    return (
      <div className="buttonBox">
        <GoogleMap
          center={{ lat: pos.lat, lng: pos.lng }}
          size={"mapSizeWideShort"}
        >
          {this.state.bizLocations.map((address, i) => {
            return (
              <BizMarkers
                text={"bizAddress"}
                lat={address.lat}
                lng={address.lng}
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
