"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ImageAnimation = () => {
  const targetRef = useRef(null);

  // Scroll progress relative to the tall section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Scale for the mask
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <div ref={targetRef} className="relative h-[400vh] bg-white">
      <div className="sticky top-0 flex items-center justify-center h-screen w-full overflow-hidden">
        {/* Base text (blue) */}

        {/* Highlight text (red) masked by scaling div */}
        <p className="absolute text-4xl 2xl:text-6xl font-bold text-blue-500">
          Wear it in style
        </p>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ scale }}
            className="absolute inset-0 bg-slate-950"
          ></motion.div>
          {/* <p className="absolute text-4xl font-bold text-red-500 over">
            Wear it in style
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ImageAnimation;
