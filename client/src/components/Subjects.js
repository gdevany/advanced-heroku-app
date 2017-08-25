import React from 'react';
import bogoLogo from '../../img/bogoLogo.png';


function Subjects(props) {
  console.log(props);

  console.log(props.subjectChosen);

  var subDivs = "";

  // show the subjects and set subjectChosen when onClicked
  if (props.subjectChosen === "") {
    subDivs = props.category.map( (c) => {
      return <button
        key={c.subject}
        className="catButton"
        onClick={ (e) => {e.preventDefault(); props.set(c)}}
        >{c.subject}</button>
    })
  } else {
    // show just subjectChosen when chosen
    subDivs = <div className="chosenCat">{props.subjectChosen.subject}</div>
  }

  return (
    <div className="container">
      <div className="rowCenter">
        <img className="logo" src={bogoLogo} />
      </div>
      <div className="rowCenter">
        {subDivs}
      </div>
    </div>
  )
}

export default Subjects;
