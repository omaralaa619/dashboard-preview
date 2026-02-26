import React, { useState } from "react";
import classes from "../banner/Banner.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";

import TextInput from "../../UI/inputs/TextInput";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";
import CommentItem from "./CommentItem";

const Comments = ({ comments, setStoreData }) => {
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/store", {
        method: "POST",
        body: JSON.stringify({
          content: comment,
          type: "comment",
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const oo = await res.json();

      setStoreData(oo);
      setShowForm(false);

      setLoading(false);
      toggleBanner(dispatch, "Store updated successfully", "ok");
    } catch (error) {
      toggleBanner(dispatch, "Error please try again", "error");
    }
  };

  return (
    <div className={classes.main}>
      <Card className={classes.card}>
        <div className={classes.titleContainer}>
          <h3 className={classes.title}>Banner</h3>
        </div>

        <div>
          {comments.map((comment, index) => (
            <CommentItem
              comment={comment}
              key={index}
              setStoreData={setStoreData}
              comments={comments}
            />
          ))}
        </div>

        {showForm && (
          <form className={classes.new} onSubmit={submitHandler}>
            <div className="flex flex-col gap-2">
              <label>Text</label>
              <input
                onChange={(e) => setComment(e.target.value)}
                className={classes.input}
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <button className={classes.button}>
                {loading ? <LoadingSpinner size={16} /> : "Add"}
              </button>
              <button
                type="button"
                className={`${classes.button} ${classes.cancel}`}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!showForm && (
          <p className={classes.add} onClick={() => setShowForm(true)}>
            Add Item +
          </p>
        )}
      </Card>
    </div>
  );
};

export default Comments;
