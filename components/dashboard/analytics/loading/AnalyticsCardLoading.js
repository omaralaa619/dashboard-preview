import Card from "../../UI/Card";
import Skeleton from "../../UI/Skeleton";
import classes from "./AnalyticsCardSkeleton.module.css";

const AnalyticsCardLoading = () => {
  return (
    <Card>
      <Skeleton rows={1} height={15} />

      <div className={classes.middle}>
        <Skeleton rows={1} height={15} width={"35%"} />
      </div>
      <Skeleton rows={1} height={210} />
    </Card>
  );
};

export default AnalyticsCardLoading;
