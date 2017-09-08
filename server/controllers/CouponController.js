import CouponModel from "../models/CouponModel";


export function list(req, res) {
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

export function create(req, res, next) {
  console.log('in create (coupon)');
  console.log(`req bizName: ${req.body.bizName}`);
  console.log(`req username: ${req.body.username}`)
  const coupon = new CouponModel({
    bizName: req.body.bizName,
    username: req.body.username,
    userId: req.user._id
  });
  console.log('saving coupon');
  coupon
    .save()
    .then(c => {
      console.log('coupon saved');
      res.json(c);
    })
    .catch(err => next(err));
}
