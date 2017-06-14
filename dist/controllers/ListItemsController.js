"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.update = update;

var _ListModel = require("../models/ListModel");

var _ListModel2 = _interopRequireDefault(_ListModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(req, res, next) {
  // Find the list by its id, and ensure that the current user owns the list
  _ListModel2.default.findOne({ _id: req.params.list_id, userId: req.user._id }).then(function (list) {
    // Create a new object that represents an item
    var item = {
      text: req.body.text,
      completed: false
    };

    // Add the item to the lists items array
    list.itesm.push(item);

    // Save the list
    return list.save();
  }).then(function (list) {
    // Grab the newly created item, the last item in the array
    var newItem = list.items[list.items.length - 1];

    // Return that item
    return res.json(newItem);
  }).catch(function (err) {
    return next(err);
  });
}

function update(req, res, next) {
  var itemId = req.params.item_id;

  // Find the list by its id, and ensure that the current user owns the list
  _ListModel2.default.findOne({ _id: req.params.list_id, userId: req.user._id }).exec().then(function (list) {
    // Find the item by its _id
    var item = list.items.id(itemId);

    // Update the item if new attributes are sent, or use the current attributes
    item.text = req.body.text || item.text;
    item.completed = req.body.completed || item.completed;

    return list.save();
  }).then(function (list) {
    // Return the updated item
    return req.json(list.items.id(itemId));
  }).catch(function (err) {
    return next(err);
  });
}