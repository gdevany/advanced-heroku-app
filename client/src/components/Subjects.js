import React from "react";
import Subtopics from "../containers/SubtopicsContainer";
import CreateCoupons from "../containers/CreateCouponsContainer";
import { Animated } from "react-animated-css";

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
      <Animated
        animationInDelay="3000"
        animationIn="flash"
        animationOut="fadeOut"
        isVisible={true}
        animationInDuration={1000}
        animationOutDuration={1000}
      >
        <button
          className="buttonGen margin30bottom tightLines"
          onClick={e => {
            e.preventDefault();
            this.toggleCreateCoupon();
          }}
        >
          Create New Coupon
        </button>
      </Animated>
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
    const { showCreateCoupon } = this.state;

    return userPosition.zip !== 0 ? (
      <div className="borderRightTheme text-center">
        <div className="divideLine"></div>
        {!subjectChosen && !loggedIn && (
          <Animated
            animationInDelay="3000"
            animationIn="flash"
            animationOut="fadeOut"
            isVisible={true}
            animationInDuration={1000}
            animationOutDuration={1000}
          >
            <div className="margin30top">Choose a subject</div>
          </Animated>
        )}
        {loggedIn ? (
          showCreateCoupon ? (
            <div className="margin30top">
              <CreateCoupons
                toggleShow={this.toggleCreateCoupon}
                showCreateCoupon={showCreateCoupon}
              />
            </div>
          ) : (
            <div className="margin30top">{this.toggleCreateCouponButton()}</div>
          )
        ) : (
          <div>
            {!subjectChosen && (
              <div className="">{this.mapSubjects(category)}</div>
            )}
            <Subtopics />
          </div>
        )}
      </div>
    ) : (
      <div></div>
    );
  }
}

export default Subjects;
