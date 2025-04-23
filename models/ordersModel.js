import mongoose, { Schema, models, model } from "mongoose";

const ordersSchema = new Schema({
  address: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
    },
    instagram: {
      type: String,
    },
    zone: {
      type: String,
    },
    city: {
      type: String,
    },
    streetName: {
      type: String,
    },
    building: {
      type: String,
    },
    floor: {
      type: String,
    },
    apartment: {
      type: String,
    },
  },
  cart: {
    items: {
      type: String,
    },
    totalAmount: {
      type: Number,
    },
    totalQuantity: {
      type: Number,
    },
    shipping: {
      type: Number,
    },
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },

  date: { type: Date, default: Date.now },

  discount: {
    _id: {
      type: String,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
});
ordersSchema.pre("save", function (next) {
  this._id = this._id.toString();
  next();
});

const Order = models.Order || model("Order", ordersSchema);

export default Order;
