"use client";
import React from "react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../../hero/heroCarousel/EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import ProductItem from "../ProductItem";

const EmblaCarousel = ({ products }) => {
  const options = { align: "start", loop: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla_products relative">
      <div className="embla__viewport_products" ref={emblaRef}>
        <div className="embla__container_products">
          {products.map((product, index) => (
            <div className="embla__slide_products h-full" key={product.slug}>
              <ProductItem product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
