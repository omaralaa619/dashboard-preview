import ProductContent from "@/components/user/product/ProductContent";
import { getProduct } from "@/components/user/utils";
import connectDB from "@/lib/connectDB";
import Product from "@/models/productsModel";
import React from "react";

export const revalidate = 60;

export async function generateStaticParams() {
  connectDB();
  const product = await Product.find();

  return product.map((id) => {
    return id._id.toString();
  });
}
const page = async ({ params }) => {
  const slug = params.slug;
  const product = await getProduct(slug);
  console.log("sizesssss", product.stock);
  console.log(product.stock.every((stockItem) => stockItem.available === 0));

  return (
    <div className="min-h-screen pt-[90px]">
      <ProductContent product={product} />
    </div>
  );
};

export default page;
