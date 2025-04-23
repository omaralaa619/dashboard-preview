import CategoryConten from "@/components/user/catgeoryContent/CategoryConten";
import ProductItem from "@/components/user/product-slider/ProductItem";
import { getProductCatg, getProducts } from "@/components/user/utils";
import connectDB from "@/lib/connectDB";
import Store from "@/models/storeModel";
import Image from "next/image";
import React from "react";

export const revalidate = 60;
export async function generateStaticParams() {
  return ["/featured"];
}

const category = {
  title: "Featured",
  imageUrl:
    "https://utfs.io/f/ZBBZXEMdWUhxbRBeaXyxDufpzoaVwrMO6XFJ1RK0SQTdPcyA",
  slug: "featured",
};

const page = async () => {
  const products = await getProducts();

  return <CategoryConten products={products} category={category} />;
};

export default page;
