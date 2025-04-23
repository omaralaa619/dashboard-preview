import Image from "next/image";
import Price from "../UI/Price";
import { Minus, Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-store";

const CartItem = ({ item }) => {
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
    <div className="flex gap-4 border-b border-neutral-400 py-5 px-4">
      {/* Left Section - Image and Price */}
      <div className="flex flex-col gap-2">
        <div className="relative bg-neutral-300 aspect-[4/6] rounded-sm overflow-hidden flex-2">
          <Image
            fill
            className="object-cover object-center z-0"
            src={item.image}
            alt="category image"
          />
        </div>
        <Price number={item.price} />
      </div>

      {/* Middle Section - Item Details and Counter */}
      <div className="flex-1 w-full flex flex-col justify-between">
        <div>
          <p className="mb-4">{item.title}</p>
          <p>Size: {item.size}</p>
        </div>

        <div className="flex items-center justify-between  border border-gray-400 text-sm rounded-sm mt-2 w-[80%] min-w-20">
          <button onClick={removeHandler} className="px-2 py-3 text-xl">
            <Minus size={12} />
          </button>
          <p className="text-sm ">{item.quantity}</p>
          <button onClick={addHandler} className="px-2 py-4 ">
            <Plus size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button>{/* <X size={18} className="cursor-pointer" /> */}</button>
        <Price number={item.totalPrice} className={"font-medium"} />
      </div>
    </div>
  );
};

export default CartItem;
