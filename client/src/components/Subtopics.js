import React from "react";

function Subtopics(props) {
  var header = "";
  //header- if subject NOT chosen, show nothing
  // header- if subjectChosen, but subtopic NOT chosen, show 'Choose a subtopic'

  var subDivs = "";
  var backButton = "";

  // if subject IS NOT chosen, show blank
  if (props.subjectChosen === "" || props.loggedIn !== "") {
    if (props.subjectChosen === "" && props.loggedIn === "") {
      header = <div></div>;
    } else {
      header = <div>Your Coupons:</div>;
      subDivs = <div></div>;
    }
  } else {
    // if subject IS chosen, but subtopic IS NOT chosen, show subtopics
    // and set SUBTOPIC chosen (searchCoupons) to onClicked subtopic
    if (props.searchCoupons === "") {
      header = <div className="blink">Choose a subtopic</div>;
      subDivs = props.subjectChosen.types.map((t, i) => {
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
      // and set backButton to change SUBJECT Chosen to blank
      backButton = (
        <div>
          <span className="arrowContainer pull-left">
            <i
              className="arrow backArrow"
              onClick={e => {
                e.preventDefault();
                props.setSubjectChosen("");
              }}
            />
            back
          </span>
        </div>
      );
    } else {
      // if subject IS chosen, and subtopic IS chosen (searchCoupons), show coupons
      subDivs = <div></div>;
      // subDivs =
      //   <button className="chosenCat buttonGen text-center">{props.searchCoupons}</button>
      // and set backButton to change SUBTOPIC chosen (searchCoupons) to blank
      backButton = (
        <div>
          <div className="arrowContainer pull-left">
            <i
              className="arrow backArrow"
              onClick={e => {
                e.preventDefault();
                props.setSearchCoupons("");
              }}
            />
            back
          </div>
        </div>
      );
    }
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
