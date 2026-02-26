"use client";
import React, { useRef } from "react";
import Container from "../ui/Container";
import { ChevronRight } from "lucide-react";
import ProductItem from "./ProductItem";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";

const ProductGrid = ({ products, href, header }) => {
  const router = useRouter();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <Container ref={ref} className=" py-12 md:py-16 xl:py-24">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <motion.p
          className="text-2xl md:text-[28px] 2xl:text-[40px]"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {header ? header : ""}
        </motion.p>

        <div className="flex items-center gap-3 cursor-pointer">
          <p className="text-sm md:text-base  ">View all </p>
          <div
            className="transition-transform duration-300 rounded-full bg-neutral-200 p-1"
            onClick={() => router.push(href)}
          >
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
      {/* Products Grid */}
      <motion.div
        className="mt-6 md:mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-8  md:gap-x-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="col-span-1"
            variants={itemVariants}
          >
            <ProductItem product={product} />
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
};

export default ProductGrid;
