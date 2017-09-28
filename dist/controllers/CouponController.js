'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.list = list;
exports.show = show;
exports.create = create;
exports.remove = remove;

var _CouponModel = require('../models/CouponModel');

var _CouponModel2 = _interopRequireDefault(_CouponModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function list(req, res) {
  console.log('in list');
  _CouponModel2.default.find({ userId: req.user._id }).exec().then(function (coupons) {
    return res.json(coupons);
  }).catch(function (err) {
    return next(err);
  });
}

function show(req, res) {
  console.log('in show (/api/coupons/:username)');
  if (req.params.username.includes("@")) {
    console.log('username: ' + req.params.username);
    _CouponModel2.default.find({ username: req.params.username }).exec().then(function (coupons) {
      return res.json(coupons);
    });
  } else {
    console.log('username: ' + req.params.username);
    _CouponModel2.default.find({ searchWords: req.params.username }).exec().then(function (coupons) {
      return res.json(coupons);
    });
  }

  // CouponModel.find({filterItOn}).exec()
  // .then(coupons => {
  //   return res.json(coupons)
  // })
}

function create(req, res, next) {
  var coupon = new _CouponModel2.default((0, _extends3.default)({}, req.body));
  console.log('saving coupon');
  coupon.save().then(function (c) {
    console.log('coupon saved');
    res.json(c);
  }).catch(function (err) {
    return next(err);
  });
}

function remove(req, res) {
  _CouponModel2.default.findByIdAndRemove(req.params.id).then(function (res) {
    return res.json();
  });
}