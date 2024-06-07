import React from "react";
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export const options = {
  cutout: "75%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

const DoughnutGraph = ({
  data,
  labels,
  backgroundColors,
  borderColors,
}: {
  data: number[];
  labels: string[];
  backgroundColors: string[];
  borderColors: string[];
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutGraph;
