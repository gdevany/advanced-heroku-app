import React from 'react';


function Subjects(props) {
  console.log(props);

  console.log(props.subjectChosen);

  if (props.subjectChosen === "") {
    return <div className="catButton">{props.subjectChosen}</div>
  }
    const subDivs = props.category.map( (c) => {
      return <button
        key={c.subject}
        className="catButton"
        onClick={ (e) => {e.preventDefault(); props.set(c.subject)}}
        >{c.subject}</button>
    })


  return (
    <div className="container">
      <div className="row">
          {subDivs}
      </div>
    </div>
  )
}

export default Subjects;
