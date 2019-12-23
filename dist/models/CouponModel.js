"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var couponSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: false
  },
  id: {
    type: Number,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  bizName: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  bizLogo: {
    type: String,
    required: false
  },
  heading: {
    type: String,
    required: false
  },
  couponDesc: {
    type: String,
    required: false
  },
  restrictions: {
    type: [{}],
    required: false
  },
  searchWords: {
    type: String,
    required: false
  },
  streetAndNum: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  zip: {
    type: String,
    required: false
  },
  bizPhone: {
    type: String,
    required: false
  }

});

exports.default = _mongoose2.default.model("Coupon", couponSchema);