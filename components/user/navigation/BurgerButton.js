"use client";
import { MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BurgerButton = ({ open, setOpen, thrushhold, pathname }) => {
  return (
    <button
      onClick={() => setOpen()}
      className="relative  w-fit rounded-1 bg-white/0 transition-colors  flex flex-col gap-1 justify-center items-center "
    >
      <span
        className={`h-[1.5px] w-[23px]  ${
          pathname !== "/" ? "bg-prim" : thrushhold ? "bg-prim" : "bg-white"
        }`}
      />
      <span
        className={`h-[1.5px] w-[23px]  ${
          pathname !== "/" ? "bg-prim" : thrushhold ? "bg-prim" : "bg-white"
        }`}
      />
      <span
        className={`h-[1.5px] w-[23px]  ${
          pathname !== "/" ? "bg-prim" : thrushhold ? "bg-prim" : "bg-white"
        }`}
      />
    </button>
  );
};

export default BurgerButton;
