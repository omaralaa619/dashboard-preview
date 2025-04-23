"use client";
import React, { useState } from "react";
import DiscountsForm from "./DiscountsForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleBanner } from "@/lib/banner";

const DiscountNew = () => {
  const searchParams = useSearchParams();
  const discountType = searchParams.get("type");
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const defaultValues = {
    method: "code",
    code: "code",
    name: "name",
    valueType: "percentage",
    amountValue: 0,
    percentValue: 0,
    requirmentType: "none",
    minimumAmount: 0,
    minimumQuantity: 0,
    isLimit: false,
    limitNumber: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    isEndDate: false,
  };

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
      const res = await fetch("/api/discounts", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          value: value,

          discountType,
          startDateTime,
          endDateTime,
        }),
      });
      const response = await res.json();
      toggleBanner(dispatch, "Discount created successfully ", "red");
      router.push(
        `/dashboard/discounts/${response.discount._id}?type=${discountType}`
      );

      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitLoading(false);
    }
    console.log(data);
  };
  return (
    <div>
      <DiscountsForm
        submitHandler={submitHandler}
        submitLoading={submitLoading}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default DiscountNew;
