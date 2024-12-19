import React, { useState, useEffect } from "react";
import AOS from "aos";
import clsx from "clsx";
import Company from "./Company";
import Industry from "./Industry";
import Team from "./Team";

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
      default:
        return <Company />;
    }
  };

  return (
    <main className="sm:py-12">
      <div className="w-full flex flex-col items-center justify-center mx-auto gap-8">
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
        <div className="w-full px-4" data-aos="fade-up">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

export default TabLayout;
