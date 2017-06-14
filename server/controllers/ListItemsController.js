import ListModel from "../models/ListModel";

export function create(req, res, next) {
  // Find the list by its id, and ensure that the current user owns the list
  ListModel.findOne({_id: req.params.list_id, userId: req.user._id} )
    .then(list => {
      // Create a new object that represents an item
      const item = {
        text: req.body.text,
        completed: false
      };

      // Add the item to the lists items array
      list.itesm.push(item);

      // Save the list
      return list.save();
    })
    .then(list => {
      // Grab the newly created item, the last item in the array
      const newItem = list.items[list.items.length - 1];

      // Return that item
      return res.json(newItem);
    })
    .catch(err => next(err));
}

export function update(req, res, next) {
  const itemId = req.params.item_id;

  // Find the list by its id, and ensure that the current user owns the list
  ListModel.findOne({ _id: req.params.list_id, userId: req.user._id })
    .exec()
    .then(list => {
      // Find the item by its _id
      const item = list.items.id(itemId);

      // Update the item if new attributes are sent, or use the current attributes
      item.text = req.body.text || item.text;
      item.completed = req.body.completed || item.completed;

      return list.save();
    })
    .then(list => {
      // Return the updated item
      return req.json(list.items.id(itemId));
    })
    .catch(err => next(err));
}

