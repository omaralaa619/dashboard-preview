"use client";

import DollarSVG from "@/svgs/DollarSVG";
import Card from "../UI/Card";
import classes from "./AnalyticsCard.module.css";

import {
  Chart as ChartJS,
  LineElement,
  RadialLinearScale,
  PointElement,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Price from "@/components/user/UI/Price";

const AnalyticsCard = ({ dataa, labelss, titlee, total, svg, duration }) => {
  ChartJS.register(
    CategoryScale,
    RadialLinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler,
    LinearScale
  );
  const data = {
    labels: labelss,
    datasets: [
      {
        fill: false,
        label: titlee,
        data: dataa,
        backgroundColor: ["#2563eb"],
        borderColor: ["#2563eb"],
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        intersect: false,
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 1)",
        titleColor: "white",
        bodyColor: "white",
        padding: 3,
        titleMarginBottom: 12, // Adjust the margin below the title
        xPadding: 16, // Adjust the horizontal padding
        yPadding: 12, // Adjust the vertical padding
        bodyPadding: 8, // Adjust the padding inside the body
      },

      title: {
        display: false,
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const currentDate = new Date();
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", dateOptions);

  const toDate = new Date();
  toDate.setDate(toDate.getDate() - duration);

  const formattedToDate = toDate.toLocaleDateString("en-US", dateOptions);

  return (
    <Card className={classes.main}>
      <div className={classes.titleContainer}>
        <p className={classes.title}>{titlee}</p>
        {svg}
      </div>
      <p className={classes.number}>
        {titlee == "Total Orders" ? total : <Price number={total} />}
      </p>

      {/* Where the chart will go */}

      <div className={classes.chartContainer}>
        <Line height={150} width={200} data={data} options={options} />
      </div>

      {/* ///////////////////////////////////////// */}
      <div className={classes.legendContainer}>
        <Card className={classes.legend}>
          <div className={classes.legendSVG}></div>
          <p className={classes.legendText}>
            {formattedToDate}-{formattedDate}
          </p>
        </Card>
      </div>
    </Card>
  );
};

export default AnalyticsCard;
