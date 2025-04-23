import { cache } from "react";
import Product from "@/models/productsModel";
import connectDB from "@/lib/connectDB";

import Store from "@/models/storeModel";

export const getHome = cache(async () => {
  connectDB();
  const products = await Product.find({
    status: "active",
    featured: "true",
  })
    .sort({ _id: -1 })
    .lean();

  const store = await Store.findOne({}).lean();

  return { products, store };
});
export const getStore = cache(async () => {
  connectDB();
  const store = await Store.findOne({}).lean();

  return JSON.parse(JSON.stringify(store));
});
export const getProducts = cache(async () => {
  connectDB();
  const products = await Product.find({
    status: "active",
    featured: "true",
  })
    .sort({ _id: -1 })
    .lean();

  return products;
});
export const getProduct = cache(async (slug) => {
  connectDB();
  const product = await Product.findOne({ slug }).lean();
  console.log(product);

  return JSON.parse(JSON.stringify(product));
});

export const getProductCatg = cache(async (slug) => {
  connectDB();
  const store = await Store.findOne({}).lean();
  const category = store.categories.find((cat) => cat.slug === slug);
  const products = await Product.find({ category: category.title }).lean();

  return { products, category };
});
