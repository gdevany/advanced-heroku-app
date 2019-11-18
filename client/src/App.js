import React from "react";
import "./App.css";
import AppSign from "./containers/AppSignContainer";
import Subjects from "./containers/SubjectsContainer";
import ShowCoupons from "./containers/ShowCouponsContainer";
import ZipcodeSetter from "./containers/GeolocatedContainer";
import Header from "./containers/HeaderContainer";
// import Disclaimer from "./components/Disclaimer";

function App() {
  return (
    <div className="App">
      <AppSign />
      <Header />
      <ZipcodeSetter />
      <Subjects />
      <ShowCoupons />
      {/* <Disclaimer /> */}
    </div>
  );
}

export default App;
