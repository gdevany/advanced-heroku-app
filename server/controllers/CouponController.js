import CouponModel from "../models/CouponModel";


export function list(req, res, next) {
  CouponModel.find({}).exec()
  .then(coupons => {
    return res.json(coupons)
  })
}

export function show(req, res) {
  CouponModel.find({username: req.params.coupons.username}).exec()
  .then(coupons => {
    return res.json(coupons)
  })
}

export function create(req, res) {
  const coupon = new CouponModel({ ...req.body});
  console.log('saving coupon');
  coupon
    .save()
    .then(c => {
      console.log('coupon saved');
      res.json(c))
  })
}
