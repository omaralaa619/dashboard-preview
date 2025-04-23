import Skeleton from "../../UI/Skeleton";
import classes from "./ProductsTableLoading.module.css";

const ProductTableLoading = () => {
  return (
    <>
      <div className={classes.sMain}>
        <div className={classes.imgSkeleton}>
          <Skeleton rows={1} height={80} />
        </div>

        <div className={classes.textSkeleton}>
          <Skeleton rows={1} />
        </div>
      </div>
      <div className={classes.sMain}>
        <div className={classes.imgSkeleton}>
          <Skeleton rows={1} height={80} />
        </div>

        <div className={classes.textSkeleton}>
          <Skeleton rows={1} />
        </div>
      </div>
      <div className={classes.sMain}>
        <div className={classes.imgSkeleton}>
          <Skeleton rows={1} height={80} />
        </div>

        <div className={classes.textSkeleton}>
          <Skeleton rows={1} />
        </div>
      </div>
      <div className={classes.sMain}>
        <div className={classes.imgSkeleton}>
          <Skeleton rows={1} height={80} />
        </div>

        <div className={classes.textSkeleton}>
          <Skeleton rows={1} />
        </div>
      </div>
    </>
  );
};

export default ProductTableLoading;
