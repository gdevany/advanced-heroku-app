"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UserModel = require("../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

var _passportJwt = require("passport-jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup options for JwtStrategy
var jwtOptions = {
  // Get the secret from our environment
  secretOrKey: process.env.SECRET,
  // Tell our strategy where to find our token in the request
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader("authorization")
};

// Create JWT strategy
// This will take our token and decode it to
// extract the information we have stored in it
exports.default = new _passportJwt.Strategy(jwtOptions, function (payload, done) {
  _UserModel2.default.findById(payload.userId, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});