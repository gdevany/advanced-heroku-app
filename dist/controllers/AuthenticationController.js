"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signIn = signIn;
exports.signUp = signUp;

var _UserModel = require("../models/UserModel");

var _UserModel2 = _interopRequireDefault(_UserModel);

var _bcryptNodejs = require("bcrypt-nodejs");

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _jwtSimple = require("jwt-simple");

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signIn(req, res) {

  console.log("logged in now");
  res.json({ token: tokenForUser(req.user) });
}
function signUp(req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  var u = username;
  // If no username or password was supplied return an error
  if (!username || !password) {
    return res.status(422).json({ error: "You must provide an username and password" });
  }
  console.log("Look for a user with the username");
  _UserModel2.default.findOne({ username: u }).exec().then(function (existingUser) {
    // If the user exist return an error on sign up
    if (existingUser) {
      console.log("This username is already being used");
      return res.status(422).json({ error: "Username is in use" });
    }
    console.log("This username is free to use");
    saveUser(username, password, res, next);
  }).catch(function (err) {
    return next(err);
  });
}
function saveUser(username, password, res, next) {
  // User bcrypt to has their password, remember, we never save plain text passwords!
  _bcryptNodejs2.default.genSalt(10, function (err, salt) {
    console.log("the salt", salt);
    _bcryptNodejs2.default.hash(password, salt, null, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      // Create a new user with the supplied username, and the hashed password
      var user = new _UserModel2.default({ username: username, password: hashedPassword });
      console.log("Saving the user");
      user.save().then(function (u) {
        console.log("User has been saved to database");
        res.json({ token: tokenForUser(u) });
      });
    });
  });
}
function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return _jwtSimple2.default.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}