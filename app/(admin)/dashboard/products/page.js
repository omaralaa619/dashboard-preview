"use client";
import ProductNewButton from "@/components/dashboard/product/ProductNewButton";
import ProductsTable from "@/components/dashboard/tables/products/ProductsTable";
import MiniNav from "@/components/dashboard/UI/MiniNav";
import { Suspense } from "react";

const page = () => {
  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
    },
    {
      href: "/products",
      label: "Products",
      last: true,
    },
  ];

  return (
    <div>
      <MiniNav links={links} />

      <div className="flex justify-between items-center  mb-6">
        <h1 className="text-4xl font-medium">Products</h1>
        <ProductNewButton />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductsTable />
      </Suspense>
    </div>
  );
};

export default page;
