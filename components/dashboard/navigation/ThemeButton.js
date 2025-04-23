"use client";
import SunSVG from "@/svgs/SunSVG";
import classes from "./ThemeButton.module.css";
import MoonSVG from "@/svgs/MoonSVG";
import { useState } from "react";
import { motion } from "framer-motion";

const ThemeButton = () => {
  const [light, setLight] = useState(false);
  const toggleBodyTheme = () => {
    setLight(!light);
    const body = document.querySelector("body");
    if (body) {
      const currentTheme = body.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      body.setAttribute("data-theme", newTheme);
    }
  };
  return (
    <button className={classes.lightButton} onClick={toggleBodyTheme}>
      <motion.div
        className={classes.sun}
        animate={light ? { bottom: 8 } : { bottom: -50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <SunSVG />
      </motion.div>
      <motion.div
        animate={light ? { bottom: -50 } : { bottom: 8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={classes.moon}
      >
        <MoonSVG />
      </motion.div>
    </button>
  );
};

export default ThemeButton;
