"use client";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";

import CommentItem from "./CommentItem";
import { motion } from "framer-motion";
import Container from "@/components/user/ui/Container";

const Comments = () => {
  const options = { dragFree: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [scrollProgress, setScrollProgress] = useState(0);

  const comments = [
    `الاوردر وصلني ليبيا النهاردة واخيييرااا✨

الطقمين احلى من بعض طبق الاصل من الصور واحلى

غير ان التعامل كان بمنتهى اللطف والذوق شكرا وبتمنالكم التوفيق والنجاح اكتر واكتر💖💖`,
    `حقيقي انا مبسوطة انكم عاملين سايز تناسب كل الاجسام والحاجات ماشاء النه خطيرة ان شاء
الله ع يوم التلات جايا لان الاتنين عارفة انها اجازة`,
    `ماشاء الله حاجتك وهميه ياريتني شوفتك اول
السيزووووون🥰🥰`,
    `مساء الخير
وصلني الاوردر في منتهي الجمال
اشكرك حبيبتي مع أمنياتي ليكم بالتوفيق دايما 😘😘`,
  ];

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
    <Container className="overflow-x-hidden py-12 md:py-16">
      <motion.p
        className="text-2xl  mb-8 md:text-[28px] 2xl:text-[40px]"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Customer Reviews
      </motion.p>

      <div className="embla_comments  ">
        <div className="embla__viewport_categories" ref={emblaRef}>
          <div className="embla__container_categories">
            {comments.map((comment, index) => (
              <div className="embla__slide_categories" key={index}>
                <CommentItem comment={comment} />
              </div>
            ))}
          </div>
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

export default Comments;
