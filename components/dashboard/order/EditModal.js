"use client";
import classes from "./EditModal.module.css";
import Card from "../UI/Card";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CloseX from "@/svgs/CloseX";
import EditSVG from "@/svgs/EditSVG";

import LoadingSpinner from "../UI/LoadingSpinner";
import { X } from "lucide-react";
import ModalGen from "../UI/ModalGen";

const EditModal = ({ fetchOrder, closeHandler, deliveryInfo, id, open }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: deliveryInfo,
  });

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "POST",
        body: JSON.stringify({
          data,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
    fetchOrder();
    setLoading(false);
    closeHandler();
  };

  return (
    <ModalGen open={open} closeModal={closeHandler} className={classes.main}>
      <div className={classes.fallback} onClick={closeHandler}></div>
      <Card className={classes.container}>
        <div className={classes.top}>
          <div className={classes.edit}>
            <p>Edit</p>
            <EditSVG />
          </div>
          <button onClick={closeHandler}>
            <X size={18} />
          </button>
        </div>
        <form
          className={classes.formContainer}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={classes.section}>
            <p>Customer</p>

            <div className={classes.inputControl}>
              <label>Name</label>
              <input {...register("name")} type="text" />
            </div>
            <div className={classes.inputControl} style={{ marginTop: 8 }}>
              <label>Instagram</label>
              <input {...register("instagram")} type="text" />
            </div>
          </div>

          <div className={classes.section}>
            <p>Contact Info</p>
            <div className={classes.contactInput}>
              <div className={classes.inputControl}>
                <label>email</label>
                <input type="email" {...register("email")} />
              </div>
              <div className={classes.inputControl}>
                <label>Number</label>
                <input {...register("number")} type="text" />
              </div>
            </div>
          </div>
          <div className={classes.section} style={{ gap: 8 }}>
            <p style={{ marginBottom: 8 }}>Shipping Address</p>

            <div className={classes.shippingCont}>
              <div className={classes.inputControl}>
                <label>City</label>
                <input {...register("city")} type="text" />
              </div>
              <div className={classes.inputControl}>
                <label>Zone</label>
                <input {...register("zone")} type="text" />
              </div>

              <div className={classes.inputControl}>
                <label>Street</label>
                <input {...register("streetName")} type="text" />
              </div>
            </div>

            <div className={classes.shippingCont}>
              <div className={classes.inputControl}>
                <label>Building</label>
                <input {...register("building")} type="text" />
              </div>
              <div className={classes.inputControl}>
                <label>Floor</label>
                <input {...register("floor")} type="text" />
              </div>
              <div className={classes.inputControl}>
                <label>Apartment</label>
                <input {...register("apartment")} type="text" />
              </div>
            </div>
          </div>

          <button disabled={loading}>
            {loading ? <LoadingSpinner size={18} /> : "Update"}
          </button>
        </form>
      </Card>
    </ModalGen>
  );
};

export default EditModal;
