import CouponModel from "../models/CouponModel";


export function list(req, res, next) {
  console.log('here');
  CouponModel.find({userId:req.user._id}).exec()
  .then(coupons => {
    return res.json(coupons)
  })
  .catch(err => next(err));
}

export function show(req, res, next) {
  console.log('in show');
  CouponModel.find({username: req.params.coupons.username, userId:req.user._id}).exec()
  .then(coupons => {
    return res.json(coupons)
  })
}

export function create(req, res, next) {
  const coupon = new CouponModel({...req.body, userId:req.user._id});
  console.log('saving coupon');
  coupon
    .save()
    .then(c => {
      console.log('coupon saved');
      res.json(c);
    })
    .catch(err => next(err));
}
