import React from 'react';


function Subtopics(props) {
  console.log(props);
  console.log(props.subjectChosen);
  console.log(props.searchCoupons);

  var subDivs = "";
// if subject has been chosen, show the subtopics (subtopic when it's selected)
  if (props.subjectChosen !== "") {
    if (props.searchCoupons !== "") {
      subDivs = <div className="chosenCat">{props.searchCoupons}</div>;
    } else {
    subDivs = props.subjectChosen.types.map( (t) => {
        return <button
        key={t}
        className="catButton"
        onClick={ (e) => {e.preventDefault(); props.set(t)}}
        >{t}</button>
      });
    }
  } else {
    subDivs = <div></div>
  }

    return (
      <div className="container">
        <div className="row">
            {subDivs}
        </div>
      </div>
    )
  }

export default Subtopics;
