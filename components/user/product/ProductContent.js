"use client";

import LeftImages from "./left-image/LeftImages";
import RightText from "./right-text/RightText";
import { motion } from "framer-motion";

const ProductContent = ({ product }) => {
  return (
    <div className="grid grid-cols-1 mt-8 md:grid-cols-2 md:mx-10 md:mt-16   max-w-[1500px] 2xl:mx-auto relative">
      <motion.div
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="bg-white w-full h-full absolute z-50 pointer-events-none"
      ></motion.div>
      <LeftImages images={product.imageUrls} />
      <RightText product={product} />
    </div>
  );
};

export default ProductContent;
