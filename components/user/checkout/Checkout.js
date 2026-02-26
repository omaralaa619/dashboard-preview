"use client";
import DeliveryInfo from "@/components/user/checkout/DeliveryInfo";

import classes from "../checkout/pageStyles/deliverInfoPage.module.css";

import CartPreview from "@/components/user/checkout/CartPreview";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import LynneSVG from "@/svgs/LynneSVG";
import LogoSVG from "@/svgs/LogoSVG";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState({});

  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const fetchDiscounts = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/discounts/automatic", {
        method: "POST",
        body: JSON.stringify({
          totalAmount: cartItems.totalAmount,
          totalQuantity: cartItems.totalQuantity,
          cart: cartItems,
        }),
      });
      const data = await response.json();

      if (data?.error) {
        // If API returns error
        setDiscount(null);
        setDiscountError(data.error); // pass error up to CartPreview
      } else if (data) {
        // Valid discount
        setDiscount(...data);
        setDiscountError(null); // clear error
      } else {
        setDiscount(null);
        setDiscountError("No valid discount found."); // fallback error
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);
  return (
    <div className={classes.logo}>
      <div className="flex justify-center px-5 py-2 border-b border-neutral-300 min-h-[102px]">
        <Link href={"/"}>
          <LogoSVG />
        </Link>
      </div>
      {/* headerHeight is now available for use */}
      <div className={classes.pageContainer}>
        <DeliveryInfo
          discount={discount}
          discountLoading={loading}
          setDiscount={setDiscount}
        />

        <CartPreview
          discount={discount}
          setDiscount={setDiscount}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Checkout;
