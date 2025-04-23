import Link from "next/link";
import classes from "./ProductsList.module.css";
import Checkbox from "../../UI/Checkbox";
import Image from "next/image";
import Price from "@/components/user/UI/Price";

const ProductsList = ({
  products,
  handleCheckboxes,
  checkedProducts,
  allHandler,
}) => {
  console.log(products);

  return (
    <>
      <div>
        <div className={`${classes.row} ${classes.header}`}>
          <div className={classes.checkable}>
            <label className={classes.container}>
              Product
              <Checkbox
                value={"all"}
                onChange={allHandler}
                checked={
                  products.length == checkedProducts.length &&
                  products.length != 0
                }
              />
            </label>
          </div>

          <Link href={"#"} className={classes.desktopRow}>
            <p>Status</p>

            <p>Inventory</p>
            <p>Price</p>
          </Link>
        </div>
      </div>
      <div>
        {products.map((product) => (
          <div key={product._id} className={classes.row}>
            <div className={classes.checkable}>
              <label className={` ${classes.checkable} ${classes.container}`}>
                <Image
                  width={70}
                  height={100}
                  className={classes.image}
                  src={product.imageUrls[0]}
                  alt=""
                />

                <p className={`${classes.mobNone} ${classes.title}`}>
                  {product.title}
                </p>

                <Checkbox
                  value={product._id}
                  onChange={handleCheckboxes}
                  checked={checkedProducts.includes(product._id)}
                />
              </label>
            </div>

            <Link
              href={`/dashboard/products/${product._id}`}
              className={classes.desktopRow}
            >
              <div className={`${classes.status} ${classes.mobNone}`}>
                <div className={classes.statusText}>
                  {product.status}
                  <div
                    className={`${classes.statusDot} ${
                      product.status === "active" ? "" : classes.unfulfilled
                    }`}
                  ></div>
                </div>
              </div>

              <div className={`${classes.statusAmount} ${classes.mobNone}`}>
                <p>
                  {product.stock.reduce((acc, obj) => acc + obj.available, 0)}{" "}
                  in stock
                </p>

                <p className={`${classes.total} ${classes.mobNone}`}>
                  <Price number={product.price} />
                </p>
              </div>
            </Link>

            <div className={classes.rightMobContainer}>
              <Link
                href={`/dashboard/products/${product._id}`}
                className={classes.rightMob}
              >
                <p className={classes.title}>{product.title}</p>
                <div className={`${classes.status} `}>
                  <div className={classes.statusText}>
                    {product.status}
                    <div
                      className={`${classes.statusDot} ${
                        product.status === "active" ? "" : classes.unfulfilled
                      }`}
                    ></div>
                  </div>
                </div>

                <p>
                  {product.stock.reduce((acc, obj) => acc + obj.available, 0)}{" "}
                  in stock
                </p>
                <p className={`${classes.total} `}>
                  <Price number={product.price} />
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsList;
