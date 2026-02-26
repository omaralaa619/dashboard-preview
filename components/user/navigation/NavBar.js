"use client";
import { useEffect, useState } from "react";
import BurgerButton from "./BurgerButton";
import DesktopNavlinks from "./DesktopNavlinks";
import MobileNavlinks from "./MobileNavlinks";
import LogoSVG from "@/svgs/LogoSVG";
import CartSVG from "@/svgs/CartSVG";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Banner from "../banner/Banner";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-store";

import Link from "next/link";
import Container from "../ui/Container";
import { TransitionLink } from "../ui/TransitionLink";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [thrushhold, setThrushhold] = useState(false);
  const [first, setFirst] = useState(false);
  const [fixedThrushhold, setFixedThrushhold] = useState(false);
  const isBanner = useSelector((state) => state.ui.store.banner.show);
  const navOpen = useSelector((state) => state.ui.navOpen);

  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  ////////////////////////////////////////////////

  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };
  const toggleNavHandler = () => {
    dispatch(uiActions.toggleNav());
  };

  const fetchStore = async () => {
    try {
      const [storeRes, collectionsRes] = await Promise.all([
        fetch("/api/store"),
        fetch("/api/collections"),
      ]);

      if (!storeRes.ok || !collectionsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const storeData = await storeRes.json();
      const collectionsData = await collectionsRes.json();

      dispatch(uiActions.updateStore(storeData));
      dispatch(uiActions.updateCollections(collectionsData));
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

    if (latest < 500) {
      setThrushhold(false);
    } else {
      setThrushhold(true);
    }
    if (latest < 300) {
      setFixedThrushhold(false);
    } else {
      setFixedThrushhold(true);
    }
    if (latest < 100) {
      setFirst(false);
    } else {
      setFirst(true);
    }
  });

  ///////////////////////////////////
  const variants = {
    visible: { y: -1 },
    hidden: { y: "-101%" },
  };
  console.log(thrushhold);

  return (
    <div className={`${pathname == "/checkout/delivery-info" ? "hidden" : ""}`}>
      <motion.div
        initial={false}
        animate={
          pathname !== "/"
            ? { y: 0 }
            : !thrushhold && !first
              ? { y: 0 }
              : !thrushhold && first
                ? { y: -100 }
                : { y: 0 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: pathname !== "/" ? "fixed" : first ? "fixed" : "absolute",
          top: !thrushhold && isBanner && pathname == "/" ? 40 : "",
          opacity:
            pathname !== "/"
              ? 1
              : first && !thrushhold && !fixedThrushhold
                ? 0
                : 1,
          left: 0,
          width: "100%",
          zIndex: 20,
        }}
      >
        <div
          className={`fill-white py-[18px] md:py-[34px] px-5 md:px-8 lg:px-12 xl:px-20 ${
            pathname !== "/"
              ? "backdrop-blur-md bg-white/70 border-b border-white/30  "
              : fixedThrushhold
                ? "backdrop-blur-md bg-white/70 border-b border-white/30 "
                : " border-b border-white/30"
          }`}
        >
          <div
            className={`m-auto flex w-full max-w-[1650px] items-center justify-between`}
          >
            <BurgerButton
              pathname={pathname}
              open={navOpen}
              setOpen={toggleNavHandler}
              thrushhold={thrushhold}
            />
            {/* <DesktopNavlinks /> */}
            {/* <MobileNavlinks open={open} setOpen={setOpen} /> */}
            <TransitionLink href={"/"} className="fill-white">
              <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <img
                  src="https://nodika-nd.com/cdn/shop/files/Nodika_logo_png_copy.png?v=1710992994&width=240"
                  alt=""
                  className={`w-[100px] md:w-[120px] ${
                    pathname !== "/"
                      ? "invert"
                      : fixedThrushhold
                        ? "invert"
                        : ""
                  }`}
                />
              </div>
            </TransitionLink>
            <div
              className={`${
                pathname !== "/"
                  ? "stroke-prim"
                  : thrushhold
                    ? "stroke-prim"
                    : "stroke-white"
              } relative cursor-pointer  `}
              onClick={toggleCartHandler}
            >
              <CartSVG size={22} />
              {totalQuantity != 0 && (
                <div className="absolute -top-1.5 -right-1.5 bg-sec text-prim w-4 h-4 rounded-full flex items-center justify-center smalll font-bold">
                  {totalQuantity}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NavBar;
