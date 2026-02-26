"use client";

import DollarSVG from "@/svgs/DollarSVG";
import Card from "../UI/Card";
import classes from "./AnalyticsCard.module.css";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Price from "@/components/user/ui/Price";
import { formatNumberDashboard } from "@/lib/utils";

const AnalyticsCard = ({ dataa, labelss, titlee, total, svg, duration }) => {
  const chartData = labelss.map((label, idx) => ({
    name: label,
    value: dataa[idx],
  }));

  const formatCurrency = (value) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
    return value.toString();
  };
  const formatted = Intl.NumberFormat("en", {
    useGrouping: true, // Enables grouping (e.g., commas)
    minimumFractionDigits: 0, // Ensures at least 2 decimal places
    maximumFractionDigits: 0, // Ensures no more than 2 decimal places
  });
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
      <div className={classes.number}>
        {titlee == "Total Orders" ? (
          total
        ) : (
          <p>LE {formatNumberDashboard(total)}</p>
        )}
      </div>

      {/* Where the chart will go */}

      <div className="h-40  -mb-2 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#fff",
              }}
              // Show 'orders' as the field name in the tooltip (e.g. orders: 3)
              formatter={(value, name) => [formatted.format(value), titlee]}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 12 }} // label style
              axisLine={{ stroke: "#27272a" }} // X-axis line color
              tickLine={false} // remove small tick marks
              padding={{ left: 2, right: 2 }} // spacing from chart edges
            />
            {/* ✅ Y-Axis with currency formatter */}
            <YAxis
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
                alignmentBaseline: "after-edge",
              }}
              axisLine={{ stroke: "#27272a" }}
              tickLine={false}
              width={30}
              tickCount={3}
              tickFormatter={(value) => `${formatCurrency(value)}`}
            />
            <CartesianGrid
              stroke="#27272a" // grid line color
              vertical={false} // only show horizontal (Y-axis) lines
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={false}
              fill="url(#blueGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ///////////////////////////////////////// */}
      {/* <div className={classes.legendContainer}>
        <Card className={classes.legend}>
          <div className={classes.legendSVG}></div>
          <p className={classes.legendText}>
            {formattedToDate}-{formattedDate}
          </p>
        </Card>
      </div> */}
    </Card>
  );
};

export default AnalyticsCard;
