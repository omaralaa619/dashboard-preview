"use client";
import React, { useCallback, useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import Image from "next/image";
import Container from "../ui/Container";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { motion } from "framer-motion";

const options = { dragFree: true };
const SLIDE_COUNT = 3;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const CategoriesSection = ({ categories, props }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerVariants = {
    hidden: {},
    visible: {},
  };

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onScroll = useCallback((emblaApi) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi
      .on("reInit", onScroll)
      .on("scroll", onScroll)
      .on("slideFocus", onScroll);
  }, [emblaApi, onScroll]);
  return (
    <Container className=" overflow-x-hidden">
      <div className="embla_categories  ">
        <motion.p
          className="text-2xl md:text-[28px] 2xl:text-[40px] mb-10"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Shop by Category
        </motion.p>
        <div className="embla__viewport_categories" ref={emblaRef}>
          <motion.div
            className="embla__container_categories"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categories.map((category, index) => (
              <div className="embla__slide_categories" key={index}>
                <CategoryItem data={category} />
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex items-center gap-10">
          <div className="embla__progress_categories mt-6">
            <div
              className="embla__progress__bar_categories"
              style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
            />
          </div>
          <div className="embla__controls_categories">
            <div className="embla__buttons_categories ">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CategoriesSection;
