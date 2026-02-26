import Image from "next/image";
import React from "react";
import Price from "./Price";
import Link from "next/link";
import { motion } from "framer-motion";
import CartIcon from "@/svgs/CartIcon";
import CartSVG from "@/svgs/CartSVG";
import { useDispatch } from "react-redux";
import { uiActions } from "@/store/ui-store";
import { TransitionLink } from "../ui/TransitionLink";

const ProductItem = ({ product }) => {
  const { price, compareAtPrice, variants = [] } = product;

  const dispatch = useDispatch();
  const quickAddToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(uiActions.toggleQuickAdd());
    dispatch(uiActions.updateQuickAdd({ content: product }));
  };

  const totalStock = Array.isArray(variants)
    ? variants.reduce((acc, v) => acc + (v.stock || 0), 0)
    : 0;
  const imageContainerVariants = {
    initial: {},
    hover: {},
  };

  const firstImageVariants = {
    initial: { opacity: 1 },
    hover: { opacity: 0 },
  };

  const secondImageVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };

  return (
    <TransitionLink href={`/product/${product.slug}`}>
      <motion.div
        variants={imageContainerVariants}
        initial="initial"
        whileHover={product.imageUrls[1] ? "hover" : undefined}
      >
        <div className="relative bg-neutral-300 aspect-[4/6] rounded-t-lg overflow-hidden group">
          <div className=" absolute left-[3%]  top-[3%] z-10 flex flex-col gap-2 pointer-events-none">
            {totalStock === 0 && (
              <p
                className="text-center z-10 w-fit text-white bg-prim_dark py-1 px-2 text-xs md:text-sm rounded-2xl "
                // style={{ fontSize: "10px" }}
              >
                Sold out
              </p>
            )}
            {compareAtPrice != 0 && (
              <p className=" text-white  px-2 py-1 text-xs tracking-tighter font-medium  bg-red-600 rounded-2xl">
                SAVE {Math.round(((compareAtPrice - price) / price) * 100)}%
              </p>
            )}
          </div>

          {totalStock != 0 && (
            <div
              className=" absolute right-[3%]  bottom-[3%]  z-10 w-fit bg-white stroke-neutral-600 p-2 rounded-full cursor-pointer md:hidden"
              // style={{ fontSize: "10px" }}
              onClick={quickAddToggle}
            >
              <CartSVG size={18} />
            </div>
          )}
          {totalStock != 0 && (
            <div
              className="absolute right-[3%] bottom-[3%] z-10 w-fit bg-sec text-prim stroke-neutral-600 py-2 px-3 font-bold rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
              // style={{ fontSize: "10px" }}
              onClick={quickAddToggle}
            >
              + Quick add
            </div>
          )}

          {/* First Image */}
          <motion.div
            variants={firstImageVariants}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <Image
              fill
              className="object-cover object-center"
              src={product.imageUrls[0]}
              alt="product image 1"
            />
          </motion.div>

          {/* Second Image */}
          {product.imageUrls[1] && (
            <motion.div
              variants={secondImageVariants}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                fill
                className="object-cover object-center"
                src={product.imageUrls[1]}
                alt="product image 2"
              />
            </motion.div>
          )}
        </div>

        <div className="pt-4 text-center">
          <p className="text-sm md:text-base font-bold">{product.title}</p>
          <div className="flex justify-center flex-wrap gap-1 md:flex-nowrap md:gap-2">
            <Price
              number={price}
              className={`text-neutral-500 font-semibold text-sm md:text-base ${
                compareAtPrice > 0 ? "text-red-600" : ""
              }`}
            />
            {compareAtPrice > 0 && (
              <div>
                <div className="relative w-fit">
                  <Price
                    number={compareAtPrice}
                    className="text-neutral-500 font-semibold text-sm md:text-base"
                  />
                  <div className="w-full h-[1px] bg-neutral-700 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </TransitionLink>
  );
};

export default ProductItem;
