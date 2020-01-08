import React from "react";
import "./App.css";
import Subjects from "./containers/SubjectsContainer";
import ShowCoupons from "./containers/ShowCouponsContainer";
import Geolocated from "./containers/GeolocatedContainer";
import Header from "./containers/HeaderContainer";

function App() {
  return (
    <div className="app">
      <Header />
      <Geolocated />
      <div className="contentContainer containerShort">
        <Subjects />
        <ShowCoupons />
      </div>
    </div>
  );
}

export default App;
