import React from 'react';

class Disclaimer extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  toggleShow = () => {
   this.setState(prevState => ({
     show: !prevState.show
   }));
   console.log(this.state.show)
  }

  render () {
    var discDiv = "";
    if (!this.state.show) {
      discDiv = <div></div>;
    } else {
      discDiv = (
        <div className="disclaimer text-left">
        *Location services are needed to filter coupons on your current
        location.  After initial acceptance of the user allowing location
        services, please hit 'RELOAD'.
        <br /><br />

        *The final product will filter coupons based on the customer's zip
        code, but for production and testing purposes, it currently only
        filters on the subject and subtopic chosen by the customer.
        <br /><br />

        *There are limited coupons stored in the DataBase.  For best example
        of multiple coupons filtered, click 'Eat Now', then 'Fast Food'.
        <br /><br />

        *To see an example of a Business' Coupons, try:<br />
        USERNAME: a@yahoo.com  PASSWORD: a
        <br /><br />

        *Coupons are only populated by a business logging in and creating a
        new coupon.
        <br /><br />

        *This project was built on {" "}
        <a href="https://github.com/AustinCodingAcademy/advanced-heroku-app"
          target="_blank">AustinCodingAcademy/advanced-heroku-app
        </a>{" "}as a capstone project for Austin Coding Academy's advanced
        course by Greg Devany.<br /><br />

        *The repository for BogoByZip can be found at
        <a href="https://github.com/gdevany/advanced-heroku-app"
        target="_blank"> github.com/gdevany/advanced-heroku-app</a>
        </div>
      );
    };

    return (
      <div>
        <div>{discDiv}</div>
        <div
        className="margin30Bottom"
        onClick={( e => {e.preventDefault(); this.toggleShow()} )}>
        {this.state.show ? `Hide Read Me` : `Read Me`}</div>
      </div>
    )
  }
}
// function Disclaimer(){
//
//   return (
//     <div className="disclaimer smallText">
//     *To see an example of a Business' Coupons, try:<br />
//     (username: a@yahoo.com)  (pw: a)<br /><br />
//     *This project was built on {" "}
//     <a href="https://github.com/AustinCodingAcademy/advanced-heroku-app"
//     target="_blank">github.com/AustinCodingAcademy/advanced-heroku-app </a>
//     as a capstone project for Austin Coding Academy's advanced course by Greg Devany.
//     *The final product will filter coupons based on the customer's zip code, but
//     for production and testing purposes, it currently only filters on the subject
//     and subtopic chosen by the customer. *The repository for BOGObyZip can be found at
//     <a href="https://github.com/gdevany/advanced-heroku-app"
//     target="_blank"> github.com/gdevany/advanced-heroku-app</a> *
//     </div>
//   )
// }

export default Disclaimer;
