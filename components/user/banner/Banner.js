"use client";

import { motion } from "framer-motion";

import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../product/left-image/EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import { useSelector } from "react-redux";

const Banner = ({ store }) => {
  const banner = useSelector((state) => state.ui.store.banner.content);

  const options = { align: "start", loop: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: true,
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <div className="embla relative py-2   max-w-4xl">
      <div className="embla__viewport h-full " ref={emblaRef}>
        <div className="embla__container  h-full">
          {banner.map((text, index) => (
            <div className="embla__slide" key={index}>
              <p key={index} className="text-center text-sm">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className={"!w-7 !h-7"}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className={"!w-7 !h-7"}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
