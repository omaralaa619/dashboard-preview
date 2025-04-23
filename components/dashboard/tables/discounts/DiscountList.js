import classes from "../orders/OrdersList.module.css";
import Link from "next/link";
import Checkbox from "../../UI/Checkbox";

const DiscountList = ({
  discounts,
  handleCheckboxes,
  checkedDiscounts,
  allHandler,
}) => {
  return (
    <>
      <div>
        <div className={`${classes.row} ${classes.header}`}>
          <div className={classes.checkable}>
            <label className={classes.container}>
              Discount
              <Checkbox
                onChange={allHandler}
                value={"all"}
                checked={
                  discounts.length == checkedDiscounts.length &&
                  discounts.length != 0
                }
              />
            </label>
          </div>

          <Link href={"#"} className={classes.rest}>
            <p>Type</p>
            <p>Amount</p>

            <p>Used</p>
          </Link>
        </div>
      </div>
      <div>
        {discounts.map((discount) => (
          <div key={discount._id} className={classes.row}>
            <div className={classes.checkable}>
              <label className={` ${classes.checkable} ${classes.container}`}>
                <p>
                  {discount.method == "code" ? discount.code : discount.name}
                </p>
                <Checkbox
                  value={discount._id}
                  onChange={handleCheckboxes}
                  checked={checkedDiscounts.includes(discount._id)}
                />
              </label>
              <p className={classes.mobDate}>{discount.discountType}</p>
            </div>

            <Link
              href={`/dashboard/discounts/${discount._id}?type=${discount.discountType}`}
            >
              <p className={classes.date}>
                {discount.discountType == "offOrder" ? "Off order" : "Shipping"}
              </p>

              <div className={classes.statusAmount}>
                <p>
                  {discount.value}
                  {discount.valueType == "percentage" ? "% " : ".LE"}
                </p>

                <p className={classes.total}>{discount.used}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default DiscountList;

// <Link
// href={`/dashboard/discounts/${discount._id}?type=${discount.discountType}`}
// >
// <div key={discount._id} className={classes.orderItem}>
//   <div className={classes.idDate}>
//     <label className={classes.container}>

//       <p className={classes.id}>{discount.name}</p>
//       <  input
//         type="checkbox"
//         value={discount._id}
//         onChange={handleCheckboxes}
//         checked={checkedDiscounts.includes(discount._id)}
//       />
//       <span className={classes.checkmark}></span>
//     </label>

//     <p>
//       {new Date(discount.startDateTime).toLocaleDateString("en-US")}
//     </p>
//   </div>

//   <div className={classes.customerStatusPrice}>
//     <p className={classes.customer}>{discount.method}</p>

//     <div className={classes.statusPrice}>
//       <p>{discount.discountType}</p>

//       <p className={classes.total}>0</p>
//     </div>
//   </div>
// </div>
// </Link>
