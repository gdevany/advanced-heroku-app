import React from 'react';


function Subtopics(props) {
  console.log(props);
  console.log(props.subjectChosen);
  console.log(props.searchCoupons);

  var subDivs = "";
  var backer = "";

// if subject IS NOT chosen, show blank
  if (props.subjectChosen === "") {
    subDivs = <div></div>
  } else {

    // if subject IS chosen, but subtopic IS NOT chosen, show subtopics
    // and set SUBTOPIC chosen (searchCoupons) to onClicked subtopic
    if (props.searchCoupons === "") {
      subDivs = props.subjectChosen.types.map( (t) => {
        return (
          <button
            key={t}
            className="catButton"
            onClick={ (e) => {e.preventDefault(); props.setSearchCoupons(t)}}
          >{t}</button>
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
      subDivs = <div className="catButton">{props.searchCoupons}</div>;
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
    <div className="container">
      <div className="rowCenter">
          {subDivs}
      </div>
      <div className="rowCenter">
        {backer}
      </div>
    </div>
  )
  }

export default Subtopics;
