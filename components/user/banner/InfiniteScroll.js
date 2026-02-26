"use client";

import { animate, motion } from "framer-motion";
const InfiniteScroll = () => {
  const upper = [
    "yooo",
    "yooo",
    "yooo",
    "yooo",
    "yooo",
    "endd",
    "endd",
    "yooo",
    "yooo",
    "yooo",
    "yooo",
    "yooo",
    "endd",
    "endd",
  ];
  const lower = ["yooo", "yooo", "yooo", "yooo", "yooo", "endd", "endd"];
  return (
    <div className="container mx-auto">
      <div className="flex">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {upper.map((item, index) => (
            <div className="h-40 w-56 pr-20" key={index}>
              {item}
            </div>
          ))}
        </motion.div>
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {upper.map((item, index) => (
            <div className="h-40 w-56 pr-20" key={index}>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
