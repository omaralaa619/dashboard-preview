import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import Price from "../UI/Price";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-store";

const CartItem2 = ({ item }) => {
  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        size: item.size,
      })
    );
  };
  const removeHandler = () => {
    dispatch(cartActions.removeItemFromCart({ id: item.id, size: item.size }));
  };
  return (
    <div className="flex flex-col m-4 ">
      <div className="flex justify-between">
        <div className="relative bg-neutral-300 aspect-[4/6] rounded-sm overflow-hidden flex-1">
          <Image
            fill
            className="object-cover object-center z-0 "
            src={item.image}
            alt="category image"
          />
        </div>

        <div className="flex-1">
          <p className="mb-4">{item.title}</p>
          <p>Size: {item.size}</p>
        </div>

        <div className="flex-1">
          <X />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Price number={item.price} />
        <div className="flex  items-center justify-between gap-4  border border-gray-400 text-sm rounded-sm mt-2  ">
          <button onClick={addHandler} className="px-2 py-1 text-xl">
            +
          </button>
          <p className="text-sm font-semibold">{item.quantity}</p>
          <button onClick={removeHandler} className="px-2 py-1 text-xl">
            -
          </button>
        </div>
        <Price number={item.totalPrice} />
      </div>
    </div>
  );
};

export default CartItem2;
