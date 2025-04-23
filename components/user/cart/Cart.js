"use client";
import { AnimatePresence, motion } from "framer-motion";
import CloseX from "@/svgs/CloseX";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/store/ui-store";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import CartItem2 from "./CartItem2";
import Button from "../UI/Button";
import Price from "../UI/Price";
import Link from "next/link";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const show = useSelector((state) => state.ui.cartOpen);
  const cart = useSelector((state) => state.cart);

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
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-full h-full bg-black/60 z-10 "
            onClick={closeHandler}
          ></motion.div>
          <motion.div
            className="fixed right-0 top-0 w-[400px] max-w-[95%] h-full  bg-white  overflow-y-scroll flex flex-col z-20 mb-10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "ease" }}
          >
            <div className="flex justify-between items-center relative p-2 border-b border-neutral-400 ">
              <button onClick={closeHandler} className="p-1">
                <X />
              </button>
              <p className="text-lg font-medium ">cart</p>
              <p className="text-sm">{cart.totalQuantity} Item(s)</p>
            </div>

            {cart.items.length != 0 && (
              <div className="flex flex-col ">
                {cart.items.map((item) => (
                  <CartItem item={item} key={item.id} />
                ))}
              </div>
            )}
            {/* <div className="flex flex-col gap-10">
              {cart.items.map((item) => (
                <CartItem2 item={item} key={item.id} />
              ))}
            </div> */}

            {cart.items.length != 0 && (
              <div className="mx-4 flex flex-col gap-3 text-lg mt-8 pb-5 border-b border-neutral-400/50">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <Price number={cart.totalAmount} />
                </div>
                <div className="flex justify-between text-sm text-neutral-700">
                  <p>Shipping</p>
                  <p>Calculated at checkout</p>
                </div>
              </div>
            )}

            {cart.items.length != 0 && (
              <div className="mx-4 mt-5 flex flex-col gap-4">
                <div className="flex justify-between text-xl font-medium">
                  <p>Total</p>
                  <Price number={cart.totalAmount} />
                </div>

                <Link href={"/checkout/delivery-info"}>
                  <Button
                    className={
                      "rounded-sm bg-prim border border-prim text-white w-full"
                    }
                    onClick={closeHandler}
                  >
                    Checkout
                  </Button>
                </Link>
              </div>
            )}

            {cart.items.length == 0 && (
              <div className="flex justify-center items-center h-full">
                <p className="text-center text-2xl ">Your cart is empty</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
