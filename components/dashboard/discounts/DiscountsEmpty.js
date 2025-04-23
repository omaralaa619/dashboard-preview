"use client";
import DiscountBannerSvg from "@/svgs/DiscountBannerSvg";
import classes from "./DiscountsEmpty.module.css";
import Card from "../UI/Card";
import ModalGen from "../UI/ModalGen";
import { useState } from "react";
import DiscountModal from "./DiscountModal";
import { useDispatch, useSelector } from "react-redux";
import { adminUiActions } from "@/store/admin-ui-store";

const DiscountsEmpty = () => {
  const dispatch = useDispatch();

  const modalHandler = () => {
    dispatch(adminUiActions.toggleDiscountModal());
  };
  return (
    <>
      <div className={classes.container}>
        <DiscountBannerSvg />
        <p className={classes.title}>Manage discounts and promotions</p>
        <p className={classes.subtitle}>
          Create discount codes and automatic discounts that apply at checkout.
          You can also use discounts with compare at prices.
        </p>

        <button onClick={modalHandler} className={classes.button}>
          Create Discount
        </button>
      </div>
    </>
  );
};

export default DiscountsEmpty;
