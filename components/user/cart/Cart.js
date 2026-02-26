"use client";
import { AnimatePresence, motion } from "framer-motion";
import CloseX from "@/svgs/CloseX";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-store";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, X } from "lucide-react";
import Button from "../ui/Button";

import Link from "next/link";
import Price from "../product/Price";
import CartSVG from "@/svgs/CartSVG";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.ui.cartOpen);
  const cart = useSelector((state) => state.cart);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e) => setIsDesktop(e.matches);

    setIsDesktop(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const closeHandler = () => {
    dispatch(uiActions.closeCart());
  };

  const checkoutHandler = () => {
    router.push("/checkout/delivery-info");
    dispatch(uiActions.closeCart());
  };

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [show]);

  return (
    <>
      <motion.div
        className={
          "bg-black top-0 left-0 h-[100vh] w-full fixed opacity-30 z-40 "
        }
        onClick={closeHandler}
        initial={false}
        animate={
          show
            ? { opacity: 0.5, pointerEvents: "all" }
            : { opacity: 0, pointerEvents: "none" }
        }
        transition={show ? { delay: 0.2 } : { delay: 0.5 }}
      ></motion.div>

      <motion.div
        animate={show ? { width: isDesktop ? "600px" : "96%" } : { width: 0 }}
        transition={{ delay: 0.2 }}
        className={`rounded-xl  md:flex flex-col right-[2%] fixed top-1/2 -translate-y-1/2  bg-white h-[95%] text-black z-50 origin-right  ${
          show ? "" : "pointer-events-none"
        }`}
        initial={false}
      >
        <motion.div
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={show ? { delay: 0.5, duration: 0.3 } : { duration: 0.3 }}
          className="relative flex flex-col h-full"
          initial={false}
        >
          {/* Header */}
          {cart.items.length != 0 && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center py-5 px-6">
                <p className="text-lg flex items-center gap-2">
                  Cart
                  <span className="bg-sec text-prim w-6 h-6 flex items-center justify-center rounded-full text-xs">
                    {cart.totalQuantity}
                  </span>
                </p>
                <button onClick={closeHandler} className="p-1">
                  <X size={22} />
                </button>
              </div>

              {/* Scrollable items */}
              <div className="flex-1 flex flex-col overflow-y-auto px-6 gap-5 pb-4">
                {cart.items.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </div>

              {/* Footer (sticks to bottom) */}
              <div className="p-6 border-t">
                <div className="flex justify-between text-lg">
                  <p>Total</p>
                  <Price number={cart.totalAmount} />
                </div>

                <p className="text-xs text-neutral-600">
                  Taxes and shipping calculated at checkout
                </p>
                <button
                  className="bg-sec font-bold border  text-prim  text-center rounded-full w-[100%] flex items-center justify-center mt-4 py-3 gap-3 text-base"
                  onClick={checkoutHandler}
                >
                  <LockKeyhole size={20} /> Checkout
                </button>
              </div>
            </div>
          )}

          {cart.items.length == 0 && (
            <>
              <button onClick={closeHandler} className="ml-auto m-10">
                <X size={22} />
              </button>
              <div className="flex flex-col h-full justify-center items-center gap-6">
                <div className="stroke-black relative w-fit">
                  <CartSVG size={48} stroke={1} />
                  <div className="absolute -top-1.5 -right-1.5 bg-sec text-prim w-6 h-6 rounded-full flex items-center justify-center text-xs  font-bold">
                    {cart.totalQuantity}
                  </div>
                </div>
                <p className="text-lg">Your cart is empty</p>
                <button
                  onClick={closeHandler}
                  className="bg-sec font-bold border  text-prim  text-center rounded-full  flex items-center justify-center  py-4 px-6 gap-3 text-base"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Cart;
