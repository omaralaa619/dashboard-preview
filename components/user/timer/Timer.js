"use client";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import Link from "next/link";

const Timer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDate]);

  function calculateTimeLeft(target) {
    const difference = new Date(target) - new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="bg-sec flex justify-center flex-col items-center text-center md:flex-row md:gap-5 md:py-8">
      <h1 className="text-4xl font-medium my-8 tracking-wider md:my-0">
        SALE NOW ON
      </h1>
      <div className="flex mb-7 gap-1 md:my-auto">
        <div>
          <p>{timeLeft.days}</p>
          <p className="text-xs">Days</p>
        </div>
        <p className="font-semibold">:</p>
        <div>
          <p>{timeLeft.hours}</p>
          <p className="text-xs">Hours</p>
        </div>
        <p className="font-semibold">:</p>
        <div>
          <p>{timeLeft.minutes}</p>
          <p className="text-xs">Mins</p>
        </div>
        <p className="font-semibold">:</p>
        <div>
          <p>{timeLeft.seconds}</p>
          <p className="text-xs">Secs</p>
        </div>
      </div>
      <Link href={"category/featured"}>
        <Button
          className={
            "bg-acc rounded-sm border border-acc text-white hover:bg-white hover:text-acc transition-colors duration-300 mb-5"
          }
        >
          Shop now
        </Button>
      </Link>
    </div>
  );
};

export default Timer;
