import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoHeight from "embla-carousel-auto-height";

import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import { Thumb } from "./EmblaCarouselThumbButtons";
import Image from "next/image";

const EmblaCarousel = ({ images }) => {
  const options = {};
  const SLIDE_COUNT = 5;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  const [selectedIndexx, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoHeight()]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "y",
  });
  const onThumbClick = useCallback(
    (index) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap());
  }, [emblaApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();

    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  return (
    <div className="embla relative flex h-full">
      {/* Vertical thumbs */}
      <div className="embla-thumbs flex-shrink-0 hidden md:block ">
        <div
          className="embla-thumbs__viewport md:!h-[100vh]"
          ref={emblaThumbsRef}
        >
          <div className="embla-thumbs__container ">
            {images.map((image, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndexx}
                index={index}
                image={image}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main slider fills remaining space */}
      <div className="flex-1">
        <div className="embla__viewport " ref={emblaRef}>
          <div className="embla__container ">
            {images.map((image, index) => (
              <div
                className="embla__slide md:rounded-xl overflow-hidden "
                key={index}
              >
                <Image
                  src={image}
                  alt={`slide-${index}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto md:rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots for mobile */}
      <div className="embla__controls absolute left-1/2 -translate-x-1/2 bottom-4 md:hidden">
        <div className="embla__dots backdrop-blur-md bg-white/70">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : "",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
