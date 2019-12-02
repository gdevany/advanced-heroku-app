import React from "react";

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
            <strong>{t}</strong>
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
          <i className="arrow backArrow" />
          {" "}back
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
    header = <div className="blink">Choose a subtopic</div>;
    subDivs = getMappedSubtopics();
    backButton = getBBResetSubjectChosen();
  }

  return (
    <div className="container text-center">
      <div className="">{header}</div>
      <div className="">{subDivs}</div>
      <div className="containerShort">{backButton}</div>
    </div>
  );
}

export default Subtopics;
