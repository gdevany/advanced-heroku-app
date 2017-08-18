import React from 'react';


function Subjects(props) {
  console.log(props);

  const subDivs = props.category.map( (c) => {
    return <button key={c.subject} className="catButton">{c.subject}</button>
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
