"use client";
import EmblaCarousel from "./heroCarousel/EmblaCarousel";
import { motion } from "framer-motion";

const HeroSlider = ({ slides }) => {
  return (
    <motion.div
      className=" h-[80vh]  relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <EmblaCarousel slides={slides} />
    </motion.div>
  );
};

export default HeroSlider;
