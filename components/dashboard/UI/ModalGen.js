"use client";
import { useState } from "react";
import Card from "./Card";
import classes from "./ModalGen.module.css";
import { AnimatePresence, motion } from "framer-motion";

const ModalGen = ({ children, open, closeModal, className }) => {
  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={classes.fallback}
              onClick={closeModal}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, top: "70%" }}
              animate={{ opacity: 1, top: "50%" }}
              exit={{ opacity: 0, top: "70%" }}
              className={`${classes.container} ${className}`}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalGen;
