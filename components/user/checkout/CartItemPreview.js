"use client";
import { useState } from "react";

import classes from "./CartItemPreview.module.css";
import Price from "../UI/Price";

const CartItemPreview = ({ name, size, totalPrice, image, qty }) => {
  let sizeAb = "";

  if (size[0] == "x") {
    sizeAb = `${size[0].toUpperCase()}${size[1].toUpperCase()}`;
  } else {
    sizeAb = size[0].toUpperCase();
  }

  return (
    <li className={classes.item}>
      <div className={classes.left}>
        <div className={classes.imgContainer}>
          <div className={classes.circleAmount}>{qty}</div>
          <img src={image} alt="" />
        </div>

        <div className={classes.text}>
          <p>{name}</p>
          <p className={classes.size}>{sizeAb}</p>
        </div>
      </div>

      <div className={classes.right}>
        <div className={classes.totalContainer}>
          <p>
            <Price number={totalPrice} />
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItemPreview;
