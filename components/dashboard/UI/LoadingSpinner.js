import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ color, size, dark }) => {
  return (
    <span
      className={`${classes.loader} ${dark ? classes.dark : classes.light}`}
      style={{
        width: size,
        height: size,

        borderBottomColor: "transparent",
      }}
    ></span>
  );
};

export default LoadingSpinner;
