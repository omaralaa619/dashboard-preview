import Price from "../../UI/Price";
import React, { useState } from "react";
import PriceSection from "./PriceSection";
import SizeSection from "./SizeSection";
import CtaButtons from "./CtaButtons";

const RightText = ({ product }) => {
  const { compareAtPrice, price, description } = product;
  const [size, setSize] = useState("");
  return (
    <div className="mx-8">
      <div className="text-center border-b border-neutral-300  pb-5 ">
        <p className="text-4xl font-medium mb-4">{product.title}</p>
        <PriceSection price={price} compareAtPrice={compareAtPrice} />
      </div>

      <div className="mb-10 mt-5 pb-10 border-b border-neutral-300">
        <p className="text-center font-semibold mb-2">
          Size: <span className="font-normal">{size}</span>
        </p>

        <SizeSection stock={product.stock} size={size} setSize={setSize} />
      </div>

      <div>
        <CtaButtons product={product} size={size} />
      </div>
      <div className="mb-20">
        <p className="pb-5 mb-10 border-b border-neutral-300">Details</p>
        <div
          id="details"
          className="details"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
    </div>
  );
};

export default RightText;
