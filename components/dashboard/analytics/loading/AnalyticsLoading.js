import { usePathname } from "next/navigation";
import AnalyticsCardLoading from "./AnalyticsCardLoading";
import classes from "./AnalyticsLoadin.module.css";

const AnalyticsLoading = () => {
  let pathname = usePathname();
  return (
    <div className={classes.main}>
      <div>
        <AnalyticsCardLoading />
      </div>
      <div className={`${pathname != "/dashboard" ? "" : classes.noneMobile}`}>
        <AnalyticsCardLoading />
      </div>
      <div className={`${pathname != "/dashboard" ? "" : classes.noneMobile}`}>
        <AnalyticsCardLoading />
      </div>

      {pathname != "/dashboard" && (
        <>
          <AnalyticsCardLoading />
          <AnalyticsCardLoading />
          <AnalyticsCardLoading />
        </>
      )}
    </div>
  );
};

export default AnalyticsLoading;
