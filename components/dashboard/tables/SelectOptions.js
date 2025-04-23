import DeleteSVG from "@/svgs/DeleteSVG";
import ComboBox from "../UI/ComboBox";
import classes from "./SelectOptions.module.css";
import { useState } from "react";
import Modal from "../UI/Modal";

import CheckSVG from "@/svgs/CheckSVG";
import Banner from "../UI/Banner";
import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";

const SelectOptions = ({ checkedOrders, fetchOrders, setCheckedOrders }) => {
  const dispatch = useDispatch();
  const [deleteModal, setDeleteModal] = useState(false);
  const [fulfillModal, setFulfillModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteModalHandler = () => {
    setDeleteModal(true);
  };

  const fulfillModalHandler = () => {
    setFulfillModal(true);
  };

  const fulfillHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkedOrders),
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    fetchOrders();
    setFulfillModal(false);
    setLoading(false);
    setCheckedOrders([]);
    toggleBanner(dispatch, "Order(s) fulfilled successfuly", "#00431b");
  };

  const deleteHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkedOrders),
      });
      const response = await res.json();
      console.log(response);
      fetchOrders();
      toggleBanner(dispatch, "Order(s) deleted successfully", "#00431b");
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
      title: "Fulfill",
      svg: <CheckSVG />,
      action: fulfillModalHandler,
    },
    {
      title: "Delete",
      svg: <DeleteSVG />,
      action: deleteModalHandler,
    },
  ];
  return (
    <>
      <Modal
        title={"Delete selected orders"}
        subtitle={
          "Are you sure you want to delete selected orders? This action cannot be undone"
        }
        closeHandler={() => setDeleteModal(false)}
        ctaStyle={classes.deleteButton}
        ctaTitle={"Delete"}
        action={deleteHandler}
        loading={loading}
        open={deleteModal}
      />

      <Modal
        title={"Fulfill selected orders"}
        subtitle={
          "Are you sure you want to fulfill selected orders? This action cannot be undone"
        }
        closeHandler={() => setFulfillModal(false)}
        ctaStyle={classes.deliverButton}
        ctaTitle={"Fulfill"}
        action={fulfillHandler}
        loading={loading}
        open={fulfillModal}
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

export default SelectOptions;
