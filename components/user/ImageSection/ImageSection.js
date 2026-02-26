"use client";
import { motion } from "framer-motion";

const ImageSection = () => {
  return (
    <motion.div
      className="w-full aspect-[16/9] relative "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <img
        src="https://nodika-nd.com/cdn/shop/files/16ac090a-a0dc-445e-b7f0-79c9e769b66a.jpg?v=1747435637&width=1200"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      w
    </motion.div>
  );
};

export default ImageSection;
