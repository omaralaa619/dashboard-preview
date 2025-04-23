import Completed from "@/components/user/checkout/Completed";
import classes from "../../../../components/user/checkout/pageStyles/completed.module.css";
const page = () => {
  return (
    <div className={classes.root}>
      <Completed />
    </div>
  );
};

export default page;
