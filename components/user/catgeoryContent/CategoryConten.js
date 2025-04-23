"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductItem from "../product-slider/ProductItem";

const CategoryConten = ({ category, products }) => {
  return (
    <div className="relative">
      <motion.div
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="bg-white w-full h-full absolute z-50 pointer-events-none"
      ></motion.div>
      <div className="mt-[90px] mb-10">
        <div className="h-full w-full relative aspect-[5/3] md:aspect-[6/1] mb-4">
          <Image
            fill
            className="object-cover object-center "
            src={category.imageUrl}
            alt="category image"
          />
        </div>

        <p className="text-center text-3xl font-medium">{category.title}</p>
      </div>

      <div className="min-h-[100vh] max-w-7xl m-auto mb-16">
        <div className="grid  grid-cols-2 md:grid-cols-3  mx-4 md:mx-12 gap-4 border-t border-neutral-200 pt-4">
          {products.map((product) => (
            <div key={product.title} className="">
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryConten;
