"use client";
import { MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BurgerButton = ({ open, setOpen, thrushhold }) => {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setOpen((pv) => !pv)}
      className="flex flex-col  justify-between items-center h-[18px] w-10 rounded-1    md:hidden "
    >
      <div className={` h-[2px] w-[23px] bg-black`} />
      <div className={` h-[2px] w-[23px] bg-black`} />
      <div className={` h-[2px] w-[23px] bg-black`} />
    </button>
  );
};

export default BurgerButton;
