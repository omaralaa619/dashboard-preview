"use client";

import LeftImages from "./left-image/LeftImages";
import RightText from "./right-text/RightText";
import { motion } from "framer-motion";

const ProductContent = ({ product }) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:gap-10  md:grid-cols-2  md:p-8 lg:p-12 xl:p-20    relative">
      <LeftImages images={product.imageUrls} />
      <RightText product={product} />
    </div>
  );
};

export default ProductContent;
