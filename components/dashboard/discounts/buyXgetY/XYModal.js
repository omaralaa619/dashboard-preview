import React, { useState } from "react";
import ModalGen from "../../UI/ModalGen";
import classes from "../DiscountModal.module.css";
import CloseX from "@/svgs/CloseX";
import ProductsTable from "../../tables/products/ProductsTable";

const XYModal = ({ modal, setModal }) => {
  const closeHandler = () => {
    setModal(false);
  };
  return (
    <ModalGen open={modal} className={classes.root} closeModal={closeHandler}>
      <div className={classes.top}>
        <p>Select discount type</p>
        <button type="button" className={classes.close} onClick={closeHandler}>
          <CloseX />
        </button>
      </div>

      <div></div>
    </ModalGen>
  );
};

export default XYModal;
