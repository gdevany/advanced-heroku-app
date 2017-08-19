import React from 'react';


function Subjects(props) {
  console.log(props);

  console.log(props.subjectChosen);
  var subDivs = "";
  if (props.subjectChosen === "") {
    subDivs = props.category.map( (c) => {
      return <button
        key={c.subject}
        className="catButton"
        onClick={ (e) => {e.preventDefault(); props.set(c)}}
        >{c.subject}</button>
    })
  } else subDivs = <div className="chosenCat">{props.subjectChosen.subject}</div>


  return (
    <div className="container">
      <div className="row">
          {subDivs}
      </div>
    </div>
  )
}

export default Subjects;
