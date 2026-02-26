"use client";
import { useState } from "react";

import classes from "./CartItemPreview.module.css";
import Price from "../ui/Price";

const CartItemPreview = ({
  name,
  size,
  totalPrice,
  image,
  qty,
  color,
  discount,
  id,
  price,
}) => {
  return (
    <li className={classes.item}>
      <div className={classes.left}>
        <div className={classes.imgContainer}>
          <div className={classes.circleAmount}>{qty}</div>
          <img src={image} alt="" />
        </div>

        <div className={classes.text}>
          <p>{name}</p>
          <p className={classes.size}>
            {size} {color && `/ ${color}`}
          </p>
        </div>
      </div>

      <div className={classes.right}>
        <div className={classes.totalContainer}>
          <div className="relative">
            <Price number={totalPrice} />
            {discount?.productsToDiscount?.some((d) => d.id === id) && (
              <div className="w-full h-[1px] bg-black absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            )}
          </div>

          {discount?.productsToDiscount?.some((d) => d.id === id) &&
            (() => {
              // Find discount quantity for this id
              const discountObj = discount?.productsToDiscount?.find(
                (d) => d.id === id,
              );
              let discountedQty = discountObj ? discountObj.qty : 0;
              let discountedTotal = totalPrice - discountedQty * price;
              if (discountedTotal <= 0) {
                return <p className="text-neutral-600">Free</p>;
              } else {
                return (
                  <p className="text-neutral-600">
                    <Price number={discountedTotal} />
                  </p>
                );
              }
            })()}
        </div>
      </div>
    </li>
  );
};

export default CartItemPreview;
