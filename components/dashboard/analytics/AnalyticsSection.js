"use client";
import { useState } from "react";
import AnalyticsCard from "./AnalyticsCard";
import AnalyticsGrid from "./AnalyticsGrid";
import classes from "./AnalyticsSection.module.css";
import ComboBox from "../UI/ComboBox";
import CalendarSVG from "@/svgs/CalendarSVG";
import AnalyticsPH from "./posthog/AnalyticsPH";
import LoadingSkeleton from "./posthog/LoadingSkeleton";

const AnalyticsSection = () => {
  const [duration, setDuration] = useState(7);

  const dropdownItems = [
    {
      title: "Last 6 days",
      svg: <></>,
      action: () => {
        setDuration(6);
      },
    },
    {
      title: "Last 30 days",
      svg: <></>,
      action: () => {
        setDuration(30);
      },
    },
    {
      title: "Last 90 days",
      svg: <></>,
      action: () => {
        setDuration(90);
      },
    },
    {
      title: "Last 365 days",
      svg: <></>,
      action: () => {
        setDuration(365);
      },
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.selectContainer}>
        <ComboBox
          title={`Last ${duration} days`}
          dropdownItems={dropdownItems}
          titleSVG={<CalendarSVG />}
          gap={"8px"}
        />
      </div>
      <AnalyticsGrid duration={duration} />
      <AnalyticsPH duration={duration} />
    </div>
  );
};

export default AnalyticsSection;
