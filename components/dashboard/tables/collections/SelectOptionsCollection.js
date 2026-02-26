import DeleteSVG from "@/svgs/DeleteSVG";
import ComboBox from "../../UI/ComboBox";
import classes from "../SelectOptions.module.css";
import { useState } from "react";
import Modal from "../../UI/Modal";
import ShipSVG from "@/svgs/ShipSVG";
import Archive from "@/svgs/Archive";
import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";
const SelectOptionsCollection = ({
  checkedCollections,
  fetchCollections,
  status,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const deleteModalHandler = () => {
    setDeleteModal(true);
  };

  const deleteHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/collections", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkedCollections),
      });
      const response = await res.json();
      console.log(response);
      fetchCollections();
      toggleBanner(dispatch, "Collection(s) deleted successfully.", "#00431b");
    } catch (error) {
      console.log(error);
      toggleBanner(dispatch, "Error occured please try again.", "red");
    }
    setDeleteModal(false);
    setLoading(false);
  };

  const dropownItems = [
    {
      title: "Delete",
      svg: <DeleteSVG />,
      action: deleteModalHandler,
    },
  ];

  let comboBoxFirstItem = 0;
  status == "archived" ? (comboBoxFirstItem = 1) : (comboBoxFirstItem = 0);

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

      <div className={classes.customSelect}>
        <ComboBox
          title={"More Actions"}
          dropdownItems={dropownItems}
          gap={"8px"}
          className={`${
            checkedCollections.length == 0 ? classes.pointerEvents : ""
          } ${classes.comboBox}`}
        />
      </div>
    </>
  );
};

export default SelectOptionsCollection;
