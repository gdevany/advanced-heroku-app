"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _AuthenticationController = require("../controllers/AuthenticationController");

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

require("../services/passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var signinStrategy = _passport2.default.authenticate("signinStrategy", { session: false });

router.post("/api/signup", _AuthenticationController.signUp);
router.post("/api/signin", signinStrategy, _AuthenticationController.signIn);

exports.default = router;