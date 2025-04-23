import React, { useState } from "react";
import classes from "./Banner.module.css";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import BannerItem from "./BannerItem";
import TextInput from "../../UI/inputs/TextInput";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";

const Banner = ({ banner, refetch }) => {
  const [showForm, setShowForm] = useState(false);
  const [newBanner, setNewBanner] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch("/api/store", {
        method: "POST",
        body: JSON.stringify({
          content: newBanner,
          type: "banner",
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const oo = await res.json();

      refetch();

      setLoading(false);
      toggleBanner(dispatch, "Store updated successfully", "ok");
    } catch (error) {
      toggleBanner(dispatch, "Error please try again", "error");
    }
  };

  const showHandler = async (value) => {
    try {
      const res = await fetch("/api/store", {
        method: "PUT",
        body: JSON.stringify({
          value,
          type: "banner-show",
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const oo = await res.json();
      toggleBanner(dispatch, "Store updated successfully", "ok");
      refetch();
    } catch (error) {
      toggleBanner(dispatch, "Error please try again", "error");
    }
  };

  return (
    <div className={classes.main}>
      <Card className={classes.card}>
        <div className={classes.titleContainer}>
          <h3 className={classes.title}>Banner</h3>
          <label className={classes.switch}>
            <input
              type="checkbox"
              onChange={(e) => showHandler(e.target.checked)}
              defaultChecked={banner.show}
            />
            <span className={`${classes.round} ${classes.slider}`}></span>
          </label>
        </div>

        <div>
          {banner.content.map((item, index) => (
            <BannerItem
              item={item}
              key={index}
              banner={banner}
              refetch={refetch}
            />
          ))}
        </div>

        {showForm && (
          <form className={classes.new} onSubmit={submitHandler}>
            <div className="flex flex-col gap-2">
              <label>Title</label>
              <input
                onChange={(e) => setNewBanner(e.target.value)}
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

export default Banner;
