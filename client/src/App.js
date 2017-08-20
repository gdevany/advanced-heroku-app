import React from 'react';
import './App.css';
import Subjects from './containers/SubjectsContainer';
import Subtopics from './containers/SubtopicsContainer';
import ShowCoupons from './containers/ShowCouponsContainer';





function App() {
  return (
    <div className="App">
      <Subjects />
      <Subtopics />
      <ShowCoupons />
    </div>
  )
}

export default App;
