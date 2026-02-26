"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductItem from "../product/ProductItem";
import Container from "../ui/Container";

const CategoryConten = ({ collection }) => {
  return (
    <Container className="relative">
      <div className=" my-10">
        <p className="text-center text-3xl font-medium">{collection.title}</p>
      </div>

      <div className="min-h-[100vh]  mb-24">
        <div className="grid  grid-cols-2 md:grid-cols-4  gap-4 border-t border-neutral-200 pt-4">
          {collection.products.map((product) => (
            <div key={product.title} className="">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CategoryConten;
