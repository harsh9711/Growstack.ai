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
      position: "bottom" as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      min: 2000,
      max: 10000,
      ticks: {
        stepSize: 2000,
        callback: function (value: any) {
          return `${value / 1000}K`;
        },
      },
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const generateWaveData = (length: number, min: number, max: number, isCosine: boolean = false) => {
  const step = (Math.PI * 4) / length; // Adjust step for 2 periods
  return Array.from({ length }, (_, i) => {
    const angle = step * i;
    const waveValue = isCosine ? Math.cos(angle) : Math.sin(angle);
    const normalizedValue = ((waveValue + 1) / 2) * (max - min) + min;
    return Math.round(normalizedValue);
  });
};

export default function AreaChart() {
  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          fill: true,
          label: "Revenue this year",
          data: generateWaveData(labels.length, 4000, 8000, false),
          borderColor: "#8A5CFF",
          backgroundColor: "#8a5cff16",
          pointBorderColor: "#ffffff00",
          tension: 0.4,
        },
        {
          fill: true,
          label: "Revenue last year",
          data: generateWaveData(labels.length, 4000, 8000, true),
          borderColor: "#48C884",
          backgroundColor: "#48c88416",
          pointBorderColor: "#ffffff00",
          tension: 0.4,
        },
      ],
    }),
    []
  );

  return <Line options={options} data={data} />;
}
