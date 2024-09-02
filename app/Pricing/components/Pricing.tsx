"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ContactsTable from "./MonthlyCard";
import ProspectsTable from "./YearlyCard";

const Pricing = () => {
  const tabs = ["Monthly billing", "Yearly billing"];
  const searchParams = useSearchParams();
  const tabQueryParam = searchParams.get("tab");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabDistanceFromLeft, setDistanceFromLeft] = useState(0);

  useEffect(() => {
    const tab = tabQueryParam ? Number(tabQueryParam) : 0;
    setSelectedTabIndex(tab);
    const totalTabs = tabs.length;
    const percentage = (tab / totalTabs) * 100;
    setDistanceFromLeft(percentage);
  }, [tabQueryParam]);

  const handleTabClick = (index: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", index.toString());
    history.replaceState(null, "", `?${params.toString()}`);
    setSelectedTabIndex(index);
  };

  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return <ContactsTable />;
      case 1:
        return <ProspectsTable />;
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="w-full flex flex-col gap-y-6 items-center justify-center">
        <div className="max-w-[400px]">
          <p className="tracking-normal w-full text-[16px] font-medium text-center">
            GrowStack plans & pricing are designed to meet your needs as you
            grow
          </p>
        </div>
        <div className="w-full max-w-md flex gap-4 justify-center mx-auto item-center bg-[#034737] shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
            <div className="w-full flex relative">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                    selectedTabIndex === index
                      ? "!text-[#034737] font-semibold"
                      : "!text-white"
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab}
                </div>
              ))}
              <div
                className="absolute bottom-0 h-[48px] bg-white custom-transition rounded-xl"
                style={{
                  left: `calc(${tabDistanceFromLeft}%)`,
                  width: `${100 / tabs.length}%`,
                }}
              ></div>
            </div>
            <h2
              className="text-white mt-3.5 text-center w-full max-w-[100px] transition-opacity duration-300"
              style={{
                opacity: selectedTabIndex === 1 ? 1 : 0.3,
              }}
            >
              (Save ~20%)
            </h2>
          </div>
        <div className="mt-5">{renderContent(selectedTabIndex)}</div>
      </div>
    </div>
  );
};

export default Pricing;
