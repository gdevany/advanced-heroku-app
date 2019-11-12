import React from "react";
import "./App.css";
import AppSign from "./containers/AppSignContainer";
import Subjects from "./containers/SubjectsContainer";
import ShowCoupons from "./containers/ShowCouponsContainer";
import ZipcodeSetter from "./containers/GeolocatedContainer";
// import Disclaimer from "./components/Disclaimer";

function App() {
  return (
    <div className="App">
      <AppSign />
      {/* <span className="">Buy One</span>
      <span className=""> Get One</span> */}
      <div className="container text-center">
        <div className="headingLogo">BOGO</div>
        <div className="headingLogoMini">by zip</div>
      </div>
      <ZipcodeSetter />
      <Subjects />
      <ShowCoupons />
      {/* <Disclaimer /> */}
    </div>
  );
}

export default App;
