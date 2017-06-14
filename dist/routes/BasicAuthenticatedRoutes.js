"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function authChecker(req, res, next) {
  if (true) {
    next();
  } else {
    res.send("not valid");
  }
}

router.get("/dashboard", authChecker, function (req, res) {
  return res.json({ secretInformation: "only authorized users should see" });
});

exports.default = router;