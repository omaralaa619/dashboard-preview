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
  category: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  sold: {
    required: true,
    type: Number,
    default: 0,
  },

  stock: [
    {
      optionName: {
        type: String,
      },
      available: {
        type: Number,
      },
    },
  ],
});

const Product = models.Product || model("Product", productsSchema);

export default Product;
