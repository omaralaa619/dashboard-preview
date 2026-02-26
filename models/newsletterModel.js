import mongoose, { Schema, models, model } from "mongoose";

const newsletterSchema = new Schema({
  title: {
    type: String,
  },
  subject: {
    type: String,
  },
  body: {
    type: String,
  },
  date: { type: Date, default: Date.now },
});

const Newsletter = models.Newsletter || model("Newsletter", newsletterSchema);

export default Newsletter;
