import React, { useState, useEffect } from "react";
import AOS from "aos";
import clsx from "clsx";
import Company from "./Company";
import Industry from "./Industry";
import Team from "./Team";
import AiStudio from "./AiStudio";
import SocialPortal from "./SocialPortal";
import Automation from "./Automation";

interface TabLayoutProps {
  children?: React.ReactNode;
}

const TabLayout: React.FC<TabLayoutProps> = () => {
  const [activeTab, setActiveTab] = useState<string>("company");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "company":
        return <Company />;
      case "team":
        return <Team />;
      case "industry":
        return <Industry />;
      case "ai studio":
        return <AiStudio />;
      case "social portal":
        return <SocialPortal />;
      case "automation":
        return <Automation />;
      default:
        return <Company />;
    }
  };

  return (
    <main className="sm:py-12">
      <div className="w-full flex flex-col items-center justify-center mx-auto gap-8">
        <div className="flex flex-col md:flex-row w-full gap-3 items-center justify-center">
          <div className="flex flex-col w-full gap-5">
            <div className="w-full flex items-center justify-center">
              <div
                className="flex items-center justify-center w-full max-w-xs sm:max-w-[184px] px-4 py-2 rounded-2xl shadow-md bg-[#2DA77114] text-primary-lightgreen"
                data-aos="fade-in"
              >
                <h2 className="text-center text-[14px] sm:text-[18px] font-extrabold uppercase leading-snug">
                  Features
                </h2>
              </div>
            </div>
            <div
              className="bg-white p-4 flex flex-row shadow-lg items-center justify-center mx-auto rounded-3xl w-full max-w-[653px] transition duration-500"
              data-aos="zoom-in"
            >
              {["ai studio", "social portal", "automation"].map(tab => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "w-full flex justify-center p-3 text-center rounded-xl cursor-pointer transition-all duration-300 transform",
                    activeTab === tab
                      ? "bg-primary-lightgreen text-white hover:scale-105"
                      : ""
                  )}
                >
                  <span className="text-base font-semibold capitalize">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full gap-5">
            <div className="w-full flex items-center justify-center">
              <div
                className="flex items-center justify-center w-full max-w-xs sm:max-w-[184px] px-4 py-2 rounded-2xl shadow-md bg-[#2DA77114] text-primary-lightgreen"
                data-aos="fade-in"
              >
                <h2 className="text-center text-[14px] sm:text-[18px] font-extrabold uppercase leading-snug">
                  Solutions
                </h2>
              </div>
            </div>
            <div
              className="bg-white p-4 flex flex-row shadow-lg items-center justify-center mx-auto rounded-3xl w-full max-w-[653px] transition duration-500"
              data-aos="zoom-in"
            >
              {["company", "team", "industry"].map(tab => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "w-full flex justify-center p-3 text-center rounded-xl cursor-pointer transition-all duration-300 transform",
                    activeTab === tab
                      ? "bg-primary-lightgreen text-white hover:scale-105"
                      : ""
                  )}
                >
                  <span className="text-base font-semibold capitalize">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full px-4" data-aos="fade-up">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default TabLayout;
