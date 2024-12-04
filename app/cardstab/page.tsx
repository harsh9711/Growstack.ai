"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { BrowserCheckIcon, FormsIcon, SurveyIcon } from "@/components/svgs";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Company from "./components/Company";
import Industry from "./components/Industry";
import Team from "./components/Team";

const Layout2 = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("company");

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
    <main className="sm:py-12 ">
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
                  : "hover:bg-gray-50 hover:scale-105"
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

const SixCardTab = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="">
      <div className="max-w-[1628px] rounded-b-[60px] bg-[#F4F6F6] flex flex-col justify-center items-center gap-10 w-full mx-auto p-10 shadow-2xl">
        <div
          className="max-w-[184px] rounded-2xl flex items-center justify-center w-full px-4 py-2 text-primary-lightgreen bg-[#2DA77114] shadow-md"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug uppercase text-[14px] sm:text-[18px] font-extrabold">
            Solutions
          </h2>
        </div>
        <div
          className="flex flex-col justify-center text-center gap-6 w-full items-center"
          data-aos="fade-right"
        >
          <h1 className="text-[24px] xl:text-[42px] w-full leading-tight font-semibold text-gray-800">
            Enterprise-strong <span className="font-light">foundation</span>
          </h1>
        </div>
        <Layout2 children={undefined} />
      </div>
    </div>
  );
};

export default SixCardTab;
