"use client";
import { motion } from "framer-motion";
import classes from "./CartPreview.module.css";

import { useSelector } from "react-redux";
// import CartItemPreview from "./CartItemPreview";
import { useEffect, useState } from "react";
import DeliveryInfo from "./DeliveryInfo";
import CartItemPreview from "./CartItemPreview";
import CartSVG from "@/svgs/CartSVG";
import ArrowBackSVG from "@/svgs/ArrowBackSVG";
import LoadingSkeleton from "@/components/dashboard/analytics/posthog/LoadingSkeleton";
import Skeleton from "@/components/dashboard/UI/Skeleton";
import DiscountInput from "./DiscountInput";
import Price from "../ui/Price";

const CartPreview = ({ discount, setDiscount, loading }) => {
  const cartItems = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const [discountError, setDiscountError] = useState(null);

  const showSummary = open ? "Hide order summary" : "Show order summary";

  let shippingContent = <p>Free Shipping</p>;

  if (cartItems.shipping.price > 0) {
    shippingContent = <Price number={cartItems.shipping.price} />;
  }
  let total = cartItems.totalAmount;

  if (discount) {
    if (discount.type === "shipping") {
      total = cartItems.totalAmount;
    } else {
      total =
        cartItems.totalAmount + cartItems.shipping.price - discount.amount;
    }
  }
  if (!discount) {
    total = cartItems.totalAmount + cartItems.shipping.price;
  }

  return (
    <motion.div className={classes.root}>
      <motion.div
        animate={open ? { height: "100%" } : { height: 70 }}
        transition={{
          type: "tween",
        }}
        className={`${classes.container} `}
      >
        <div className={classes.summary} onClick={() => setOpen(!open)}>
          <div className={classes.showSummary}>
            <p>{showSummary}</p>
            <motion.div
              className={classes.arrow}
              animate={open ? { rotateX: -180, marginTop: 5 } : { rotate: 0 }}
              transition={{
                type: "tween",
                duration: 0.4,
              }}
            >
              <ArrowBackSVG />
            </motion.div>
          </div>
          <span className={classes.summaryTotal}>
            {!loading && <Price number={total} />}
            {loading && (
              <Skeleton
                rows={1}
                height={15}
                width={50}
                className={classes.noMargin}
              />
            )}
          </span>
        </div>

        <ul className={classes.cartPreviewContainer}>
          {cartItems.items.map((item) => (
            <CartItemPreview
              key={item.id}
              name={item.title}
              totalPrice={item.totalPrice}
              size={item.size}
              image={item.image}
              qty={item.quantity}
              color={item.colorName} // Added color prop
              discount={discount}
              id={item.id}
              price={item.price}
            />
          ))}
        </ul>

        <div className={classes.totals}>
          {discountError && <p className="text-red-700">{discountError}</p>}
          <DiscountInput
            totalAmount={cartItems.totalAmount}
            totalQuantity={cartItems.totalQuantity}
            setDiscount={setDiscount}
            setDiscountError={setDiscountError}
            cart={cartItems}
          />

          {loading && (
            <div className={classes.skeletonContainer}>
              <Skeleton rows={3} height={15} className={classes.skeletonRow} />
            </div>
          )}

          {!loading && (
            <>
              <div className={classes.subtotal}>
                <p>Subtotal</p>
                <Price number={cartItems.totalAmount} />
              </div>

              <div className={classes.shipping}>
                <p>Shipping</p>
                <span>{shippingContent}</span>
              </div>

              {/* //////////////////////////////////////// */}
              {discount && (
                <div className={classes.shipping}>
                  <p>Discount - ({discount.title})</p>

                  {discount.type == "shipping" && <span>Free shipping</span>}
                  {discount.type != "shipping" && (
                    <span>
                      <Price number={-discount.amount} />
                    </span>
                  )}
                </div>
              )}
              {/* //////////////////////////////////////// */}

              <div className={classes.total}>
                <p>Total</p>

                {/* //////////////////////////////////////// */}

                <span>
                  <Price number={total} />
                </span>
              </div>
            </>
          )}
          {/* //////////////////////////////////////// */}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartPreview;
