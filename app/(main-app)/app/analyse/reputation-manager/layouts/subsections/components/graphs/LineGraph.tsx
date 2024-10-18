import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: "#F1F1F1", // Customize the color of x-axis grid lines
        borderColor: "#F1F1F1", // Customize the color of the x-axis border line
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 50000, // Set step size to match your data range
        callback: function (value: any) {
          return value >= 1000 ? `${value / 1000}K` : value;
        },
      },
      grid: {
        color: "#F1F1F1", // Customize the color of y-axis grid lines
        borderColor: "#F1F1F1", // Customize the color of the y-axis border line
      },
    },
  },
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const labels = months.map(month => month + " " + new Date().getFullYear());

const generateRandomData = (numPoints: number, min: number, max: number) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
};

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: generateRandomData(months.length, 0, 200000), // Random data between 0 and 5
      borderColor: "#034737",
      backgroundColor: "#034737",
      tension: 0.4,
    },
  ],
};

export default function LineGraph() {
  return <Line options={options} data={data} />;
}
