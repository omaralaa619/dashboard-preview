import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const PageviewsChart = ({ items }) => {
  const chartData = items.map(({ day, count }) => ({
    name: day,
    value: count,
  }));

  return (
    <div className="h-60 ">
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
            formatter={(value, name) => [value, "views"]}
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
  );
};

export default PageviewsChart;
