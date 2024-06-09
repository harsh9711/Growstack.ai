"use client";

import { Fragment, useState } from "react";
import MainSection from "./layouts/MainSection";
import OverViewSection from "./layouts/OverViewSection";
import ReviewInboxSection from "./layouts/ReviewInboxSection";

export default function Dashboard() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Reputation manager", "Overview", "Review inbox"];

  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return <MainSection />;
      case 1:
        return <OverViewSection />;
      case 2:
        return <ReviewInboxSection />;
    }
  };
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Reputation manager</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Seeking that perfect content? Look no further! Get ready to explore our fantastic lineup of templates
            </p>
          </div>
          <div className="w-full max-w-[620px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
            <div className="w-full flex relative">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-1/3 h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                    selectedTabIndex === index ? "!text-white" : "!text-primary-grey"
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
                className="absolute bottom-0 w-1/3 h-[48px] bg-primary-green custom-transition rounded-lg"
                style={{ left: `calc(${tabUnderlineLeft}%)` }}></div>
            </div>
          </div>
        </div>
        <div className="mt-5">{renderContent(selectedTabIndex)}</div>
      </main>
    </Fragment>
  );
}
