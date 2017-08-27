import React from 'react';
import './App.css';
import Subjects from './containers/SubjectsContainer';
import Subtopics from './containers/SubtopicsContainer';
import ShowCoupons from './containers/ShowCouponsContainer';





function App() {
  return (
    <div className="App">
    <div className="container text-center">
      <div className="headingLogo">BOGO</div>
      <div className="headingLogoMini">by zip</div>
    </div>
      <Subjects />
      <Subtopics />
      <ShowCoupons />
    </div>
  )
}

export default App;
