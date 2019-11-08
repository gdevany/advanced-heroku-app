import React from "react";
import ShowCoupon from "./ShowCoupon";

class ShowCoupons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCoupons: [],
      usersCoupons: [],
      couponsExpanded: []
    };
  }

  componentDidMount = () => {
    this.setState({ couponsExpanded: [] });
  };

  componentDidUpdate(prevProps) {
    if (this.props.filteredCoupons !== prevProps.filteredCoupons) {
      this.setState({
        filteredCoupons: [
          ...this.state.filteredCoupons,
          this.props.filteredCoupons
        ],
        couponsExpanded: []
      });
    }
    if (this.props.usersCoupons !== prevProps.usersCoupons) {
      this.setState({
        usersCoupons: [...this.state.usersCoupons, this.props.usersCoupons]
      });
    }
  }

  cantDelete = () => {
    alert(
      "You can't delete this coupon because it's permanent. Try creating your own coupon, then delete it."
    );
  };

  //if loggedIn, show delete button. if NOT logged in, show nothing
  deleteButton = coupon => {
    if (this.props.loggedIn === "") {
      return <div></div>;
    } else {
      return (
        <button
          className="bizLogo buttonDelete"
          onClick={e => {
            e.preventDefault();
            // props.deleteCoupon(coupon._id);

            if (!coupon.notDeletable) {
              this.props.deleteCoupon(coupon);
              this.props.loadUsersCoupons(this.props.loggedIn);
            } else {
              this.cantDelete();
            }
          }}
        >
          DELETE COUPON
        </button>
      );
    }
  };

  expandThisCoupon = couponID => {
    let list = this.state.couponsExpanded;
    let index = list.indexOf(couponID);
    if (index === -1) {
      list.push(couponID);
    } else {
      list.splice(index, 1);
    }
    this.setState({ couponsExpanded: [...this.state.couponsExpanded], list });
  };

  displayCoupons = () => {
    //if loggedIn, filter on username and show
    //if NOT logged in, filter coupons against subtopic chosen (searchCoupons)
    let filterCoupons =
      this.props.loggedIn === "" && this.props.searchCoupons !== ""
        ? this.props.filteredCoupons
        : this.props.usersCoupons;

    if (filterCoupons.length > 0) {
      let couponDiv = filterCoupons.map(coupon => {
        return (
          <ShowCoupon
            coupon={coupon}
            key={coupon._id}
            deleteButton={this.deleteButton}
            loggedIn={this.props.loggedIn}
            userPosition={this.props.userPosition}
            expandThisCoupon={this.expandThisCoupon}
            couponsExpanded={this.state.couponsExpanded}
          />
        );
      });

      return couponDiv;
    }
  };

  render() {
    return (
      <div className="container-fluid couponMargin">
        {this.props.searchCoupons !== "" || this.props.loggedIn !== "" ? (
          <div>{this.displayCoupons()}</div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default ShowCoupons;
