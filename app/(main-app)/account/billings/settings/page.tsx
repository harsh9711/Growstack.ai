"use client";

import { useState } from "react";
import BillingHistorySection from "./sections/BillingHistorySection";
import OverviewSection from "./sections/OverViewSection";

export default function SettingsPage() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Overview", "Billing history"];
  const renderContent = () => {
    switch (selectedTabIndex) {
      case 0:
        return <OverviewSection />;
      case 1:
        return <BillingHistorySection />;
    }
  };
  return (
    <main>
      <div className="flex justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">Billing</h1>
          <p className="text-primary-black text-opacity-50">Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam ultricies accumsan. Nec.</p>
        </div>
        <div className="w-full max-w-[320px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
          <div className="w-full flex relative">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
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
              className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
              style={{ left: `calc(${tabUnderlineLeft}%)`, width: `${100 / tabs.length}%` }}></div>
          </div>
        </div>
      </div>
      {renderContent()}
    </main>
  );
}
