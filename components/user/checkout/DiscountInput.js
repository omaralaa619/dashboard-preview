import { useState } from "react";
import classes from "./DiscountInput.module.css";
import LoadingSpinner from "@/components/dashboard/UI/LoadingSpinner";
const DiscountInput = ({ totalAmount, totalQuantity, setDiscount }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/discounts/code", {
        method: "POST",
        body: JSON.stringify({
          totalAmount,
          totalQuantity,
          code,
        }),
      });
      const data = await response.json();
      console.log("doscount", data);

      if (data) {
        setDiscount(...data);
      }
      if (!data) {
        setDiscount(null);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <form onSubmit={submitHandler} className={classes.discount}>
      <input
        onChange={(e) => setCode(e.target.value)}
        className={classes.input}
        type="text"
      />

      <button type="submit" className={classes.button}>
        {!loading && <p>Apply</p>}
        {loading && <LoadingSpinner size={18} />}
      </button>
    </form>
  );
};

export default DiscountInput;
