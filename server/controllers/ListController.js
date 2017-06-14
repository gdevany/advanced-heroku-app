import ListModel from "../models/ListModel";

export function create(req, res, next) {
  const list = new ListModel({ ...req.body, userId: req.user._id });
  list
    .save()
    .then(l => res.json(l))
    .catch(err => next(err));
}

export function update(req, res, next) {
  ListModel.findOne({ _id: req.params.id, userId: req.user._id })
    .exec()
    .then(list => {
      if (!list) {
        return next("No List Found");
      }

      list.title = req.params.title;
      return list.save();
    })
    .then(list => {
      return req.json(list);
    })
    .catch(err => next(err));
}
