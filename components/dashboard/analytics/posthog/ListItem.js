import classes from "./ListItem.module.css";
const ListItem = ({ item, max }) => {
  const progress = (item.count / max) * 100;
  return (
    <div className={classes.main}>
      <div className={classes.inner}>
        <div
          className={classes.progress}
          style={{ width: `${progress}%` }}
        ></div>
        <p>{item.group}</p>
        <p>{item.count}</p>
      </div>
    </div>
  );
};

export default ListItem;
