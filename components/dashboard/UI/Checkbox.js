import classes from "./Checkbox.module.css";
import React from "react";

const Checkbox = React.forwardRef(
  ({ value, onChange, checked, label, left, ...props }, ref) => {
    return (
      <div className={classes.container}>
        <input
          {...props}
          type="checkbox"
          value={value}
          onChange={onChange}
          checked={checked}
          ref={ref}
        />
        <span className={classes.checkmark} style={{ left: left }}></span>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
export default Checkbox;
