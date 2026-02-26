import { useSelector } from "react-redux";
import classes from "./CartPreview.module.css";
import { useState } from "react";
import CartItemPreview from "./CartItemPreview";
import DiscountInput from "./DiscountInput";
import Skeleton from "../ui/Skeleton";
import Price from "../ui/Price";

const MobileCartPreview = ({ discount, setDiscount, loading }) => {
  const cartItems = useSelector((state) => state.cart);
  const [discountError, setDiscountError] = useState(null);
  let shippingContent = <p>Free Shipping</p>;

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

  if (cartItems.shipping.price > 0) {
    shippingContent = <Price number={cartItems.shipping.price} />;
  }
  return (
    <div className="md:hidden">
      {" "}
      <p className="my-6 text-xl font-semibold">Order Summarry</p>
      <ul className={classes.cartPreviewContainer} style={{ padding: 0 }}>
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
      <div className={classes.totals} style={{ padding: 0, paddingTop: 16 }}>
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

                {discount.type === "shipping" && <span></span>}
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

              <span>
                <Price number={total} />
              </span>
            </div>
          </>
        )}
        {/* //////////////////////////////////////// */}
      </div>
    </div>
  );
};

export default MobileCartPreview;
