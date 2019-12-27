import React from "react";
import { Animated } from "react-animated-css";

function Subtopics(props) {
  const { subjectChosen, loggedIn, searchCoupons } = props;
  let header = "";
  let subDivs = "";
  let backButton = "";

  const getMappedSubtopics = () => {
    return subjectChosen.types.map((t, i) => {
      return (
        <div key={i}>
          <button
            className="catButton buttonGen"
            onClick={e => {
              e.preventDefault();
              props.setSearchCoupons(t);
              props.loadFilteredCoupons(t);
            }}
          >
            <span>{t}</span>
          </button>
        </div>
      );
    });
  };

  const getBBResetSubjectChosen = () => {
    return (
      <div>
        <span
          className="arrowContainer"
          onClick={e => {
            e.preventDefault();
            props.setSubjectChosen("");
          }}
        >
          <i className="arrow backArrow" />
          back
        </span>
      </div>
    );
  };

  const getBBResetSearchCoupons = () => {
    return (
      <div>
        <div
          className="arrowContainer"
          onClick={e => {
            e.preventDefault();
            props.setSearchCoupons("");
          }}
        >
          <i className="arrow backArrow" /> back
        </div>
      </div>
    );
  };

  if (loggedIn || !subjectChosen || (subjectChosen && searchCoupons)) {
    if (loggedIn) {
      header = <div>Your Active Offers</div>;
    } else {
      header = <div></div>;
    }
    subDivs = <div></div>;
    if (subjectChosen && searchCoupons) {
      backButton = getBBResetSearchCoupons();
    } else {
      backButton = <div></div>;
    }
  }

  if (subjectChosen && !searchCoupons) {
    header = (
      <Animated
        animationInDelay="3000"
        animationIn="flash"
        animationOut="fadeOut"
        isVisible={true}
        animationInDuration={1000}
        animationOutDuration={1000}
      >
        <div className="">Choose a subtopic</div>
      </Animated>
    );
    subDivs = getMappedSubtopics();
    backButton = getBBResetSubjectChosen();
  }

  return (
    <div className="container text-center">
      {!searchCoupons && <div className="margin30top">{header}</div>}
      <div className="">{subDivs}</div>
      <div className="">{backButton}</div>
    </div>
  );
}

export default Subtopics;
