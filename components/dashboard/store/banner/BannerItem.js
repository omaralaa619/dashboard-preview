import { useState } from "react";

import classes from "./BannerItem.module.css";
import { Pencil, Trash2 } from "lucide-react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";
import { set } from "mongoose";

const BannerItem = ({ item, banner, setStoreData }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [content, setContent] = useState(item);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/store", {
        method: "PUT",
        body: JSON.stringify({
          content,
          default: item,
          type: "banner",
        }),
        headers: {
          "content-Type": "application/json",
        },
      });

      const data = await res.json();

      toggleBanner(dispatch, "Store updated successfully", "ok");

      setStoreData(data);

      setLoading(false);
      setIsEdit(false);
    } catch (error) {
      toggleBanner(dispatch, "Error please try again", "error");
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (banner.content.length > 1) {
      setDeleteLoading(true);

      try {
        const response = await fetch("/api/store", {
          method: "DELETE",
          body: JSON.stringify({
            content: item,
            type: "banner",
          }),
        });

        const data = await response.json();
        setStoreData(data);

        // Update parent state to remove item without refetching
        toggleBanner(dispatch, "Store updated successfully", "ok");
        if (removeBannerItem) removeBannerItem(item);
      } catch (error) {
        console.log(error);
      }
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className={classes.item}>
        {isEdit ? (
          <form onSubmit={submitHandler}>
            <input
              className={classes.input}
              type="text"
              defaultValue={item}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex gap-2 items-center">
              <button className={classes.button}>
                {loading ? <LoadingSpinner size={16} /> : "Update"}
              </button>
              <button
                type="button"
                onClick={() => setIsEdit(false)}
                className={`${classes.button} ${classes.cancel}`}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p>{item}</p>
        )}

        {!isEdit && (
          <div className="flex gap-2">
            <div onClick={() => setIsEdit(true)} className="cursor-pointer">
              <Pencil size={20} strokeWidth={1.25} />
            </div>

            {!deleteLoading && (
              <Trash2
                size={20}
                strokeWidth={1.25}
                color={
                  banner.content.length > 1
                    ? "var(--black)"
                    : "var(--secondaryText)"
                }
                onClick={deleteHandler}
                className={`${
                  banner.content.length > 1 ? "cursor-pointer" : ""
                }`}
              />
            )}
            {deleteLoading && <LoadingSpinner size={18} dark={true} />}
          </div>
        )}
      </div>
    </>
  );
};

export default BannerItem;
