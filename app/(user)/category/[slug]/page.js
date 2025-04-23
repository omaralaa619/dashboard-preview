import CategoryConten from "@/components/user/catgeoryContent/CategoryConten";
import ProductItem from "@/components/user/product-slider/ProductItem";
import { getProductCatg } from "@/components/user/utils";
import connectDB from "@/lib/connectDB";
import Store from "@/models/storeModel";
import Image from "next/image";
import React from "react";

export const revalidate = 60;
export async function generateStaticParams() {
  connectDB();
  const store = await Store.findOne({});

  return store.categories.map((cat) => {
    return cat.title;
  });
}

const page = async ({ params }) => {
  const slug = params.slug;
  console.log(params.slug);
  const { products, category } = await getProductCatg(slug);

  return <CategoryConten products={products} category={category} />;
};

export default page;
