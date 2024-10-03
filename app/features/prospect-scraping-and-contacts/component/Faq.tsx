"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Footer from "@/components/footer/Footer";

const CustomAccordion = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key: any) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const items = [
    {
      header: "What is Prospect Scraping?",
      body: "Prospect Scraping is a tool designed to automatically gather and organize detailed business information from Google Maps, helping you efficiently identify and target potential customers.",
    },
    {
      header: "How does the data collection process work?",
      body: "The tool retrieves business data based on your specified search terms and location, then compiles this information into an organized table for easy review and management.",
    },
    {
      header: "What kind of data can I expect to receive?",
      body: "You will receive detailed business information including Business Name, Address, Rating (out of 5), Number of Reviews, Contact Number, and Website URL.",
    },
    {
      header: "How is the data presented?",
      body: "The collected data is displayed in a clear, tabular format, allowing for easy scanning, comparison, and analysis.",
    },
    {
      header: "Can I export the data?",
      body: "Yes, you can save and manage the collected data in the 'Prospects' tab under 'Contacts' for convenient access and organization.",
    },
    {
      header: "Is the data updated in real-time?",
      body: "The data is pulled directly from Google Maps, which is regularly updated. However, the tool captures the data at the time of the search, so it’s best to use it frequently for the most current information.",
    },
    {
      header: "How can I use the data for lead generation?",
      body: "Utilize the detailed business information to identify high-potential leads and build targeted lists for outreach or marketing campaigns.",
    },
    {
      header: "Can the tool be used for market research?",
      body: "Yes, the tool helps in analyzing market trends and competition by providing comprehensive business data and insights.",
    },
    {
      header: "Is the tool suitable for small businesses?",
      body: "Absolutely. The tool is designed to be beneficial for businesses of all sizes, helping small businesses efficiently gather and manage prospect data.",
    },
    {
      header: "How do I get started with Prospect Scraping?",
      body: "Simply enter your search terms and location, and the tool will start gathering and organizing the data for you. Check the 'Prospects' tab for your saved lists.",
    },

  ];

  return (
    <div className="w-full h-full transition transform duration-1000 ease-linear">
      {items.map((item, index) => {
        const isActive = activeKey === index;

        return (
          <div key={index} className="mb-4 w-full   bg-white border text-[20px] rounded-[20px] font-bold items-start ease-in-out transition-transform duration-1000 cursor-pointer">
            <div
              className={`flex flex-row w-full items-center p-4 justify-between cursor-pointer`}
              onClick={() => handleToggle(index)}
            >
              <div
                className={`rounded-[20px] text-start flex flex-row leading-8 items-center w-full justify-between ${isActive ? "text-primary-green" : ""}`}
              >
                {item.header}
              </div>

              <div
                className={`flex ease-in-out transition-transform duration-300 items-center justify-center border w-12 h-12 bg-${isActive ? "primary-green" : "white"} rounded-full ${isActive ? "-rotate-180" : "rotate-75"}`}
              >
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.85156 1.93066L10.0003 10.0426L18.1491 1.93066" stroke={isActive ? "white" : "#034737"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-700 ease-linear ${isActive ? "max-h-40" : "max-h-0"}`}

            >
              <div className="rounded-[20px] border-b-8 border-[#D9D9D9] p-4 max-w-[1000px] w-full font-normal text-[18px] text-gray-700 bg-white">
                {item.body}
              </div>
            </div>
          </div>
        );
      })}
    </div>

  );
};

const Faqs = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="max-w-[1000px] w-full items-center justify-center mx-auto">

        <div className="flex flex-col pt-16 items-start justify-start">
          <div
            className="items-center flex flex-col gap-y-6 justify-center mx-auto"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <div className="max-w-[74px] rounded-2xl item-center justify-center w-full py-2 text-[#034737] bg-[#03473714]">
              <h2 className="text-center capitalize text-[12px] font-extrabold">FAQ</h2>
            </div>
            <h3 className="text-[26px] sm:text-[40px] text-black max-w-4xl mx-auto leading-normal text-center font-extrabold ">
              Quick answers on
              <span className="font-light ml-2">
                Prospect scraping
              </span>
            </h3>
          </div>
          <div className="flex flex-col mb-40 md:flex-row w-full pt-10  gap-10 items-center justify-between">

            <div className="w-full">
              {" "}
              <CustomAccordion />
            </div>
          </div>
        </div>

      </div>


    </React.Fragment>
  );
};

export default Faqs;
