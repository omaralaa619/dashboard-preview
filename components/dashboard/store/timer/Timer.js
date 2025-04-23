import React, { useState } from "react";
import Card from "../../UI/Card";
import TextInput from "../../UI/inputs/TextInput";
import classes from "../../product/ProductForm.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";

const Timer = () => {
  const [header, setHeader] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(time, date);

    try {
      const res = await fetch("/api/store", {
        method: "POST",
        body: JSON.stringify({
          header: header,
          timeLeft: `${date}T${time}`,
          type: "timer",
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const oo = await res.json();

      refetch();
    } catch (e) {
      console.log(e);
      //   toggleBanner(dispatch, e.message, "red");
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <Card>
      <p className={classes.title}>Count down</p>
      <form onSubmit={submitHandler} className="flex flex-col gap-4 p-4">
        <div className={classes.inputContainer}>
          <label className={classes.label}>Header</label>
          <TextInput
            className={classes.input}
            onChange={(e) => setHeader(e.target.value)}
            type="text"
          />
        </div>
        <div className={classes.dateItem}>
          <label className="flex flex-col">
            Date
            <input type="date" onChange={(e) => setDate(e.target.value)} />
          </label>
          <label className="flex flex-col">
            Time
            <input type="time" onChange={(e) => setTime(e.target.value)} />
          </label>
        </div>

        <div className=" flex justify-end">
          <button className={classes.submitButton}>
            {loading ? <LoadingSpinner size={16} /> : "save"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Timer;
