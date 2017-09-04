import React from 'react';


function Subjects(props) {
  var subDivs = "";
  console.log(props);

  // show the subjects and set subjectChosen when onClicked
  if (props.subjectChosen === "" && props.loggedIn === "") {
    subDivs = props.category.map( (c) => {
      return <button
        key={c.subject}
        className="catButton buttonGen"
        onClick={ (e) => {e.preventDefault(); props.set(c)}}
        ><strong>{c.subject}</strong></button>
    })
  } else if (props.loggedIn === "") {
    // show just subjectChosen when chosen
    subDivs = <button className="chosenCat buttonGen">{props.subjectChosen.subject}</button>
  } else {
    subDivs = <button className="chosenCat buttonGen">Hi {props.loggedIn}</button>
  }

  return (
    <div className="container text-center">
      <div>{props.loggedIn}</div>
      <div className="">{subDivs}</div>
    </div>
  )
}

export default Subjects;
