"use client";
import CloseX from "@/svgs/CloseX";
import ModalGen from "../UI/ModalGen";
import classes from "./DiscountModal.module.css";
import OrdersSVG from "@/svgs/OrdersSVG";
import ShipSVG from "@/svgs/ShipSVG";
import ArrowBackSVG from "@/svgs/ArrowBackSVG";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { adminUiActions } from "@/store/admin-ui-store";
import ProductsSVG from "@/svgs/ProductsSVG";

const DiscountModal = () => {
  const router = useRouter();

  const modal = useSelector((state) => state.adminUi.discountModal);

  const dispatch = useDispatch();

  const modalHandler = () => {
    dispatch(adminUiActions.toggleDiscountModal());
  };
  const itemHandler = () => {
    modalHandler();
  };
  return (
    <ModalGen open={modal} className={classes.root} closeModal={modalHandler}>
      <div className={classes.top}>
        <p>Select discount type</p>
        <button className={classes.close} onClick={modalHandler}>
          <CloseX />
        </button>
      </div>

      <Link href={"discounts/new?type=offOrder"}>
        <div className={classes.item} onClick={itemHandler}>
          <div>
            <p className={classes.itemTitle}>Amount off order</p>
            <p className={classes.itemSubtitle}>
              Discount the total order amount.
            </p>
          </div>
          <div className={classes.rightContainer}>
            <div className={classes.itemRight}>
              <span>
                <OrdersSVG />
              </span>
              Order <span className="hidden md:block">Discount</span>
            </div>
            <div className={classes.arrow}>
              <ArrowBackSVG />
            </div>
          </div>
        </div>
      </Link>
      <Link href={"discounts/new?type=shipping"}>
        <div className={classes.item} onClick={itemHandler}>
          <div>
            <p className={classes.itemTitle}>Free shipping</p>
            <p className={classes.itemSubtitle}>
              Offer free shipping an an order.
            </p>
          </div>
          <div className={classes.rightContainer}>
            <div className={classes.itemRight}>
              <span className={classes.ship}>
                <ShipSVG />
              </span>
              Shipping <span className="hidden md:block">Discount</span>
            </div>

            <div className={classes.arrow}>
              <ArrowBackSVG />
            </div>
          </div>
        </div>
      </Link>
      <div className={classes.buttonContainer}>
        <button onClick={modalHandler}>Cancel</button>
      </div>
    </ModalGen>
  );
};

export default DiscountModal;
