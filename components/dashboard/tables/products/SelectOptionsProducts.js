import DeleteSVG from "@/svgs/DeleteSVG";
import ComboBox from "../../UI/ComboBox";
import classes from "../SelectOptions.module.css";
import { useState } from "react";
import Modal from "../../UI/Modal";
import ShipSVG from "@/svgs/ShipSVG";
import Archive from "@/svgs/Archive";
import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";
const SelectOptionsProducts = ({ checkedProducts, fetchProducts, status }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [archiveModal, setArchiveModal] = useState(false);
  const [unarchiveModal, setUnarchiveModal] = useState(false);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const deleteModalHandler = () => {
    setDeleteModal(true);
  };
  const archiveModalHandler = () => {
    setArchiveModal(true);
  };
  const unarchiveModalHandler = () => {
    setUnarchiveModal(true);
  };

  const archiveHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkedProducts,
          archivedStatus: "archived",
        }),
      });
      const response = await res.json();
      console.log(response);
      fetchProducts();
      toggleBanner(dispatch, "Product(s) archived successfully.", "#00431b");
    } catch (error) {
      console.log(error);
      toggleBanner(dispatch, "Error occured please try again.", "red");
    }
    setArchiveModal(false);
    setLoading(false);
  };

  const unarchiveHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkedProducts,
          archivedStatus: "active",
        }),
      });
      const response = await res.json();
      console.log(response);
      toggleBanner(dispatch, "Product(s) unarchived successfully.", "#00431b");
    } catch (error) {
      console.log(error);
      toggleBanner(dispatch, "Error occured please try again.", "red");
    }
    fetchProducts();
    setUnarchiveModal(false);
    setLoading(false);
  };
  const deleteHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkedProducts),
      });
      const response = await res.json();
      console.log(response);
      fetchProducts();
      toggleBanner(dispatch, "Product(s) deleted successfully.", "#00431b");
    } catch (error) {
      console.log(error);
      toggleBanner(dispatch, "Error occured please try again.", "red");
    }
    setDeleteModal(false);
    setLoading(false);
  };

  const dropownItems = [
    {
      title: "Archive",
      svg: <Archive />,
      action: archiveModalHandler,
    },
    {
      title: "Unarchive",
      svg: <Archive />,
      action: unarchiveModalHandler,
    },
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

      <Modal
        title={"archive selected products"}
        subtitle={"Are you sure you want to archive selected product(s)? "}
        closeHandler={() => setArchiveModal(false)}
        ctaStyle={classes.deliverButton}
        ctaTitle={"archive"}
        action={archiveHandler}
        loading={loading}
        open={archiveModal}
      />

      <Modal
        title={"unarchive selected products"}
        subtitle={"Are you sure you want to unarchive selected product(s)? "}
        closeHandler={() => setUnarchiveModal(false)}
        ctaStyle={classes.deliverButton}
        ctaTitle={"unarchive"}
        action={unarchiveHandler}
        loading={loading}
        open={unarchiveModal}
      />

      <div className={classes.customSelect}>
        <ComboBox
          title={"More Actions"}
          dropdownItems={[dropownItems[comboBoxFirstItem], dropownItems[2]]}
          gap={"8px"}
          className={checkedProducts.length == 0 ? classes.pointerEvents : ""}
        />
      </div>
    </>
  );
};

export default SelectOptionsProducts;
