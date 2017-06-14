"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _ListsItemsController = require("../controllers/ListsItemsController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/api/lists/:list_id/items", _ListsItemsController.create);

router.put("/api/lists/:list_id/items/:item_id", _ListsItemsController.update);

exports.default = router;