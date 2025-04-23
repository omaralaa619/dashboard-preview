import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Autoplay from "embla-carousel-autoplay";

import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import SlideItem from "./SlideItem";
const options = { loop: true, duration: 30 };

const EmblaCarousel = ({ slides }) => {
  // Include both Fade and Autoplay plugins
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: true,
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
    Fade(),
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <div className="embla ">
      <div className="embla__viewport h-full " ref={emblaRef}>
        <div className="embla__container  h-full">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <SlideItem slide={slide} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls_hero">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
