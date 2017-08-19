import React from 'react';


function Subtopics(props) {
  console.log(props);
  var subDivs = "";
  console.log(props.subjectChosen);
  console.log(props.category);

if (props.subjectChosen !== "") {
  subDivs = props.category.types.map( (t) => {
      return <button key={t} className="catButton">{t}</button>
    });
  } else subDivs = <div></div>;


  return (
    <div className="container">
      <div className="row">
          {subDivs}
      </div>
    </div>
  )
}

export default Subtopics;
