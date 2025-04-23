import classes from "./Skeleton.module.css";
const Skeleton = ({ rows, className, height, width }) => {
  return (
    <div>
      {Array.from({ length: rows }, (value, index) => (
        <div
          key={index}
          className={`${classes.skeleton} ${className}`}
          style={{ height: height, width: width }}
        >
          <div className={classes.skeletonWhiteness}></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
