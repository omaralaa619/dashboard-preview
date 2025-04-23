import DeleteSVG from "@/svgs/DeleteSVG";
import ComboBox from "../UI/ComboBox";
import classes from "./SelectOptions.module.css";
import { useState } from "react";
import Modal from "../UI/Modal";

import CheckSVG from "@/svgs/CheckSVG";
import Banner from "../UI/Banner";
import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";

const SelectOptionsDiscounts = ({
  checkedOrders,
  fetchOrders,
  setCheckedOrders,
}) => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const deleteModalHandler = () => {
    setDeleteModal(true);
  };

  const deleteHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/discounts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkedOrders),
      });
      const response = await res.json();
      console.log(response);
      fetchOrders();
      toggleBanner(dispatch, "Discount(s) deleted successfully", "#00431b");
    } catch (error) {
      console.log(error);
      toggleBanner(dispatch, "Error occured please try again.", "red");
    }
    setDeleteModal(false);
    setLoading(false);
    setCheckedOrders([]);
  };
  const dropownItems = [
    {
      title: "Delete",
      svg: <DeleteSVG />,
      action: deleteModalHandler,
    },
  ];
  return (
    <>
      <Modal
        title={"Delete selected discount(s)"}
        subtitle={
          "Are you sure you want to delete selected discount(s)? This action cannot be undone"
        }
        closeHandler={() => setDeleteModal(false)}
        ctaStyle={classes.deleteButton}
        ctaTitle={"Delete"}
        action={deleteHandler}
        loading={loading}
        open={deleteModal}
      />

      <div className={classes.customSelect}>
        <ComboBox
          title={"More Actions"}
          dropdownItems={dropownItems}
          gap={"8px"}
          className={checkedOrders.length == 0 ? classes.pointerEvents : ""}
        />
      </div>
    </>
  );
};

export default SelectOptionsDiscounts;
