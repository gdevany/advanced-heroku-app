import React from 'react';


function Subtopics(props) {
  console.log(props);
  const subDivs = props.category.types.map( (t) => {
    return <button key={t} className="catButton">{t}</button>
  });

  return (
    <div className="container">
      <div className="row">
          {subDivs}
      </div>
    </div>
  )
}

export default Subtopics;
