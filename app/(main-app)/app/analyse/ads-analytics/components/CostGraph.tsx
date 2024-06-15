// components/CostChart.tsx

"use client";

import React, { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false, // Hide x-axis grid lines
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10000,
        callback: function (value: any) {
          return value / 1000 + "K"; // Customize the y-axis tick labels
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const CostChart: React.FC = () => {
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Cost per reach",
          data: [10000, 25000, 50000, 15000, 10000, 30000, 20000, 50000, 10000, 20000, 10000, 15000],
          backgroundColor: "#034737", // Color for Cost per reach
          barPercentage: 0.4, // Adjust the bar width (reduced)
          categoryPercentage: 0.6, // Adjust the category width (reduced)
        },
        {
          label: "Cost per impression",
          data: [5000, 10000, 2000, 5000, 3000, 10000, 15000, 3000, 2000, 5000, 3000, 5000],
          backgroundColor: "#248D74", // Color for Cost per impression
          barPercentage: 0.4, // Adjust the bar width (reduced)
          categoryPercentage: 0.6, // Adjust the category width (reduced)
        },
      ],
    }),
    []
  );

  return <Bar data={data} options={options} />;
};

export default CostChart;
