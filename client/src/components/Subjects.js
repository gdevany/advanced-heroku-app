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

  toggleCreateCoupon = () => {
    this.setState(prevState => ({
      showCreateCoupon: !prevState.showCreateCoupon
    }));
  };

  toggleCreateCouponButton = () => {
    return (
      !this.state.showCreateCoupon && (
        <div>
          <button
            className="buttonGen margin30bottom blink"
            onClick={e => {
              e.preventDefault();
              this.toggleCreateCoupon();
            }}
          >
            Create New Coupon
          </button>
        </div>
      )
    );
  };

  mapSubjects = category => {
    return category.map((c, i) => {
      return (
        <div key={i}>
          <button
            className="catButton buttonGen"
            onClick={e => {
              e.preventDefault();
              if (c.subject !== "Food") {
                alert("For development reasons, only Food has samples");
              } else this.props.setSubjectChosen(c);
            }}
          >
            <span>{c.subject}</span>
          </button>
        </div>
      );
    });
  };

  render() {
    const { subjectChosen, loggedIn, category, userPosition } = this.props;
    var header = <div></div>;
    var subDivs = <div></div>;

    if (userPosition.zip !== 0) {
      if (loggedIn) {
        header = <div></div>;
        subDivs = this.toggleCreateCouponButton();
      } else {
        if (!subjectChosen) {
          header = <div className="blink">Choose a subject</div>;
          subDivs = this.mapSubjects(category);
        }
      }
    }

    return (
      <div className="containerShort text-center">
        <div className="divideLine margin30top"></div>
        {!subjectChosen && <div className="margin30top">{header}</div>}
        {loggedIn && (
          <div>
            <CreateCoupons
              toggleShow={this.toggleCreateCoupon}
              showCreateCoupon={this.state.showCreateCoupon}
            />
          </div>
        )}
        {(!subjectChosen || loggedIn) && <div className="">{subDivs}</div>}
        <Subtopics />
      </div>
    );
  }
}

export default Subjects;
