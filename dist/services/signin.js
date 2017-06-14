"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require("bcrypt-nodejs");

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _UserModel = require("../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

var _passportLocal = require("passport-local");

var _passportLocal2 = _interopRequireDefault(_passportLocal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _passportLocal2.default(function (username, password, done) {
  console.log("Looking for a user with the username", username);
  _UserModel2.default.findOne({ username: username }).exec().then(function (user) {
    // If there is no user found call done with a `null` argument, signifying no error
    // and `false` signifying that the signin failed
    if (!user) {
      console.log("No user found with this username", username);
      return done(null, false);
    }

    _bcryptNodejs2.default.compare(password, user.password, function (err, isMatch) {
      // If there is an error call done with our error
      if (err) {
        return done(err, false);
      }

      // If the passwords do not match call done with a `null` argument, signifying no error
      // and `false` signifying that the signin failed
      if (!isMatch) {
        return done(null, false);
      }
      console.log("The username was found and the passwords matched", username);
      // If we have no errors and the passwords match
      // call done with a `null` argument, signifying no error
      // and with the now signed in user
      return done(null, user);
    });
  }).catch(function (err) {
    return done(err, false);
  });
});