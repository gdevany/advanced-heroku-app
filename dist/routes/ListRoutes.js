"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ListController = require("../controllers/ListController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/api/lists", _ListController.create);
router.put("/api/lists/:id", _ListController.update);

exports.default = router;