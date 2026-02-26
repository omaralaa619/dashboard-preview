import classes from "./ListItem.module.css";
const ListItem = ({ item, max }) => {
  const progress = (item.col1 / max) * 100;
  return (
    <div className={classes.main}>
      <div className={classes.inner}>
        <div
          className={classes.progress}
          style={{ width: `${progress}%` }}
        ></div>
        <p>{item.col0}</p>
        <p>{item.col1}</p>
      </div>
    </div>
  );
};

export default ListItem;
