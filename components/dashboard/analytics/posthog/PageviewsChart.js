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

const PageviewsChart = ({ items }) => {
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
    labels: Object.keys(items),
    datasets: [
      {
        fill: false,
        label: "Page views",
        data: Object.values(items),
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
  return <Line height={150} width={200} data={data} options={options} />;
};

export default PageviewsChart;
