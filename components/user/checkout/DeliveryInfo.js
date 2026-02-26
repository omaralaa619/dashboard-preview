"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { deliveryInfoActions } from "@/store/deliveryinfo-store";

import classes from "./DeliveryInfo.module.css";
import { cities } from "@/cities";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ThawbSVG from "@/svgs/ThawbSVG";
import Skeleton from "@/components/dashboard/UI/Skeleton";
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/components/dashboard/UI/LoadingSpinner";
import { cartActions } from "@/store/cart-store";
import Paymob from "./Paymob";
import MasterCardSVG from "@/svgs/MasterCardSVG";
import VisaSVG from "@/svgs/VisaSVG";
import AmexSVG from "@/svgs/AmexSVG";
import WindowSVG from "@/svgs/WindowSVG";
import MobileCartPreview from "./MobileCartPreview";

const DeliveryInfo = ({ discount, setDiscount, discountLoading }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const deliveryInfo = useSelector((state) => state.deliveryInfo);
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [numberError, setNumberError] = useState(false);
  const errorRef = useRef(null);

  useEffect(() => {
    if (cart.totalQuantity <= 0) {
      router.push("/");
    }
    setLoading(false);
  }, []);

  const deliveryLocation = cart.shipping.city;
  const [payment, setPayment] = useState("cod");
  const radioHandler = (city, price) => {
    dispatch(cartActions.updateShipping({ city, price }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      ...deliveryInfo.address,
    },
  });
  const allValues = watch();
  const submitHandler = async (data) => {
    switch (payment) {
      case "cod":
        dispatch(deliveryInfoActions.updateInfo({ ...data }));
        setLoading(true);

        console.log(cart.shipping.price);

        try {
          const res = await fetch("/api/orders", {
            method: "POST",
            body: JSON.stringify({
              address: {
                name: data.name,
                instagram: data.instagram,
                email: data.email,
                number: data.number,
                zone: data.zone,
                city: data.city,
                streetName: data.streetName,
                building: data.building,
                floor: data.floor,
                apartment: data.apartment,
              },
              cart: {
                items: cart.items,
                totalAmount: cart.totalAmount,
                totalQuantity: cart.totalQuantity,
                shipping: cart.shipping.price,
              },
              discount,
            }),
            headers: {
              "content-Type": "application/json",
            },
          });
          const dataa = await res.json();

          if (dataa?.error) {
            setError(dataa.error);
            router.push("#error-message");

            setLoading(false);
          } else {
            router.push("/checkout/completed");
            dispatch(cartActions.clearCart());
          }
          // if (res.ok) {
          // }

          console.log(dataa);
        } catch (error) {
          setError(true);
          console.log(error);
        }
        break;

      case "visa":
        try {
          setLoading(true);
          const response = await fetch("/api/payment", {
            method: "POST",
            body: JSON.stringify({
              address: {
                name: data.name,
                instagram: data.instagram,
                email: data.email,
                number: data.number,
                zone: data.zone,
                city: data.city,
                streetName: data.streetName,
                building: data.building,
                floor: data.floor,
                apartment: data.apartment,
              },
              cart: {
                items: cart.items,
                totalAmount: cart.totalAmount,
                totalQuantity: cart.totalQuantity,
                shipping: cart.shipping.price,
              },
              discount,
            }),
          });

          const dataa = await response.json();
          if (dataa?.error) {
            setError(dataa.error);
            router.push("#error-message");

            setLoading(false);
          } else {
            router.push(dataa.link);
          }
        } catch (error) {
          console.log(error);
          console.log("error");
        }
        break;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* <ThawbSVG /> */}
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
          {/* //////////////////////Contact/////////////// */}

          <div>
            {error && (
              <p id="error-message" className="text-red-700">
                {error}
              </p>
            )}
            <div className={classes.contactTitleCont}>
              <h3>Contact</h3>
            </div>

            <div className={classes.group}>
              <input
                className={`${classes.input} ${
                  allValues.email ? classes.filled : ""
                }`}
                {...register("email")}
                type="email"
              />
              <label className={classes.label}>Email (Optional)</label>
            </div>

            <label className={classes.checkboxContainer}>
              <input type="checkbox" defaultChecked={true} />
              <span className={classes.checkmark}></span>
              Email me with news and offers
            </label>
          </div>

          {/* //////////////////////Shipping/////////////// */}
          <h3 style={{ marginTop: 32 }}>Delivery</h3>

          <div className={classes.deliveryCont}>
            <div className={classes.group}>
              <input
                className={`${classes.input} ${
                  allValues.name ? classes.filled : ""
                }`}
                {...register("name")}
                type="text"
                required
              />
              <label className={classes.label}>Name</label>
            </div>

            <div className={classes.group}>
              <input
                className={`${classes.input} ${
                  allValues.instagram ? classes.filled : ""
                }`}
                {...register("instagram")}
                type="text"
              />
              <label className={classes.label}>
                Instagram Username (Optional)
              </label>
            </div>

            {errors.number && (
              <p className={classes.error}>Please enter a valid phone number</p>
            )}
            <div className={classes.group}>
              <input
                className={`${classes.input} ${
                  allValues.number ? classes.filled : ""
                }`}
                {...register("number", { maxLength: 11, minLength: 11 })}
                type="number"
                required
              />
              <label className={classes.label}>Number</label>
            </div>

            <div className={classes.group}>
              <input
                className={`${classes.input} ${
                  allValues.zone ? classes.filled : ""
                }`}
                {...register("zone")}
                type="text"
                required
              />
              <label className={classes.label}>
                Zone Ex: (Maadi, Sheikh Zayed)
              </label>
            </div>

            <div className={classes.group}>
              <label className={classes.cityLabel} htmlFor="city">
                City
              </label>
              <select name="city" {...register("city")}>
                {cities.map((city) => (
                  <option key={city.city} value={city.city}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>

            <div className={classes.group}>
              <input
                className={`${classes.input} ${
                  allValues.streetName ? classes.filled : ""
                }`}
                {...register("streetName")}
                type="text"
                required
              />
              <label className={classes.label}>Streeet Name</label>
            </div>
            <div className={classes.name}>
              <div className={classes.group}>
                <input
                  className={`${classes.input} ${
                    allValues.building ? classes.filled : ""
                  }`}
                  {...register("building")}
                  type="text"
                  required
                />
                <label className={classes.label}>Building</label>
              </div>

              <div className={classes.group}>
                <input
                  className={`${classes.input} ${
                    allValues.floor ? classes.filled : ""
                  }`}
                  {...register("floor")}
                  type="text"
                  required
                />
                <label className={classes.label}>Floor</label>
              </div>

              <div className={classes.group}>
                <input
                  className={`${classes.input} ${
                    allValues.apartment ? classes.filled : ""
                  }`}
                  {...register("apartment")}
                  type="text"
                  required
                />
                <label className={classes.label}>Apartment</label>
              </div>
            </div>

            <div className={classes.radioRoot}>
              {/* ////////////////////////////////////////////////// */}
              <div
                className={`${classes.radioContainer} ${
                  deliveryLocation == "cairo"
                    ? classes.radioContainerSelected
                    : ""
                } ${classes.radioContainerTop}`}
                onClick={() => {
                  radioHandler("cairo", 70);
                }}
              >
                <div className={classes.left}>
                  <input
                    type="radio"
                    name="delivery"
                    value="cairo"
                    checked={deliveryLocation == "cairo" ? "checked" : ""}
                    onChange={() => {
                      radioHandler("cairo", 70);
                    }}
                  />
                  <label>Cairo/Giza</label>
                </div>
                <p>LE 70.00</p>
              </div>

              {/* ////////////////////////////////////////////////// */}

              <div
                className={`${classes.radioContainer} ${
                  deliveryLocation == "alex"
                    ? classes.radioContainerSelected
                    : ""
                } ${classes.radioContainerBottom}`}
                onClick={() => {
                  radioHandler("alex", 80);
                }}
              >
                <div className={classes.left}>
                  <input
                    type="radio"
                    name="delivery"
                    value="alex"
                    checked={deliveryLocation == "alex" ? "checked" : ""}
                    onChange={() => {
                      radioHandler("alex", 80);
                    }}
                  />
                  <label>Other</label>
                </div>
                <p>LE 80.00</p>
              </div>
            </div>

            <h3 style={{ marginTop: 32 }}>Payment</h3>

            <div className={classes.radioRoot}>
              {/* //////////////////////////////////////////////////  payment  ////////////////////////*/}
              <div
                className={`${classes.radioContainer} ${
                  payment == "cod" ? classes.radioContainerSelected : ""
                } ${classes.radioContainerTop}`}
                onClick={() => {
                  setPayment("cod");
                }}
              >
                <div className={classes.left}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={payment == "cod" ? "checked" : ""}
                    onChange={() => {
                      setPayment("cod");
                    }}
                  />
                  <label>Cash on Delivery (COD) </label>
                </div>
                <p></p>
              </div>

              {/* ////////////////////////////////////////////////// */}
              <div className="flex flex-col">
                <div
                  className={`${classes.radioContainer} ${
                    payment == "visa" ? classes.radioContainerSelected : ""
                  } ${classes.radioContainerBottom}`}
                  onClick={() => {
                    setPayment("visa");
                  }}
                >
                  <div className={classes.left}>
                    <input
                      type="radio"
                      name="payment"
                      value="visa"
                      checked={payment == "visa" ? "checked" : ""}
                      onChange={() => {
                        setPayment("visa");
                      }}
                    />
                    <label>Pay via (Debit/credit cards)</label>
                  </div>
                  <div className="flex gap-1">
                    <MasterCardSVG />
                    <VisaSVG />
                    <AmexSVG />
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {payment === "visa" && (
                    <motion.div
                      className="overflow-hidden bg-neutral-100 text-center"
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="w-[80%] md:w-[60%] mx-auto py-6 flex flex-col gap-6">
                        <div className="flex items-center justify-center">
                          <WindowSVG />
                        </div>
                        <p className="text-sm">
                          After clicking “Pay now”, you will be redirected to
                          Pay via (Debit/Credit cards) to complete your purchase
                          securely.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ///////////////////////////// */}
            </div>
          </div>
          <MobileCartPreview
            discount={discount}
            setDiscount={setDiscount}
            loading={discountLoading}
          />

          <div className={classes.buttonContainer}>
            {payment == "cod" && (
              <button
                className={classes.button}
                disabled={loading}
                type="submit"
              >
                {!loading && <p>Complete Order</p>}
                {loading && <LoadingSpinner size={20} />}
              </button>
            )}

            {payment == "visa" && (
              <button
                className={classes.button}
                disabled={loading}
                type="submit"
              >
                {!loading && <p>Pay Now</p>}
                {loading && <LoadingSpinner size={20} />}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInfo;
