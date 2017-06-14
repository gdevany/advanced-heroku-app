import mongoose, { Schema } from "mongoose";

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },

  items: [{
    text: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    }
  }]
});

export default mongoose.model("List", listSchema);
