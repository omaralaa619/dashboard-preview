import ProductContent from "@/components/user/product-page/ProductContent";
import { getProduct } from "@/components/user/utils";
import connectDB from "@/lib/connectDB";
import Product from "@/models/productsModel";
import React from "react";

export async function generateStaticParams() {
  connectDB();
  const products = await Product.find({}, "slug");

  return products.map((product) => ({
    slug: product.slug,
  }));
}
const page = async ({ params }) => {
  const slug = params.slug;
  const product = await getProduct(slug);

  return (
    <div className="min-h-screen pt-[59px] md:pt-[91px]">
      <ProductContent product={product} />
    </div>
  );
};

export default page;
