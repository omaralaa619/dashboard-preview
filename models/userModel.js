import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Date,
  },
  image: {
    type: String,
  },
  admin: {
    type: Boolean,
  },

  // cart: {
  //   type: String,
  // },

  orders: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],
    default: [],
    required: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
