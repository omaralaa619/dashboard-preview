"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./Completed.module.css";
import ThawbSVG from "@/svgs/ThawbSVG";
import CompletedSVG from "@/svgs/CompletedSvg";
import LynneSVG from "@/svgs/LynneSVG";

const Completed = () => {
  const router = useRouter();

  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.deliveryInfo) {
      const info = JSON.parse(localStorage.deliveryInfo);

      setName(info.firstName);
    }
  });

  const buttonHandler = () => {
    router.push("/");
  };
  return (
    <div className={classes.root}>
      <LynneSVG />
      <div className={classes.topText}>
        <CompletedSVG />

        <div>
          <p className={classes.subtitle}>Order Confirmed</p>
          <p className={classes.thankyou}>ThankYou {name}!</p>
        </div>
      </div>
      <div className={classes.card}>
        <p className={classes.title}>Order updates</p>
        <p className={classes.subtitle}>
          You&apos;ll get shipping and delivery updates via Instagram direct
          messages
        </p>
      </div>
      <div className={classes.buttonContainer}>
        <button onClick={buttonHandler} className={classes.button}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Completed;
