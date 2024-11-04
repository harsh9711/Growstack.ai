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

export const cases = [
  {
    id: 1,
    text: "Imagine having ",
    imageUrl: "/landingpagerevamp/1.svg",
    name: "Tony Stark's",
    description: "tech in your pocket.",
  },
  {
    id: 2,
    text: "You’re sipping coffee ☕, ",
    imageUrl: "/landingpagerevamp/2.svg",
    name: "",
    description:
      "and GrowStack is already taking care of your emails and LinkedIn replies – as smooth as Federer’s backhand.",
  },
  {
    id: 3,
    text: "Got a question? It’s like having ",
    imageUrl: "/landingpagerevamp/3.svg",
    name: "Sherlock ",
    description: "right beside you, finding answers with style and precision.",
  },
  {
    id: 4,
    text: "Need content? GrowStack has it covered, as effortlessly as  ",
    imageUrl: "/landingpagerevamp/4.svg",
    name: "MJ's moonwalkr",
    description: "",
  },
  {
    id: 5,
    text: "And when you need support, it’s as reliable as ",
    imageUrl: "/landingpagerevamp/5.svg",
    name: "Rocky’s trainer",
    description: "in your corner.",
  },
  {
    id: 6,
    text: "GrowStack: your",
    imageUrl: "/landingpagerevamp/6.svg",
    name: " dream team,",
    description: "making work feel easy and fun!",
  },
];
const BillingOverview = () => <div>Billing Overview Content</div>;
const BillingHistory = () => <div>Billing History Content</div>;
const Credits = () => <div>Credits Content</div>;
const Layout2 = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <BillingOverview />;
      case "history":
        return <BillingHistory />;
      case "credits":
        return <Credits />;
      default:
        return <BillingOverview />;
    }
  };

  return (
    <main className="mt-10">
      <div className="w-full flex  flex-col items-start gap-8 mt-5">
        <div className="!bg-white flex flex-row shadow-box p-5 !rounded-3xl w-full max-w-[650px]">
          <div
            onClick={() => setActiveTab("overview")}
            className={clsx(
              "w-full flex justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition mt-3",
              activeTab === "overview" &&
                "bg-primary-green text-white hover:bg-primary-green/90"
            )}
          >
            <div className="flex items-center gap-2">
              <BrowserCheckIcon />
              <span>Billing Overview</span>
            </div>
            <ChevronRight size={20} />
          </div>
          <div
            onClick={() => setActiveTab("history")}
            className={clsx(
              "w-full flex justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition mt-3",
              activeTab === "history" &&
                "bg-primary-green text-white hover:bg-primary-green/90"
            )}
          >
            <div className="flex items-center gap-2">
              <SurveyIcon />
              <span>Billing History</span>
            </div>
            <ChevronRight size={20} />
          </div>
          <div
            onClick={() => setActiveTab("credits")}
            className={clsx(
              "w-full flex justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition mt-3",
              activeTab === "credits" &&
                "bg-primary-green text-white hover:bg-primary-green/90"
            )}
          >
            <div className="flex items-center gap-2">
              <FormsIcon />
              <span>Credits</span>
            </div>
            <ChevronRight size={20} />
          </div>
        </div>
        <div className="w-full">{renderContent()}</div>
      </div>
    </main>
  );
};

const SixCardTab = () => {
  return (
    <div className="py-8">
      <div className="max-w-[1340px] flex flex-col sm:items-start items-center gap-y-6 sm:gap-y-8 w-full mx-auto sm:py-40">
        <div
          className="max-w-[184px] rounded-2xl flex items-center justify-center w-full px-4 py-2 text-primary-lightgreen bg-[#2DA77114]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[12px] sm:text-[16px] font-extrabold">
            Value
          </h2>
        </div>
        <div
          className="flex flex-col sm:text-start text-center gap-6 w-full justify-between items-center sm:items-start"
          data-aos="fade-right"
        >
          <h1 className="text-[28px] xl:text-[40px] w-full leading-tight font-semibold text-black">
            What value do <span className="font-light">we add? </span>
          </h1>
        </div>
        <Layout2 children={undefined} />
      </div>
    </div>
  );
};

export default SixCardTab;
