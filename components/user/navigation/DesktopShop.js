import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";

const DesktopShop = () => {
  const categories = useSelector((state) => state.ui.store.categories);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="cursor-pointer relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex gap-1 items-center">
        <p>SHOP</p>
        <ChevronDown size={18} strokeWidth={1} />
      </div>
      {categories && (
        <motion.div
          className="absolute bg-black  px-5 flex flex-col gap-2 rounded-sm pt-10 top-8  left-[50%] translate-x-[-50%] w-[200px] pb-2"
          initial={{ opacity: 0, pointerEvents: "none" }}
          animate={{
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? "" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          {categories.map((item) => (
            <Link
              href={`/category/${item.slug}`}
              key={item.title}
              className="text-white"
            >
              <p className="border-b border-neutral-200 w-fit pb-2">
                {item.title}
              </p>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DesktopShop;
