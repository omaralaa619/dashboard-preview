import classes from "./SubmitButton.module.css";
const SubmitButton = ({ children, onclick, type, className }) => {
  return (
    <button type="submit" className={`${classes.button} ${className}`}>
      {children}
    </button>
  );
};

export default SubmitButton;
