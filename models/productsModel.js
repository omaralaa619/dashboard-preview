import mongoose, { Schema, models, model } from "mongoose";

const productsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  compareAtPrice: {
    type: Number,
    required: false,
  },
  costPerItem: {
    type: Number,
  },
  imageUrls: [String],
  status: {
    type: String,
    default: "active",
  },

  // featured: {
  //   type: Boolean,
  //   required: true,
  // },
  sold: {
    required: true,
    type: Number,
    default: 0,
  },
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
  date: { type: Date, default: Date.now },
});

// Virtual populate: allow `Product.findById(id).populate('collections')`
productsSchema.virtual("collections", {
  ref: "Collection",
  localField: "_id",
  foreignField: "products",
});

// Ensure virtual fields are included when converting documents to JSON/Object
productsSchema.set("toObject", { virtuals: true });
productsSchema.set("toJSON", { virtuals: true });
const Product = models.Product || model("Product", productsSchema);

export default Product;
