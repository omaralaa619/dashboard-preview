"use client";
import React, { useEffect, useState } from "react";
import DiscountsForm from "./DiscountsForm";
import { useSearchParams } from "next/navigation";
import { toggleBanner } from "@/lib/banner";
import { useDispatch } from "react-redux";

const DiscountEdit = ({ discountId }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [discount, setDiscount] = useState([]);
  const [loading, setLoaidng] = useState(true);
  const dispatch = useDispatch();

  const [productsX, setProductsX] = useState([]);
  const [productsY, setProductsY] = useState([]);
  const [productsYquantity, setProductsYquantity] = useState(1);
  const [productsXquantity, setProductsXquantity] = useState(1);

  const searchParams = useSearchParams();
  const discountType = searchParams.get("type");
  const submitHandler = async (data) => {
    setSubmitLoading(true);
    data.value = parseInt(data.value);
    let endDateTime = null;
    const startDateTime = new Date(`${data.startDate}T${data.startTime}:00`);
    if (data.isEndDate) {
      console.log(data);
      endDateTime = new Date(`${data.endDate}T${data.endTime}:00`);
    } else {
      endDateTime = null;
    }

    const { startDate, startTime, endDate, endTime, ...submitData } = data;

    let value = 0;

    data.valueType == "percentage"
      ? (value = data.percentValue)
      : (value = data.amountValue);

    try {
      const res = await fetch(`/api/discounts/${discountId}`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
          discountType,
          startDateTime,
          endDateTime,
          value: value,
          productsX: {
            products: productsX,
            quantity: productsXquantity,
          },
          productsY: {
            products: productsY,
            quantity: productsYquantity,
          },
        }),
      });
      const response = await res.json();

      fetchDiscount();
      toggleBanner(dispatch, "Discount updated successfully ", "red");
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fetchDiscount = async () => {
    setLoaidng(true);
    try {
      const res = await fetch(`/api/discounts/${discountId}`);
      const data = await res.json();
      console.log(data);

      const dateInput = data.startDateTime;

      const date = new Date(dateInput);

      const dateValue = date.toISOString().split("T")[0];

      const timeValue = date.toTimeString().split(" ")[0].slice(0, 5);

      ////////////////////////////////

      const endDateInput = data.endDateTime;

      const endDate = new Date(endDateInput);

      const endDateValue = endDate.toISOString().split("T")[0];

      const endTimeValue = endDate.toTimeString().split(" ")[0].slice(0, 5);

      setDiscount({
        ...data,
        amountValue: data.value,
        percentValue: data.value,
        startDate: dateValue,
        startTime: timeValue,
        endDate: endDateValue,
        endTime: endTimeValue,
      });

      setProductsX(data.productsX.products || []);
      setProductsY(data.productsY.products || []);
      setProductsXquantity(data.productsX.quantity || 1);
      setProductsYquantity(data.productsY.quantity || 1);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
    setLoaidng(false);
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  return (
    <div>
      {!loading && (
        <DiscountsForm
          defaultValues={discount}
          submitHandler={submitHandler}
          productsX={productsX}
          productsY={productsY}
          setProductsX={setProductsX}
          setProductsY={setProductsY}
          setProductsXquantity={setProductsXquantity}
          setProductsYquantity={setProductsYquantity}
          productsXquantity={productsXquantity}
          productsYquantity={productsYquantity}
        />
      )}
    </div>
  );
};

export default DiscountEdit;
