"use client";

import React, { Fragment, useState } from "react";
import OverviewSection from "./components/sections/OverviewSection";
import ContactListsSection from "./components/sections/ContactListsSection";
import ContactsSection from "./components/sections/ContactsSection";
import SegmentsSection from "./components/sections/SegmentsSection";
import BotRepliesSection from "./components/sections/BotRepliesSection";
import TemplatesSection from "./components/sections/TemplatesSection";

export default function Whatsapp() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Overview", "Contact lists", "Contacts", "Segments", "Bot replies", "Templates"];

  const renderContent = () => {
    switch (selectedTabIndex) {
      case 0:
        return <OverviewSection />;
      case 1:
        return <ContactListsSection />;
      case 2:
        return <ContactsSection />;
      case 3:
        return <SegmentsSection />;
      case 4:
        return <BotRepliesSection />;
      case 5:
        return <TemplatesSection />;
    }
  };

  const renderTitle = () => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Automation with our apps</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">WhatsApp overview </p>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Contact list</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Contacts</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
      case 3:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Segments</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
      case 4:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Bots & Quick replies management</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
      case 5:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Templates</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam ultricies accumsan. Nec.{" "}
            </p>
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
            <div className="w-full max-w-[764px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
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
