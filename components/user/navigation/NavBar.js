"use client";
import { useEffect, useState } from "react";
import BurgerButton from "./BurgerButton";
import DesktopNavlinks from "./DesktopNavlinks";
import MobileNavlinks from "./MobileNavlinks";
import LogoSVG from "@/svgs/LogoSVG";
import CartSVG from "@/svgs/CartSVG";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
// import Banner from "../banner/Banner";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-store";
import CartIcon from "@/svgs/CartIcon";
import Cart from "../cart/Cart";
import Banner from "../banner/Banner";
import Link from "next/link";
import LynneSVG from "@/svgs/LynneSVG";
// import Cart from "../cart/Cart";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const isBanner = useSelector((state) => state.ui.store.banner.show);
  const [hidden, setHidden] = useState(false);
  const [thrushhold, setThrushhold] = useState(false);
  const pathname = usePathname();

  ////////////////////////////////////////////////

  const dispatch = useDispatch();
  const logg = useSelector((state) => state.ui.store);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };

  const fetchStore = async () => {
    try {
      const response = await fetch("/api/store", {
        method: "GET",
      });

      const data = await response.json();

      dispatch(uiActions.updateStore(data));
      console.log(data.categories[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStore();
  }, []);

  ////////////////////////////////

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    if (latest < 40) {
      setThrushhold(false);
    } else {
      setThrushhold(true);
    }
  });

  ///////////////////////////////////
  const variants = {
    visible: { y: -1 },
    hidden: { y: "-101%" },
  };

  return (
    <div className={`${pathname == "/checkout/delivery-info" ? "hidden" : ""}`}>
      <motion.div
        className={`fixed left-0 z-10 w-full fill-black bg-white py-2 px-4   md:px-6  ${
          thrushhold ? "fixed" : ""
        } ${
          !thrushhold && isBanner
            ? "absolute top-10 border-t border-neutral-400/20"
            : ""
        } `}
        variants={variants}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        onClick={() => console.log(logg)}
      >
        {/* <p>{scrollYProgress.curr}</p> */}
        <div
          className={`m-auto flex h-[71px] w-full max-w-[1300px] items-center justify-between `}
        >
          <BurgerButton open={open} setOpen={setOpen} thrushhold={thrushhold} />
          <DesktopNavlinks />
          <MobileNavlinks open={open} setOpen={setOpen} />
          <Link href={"/"}>
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <LynneSVG />
            </div>
          </Link>
          <div className="" onClick={toggleCartHandler}>
            <CartIcon />
          </div>
        </div>
      </motion.div>

      <Banner />

      <Cart />
    </div>
  );
};

export default NavBar;
