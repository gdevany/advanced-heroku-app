import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: false
  },
  id: {
    type: Number,
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
  image: {
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
    type: [{}],
    required: false
  },
  searchWords: {
    type: String,
    required: false
  },
  streetAndNum: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  zip: {
    type: String,
    required: false
  },
  bizPhone: {
    type: String,
    required: false
  },


});


export default mongoose.model("Coupon", couponSchema);
