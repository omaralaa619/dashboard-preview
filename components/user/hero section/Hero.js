"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = ({ hero }) => {
  const [clicked, setClicked] = useState(false);

  const router = useRouter();

  const shopHandler = () => {
    if (clicked) {
      router.push("/category/featured");
    }
  };
  return (
    <>
      <motion.div
        className="relative h-[100vh]"
        initial={{ opacity: 0.5 }} // Starting position
        animate={{ opacity: 1 }}
        transition={{
          type: "tween",
          duration: 1,
        }}
      >
        {hero.mediaType === "image" ? (
          <>
            <Image
              fill
              className="z-0 object-cover object-center"
              src={hero.imageUrl}
              alt="hero image"
              sizes="200vw"
            />

            <div className="absolute inset-0 bg-black opacity-20 z-10 pointer-events-none" />
          </>
        ) : (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="z-0 h-full w-full object-cover object-center"
            >
              <source src={hero.imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-black opacity-20 z-10 pointer-events-none" />
          </>
        )}
        <div
          className="absolute flex flex-col items-center gap-6"
          style={{
            top: "46%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* <div className="overflow-hidden">
            <motion.div
              className="text-center text-white"
              initial={{ y: 100, opacity: 0 }} // Starting position
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "tween",
                duration: 1,
                delay: 1,
              }}
            >
              <p className="font-medium tracking-wider">{hero.subheader}</p>
              <h1 className="text-5xl font-bold">{hero.header}</h1>
            </motion.div>
          </div> */}

          <div>
            {/* <motion.button
              className="relative overflow-hidden rounded-sm border-2 bg-none px-4 py-2 text-center text-white"
              onClick={() => setClicked(!clicked)}
              initial={{ y: 100, opacity: 0 }} // Starting position
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "tween",
                duration: 1,
              }}
            >
              <motion.div
                className="absolute left-[-100%] top-0 h-full w-full bg-white"
                animate={clicked ? { left: 0 } : { left: "-100%" }}
                transition={{
                  type: "tween",
                  onComplete: shopHandler,
                }}
              ></motion.div>
              <motion.p
                animate={clicked ? { color: "#000" } : { color: "#fff" }}
                className="relative z-10"
                transition={{
                  type: "tween",
                  duration: 0.3,
                }}
              >
                SHOP NOW
              </motion.p>
            </motion.button> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Hero;
