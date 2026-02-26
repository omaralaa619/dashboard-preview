import { cartActions } from "@/store/cart-store";
import { uiActions } from "@/store/ui-store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "../ui/Button";

const CtaButtons = ({ product, size, color, colorName }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // Find variant for selected size and color (or just size if no color)
  const variant = (product.variants || []).find(
    (v) => v.size === size && (color ? v.colorHex === color : true),
  );

  // Compute total stock across all variants. If totalStock is 0 -> out of stock.
  const totalStock = Array.isArray(product.variants)
    ? product.variants.reduce((acc, v) => acc + (v.stock || 0), 0)
    : 0;
  const inStock = totalStock > 0;

  //////////////////////////////////////////////////////
  const addCartHandler = () => {
    if (!variant) return;
    const cartId = product._id + size + (color || "");
    dispatch(
      cartActions.addItemToCart({
        id: cartId,
        title: product.title,
        price: product.price,
        size: size,
        color: color,
        image: product.imageUrls[0],
        colorName: colorName,
      }),
    );
    dispatch(uiActions.toggleQuickAdd());
    dispatch(uiActions.openCart());
  };

  const buyNowHandler = () => {
    if (!variant) return;
    const cartId = product._id + size + (color || "");
    dispatch(
      cartActions.buyNow({
        id: cartId,
        title: product.title,
        price: product.price,
        size: size,
        color: color,
        image: product.imageUrls[0],
        colorName: colorName,
      }),
    );

    dispatch(uiActions.toggleQuickAdd());
    router.push("/checkout/delivery-info");
  };

  //////////////////////////////////////////////////

  return (
    <div className="flex flex-col gap-2 mb-5 md:flex-row">
      {!inStock && (
        <Button
          className={"!text-black !bg-white !border-none"}
          text={"OUT OF STOCK"}
        />
      )}
      {inStock && (
        <Button
          onclick={addCartHandler}
          className={
            "bg-prim font-bold border  !text-sec hover:bg-neutral-100   transition-colors duration-300 "
          }
          text={"Add To Cart"}
        />
      )}
      {inStock && (
        <Button
          text={"BUY NOW"}
          onclick={buyNowHandler}
          className={
            "bg-sec font-bold border  !text-prim hover:bg-neutral-100   transition-colors duration-300 "
          }
        />
      )}
    </div>
  );
};

export default CtaButtons;
