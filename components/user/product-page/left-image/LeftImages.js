import React from "react";
import EmblaCarousel from "./EmblaCarousel";

const LeftImages = ({ images }) => {
  return (
    <div className="md:sticky top-[72px] self-start">
      <EmblaCarousel images={images} />
    </div>
  );
};

export default LeftImages;
