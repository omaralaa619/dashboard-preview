import mongoose, { Schema, models, model } from "mongoose";

const collectionSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  featured: {
    type: Boolean,
    required: true,
    default: true,
  },
  order: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  date: { type: Date, default: Date.now },
});

const Collection = models.Collection || model("Collection", collectionSchema);

export default Collection;
