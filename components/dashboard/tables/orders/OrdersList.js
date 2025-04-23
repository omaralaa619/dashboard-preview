import Link from "next/link";
import classes from "./OrdersList.module.css";
import Checkbox from "../../UI/Checkbox";
import Price from "@/components/user/UI/Price";

const OrdersList = ({
  orders,
  handleCheckboxes,
  checkedOrders,
  allHandler,
}) => {
  return (
    <>
      <div>
        <div className={`${classes.row} ${classes.header}`}>
          <div className={classes.checkable}>
            <label className={classes.container}>
              Customer
              <Checkbox
                value={"all"}
                onChange={allHandler}
                checked={
                  orders.length == checkedOrders.length && orders.length != 0
                }
              />
            </label>
          </div>

          <Link href={"#"}>
            <p>Date</p>

            <p>Status</p>
            <p>Total</p>
          </Link>
        </div>
      </div>
      <div>
        {orders.map((order) => (
          <div key={order._id} className={classes.row}>
            <div className={classes.checkable}>
              <label className={` ${classes.checkable} ${classes.container}`}>
                <p>{order.address.name}</p>

                <Checkbox
                  value={order._id}
                  onChange={handleCheckboxes}
                  checked={checkedOrders.includes(order._id)}
                />
              </label>
              <p className={classes.mobDate}>
                {new Date(order.date).toLocaleDateString("en-US")}
              </p>
            </div>

            <Link href={`/dashboard/orders/${order._id}`}>
              <p className={classes.date}>
                {new Date(order.date).toLocaleDateString("en-US")}
              </p>

              <div className={classes.statusAmount}>
                <div className={classes.status}>
                  <div className={classes.statusText}>
                    {order.status ? "Fulfilled" : "Unfulfilled"}
                    <div
                      className={`${classes.statusDot} ${
                        order.status ? "" : classes.unfulfilled
                      }`}
                    ></div>
                  </div>
                </div>

                <p className={classes.total}>
                  <Price number={order.cart.totalAmount} />
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrdersList;
