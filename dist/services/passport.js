"use strict";

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _signin = require("./signin");

var _signin2 = _interopRequireDefault(_signin);

var _authentication = require("./authentication");

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_passport2.default.use("signinStrategy", _signin2.default);
_passport2.default.use("authStrategy", _authentication2.default);