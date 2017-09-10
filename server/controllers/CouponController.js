import CouponModel from "../models/CouponModel";


export function list(req, res) {
  console.log('in list');
  CouponModel.find({userId:req.user._id}).exec()
  .then(coupons => {
    return res.json(coupons)
  })
  .catch(err => next(err));
}

export function show(req, res) {
  console.log('in show (/api/coupons/:username)');
  CouponModel.find({username:req.params.username}).exec()
  .then(coupons => {
    return res.json(coupons)
  })
}

export function create(req, res, next) {
  const coupon = new CouponModel({...req.body});
  console.log('saving coupon');
  coupon
    .save()
    .then(c => {
      console.log('coupon saved');
      res.json(c);
    })
    .catch(err => next(err));
}

export function remove(req, res) {
  CouponModel.findByIdAndRemove(req.params.id)
  .then(res => {
    return res.json();
  })
}
