"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Banner = () => {
  const banner = useSelector((state) => state.ui.store.banner); // Selecting the full banner object

  // Generate an array of 10 repeated banner messages
  const messages = Array(10).fill(banner.content).flat();
  console.log(messages);

  return (
    banner.show && (
      <div className="mx-auto h-8 flex items-center  bg-sec text-white overflow-hidden">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: `-100%` }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 items-center"
        >
          {messages.map((message, index) => {
            return (
              <div className="pr-14 font-bold" key={index}>
                {message}
              </div>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: `-100%` }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 items-center"
        >
          {messages.map((message, index) => {
            return (
              <div className="pr-14 font-bold" key={index}>
                {message}
              </div>
            );
          })}
        </motion.div>
      </div>
    )
  );
};

export default Banner;
