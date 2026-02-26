import Price from "../../ui/Price";
import React, { useState } from "react";
import PriceSection from "./PriceSection";
import SizeSection from "./SizeSection";
import CtaButtons from "./CtaButtons";
import Container from "../../ui/Container";
import AccordionContainer from "../AccordionContainer";

const RightText = ({ product }) => {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME;
  const { compareAtPrice, price, description, variants = [] } = product;
  const [size, setSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState(null);

  const totalStock = Array.isArray(variants)
    ? variants.reduce((acc, v) => acc + (v.stock || 0), 0)
    : 0;

  return (
    <div className="px-5">
      <div className="border-b border-neutral-200  pb-5 ">
        <p className="capitalize text-sm md:text-base text-neutral-500 ">
          {brandName}
        </p>
        <p className="text-2xl md:text-4xl font-normal md:mt-4">
          {product.title}
        </p>
        <PriceSection
          price={price}
          compareAtPrice={compareAtPrice}
          totalStock={totalStock}
        />

        {totalStock > 0 && totalStock < 10 && (
          <p className="text-red-600 text-sm font-semibold mt-2">
            Only {totalStock} left in stock!
          </p>
        )}
      </div>

      <div className="mt-5 md:mt-10 md:mb-5">
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

      <div className="mb-20">
        <CtaButtons
          product={product}
          size={size}
          color={selectedColor}
          colorName={selectedColorName}
        />
      </div>

      <div>
        <AccordionContainer />
      </div>
      <div className="mb-20 ">
        <div
          id="details"
          className="details mt-10"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </div>
  );
};

export default RightText;
