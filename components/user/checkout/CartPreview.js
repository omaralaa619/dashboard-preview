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
import Price from "../UI/Price";

const CartPreview = ({ discount, setDiscount, loading }) => {
  // console.log(discount);
  const cartItems = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  const showSummary = open ? "Hide order summary" : "Show order summary";

  let shippingContent = <p>Free Shipping</p>;

  if (cartItems.shipping.price > 0) {
    shippingContent = <Price number={cartItems.shipping.price} />;
  }

  return (
    <motion.div className={classes.root}>
      <motion.div
        animate={open ? { height: "100%" } : { height: 60 }}
        transition={{
          type: "tween",
        }}
        className={classes.container}
      >
        <div className={classes.summary} onClick={() => setOpen(!open)}>
          <div className={classes.showSummary}>
            <div className={classes.cart}>
              <CartSVG />
            </div>
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
          <span>
            <Price number={cartItems.totalAmount + cartItems.shipping.price} />
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
            />
          ))}
        </ul>

        <div className={classes.totals}>
          <DiscountInput
            totalAmount={cartItems.totalAmount}
            totalQuantity={cartItems.totalQuantity}
            setDiscount={setDiscount}
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

                  {discount.type === "shipping" && <span>Free Shipping</span>}
                  {discount.type != "shipping" && (
                    <span>
                      <Price number={discount.amount}> </Price>
                    </span>
                  )}
                </div>
              )}
              {/* //////////////////////////////////////// */}

              <div className={classes.total}>
                <p>Total</p>

                {/* //////////////////////////////////////// */}

                {discount && (
                  <span>
                    {discount.type == "shipping" ? (
                      <Price number={cartItems.totalAmount} />
                    ) : (
                      <Price
                        number={
                          cartItems.totalAmount +
                          cartItems.shipping.price -
                          discount.amount
                        }
                      />
                    )}
                  </span>
                )}

                {!discount && (
                  <span>
                    <Price
                      number={cartItems.totalAmount + cartItems.shipping.price}
                    />
                  </span>
                )}
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
