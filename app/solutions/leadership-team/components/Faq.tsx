"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CustomAccordion = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key: any) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const items = [
    {
      header: "What is GrowStack?",
      body: "GrowStack is an all-in-one platform that turns data into insights, automates workflows, and unifies communication across channels to help businesses make smarter, faster decisions.",
    },
    {
      header: "Can GrowStack integrate with our current tools?",
      body: "Yes, GrowStack easily integrates with your existing CRM, social media, and marketing tools to streamline workflows without disruption.",
    },
    {
      header: "Is there a free trial?",
      body: "Yes! Try GrowStack for free for 7 days and explore all its features before committing.",
    },
    {
      header: "How does GrowStack reduce manual tasks?",
      body: "GrowStack automates routine tasks like lead management, scheduling, and data entry, boosting efficiency and freeing up your team for strategic work.",
    },
    {
      header: "Is GrowStack secure?",
      body: "Absolutely. GrowStack offers top-level encryption and secure access, ensuring your data stays protected while delivering real-time insights.",
    },
    {
      header: "How does GrowStack unify communication?",
      body: "GrowStack centralizes all communication platforms (email, social media, messaging) into one interface for consistent and efficient interactions.",
    },
    {
      header: "How long does it take to implement GrowStack?",
      body: "Implementation is quick, taking just a few days, and we provide full support to ensure a smooth process.",
    },
    {
      header: "What kind of support is available?",
      body: "We offer 24/7 support via live chat, email, and phone, along with detailed tutorials and onboarding assistance.",
    },
  ];

  return (
    <div className="w-full h-full transition transform duration-1000 ease-linear">
      {items.map((item, index) => {
        const isActive = activeKey === index;

        return (
          <div
            key={index}
            className="mb-4 w-full   bg-white border text-[12px] sm:text-[20px] rounded-[20px] font-bold items-start ease-in-out transition-transform duration-1000 cursor-pointer"
          >
            <div
              className="flex flex-row w-full items-center p-4 justify-between cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <div
                className={`rounded-[20px] text-start flex flex-row leading-tight items-center w-full justify-between ${
                  isActive ? "text-primary-green" : ""
                }`}
              >
                {item.header}
              </div>

              <div
                className={`flex ease-in-out transition-transform duration-300 items-center justify-center sm:border w-6 h-6 sm:w-12 sm:h-12 bg-${
                  isActive ? "primary-green" : "white"
                } rounded-full ${isActive ? "-rotate-180" : "rotate-75"}`}
              >
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 20 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.85156 1.93066L10.0003 10.0426L18.1491 1.93066"
                    stroke={isActive ? "white" : "#034737"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-700 ease-linear ${
                isActive ? "max-h-40" : "max-h-0"
              }`}
            >
              <div className="rounded-[20px] border-b-8 border-[#D9D9D9] p-4 max-w-[1000px] w-full font-normal text-[12px] sm:text-[18px] text-gray-700 bg-white">
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
              <h2 className="text-center capitalize text-[12px] font-extrabold">
                FAQ
              </h2>
            </div>
            <h3 className="text-[26px] sm:text-[40px] text-black max-w-4xl mx-auto leading-normal text-center font-extrabold ">
              Quick answers on
              <span className="font-light ml-2">Technology Industry</span>
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
