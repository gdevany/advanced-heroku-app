import CouponModel from "../models/CouponModel";


export function list(req, res, next) {
  CouponModel.find({}).exec()
  .then(coupons => {
    return res.json(coupons)
  })
}

export function show(req, res) {
  CouponModel.find({username: req.params.username}).exec()
  .then(coupons => {
    return res.json(coupons)
  })
}
