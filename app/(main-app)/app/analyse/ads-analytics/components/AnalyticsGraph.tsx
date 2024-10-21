"use client";

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
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
        display: false,
      },
      ticks: {
        display: false, // hide x-axis ticks
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false, // hide y-axis ticks
      },
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function AnalyticsGraph({
  color,
}: {
  color: "#034737" | "#CF0000";
}) {
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          fill: true,
          label: "Followers",
          data: [3, 1.3, 2, 3, 2, 4, 2, 4, 2, 3.1, 4, 4.4],
          borderColor: color,
          backgroundColor: `${color}16`,
          pointBorderColor: "#ffffff00",
          tension: 0.4,
        },
      ],
    }),
    []
  );

  return <Line options={options} data={data} />;
}
