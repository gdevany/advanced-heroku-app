"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  },

  items: [{
    text: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    }
  }]
});

exports.default = _mongoose2.default.model("List", listSchema);