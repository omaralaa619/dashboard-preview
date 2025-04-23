"use client";
import DeliveryInfo from "@/components/user/checkout/DeliveryInfo";

import classes from "../checkout/pageStyles/deliverInfoPage.module.css";

import CartPreview from "@/components/user/checkout/CartPreview";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import LynneSVG from "@/svgs/LynneSVG";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const [discount, setDiscount] = useState({});

  const fetchDiscounts = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/discounts/automatic", {
        method: "POST",
        body: JSON.stringify({
          totalAmount: cartItems.totalAmount,
          totalQuantity: cartItems.totalQuantity,
        }),
      });
      const data = await response.json();

      if (data) {
        setDiscount(...data);
      }
      if (!data) {
        setDiscount(null);
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
    <div>
      <div className="flex justify-center p-5 border-b border-neutral-300">
        <Link href={"/"}>
          <LynneSVG />
        </Link>
      </div>
      <div className={classes.pageContainer}>
        <DeliveryInfo discount={discount} />
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
