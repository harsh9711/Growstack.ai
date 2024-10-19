"use client";

import Motion from "@/components/Motion";
import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import ReviewsTable from "./components/ReviewsTable";
import OverviewGraphs from "./components/OverviewGraphs";

export default function MonitorReviewsSection() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Overview", "Reviews", "Sources"];

  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return <Overview />;
      case 1:
        return <Reviews />;
      case 2:
        return <Sources />;
    }
  };
  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="w-full max-w-[380px] bg-[#F5F5F5] px-3 py-2 rounded-2xl">
            <div className="w-full flex relative">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-full h-[42px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                    selectedTabIndex === index
                      ? "!text-white"
                      : "!text-primary-green"
                  }`}
                  onClick={() => {
                    const totalTabs = tabs.length;
                    const percentage = (index / totalTabs) * 100;
                    setSelectedTabIndex(index);
                    setTabUnderlineLeft(percentage);
                  }}
                >
                  {tab}
                </div>
              ))}
              <div
                className="absolute bottom-0 h-[42px] bg-primary-green custom-transition rounded-lg"
                style={{
                  left: `calc(${tabUnderlineLeft}%)`,
                  width: `${100 / tabs.length}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-sm">Enable review responses: </span>
            <button className="py-3 px-5 bg-primary-green sheen rounded-xl text-white flex gap-3 text-sm">
              Connect <FaGoogle size={18} /> <FaFacebook size={18} />
            </button>
          </div>
        </div>
        <div className="mt-5">{renderContent(selectedTabIndex)}</div>
      </div>
    </Motion>
  );
}

const Overview = () => {
  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <OverviewGraphs />
    </Motion>
  );
};

const Reviews = () => {
  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <ReviewsTable />
    </Motion>
  );
};

const Sources = () => {
  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div>Sources</div>
    </Motion>
  );
};
