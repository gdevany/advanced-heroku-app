"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _AuthenticationRoutes = require("./routes/AuthenticationRoutes");

var _AuthenticationRoutes2 = _interopRequireDefault(_AuthenticationRoutes);

var _ListRoutes = require("./routes/ListRoutes");

var _ListRoutes2 = _interopRequireDefault(_ListRoutes);

var _ArticleRoutes = require("./routes/blog/ArticleRoutes");

var _ArticleRoutes2 = _interopRequireDefault(_ArticleRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dotenv allows us to declare environment variables in a .env file, \
// find out more here https://github.com/motdotla/dotenv
require("dotenv").config();


_mongoose2.default.set("debug", true);
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect("mongodb://jwoo:jwoo@ds151451.mlab.com:51451/aca-test");

var app = (0, _express2.default)();
app.use(_express2.default.static("public"));

app.get("/", function (req, res, next) {
  res.sendFile("public/index.html");
});
app.use(_bodyParser2.default.json());
app.use(_AuthenticationRoutes2.default);

var authStrategy = _passport2.default.authenticate("authStrategy", { session: false });
app.use(authStrategy);
app.use(_ListRoutes2.default);
app.use(_ArticleRoutes2.default);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

var port = process.env.PORT || 3001;
app.listen(port, function () {
  console.log("Listening on port:" + port);
});