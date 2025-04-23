import { Schema, models, model } from "mongoose";

const discountSchema = new Schema({
  discountType: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  valueType: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  requirmentType: {
    type: String,
    required: true,
  },

  minimumAmount: Number,
  minimumQuantity: Number,
  isLimit: {
    type: Boolean,
    required: true,
  },
  limitNumber: {
    type: Number,
  },
  startDateTime: {
    type: Date,
  },
  endDateTime: {
    type: Date,
  },
  used: {
    type: Number,
    default: 0,
  },
});

const Discount = models.Discount || model("Discount", discountSchema);

export default Discount;
