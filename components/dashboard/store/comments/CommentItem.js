import { useState } from "react";

import classes from "../banner/BannerItem.module.css";
import { Pencil, Trash2 } from "lucide-react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";

const CommentItem = ({ comment, setStoreData, comments }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [content, setContent] = useState(comment);
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
          default: comment,
          type: "comment",
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await res.json();
      toggleBanner(dispatch, "Store updated successfully", "ok");
      setLoading(false);
      setStoreData(data);
      setIsEdit(false);
    } catch (error) {
      toggleBanner(dispatch, "Error please try again", "error");
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    if (comments.length > 1) {
      setDeleteLoading(true);

      try {
        const response = await fetch("/api/store", {
          method: "DELETE",
          body: JSON.stringify({
            content: comment,
            type: "comment",
          }),
        });

        const data = await response.json();

        setStoreData(data);
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
              defaultValue={comment}
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
          <p>{comment}</p>
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
                  comments.length > 1 ? "var(--black)" : "var(--secondaryText)"
                }
                onClick={deleteHandler}
              />
            )}
            {deleteLoading && (
              <LoadingSpinner size={18} color={"var(--black)"} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
