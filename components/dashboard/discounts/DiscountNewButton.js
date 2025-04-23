import { adminUiActions } from "@/store/admin-ui-store";
import React from "react";
import { useDispatch } from "react-redux";

const DiscountNewButton = () => {
  const dispatch = useDispatch();

  const modalHandler = () => {
    dispatch(adminUiActions.toggleDiscountModal());
  };
  return (
    <button onClick={modalHandler} className="DashbardProductPageButton">
      New Discount
    </button>
  );
};

export default DiscountNewButton;
