import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  bizName: {
    type: String,
    required: true
  },
  bizQR: {
    type: String,
    required: true
  },
  bizLogo: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  couponDesc: {
    type: String,
    required: true
  },
  restrictions: {
    type: String,
    required: true
  },
  searchWords: {
    type: String,
    required: true
  },
  bizAddress: [{
    streetAndNum:{
      type: String,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    zip:{
      type: String,
      required: true
    },
  }],
  bizPhone: {
    type: String,
    required: true
  },


});


export default mongoose.model("Coupon", couponSchema);
