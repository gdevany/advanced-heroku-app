import React from 'react';


function Subtopics(props) {

  var header = "";
  //header- if subject NOT chosen, show nothing
  // header- if subjectChosen, but subtopic NOT chosen, show 'Choose a subtopic'

  var subDivs = "";
  var backer = "";

// if subject IS NOT chosen, show blank
  if (props.subjectChosen === "" || props.loggedIn !== "") {
    if (props.subjectChosen === "" && props.loggedIn === ""){
      header = <div></div>
    } else {
      header = <div>Your Coupons:</div>;
      subDivs = <div></div>
    }
  } else {
    // if subject IS chosen, but subtopic IS NOT chosen, show subtopics
    // and set SUBTOPIC chosen (searchCoupons) to onClicked subtopic
    if (props.searchCoupons === "") {
      header = <div>Choose a subtopic</div>;
      subDivs = props.subjectChosen.types.map( (t,i) => {
        return (
          <div key={i}>
            <button
              className="catButton buttonGen"
              onClick={ (e) => {
                e.preventDefault();
                props.setSearchCoupons(t);
                // console.log('here');
                // props.loadFilteredCoupons(t);
              } }>
              <strong>{t}</strong>
            </button>
          </div>
        )
      });
      // and set backButton to change SUBJECT Chosen to blank
      backer = (
        <button
          className="backButton"
          onClick={ (e) => {e.preventDefault(); props.setSubjectChosen("")}}
        >back</button>
      );

    } else {

      // if subject IS chosen, and subtopic IS chosen (searchCoupons), show coupons
      subDivs =
        <button className="chosenCat buttonGen text-center">{props.searchCoupons}</button>
      // and set backButton to change SUBTOPIC chosen (searchCoupons) to blank
      backer = (
        <button
          className="backButton"
          onClick={ (e) => {e.preventDefault(); props.setSearchCoupons("")}}
        >back</button>
      );
    }
  }

  return (
    <div className="container text-center">
      <div className="">
        {header}
      </div>
      <div className="">
        {subDivs}
      </div>
      <div className="text-center">
        {backer}
      </div>
    </div>
  )
  }

export default Subtopics;
