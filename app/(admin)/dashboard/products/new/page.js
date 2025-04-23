"use client";
import dynamic from "next/dynamic";
const ProductNew = dynamic(
  () => import("@/components/dashboard/product/ProductNew"),
  {
    ssr: false,
  }
);

const page = () => {
  return (
    <div>
      <div>
        <h1 className="text-4xl font-medium">Product New</h1>

        <ProductNew />
      </div>
    </div>
  );
};

export default page;
