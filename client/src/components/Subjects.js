import React from "react";
import Subtopics from "../containers/SubtopicsContainer";
import CreateCoupons from "../containers/CreateCouponsContainer";

class Subjects extends React.Component {
  constructor() {
    super();
    this.state = {
      showCreateCoupon: false
    };
  }

  loadCreateCoupon = () => {
    this.setState(prevState => ({
      showCreateCoupon: !prevState.showCreateCoupon
    }));
  };

  render() {
    var header = "";
    //header- if loggedIn, show Welcome
    //header- if NOT loggedIn, and NOT subjectChosen, show 'Choose Subject'
    //header- if NOT loggedIn, and subjectChosen, show nothing

    var subDivs = "";
    // IF User is NOT loggedIn, show the subjects
    // show the subjects and set subjectChosen when onClicked
    if (this.props.subjectChosen === "" && this.props.loggedIn === "") {
      header = <div className="blink">Choose a subject</div>;
      subDivs = this.props.category.map((c, i) => {
        return (
          <div key={i}>
            <button
              className="catButton buttonGen"
              onClick={e => {
                e.preventDefault();
                this.props.set(c);
              }}
            >
              <strong>{c.subject}</strong>
            </button>
          </div>
        );
      });
    } else if (this.props.subjectChosen !== "" && this.props.loggedIn === "") {
      // show just subjectChosen when chosen
      header = <div></div>;
      subDivs = (
        <button className="chosenCat buttonGen">
          {this.props.subjectChosen.subject}
        </button>
      );
    } else {
      //If user loggedIn, show welcome and options
      header = <div></div>;
      subDivs = (
        <div>
          <button
            className="buttonGen margin30Bottom blink"
            onClick={e => {
              e.preventDefault();
              this.loadCreateCoupon();
            }}
          >
            Create New Coupon
          </button>
        </div>
      );
    }

    return (
      <div className="container text-center">
        <div>{header}</div>
        <div
          className={
            this.props.subjectChosen === "" ? "buttonBox2 blink" : "buttonBox"
          }
        >
          <div className="">{subDivs}</div>
          <Subtopics />
        </div>
        <div>
          <CreateCoupons
            toggleShow={this.loadCreateCoupon}
            showCreateCoupon={this.state.showCreateCoupon}
          />
        </div>
      </div>
    );
  }
}

export default Subjects;
