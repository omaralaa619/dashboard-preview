import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ color, size }) => {
  return (
    <span
      className={classes.loader}
      style={{
        width: size,
        height: size,
        borderColor: color,
        borderBottomColor: "transparent",
      }}
    ></span>
  );
};

export default LoadingSpinner;
