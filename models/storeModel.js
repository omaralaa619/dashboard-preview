import { Schema, models, model } from "mongoose";

const storeSchema = new Schema({
  categories: [
    {
      title: {
        required: true,
        type: String,
      },
      imageUrl: {
        required: true,
        type: String,
      },
      slug: {
        required: true,
        type: String,
      },
    },
  ],
  banner: {
    content: [
      {
        type: String,
        required: true,
      },
    ],
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  hero: [
    {
      header: {
        type: String,
      },
      subheader: {
        type: String,
      },
      imageUrl: {
        required: true,
        type: String,
      },
    },
  ],

  timer: {
    timeLeft: {
      required: true,
      type: String,
    },
    header: {
      required: true,
      type: String,
    },
  },
});

const Store = models.Store || model("Store", storeSchema);

export default Store;
