import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  id: {
    type: String,
    required: false
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
    required: false
  },
  bizLogo: {
    type: String,
    required: false
  },
  heading: {
    type: String,
    required: false
  },
  couponDesc: {
    type: String,
    required: false
  },
  restrictions: {
    type: String,
    required: false
  },
  searchWords: {
    type: String,
    required: false
  },
  bizAddress: [{
    streetAndNum:{
      type: String,
      required: false
    },
    city:{
      type: String,
      required: false
    },
    zip:{
      type: String,
      required: false
    },
  }],
  bizPhone: {
    type: String,
    required: false
  },


});


export default mongoose.model("Coupon", couponSchema);
