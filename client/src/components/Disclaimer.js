import React from 'react';


function Disclaimer(){

  return (
    <div className="disclaimer smallText">
    *This project was built on
    <a href="https://github.com/AustinCodingAcademy/advanced-heroku-app"
    target="_blank">github.com/AustinCodingAcademy/advanced-heroku-app </a>
    as a capstone project for Austin Coding Academy's advanced course by Greg Devany.
    *The final product will filter coupons based on the customer's zip code, but
    for production and testing purposes, it currently only filters on the subject
    and subtopic chosen by the customer. *The repository for BOGObyZip can be found at
    <a href="https://github.com/gdevany/advanced-heroku-app"
    target="_blank"> github.com/gdevany/advanced-heroku-app</a> *
    </div>
  )
}

export default Disclaimer;
