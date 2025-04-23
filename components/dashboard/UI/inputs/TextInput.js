import classes from "./TextInput.module.css";
import React from "react";

const TextInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`${classes.textInput} ${className}`}
      {...props}
      ref={ref}
    />
  );
});

// Set displayName for debugging purposes
TextInput.displayName = "TextInput";

export default TextInput;
