"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _CouponController = require("../controllers/CouponController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/api/coupons", _CouponController.list);
router.get("/api/coupons/:username", _CouponController.show);
router.post("/api/coupons", _CouponController.create);
router.delete("/api/coupons/:id", _CouponController.remove);

exports.default = router;