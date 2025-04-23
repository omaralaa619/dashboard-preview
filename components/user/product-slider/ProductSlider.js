import React from "react";
import EmblaCarousel from "./product-carousel/EmblaCarousel";

const ProductSlider = ({ title, products }) => {
  return (
    <div className="px-6 mb-10 max-w-[1500px] 2xl:mx-auto ">
      <p className="text-2xl font-semibold text-center mb-10 tracking-wider">
        {title}
      </p>
      <EmblaCarousel products={products} />
    </div>
  );
};

export default ProductSlider;
