"use client";

import Motion from "@/components/Motion";
import { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { ReviewsTable } from "./components/ReviewsTable";

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
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div>
        <div className="flex items-center justify-between">
          <div className="w-full max-w-[380px] bg-[#F5F5F5] px-3 py-2 rounded-2xl">
            <div className="w-full flex relative">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-1/3 h-[42px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                    selectedTabIndex === index ? "!text-white" : "!text-primary-green"
                  }`}
                  onClick={() => {
                    const totalTabs = tabs.length;
                    const percentage = (index / totalTabs) * 100;
                    setSelectedTabIndex(index);
                    setTabUnderlineLeft(percentage);
                  }}>
                  {tab}
                </div>
              ))}
              <div
                className="absolute bottom-0 w-1/3 h-[42px] bg-primary-green custom-transition rounded-xl"
                style={{ left: `calc(${tabUnderlineLeft}%)` }}></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span>Enable review responses: </span>
            <button className="py-4 px-6 bg-primary-green sheen rounded-xl text-white flex gap-3">
              Connect <FaGoogle size={20} /> <FaFacebook size={20} />
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
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div>Overview</div>
    </Motion>
  );
};

const Reviews = () => {
  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div>
        <h1 className="text-xl font-semibold">Reviews</h1>
        <ReviewsTable />
      </div>
    </Motion>
  );
};

const Sources = () => {
  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div>Sources</div>
    </Motion>
  );
};
