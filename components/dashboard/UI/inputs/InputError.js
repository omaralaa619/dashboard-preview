import classes from "./InputError.module.css";

const InputError = ({ children, style }) => {
  return (
    <p className={classes.message} style={style}>
      {children}
    </p>
  );
};

export default InputError;
