import Price from "@/components/user/ui/Price";
import classes from "./ProductItem.module.css";
import { X } from "lucide-react";

const ProductItem = ({ product, setProductsList }) => {
  const removeProduct = () => {
    setProductsList((prev) => prev.filter((p) => p._id !== product._id));
  };
  return (
    <div className={classes.productItem}>
      <div className="flex gap-4">
        <div className={classes.imgContainer}>
          <img src={product.imageUrls[0]} alt="" />
        </div>
        <div>
          <p>{product.title}</p>

          <Price number={product.price} className={classes.price} />
        </div>
      </div>

      <div>
        <X className={classes.x} size={18} onClick={removeProduct} />
      </div>
    </div>
  );
};

export default ProductItem;
