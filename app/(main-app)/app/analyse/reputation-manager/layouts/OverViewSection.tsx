"use client";

import Motion from "@/components/Motion";
import { clsx } from "clsx";
import React, { useState } from "react";
import MonitorReviewsSection from "./subsections/MonitorReviews";
import GetReviewsSection from "./subsections/GetReviews";
import ShowCaseReviewsSection from "./subsections/ShowCaseReviews";

export default function OverViewSection() {
  const [selectedTab, setSelectedTab] = useState("Monitor reviews");
  const tabs = ["Monitor reviews", "Get reviews", "Showcase reviews"];

  const renderSection = () => {
    switch (selectedTab) {
      case "Monitor reviews":
        return <MonitorReviewsSection />;
      case "Get reviews":
        return <GetReviewsSection />;
      case "Showcase reviews":
        return <ShowCaseReviewsSection />;
    }
  };
  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div>
        <div className="flex ml-7 translate-y-[1.5px]">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setSelectedTab(tab)}
              className={clsx(
                "pt-5 pb-3 px-8 rounded-t-3xl cursor-pointer",
                selectedTab === tab &&
                  "bg-white border-t border-x border-[#E4E4E4] text-primary-green font-medium"
              )}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="bg-white border border-[#E4E4E4] rounded-3xl p-10">
          {renderSection()}
        </div>
      </div>
    </Motion>
  );
}
