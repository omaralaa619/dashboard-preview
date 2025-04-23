import Card from "../../UI/Card";
import Skeleton from "../../UI/Skeleton";
import classes from "./AnalyticsPH.module.css";

const LoadingSkeleton = () => {
  return (
    <div className={classes.main}>
      <div>
        <Skeleton />
        <Skeleton height={10} width={90} />
        <Card>
          <div className={classes.firstHeader}>
            <div className={classes.firstInner}>
              <Skeleton rows={2} height={10} width={100} />
            </div>
          </div>
          <div className={classes.chart}>
            <Skeleton rows={1} height={200} />
          </div>
        </Card>
      </div>

      <div className={classes.second}>
        <Card className={classes.block}>
          <div className={classes.header} style={{ padding: 0 }}>
            <Skeleton rows={1} height={15} width={100} />
            <Skeleton rows={1} height={10} width={100} />
          </div>
          <div className={classes.list}>
            <Skeleton rows={6} />
          </div>
        </Card>
        <Card className={classes.block}>
          <div className={classes.header} style={{ padding: 0 }}>
            <Skeleton rows={1} height={15} width={100} />
            <Skeleton rows={1} height={10} width={100} />
          </div>
          <div className={classes.list}>
            <Skeleton rows={6} />
          </div>
        </Card>
      </div>

      <div className={classes.third}>
        <Card className={classes.block}>
          <div className={classes.header} style={{ padding: 0 }}>
            <Skeleton rows={1} height={15} width={100} />
            <Skeleton rows={1} height={10} width={100} />
          </div>
          <div className={classes.list}>
            <Skeleton rows={6} />
          </div>
        </Card>
        <Card className={classes.block}>
          <div className={classes.header} style={{ padding: 0 }}>
            <Skeleton rows={1} height={15} width={100} />
            <Skeleton rows={1} height={10} width={100} />
          </div>
          <div className={classes.list}>
            <Skeleton rows={6} />
          </div>
        </Card>
        <Card className={classes.block}>
          <div className={classes.header} style={{ padding: 0 }}>
            <Skeleton rows={1} height={15} width={100} />
            <Skeleton rows={1} height={10} width={100} />
          </div>
          <div className={classes.list}>
            <Skeleton rows={6} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
