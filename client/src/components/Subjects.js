import React from 'react';
import CreateCoupons from './CreateCoupons';


function Subjects(props) {
  var subDivs = "";
  console.log(props);

  // IF User is NOT loggedIn, show the subjects
  // show the subjects and set subjectChosen when onClicked
  if (props.subjectChosen === "" && props.loggedIn === "") {
    subDivs = props.category.map( (c) => {
      return <button
        key={c.subject}
        className="catButton buttonGen"
        onClick={ (e) => {e.preventDefault(); props.set(c)}}
        ><strong>{c.subject}</strong></button>
    })
  } else if (props.subjectChosen !== "" && props.loggedIn === "") {
    // show just subjectChosen when chosen
    subDivs = <button className="chosenCat buttonGen">{props.subjectChosen.subject}</button>
  } else {
    //If user loggedIn, show welcome and options
    subDivs = <div>
      <strong>Hi {props.loggedIn}</strong><br />
      <button className="chosenCat buttonGen"
        onClick={ (e) => {e.preventDefault(); } }
        >View My Coupons
      </button>
      <button className="chosenCat buttonGen"
        onClick={ (e) => {e.preventDefault(); {goToCreateCoupon}} }
        >Create New Coupon
      </button>
    </div>
  }

  const goToCreateCoupon = () => {
    return (<CreateCoupons />)
  }

  return (
    <div className="container text-center">
      <div className="">{subDivs}</div>
    </div>
  )
}

export default Subjects;
