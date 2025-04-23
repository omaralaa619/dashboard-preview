import { cartActions } from "@/store/cart-store";
import { uiActions } from "@/store/ui-store";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../UI/Button";

const CtaButtons = ({ product, size }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { stock } = product;

  //////////////////////////////////////////////////////
  const addCartHandler = () => {
    const cartId = product._id + size;
    dispatch(
      cartActions.addItemToCart({
        id: cartId,
        title: product.title,
        price: product.price,
        size: size,
        image: product.imageUrls[0],
      })
    );
    dispatch(uiActions.openCart());
  };

  const buyNowHandler = () => {
    const cartId = product._id + size;
    dispatch(
      cartActions.buyNow({
        id: cartId,
        title: product.title,
        price: product.price,
        size: size,
        image: product.imageUrls[0],
      })
    );

    router.push("/checkout/delivery-info");
  };

  //////////////////////////////////////////////////

  return (
    <div className="flex flex-col gap-4 mb-10">
      {stock.reduce((acc, obj) => acc + obj.available, 0) === 0 && (
        <Button onClick={addCartHandler} className={"text-neutral-600 "}>
          OUT OF STOCK
        </Button>
      )}
      {stock.reduce((acc, obj) => acc + obj.available, 0) != 0 && (
        <Button
          onClick={addCartHandler}
          className={
            "bg-white rounded-sm border border-prim text-prim hover:bg-neutral-100   transition-colors duration-300 "
          }
        >
          Add To Cart
        </Button>
      )}
      {stock.reduce((acc, obj) => acc + obj.available, 0) != 0 && (
        <Button
          onClick={buyNowHandler}
          className={
            "rounded-sm bg-prim border border-prim text-white w-full hover:bg-prim/80  transition-colors duration-300"
          }
        >
          Buy Now
        </Button>
      )}
    </div>
  );
};

export default CtaButtons;
