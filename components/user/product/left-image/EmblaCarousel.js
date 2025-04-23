"use client";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import Image from "next/image";
const options = { loop: true };

const EmblaCarousel = ({ images }) => {
  // Include both Fade and Autoplay plugins
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla ">
      <div className="embla__viewport h-full " ref={emblaRef}>
        <div className="embla__container  h-full">
          {images.map((image, index) => (
            <div className="embla__slide" key={index}>
              <div className="relative bg-neutral-300 aspect-[4/6] rounded-sm overflow-hidden">
                <Image
                  fill
                  className="object-cover object-center z-0 "
                  src={image}
                  alt="category image"
                  loading="eager"
                />
              </div>
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
    </div>
  );
};

export default EmblaCarousel;
