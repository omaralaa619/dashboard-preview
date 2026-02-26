import Image from "next/image";

import { Minus, Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-store";
import Price from "../product/Price";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const addHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        size: item.size,
        color: item.color,
      })
    );
  };
  const removeHandler = () => {
    dispatch(
      cartActions.removeItemFromCart({
        id: item.id,
        size: item.size,
        color: item.color,
      })
    );
  };

  return (
    <div className="flex gap-4">
      <img
        src={item.image}
        alt=""
        className="w-[80px] md:w-[100px] rounded-md"
      />

      <div className="text-sm flex flex-col gap-1">
        <p className="font-bold">{item.title}</p>
        <Price number={item.totalPrice} className={"text-neutral-500"} />
        <p className="text-xs text-neutral-500">
          {item.size} {item.colorName && `/ ${item.colorName}`}
        </p>
        <div className="flex items-center gap-2 w-fit  border border-gray-200 text-xs mt-2  rounded-md text-neutral-500">
          <button onClick={removeHandler} className="px-1 py-2 ">
            <Minus size={12} />
          </button>
          <p className="text-sm ">{item.quantity}</p>
          <button onClick={addHandler} className="px-1 py-2 ">
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
