"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { deliveryInfoActions } from "@/store/deliveryinfo-store";

import classes from "./DeliveryInfo.module.css";
import { cities } from "@/cities";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import ThawbSVG from "@/svgs/ThawbSVG";
import Skeleton from "@/components/dashboard/UI/Skeleton";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/dashboard/UI/LoadingSpinner";
import { cartActions } from "@/store/cart-store";

const DeliveryInfo = ({ discount }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const deliveryInfo = useSelector((state) => state.deliveryInfo);
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  useEffect(() => {
    if (cart.totalQuantity <= 0) {
      router.push("/");
    }
    setLoading(false);
  }, []);

  const deliveryLocation = cart.shipping.city;
  const radioHandler = (city, price) => {
    dispatch(cartActions.updateShipping({ city, price }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...deliveryInfo.address,
    },
  });

  const submitHandler = async (data) => {
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
      if (res.ok) {
        router.push("/checkout/completed");
        dispatch(cartActions.clearCart());
      }
      if (!res.ok) {
        setLoading(false);
        setError(true);
      }
      console.log(dataa);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* <ThawbSVG /> */}
        <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
          {/* //////////////////////Contact/////////////// */}

          <div>
            <div className={classes.contactTitleCont}>
              <h3>Contact</h3>
            </div>

            <div className={classes.group}>
              <input
                className={classes.input}
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
                className={classes.input}
                {...register("name")}
                type="text"
                required
              />
              <label className={classes.label}>Name</label>
            </div>

            <div className={classes.group}>
              <input
                className={classes.input}
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
                className={classes.input}
                {...register("number", { maxLength: 11, minLength: 11 })}
                type="number"
                required
              />
              <label className={classes.label}>Number</label>
            </div>

            <div className={classes.group}>
              <input
                className={classes.input}
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
                className={classes.input}
                {...register("streetName")}
                type="text"
                required
              />
              <label className={classes.label}>Streeet Name</label>
            </div>
            <div className={classes.name}>
              <div className={classes.group}>
                <input
                  className={classes.input}
                  {...register("building")}
                  type="text"
                  required
                />
                <label className={classes.label}>Building</label>
              </div>

              <div className={classes.group}>
                <input
                  className={classes.input}
                  {...register("floor")}
                  type="text"
                  required
                />
                <label className={classes.label}>Floor</label>
              </div>

              <div className={classes.group}>
                <input
                  className={classes.input}
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
                className={classes.radioContainer}
                onClick={() => {
                  radioHandler("cairo", 50);
                }}
              >
                <div className={classes.left}>
                  <input
                    type="radio"
                    name="delivery"
                    value="cairo"
                    checked={deliveryLocation == "cairo" ? "checked" : ""}
                    onChange={() => {
                      radioHandler("cairo", 50);
                    }}
                  />
                  <label>Cairo/Giza</label>
                </div>
                <p>LE 50.00</p>
              </div>

              {/* ////////////////////////////////////////////////// */}

              <div
                className={classes.radioContainer}
                onClick={() => {
                  radioHandler("alex", 65);
                }}
              >
                <div className={classes.left}>
                  <input
                    type="radio"
                    name="delivery"
                    value="alex"
                    checked={deliveryLocation == "alex" ? "checked" : ""}
                    onChange={() => {
                      radioHandler("alex", 65);
                    }}
                  />
                  <label>Other</label>
                </div>
                <p>LE 65.00</p>
              </div>
            </div>
          </div>

          <div className={classes.buttonContainer}>
            <button className={classes.button} disabled={loading} type="submit">
              {!loading && <p>Complete Order</p>}
              {loading && <LoadingSpinner size={20} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInfo;
