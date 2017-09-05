import React from 'react';
import CreateCoupons from './CreateCoupons';


class Subjects extends React.Component {
  constructor() {
    super();
    this.state = {
      showCreateCoupon: false,
    }
  };

  loadCreateCoupon = () => {
    this.setState(prevState => ({
      showCreateCoupon: !prevState.showCreateCoupon
    }));
  }

  render() {
    var subDivs = "";
    console.log(this.props);

    // IF User is NOT loggedIn, show the subjects
    // show the subjects and set subjectChosen when onClicked
    if (this.props.subjectChosen === "" && this.props.loggedIn === "") {
      subDivs = this.props.category.map( (c) => {
        return <button
          key={c.subject}
          className="catButton buttonGen"
          onClick={ (e) => {e.preventDefault(); this.props.set(c)}}
          ><strong>{c.subject}</strong></button>
      })
    } else if (this.props.subjectChosen !== "" && this.props.loggedIn === "") {
      // show just subjectChosen when chosen
      subDivs = <button className="chosenCat buttonGen">{this.props.subjectChosen.subject}</button>
    } else {
      //If user loggedIn, show welcome and options
      subDivs = <div>
        <strong>Hi {this.props.loggedIn}</strong><br />
        <button className="chosenCat buttonGen"
          onClick={ (e) => {e.preventDefault(); this.loadCreateCoupon()} }
          >View My Coupons
        </button>
        <button className="chosenCat buttonGen"
          onClick={ (e) => {e.preventDefault(); this.loadCreateCoupon()} }
          >Create New Coupon
        </button>
      </div>
    }

    return (
      <div className="container text-center">
        <div className="">{subDivs}</div>
        <div><CreateCoupons
              toggleShow={this.loadCreateCoupon}
              showCreateCoupon={this.state.showCreateCoupon}/></div>
      </div>
    )
  }
}

export default Subjects;
