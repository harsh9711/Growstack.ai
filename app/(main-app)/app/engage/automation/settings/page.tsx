"use client";

import React, { Fragment, useState } from "react";
import WhatsappSection from "./components/sections/WhatsappSection";
import TelegramSection from "./components/sections/TelegramSection";
import GeneralSettingsSettings from "./components/sections/GeneralSettingsSettings";

export default function CampaignsPage() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Whatsapp", "Telegram", "General settings"];

  const renderContent = () => {
    switch (selectedTabIndex) {
      case 0:
        return <WhatsappSection />;
      case 1:
        return <TelegramSection />;
      case 2:
        return <GeneralSettingsSettings />;
    }
  };

  const renderTitle = () => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Automation with our apps</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">WhatsApp settings </p>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Automation with our apps</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Telegram settings </p>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Automation with our apps</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">General Settings </p>
          </Fragment>
        );
    }
  };
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">{renderTitle()}</div>
          <div className="w-full flex items-center justify-end gap-3">
            <div className="w-full max-w-[484px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
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
        </div>
        <div>{renderContent()}</div>
      </main>
    </Fragment>
  );
}
