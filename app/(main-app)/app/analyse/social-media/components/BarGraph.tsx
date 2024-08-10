// components/BarGraph.tsx

"use client";

import React, { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Function to generate random data and normalize it to sum up to a specific value
const generateNormalizedData = (length: number, segments: number, total: number) => {
  return Array.from({ length }, () => {
    const segmentData = Array.from({ length: segments }, () => Math.random());
    const segmentSum = segmentData.reduce((sum, value) => sum + value, 0);
    return segmentData.map((value) => (value / segmentSum) * total);
  });
};

const labels = ["7/12", "8/12", "9/12", "10/12", "11/12", "12/12", "13/12", "14/12", "15/12", "16/12", "17/12"];

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false, // Hide x-axis grid lines
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 100,
        callback: function (value: any) {
          return value; // Customize the y-axis tick labels
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

const BarGraph: React.FC = () => {
  // Generate normalized data for the datasets
  const normalizedData = useMemo(() => generateNormalizedData(labels.length, 3, 500), []);

  const barGraphData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Followers",
          data: normalizedData.map((d) => d[0]),
          backgroundColor: "#034737",
          barPercentage: 0.6,
          categoryPercentage: 0.3, // Further adjusted category width
        },
        {
          label: "Account Reached",
          data: normalizedData.map((d) => d[1]),
          backgroundColor: "#248D74",
          barPercentage: 0.6,
          categoryPercentage: 0.3, // Further adjusted category width
        },
        {
          label: "Post Activity",
          data: normalizedData.map((d) => d[2]),
          backgroundColor: "#46DEBA",
          barPercentage: 0.6,
          categoryPercentage: 0.3, // Further adjusted category width
        },
      ],
    }),
    [normalizedData]
  );

  return <Bar data={barGraphData} options={options} />;
};

export default BarGraph;
