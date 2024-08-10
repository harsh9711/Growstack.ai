// components/AudienceGrowthChart.tsx

"use client";

import React, { useMemo } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

// Function to generate random data points between a range
const generateRandomData = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Generate 40 data points and distribute them over 12 months
const generateMonthlyData = (points: number, months: number) => {
  const data = Array(months)
    .fill(0)
    .map(() => []);
  for (let i = 0; i < points; i++) {
    const monthIndex = Math.floor(Math.random() * months);
    //@ts-ignore
    data[monthIndex].push(generateRandomData(0, 3));
  }
  return data.map((monthData) => {
    const monthSum = monthData.reduce((sum, value) => sum + value, 0);
    return monthSum / (monthData.length || 1); // Avoid division by zero
  });
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const data = {
  labels,
  datasets: [
    {
      label: "Audience growth",
      data: generateMonthlyData(40, 12), // 40 points distributed over 12 months
      borderColor: "#034737",
      backgroundColor: "#03473716",
      fill: true,
      pointBackgroundColor: "#034737",
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems: any) => {
          const { dataIndex } = tooltipItems[0];
          return labels[dataIndex];
        },
        label: (tooltipItem: any) => {
          const { datasetIndex, dataIndex } = tooltipItem;
          const value = data.datasets[datasetIndex].data[dataIndex];
          return `Total contracts: ${value * 10}`; // Example tooltip content
        },
        afterLabel: (tooltipItem: any) => {
          const { datasetIndex, dataIndex } = tooltipItem;
          const value = data.datasets[datasetIndex].data[dataIndex];
          return `New contracts: ${Math.round((value * 10) / 2)}`; // Example tooltip content
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 0.5,
      },
    },
  },
};

const AudienceGrowthChart: React.FC = () => {
  return <Line data={data} options={options} />;
};

export default AudienceGrowthChart;
