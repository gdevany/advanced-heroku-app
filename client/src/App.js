import React from 'react';
import './App.css';
import AppSign from './containers/AppSignContainer';
import Subjects from './containers/SubjectsContainer';
import Subtopics from './containers/SubtopicsContainer';
import ShowCoupons from './containers/ShowCouponsContainer';
import ZipcodeSetter from './containers/GeolocatedContainer';
import Disclaimer from './components/Disclaimer';

// compoonentWillMount() {
//   loadSubjects();
//   loadSubtopics();
//
// }

function App() {
  return (
    <div className="App">
      <AppSign />
      <span className="blink2">Buy One</span>
      <span className="blink3"> Get One</span>
      <div className="container text-center">
        <div className="headingLogo">BOGO</div>
        <div className="headingLogoMini">by zip</div>
      </div>
      <Subjects />
      <Subtopics />
      <ShowCoupons />
      <ZipcodeSetter />
      <Disclaimer />
    </div>
  )
}

export default App;
