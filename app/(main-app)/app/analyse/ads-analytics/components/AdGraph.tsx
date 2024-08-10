"use client";

import React, { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

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
      stacked: true,
      grid: {
        display: false, // Hide x-axis grid lines
      },
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        stepSize: 5000, // Set step size to match your data range
        callback: function (value: any) {
          return value >= 1000 ? `${value / 1000}K` : value;
        },
      },
    },
  },
};

const labels: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "10"];

const generateRandomData = (length: number, min: number, max: number): number[] => {
  return Array.from({ length }, () => parseFloat((Math.random() * (max - min) + min).toFixed(2)));
};

interface DataSet {
  fill: boolean;
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  pointBorderColor: string;
  tension: number;
}

export default function AdsGraph() {
  const data = useMemo(() => {
    const datasets: DataSet[] = [
      {
        fill: true,
        label: "Followers",
        data: generateRandomData(labels.length, 1, 20000), // Generate random data between 1 and 5
        borderColor: "#034737",
        backgroundColor: "#ffffff00",
        pointBorderColor: "#ffffff00",
        tension: 0.4,
      },
    ];

    return { labels, datasets };
  }, []);

  return <Line options={options} data={data} />;
}
