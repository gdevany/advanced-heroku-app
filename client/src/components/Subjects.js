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
    const { subjectChosen, loggedIn, category, userPosition } = this.props;
    var header = "";
    //header- if loggedIn, show Welcome
    //header- if NOT loggedIn, and NOT subjectChosen, show 'Choose Subject'
    //header- if NOT loggedIn, and subjectChosen, show nothing

    var subDivs = "";
    // IF User is NOT loggedIn, show the subjects
    // show the subjects and set subjectChosen when onClicked

    if (userPosition.zip !== 0) {
      if (loggedIn === "") {
        if (subjectChosen === "") {
          header = <div className="blink">Choose a subject</div>;
          subDivs = category.map((c, i) => {
            return (
              <div key={i}>
                <button
                  className="catButton buttonGen"
                  onClick={e => {
                    e.preventDefault();
                    this.props.setSubjectChosen(c);
                  }}
                >
                  <strong>{c.subject}</strong>
                </button>
              </div>
            );
          });
        } else {
          // show just subjectChosen when chosen
          header = <div></div>;
          subDivs = (
            <button className="chosenCat buttonGen">
              {subjectChosen.subject}
            </button>
          );
        }
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
    }

    return (
      <div className="container text-center">
        <div>{header}</div>
        <div className={this.props.subjectChosen === "" ? "" : ""}>
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
