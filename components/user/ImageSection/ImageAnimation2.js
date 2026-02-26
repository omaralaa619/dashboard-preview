"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ImageAnimation2 = () => {
  const targetRef = useRef(null);

  // Scroll progress relative to the tall section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Animate mask size
  const width = useTransform(scrollYProgress, [0, 1], ["15%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 1], ["15%", "100%"]);

  return (
    <div ref={targetRef} className="relative h-[200vh] bg-white">
      <div className="sticky top-0 flex items-center justify-center h-screen w-full overflow-hidden">
        {/* Animated scaling mask */}
        <motion.div
          style={{ width, height }}
          className="relative bg-slate-950 origin-center overflow-hidden flex items-center justify-center"
        >
          {/* Image stays full viewport size, clipped by mask */}
          <img
            src="https://nodika-nd.com/cdn/shop/files/B3A5B3B8-045B-40B7-880A-7EE94D6C6D29.jpg?v=1747408124&width=2000"
            alt=""
            className="absolute inset-0 w-screen h-screen object-cover"
          />

          {/* Inner text (clips with the mask) */}
          <p className="text-white text-3xl lg:text-4xl 2xl:text-6xl z-10 whitespace-nowrap min-w-max">
            Wear it in style
          </p>
        </motion.div>

        {/* Overlay text (always visible, unaffected by mask) */}
        <p className="absolute text-prim text-3xl lg:text-4xl 2xl:text-6xl">
          Wear it in style
        </p>
      </div>
    </div>
  );
};

export default ImageAnimation2;
