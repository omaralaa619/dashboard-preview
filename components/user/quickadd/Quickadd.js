"use client";
import { uiActions } from "@/store/ui-store";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { X } from "lucide-react";
import Price from "../product/Price";
import SizeSection from "./SizeSection";
import { useState } from "react";
import CtaButtons from "./CtaButtons";

const Quickadd = () => {
  const open = useSelector((state) => state.ui.quickAdd.open);
  const product = useSelector((state) => state.ui.quickAdd.content);

  const [size, setSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState(null);

  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(uiActions.toggleQuickAdd());
  };
  return (
    <>
      <motion.div
        className={
          "bg-black top-0 left-0 h-[100vh] w-full fixed opacity-30 z-40"
        }
        onClick={toggle}
        initial={false}
        animate={
          open
            ? { opacity: 0.5, pointerEvents: "all" }
            : { opacity: 0, pointerEvents: "none" }
        }
        transition={open ? { delay: 0.2 } : { delay: 0.5 }}
      ></motion.div>

      {/* actual quickadd */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl text-base md:text-xl flex flex-col fixed left-1/2 -translate-x-1/2 bottom-2 bg-white text-black w-[calc(100%-1rem)] z-50 max-h-[85dvh] md:max-h-[90vh] md:w-[550px] md:left-auto md:translate-x-0 md:right-4 md:bottom-4 overflow-hidden"
          >
            <div className="flex flex-col justify-between h-full p-4 md:p-6 overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom))]">
              <motion.div
                onClick={toggle}
                className="absolute bg-white left-1/2 -translate-x-1/2 -top-14 rounded-full w-[44px] h-[44px] flex justify-center items-center cursor-pointer shadow-lg md:hidden"
                animate={open ? { opacity: 1 } : { opacity: 0 }}
                initial={false}
              >
                <X size={24} />
              </motion.div>
              <div
                className="absolute right-6 top-6 hidden md:block cursor-pointer"
                onClick={toggle}
              >
                <X size={21} />
              </div>
              <motion.div
                animate={open ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  open ? { delay: 0.5, duration: 0.3 } : { duration: 0.3 }
                }
                initial={false}
              >
                <div>
                  <div
                    className="flex gap-4 items-center border-b pb-8 border-neutral-300 relative"
                    onClick={() => console.log(product)}
                  >
                    <div className="w-[90px] h-[120px] rounded-md">
                      <img
                        src={product?.imageUrls?.[0]}
                        alt="Product image"
                        className="w-full h-full rounded-md object-contain"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-bold">{product.title}</p>
                      <Price
                        number={product.price}
                        className="text-neutral-500 font-semibold text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-14">
                    <div className="flex items-center flex-col">
                      <SizeSection
                        variants={product.variants || []}
                        sizes={product.sizes || []}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        selectedColorName={selectedColorName}
                        setSelectedColorName={setSelectedColorName}
                        size={size}
                        setSize={setSize}
                        colors={product.colors || []}
                      />
                    </div>

                    <div>
                      <CtaButtons
                        product={product}
                        size={size}
                        color={selectedColor}
                        colorName={selectedColorName}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* socials  */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Quickadd;
