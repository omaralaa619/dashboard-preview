"use client";
import React from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";

const MotionContainer = motion(Container);

const ImageGrid = () => {
  return (
    <MotionContainer
      className="grid grid-cols-2 h-[100vh] md:grid-cols-4 gap-6 md:h-[500px] xl:h-[600px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {/* Left big block */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        }}
        className="col-span-2 row-span-2 rounded-xl bg-gray-300 w-full h-full relative overflow-hidden"
      >
        <img
          src="https://nodika-nd.com/cdn/shop/files/BC872190-8920-49C5-AFAE-5066188CBBAF.jpg?v=1747422360&width=1200"
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
        />
      </motion.div>

      {/* Small blocks */}
      {[
        "01914A02-2672-4F29-921D-E1B6D08A7FB6.jpg?v=1747425068&width=500",
        "B74AE4CE-8251-44FC-AA34-C9779B32DC6E.jpg?v=1747410803&width=500",
        "4E21BC38-A72A-432E-826F-BD915BDB7030.jpg?v=1747411560&width=1200",
      ].map((src, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          className={`rounded-xl bg-gray-400 w-full h-full relative overflow-hidden ${
            i === 2 ? "col-span-2" : ""
          }`}
        >
          <img
            src={`https://nodika-nd.com/cdn/shop/files/${src}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
          />
        </motion.div>
      ))}
    </MotionContainer>
  );
};

export default ImageGrid;
