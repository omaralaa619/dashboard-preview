"use client";

import classes from "./AnalyticsGrid.module.css";
import AnalyticsCard from "./AnalyticsCard";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AnalyticsCardLoading from "./loading/AnalyticsCardLoading";
import AnalyticsLoading from "./loading/AnalyticsLoading";
import DollarSVG from "@/svgs/DollarSVG";
import ProductsSVG from "@/svgs/ProductsSVG";
import AverageSVG from "@/svgs/AverageSVG";

const AnalyticsGrid = ({ duration }) => {
  let pathname = usePathname();

  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`/api/orders/order-details/${duration}`);
      const data = await res.json();
      setOrderDetails(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [duration]);
  const ordersCountData = orderDetails.map((order) => order.count);
  const ordersSalesData = orderDetails.map((order) => order.totalAmount);
  const ordersAvgData = orderDetails.map((order) => order.avgSales);
  const labels = orderDetails.map((order) =>
    new Date(order.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  const totalCount = orderDetails.reduce((sum, item) => sum + item.count, 0);
  const totalSales = orderDetails.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );
  const totalAvg = Math.round(totalSales / totalCount);

  return (
    <>
      {!loading && (
        <>
          <div className={classes.analyticsGrid}>
            <AnalyticsCard
              labelss={labels}
              dataa={ordersCountData}
              titlee={"Total Orders"}
              total={totalCount + " Orders"}
              svg={<ProductsSVG />}
              duration={duration}
            />
            <div
              className={`${
                pathname != "/dashboard" ? "" : classes.noneMobile
              }`}
            >
              <AnalyticsCard
                labelss={labels}
                dataa={ordersSalesData}
                titlee={"Total Sales"}
                total={totalSales}
                svg={<DollarSVG />}
                duration={duration}
              />
            </div>

            <div
              className={`${
                pathname != "/dashboard" ? "" : classes.noneMobile
              }`}
            >
              <AnalyticsCard
                labelss={labels}
                dataa={ordersAvgData}
                titlee={"Total average"}
                total={totalAvg || 0}
                svg={<AverageSVG />}
                duration={duration}
              />
            </div>
          </div>
        </>
      )}

      {loading && <AnalyticsLoading />}
    </>
  );
};

export default AnalyticsGrid;
