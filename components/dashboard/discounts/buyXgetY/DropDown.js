import React, { useEffect, useRef, useState } from "react";
import classes from "./DropDown.module.css";
import Price from "@/components/user/ui/Price";

const DropDown = ({
  open,
  setOpen,
  products,
  setSearchQuery,
  setProductsList,
}) => {
  const optionsRef = useRef(null);

  const toggleHandler = () => {
    setOpen(!open);
  };

  const onSelectHandler = (product) => {
    setSearchQuery("");
    setProductsList((prev) => {
      if (prev.some((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      onClick={toggleHandler}
      ref={optionsRef}
      className={`${classes.boxContainer} `}
    >
      <div className={`${open ? "" : classes.none} ${classes.dropDown} `}>
        {products.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No products found</p>
        ) : (
          products.map((product) => (
            <div
              className={classes.item}
              onClick={() => onSelectHandler(product)}
              key={product._id}
            >
              <img className=" w-14" src={product.imageUrls[0]} alt="" />

              <div className="flex flex-col gap-4">
                <p className="">{product.title}</p>
                <Price
                  className={"text-sm font-semibold"}
                  number={product.price}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DropDown;
