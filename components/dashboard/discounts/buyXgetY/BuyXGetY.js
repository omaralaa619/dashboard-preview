"use client";

import Card from "../../UI/Card";
import TextInput from "../../UI/inputs/TextInput";
import classes from "../DiscountsForm.module.css";
import Search from "./Search";
import ProductItem from "./ProductItem";

const BuyXGetY = ({
  productsXquantity,
  setProductsXquantity,
  productsX = [],
  setProductsX,
  productsY = [],
  setProductsY,
  productsYquantity,
  setProductsYquantity,
}) => {
  // Combine X and Y to prevent duplicates across both
  const allSelectedProducts = [...productsX, ...productsY];

  return (
    <Card className={classes.card}>
      <div className="pb-14">
        {/* ================= Customer Buys ================= */}
        <div className={classes.firstTop}>
          <p>Customer Buys</p>
        </div>

        <div className="p-4 flex flex-col gap-4 md:flex-row">
          <div className={classes.inputContainer}>
            <label>Quantity</label>
            <TextInput
              type="number"
              min="1"
              value={productsXquantity}
              onChange={(e) => setProductsXquantity(Number(e.target.value))}
            />
          </div>

          <Search setProductsList={setProductsX} selectedProducts={productsX} />
        </div>

        {productsX.length > 0 && (
          <div className="m-4 max-h-64 overflow-y-auto">
            <ul className="flex flex-col gap-2">
              {[...productsX].reverse().map((product) => (
                <ProductItem
                  key={product._id || product.id}
                  product={product}
                  setProductsList={setProductsX}
                />
              ))}
            </ul>
          </div>
        )}

        {/* ================= Customer Gets ================= */}
        <div className={classes.firstTop}>
          <p className="mt-10">Customer Gets</p>
        </div>

        <div className="p-4 flex flex-col gap-4 md:flex-row">
          <div className={classes.inputContainer}>
            <label>Quantity</label>
            <TextInput
              type="number"
              min="1"
              value={productsYquantity}
              onChange={(e) => setProductsYquantity(Number(e.target.value))}
            />
          </div>

          <Search setProductsList={setProductsY} selectedProducts={productsY} />
        </div>

        {productsY.length > 0 && (
          <div className="m-4">
            <ul className="flex  flex-col gap-2 max-h-64 overflow-y-auto">
              {[...productsY].reverse().map((product) => (
                <ProductItem
                  key={product._id || product.id}
                  product={product}
                  setProductsList={setProductsY}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BuyXGetY;
