import React from "react";
import "./App.css";
import AppSign from "./containers/AppSignContainer";
import Subjects from "./containers/SubjectsContainer";
import ShowCoupons from "./containers/ShowCouponsContainer";
import Geolocated from "./containers/GeolocatedContainer";
import Header from "./containers/HeaderContainer";
// import Disclaimer from "./components/Disclaimer";

function App() {
  return (
    <div className="app">
      <div className="headingContainer">
        <Header />
        <AppSign />
      </div>
      <div className="contentContainer">
        <Geolocated />
        <Subjects />
        <ShowCoupons />
        {/* <Disclaimer /> */}
      </div>
    </div>
  );
}

export default App;
