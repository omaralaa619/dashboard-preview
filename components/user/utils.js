import { cache } from "react";
import Product from "@/models/productsModel";
import connectDB from "@/lib/connectDB";

import Store from "@/models/storeModel";
import Collection from "@/models/collectionModel";
import { unstable_cache } from "next/cache";

export const getHome = unstable_cache(
  async () => {
    await connectDB();

    const collections = await Collection.find({})
      .populate({
        path: "products",
        match: { status: "active" },
      })
      .sort({ order: 1 });

    const store = await Store.findOne({}).lean();

    return {
      collections: JSON.parse(JSON.stringify(collections)),
      store: JSON.parse(JSON.stringify(store)),
    };
  },
  ["home-data"],
  {
    tags: ["home"],
  },
);

export const getProducts = unstable_cache(
  async () => {
    await connectDB();

    const products = await Product.find({
      status: "active",
    })
      .sort({ date: -1 })
      .lean();

    return JSON.parse(JSON.stringify(products));
  },
  ["all-products"],
  {
    tags: ["products"],
  },
);

export const getProduct = (slug) =>
  unstable_cache(
    async () => {
      await connectDB();

      const decodedSlug = decodeURIComponent(slug);

      const product = await Product.findOne({
        slug: decodedSlug,
      })
        .lean()
        .exec();

      if (!product) return null;

      return JSON.parse(JSON.stringify(product));
    },
    [`product-${slug}`], // ✅ UNIQUE CACHE KEY
    {
      tags: [`product-${slug}`], // ✅ granular tags
    },
  )();

export const getProductsCollection = unstable_cache(
  async (slug) => {
    await connectDB();
    const collection = await Collection.findOne({ slug })
      .populate({ path: "products", match: { status: "active" } })
      .lean();

    return { collection: JSON.parse(JSON.stringify(collection)) };
  },
  ["collection-data"],
  {
    tags: ["collections"],
  },
);
