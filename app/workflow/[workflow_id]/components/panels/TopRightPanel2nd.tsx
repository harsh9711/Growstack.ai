import React, { useState } from "react";
import { dummyData3 } from "../data";

interface TopRightPanel2ndProps {
  activeTab?: number;
  setActiveTab: (index: number) => void;
}
const TopRightPanel2nd = ({
  activeTab,
  setActiveTab,
}: TopRightPanel2ndProps) => {

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="flex items-center border-2 border-white rounded-lg bg-gradient-to-b from-[#F8F8FA] to-[#F8F8FA]">
      {dummyData3.map((item, index) => (
        <button
          key={index.toString()}
          className={`flex justify-center items-center m-2 cursor-pointer px-2.5 py-1.5 rounded-md text-base font-normal ${
            activeTab === index
              ? "text-white bg-[#2DA771]"
              : "text-black bg-transparent"
          }`}
          onClick={() => handleClick(index)}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default TopRightPanel2nd;
