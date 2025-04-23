import Card from "../UI/Card";
import Skeleton from "../UI/Skeleton";
import classes from "./EditSkeleton.module.css";

const EditSkeleton = () => {
  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <Card className={classes.section}>
          <div>
            <Skeleton
              height={10}
              width={"30%"}
              rows={1}
              className={classes.sk}
            />
            <Skeleton height={20} rows={1} className={classes.sk} />
          </div>

          <div>
            <Skeleton
              height={10}
              width={"30%"}
              rows={1}
              className={classes.sk}
            />
            <Skeleton height={20} rows={1} className={classes.sk} />
          </div>
        </Card>

        <Card>
          <Skeleton height={150} rows={1} className={classes.sk} />
        </Card>

        <Card className={classes.section}>
          <div>
            <Skeleton
              height={10}
              width={"30%"}
              rows={1}
              className={classes.sk}
            />
            <Skeleton height={20} rows={1} className={classes.sk} />
          </div>

          <div>
            <Skeleton
              height={10}
              width={"30%"}
              rows={1}
              className={classes.sk}
            />
            <Skeleton height={20} rows={1} className={classes.sk} />
          </div>
          <div>
            <Skeleton
              height={10}
              width={"30%"}
              rows={1}
              className={classes.sk}
            />
            <Skeleton height={20} rows={1} className={classes.sk} />
          </div>
          <div>
            <Skeleton
              height={10}
              width={"30%"}
              rows={1}
              className={classes.sk}
            />
            <Skeleton height={20} rows={1} className={classes.sk} />
          </div>
          <div>
            <Skeleton
              height={10}
              width={"30%"}
              rows={1}
              className={classes.sk}
            />
            <Skeleton height={20} rows={1} className={classes.sk} />
          </div>
        </Card>
      </div>

      <Card className={`${classes.right} ${classes.section}`}>
        <div>
          <Skeleton rows={1} height={10} width={"50%"} className={classes.sk} />
          <Skeleton rows={1} height={30} className={classes.sk} />
        </div>

        <div>
          <Skeleton rows={1} height={10} width={"50%"} className={classes.sk} />
          <Skeleton rows={1} height={30} className={classes.sk} />
        </div>
      </Card>
    </div>
  );
};

export default EditSkeleton;
