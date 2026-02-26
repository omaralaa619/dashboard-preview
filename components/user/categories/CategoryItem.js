import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { TransitionLink } from "../ui/TransitionLink";

const CategoryItem = ({ data }) => {
  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const itemsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <TransitionLink href={`/collections/${data.slug}`}>
      <motion.div className="relative aspect-[8/10] overflow-hidden bg-neutral-300 cursor-pointer group rounded-md">
        {/* Image Wrapper (animated) */}
        <motion.div variants={imageVariants} className="absolute inset-0">
          <Image
            fill
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
            src={data.image}
            alt="category image"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute p-8 w-full h-full bg-black/30 flex items-center justify-center bg-gradient-to-t to-transparent">
          <motion.p
            variants={itemsVariants}
            className="relative w-fit text-center uppercase text-2xl md:text-3xl lg:text-4xl text-white
            after:block after:h-[2px] after:w-full after:scale-x-0 after:bg-white
            after:transition-transform after:duration-300 after:ease-in-out
            group-hover:after:scale-x-100"
          >
            {data.title}
          </motion.p>
        </div>
      </motion.div>
    </TransitionLink>
  );
};

export default CategoryItem;
