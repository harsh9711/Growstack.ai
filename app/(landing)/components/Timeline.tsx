import React from "react";
import { timelineData } from "./constants/timelineData";

const Timeline: React.FC = () => {
  return (
    <div className="py-10 px-5">
      <h2 className="text-center text-2xl font-semibold mb-10">Future Plans</h2>
      <h1 className="text-center text-3xl font-bold mb-16">A unified solution for AI automation</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {timelineData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full mb-4 ${
                index % 2 === 0 ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
              }`}>
              {item.quarter}
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <ul className="list-disc list-inside">
                {item.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
