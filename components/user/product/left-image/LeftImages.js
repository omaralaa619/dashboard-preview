import React from "react";
import EmblaCarousel from "./EmblaCarousel";

const LeftImages = ({ images }) => {
  return (
    <div className="relative mx-4 mb-16">
      <EmblaCarousel images={images} />
    </div>
  );
};

export default LeftImages;
