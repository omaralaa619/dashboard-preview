import { useState } from "react";
import classes from "./DiscountInput.module.css";
import LoadingSpinner from "@/components/dashboard/UI/LoadingSpinner";
const DiscountInput = ({
  totalAmount,
  totalQuantity,
  setDiscount,
  setDiscountError,
  cart,
}) => {
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
          cart,
        }),
      });

      const data = await response.json();
      console.log("discount", data);

      if (data?.error) {
        // If API returns error
        setDiscount(null);
        setDiscountError(data.error); // pass error up to CartPreview
      } else if (data) {
        // Valid discount
        setDiscount(...data);
        setDiscountError(null); // clear error
      } else {
        setDiscount(null);
        setDiscountError("No valid discount found."); // fallback error
      }
    } catch (error) {
      console.log(error);
      setDiscountError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className={classes.discount}>
      <div className={classes.group}>
        <input
          className={`${classes.input} ${code ? classes.filled : ""}`}
          onChange={(e) => setCode(e.target.value)}
          type="text"
        />
        <label className={classes.label}>Discount Code</label>
      </div>

      <button onClick={submitHandler} type="button" className={classes.button}>
        {!loading && <p>Apply</p>}
        {loading && <LoadingSpinner size={18} />}
      </button>
    </div>
  );
};

export default DiscountInput;
