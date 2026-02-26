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

  ////////////// XY discounts //////////////
  productsX: {
    products: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        compareAtPrice: { type: Number, required: false },
        costPerItem: { type: Number },
        imageUrls: [String],
        status: { type: String, default: "active" },
        category: [{ type: String, required: true }],
        featured: { type: Boolean, required: true },
        sold: { required: true, type: Number, default: 0 },
        sizes: [String],
        colors: [
          {
            name: { type: String },
            color: { type: String, default: "#000000" },
          },
        ],
        variants: [
          {
            size: { type: String },
            colorName: { type: String },
            colorHex: { type: String },
            stock: { type: Number },
          },
        ],
      },
    ],
    quantity: {
      type: Number,
      default: 1,
    },
  },

  productsY: {
    products: [
      {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        compareAtPrice: { type: Number, required: false },
        costPerItem: { type: Number },
        imageUrls: [String],
        status: { type: String, default: "active" },
        category: [{ type: String, required: true }],
        featured: { type: Boolean, required: true },
        sold: { required: true, type: Number, default: 0 },
        sizes: [String],
        colors: [
          {
            name: { type: String },
            color: { type: String, default: "#000000" },
          },
        ],
        variants: [
          {
            size: { type: String },
            colorName: { type: String },
            colorHex: { type: String },
            stock: { type: Number },
          },
        ],
      },
    ],
    quantity: {
      type: Number,
      default: 1,
    },
  },
});

const Discount = models.Discount || model("Discount", discountSchema);

export default Discount;
