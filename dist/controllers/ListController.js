"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.create = create;
exports.update = update;

var _ListModel = require("../models/ListModel");

var _ListModel2 = _interopRequireDefault(_ListModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(req, res, next) {
  var list = new _ListModel2.default((0, _extends3.default)({}, req.body, { userId: req.user._id }));
  list.save().then(function (l) {
    return res.json(l);
  }).catch(function (err) {
    return next(err);
  });
}

function update(req, res, next) {
  _ListModel2.default.findOne({ _id: req.params.id, userId: req.user._id }).exec().then(function (list) {
    if (!list) {
      return next("No List Found");
    }

    list.title = req.params.title;
    return list.save();
  }).then(function (list) {
    return req.json(list);
  }).catch(function (err) {
    return next(err);
  });
}