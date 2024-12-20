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
      header: "What is AI LLM Comparison?",
      body: "AI LLM Comparison is a tool that allows users to compare multiple large language models (LLMs) side-by-side, helping you choose the best AI for your specific use case.",
    },
    {
      header: "Which AI models can I compare?",
      body: "The comparison tool supports various AI models, including: GPT Series (ChatGPT 3.5 Turbo, GPT-4, GPT 4o, GPT 4o Mini, GPT 4 Turbo), Claude Series (Claude 3 Opus, Claude 3.5 Sonnet, Claude 3 Sonnet, Claude 3 Haiku), Gemini Series (Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 1.5 Flash Pro, Gemini 1.5 Flash Latest), Llama Series (Llama 3 Sonar Small 32k Online, Llama 3 Sonar Small 32k Chat, Llama 3 Sonar Large 32k Online, Llama 3 Sonar Large 32k Chat), and Mistral Series (Mistral Large Latest, Mistral Medium Latest, Mistral Small Latest, Open Mistral Nemo, Open Mistral 8x22b, Open Mistral 8x7b, Open Mistral 7b).",
    },
    {
      header: "How many models can I compare at once?",
      body: "You can compare up to 3 AI models at a time, enabling you to make a well-informed decision based on the side-by-side analysis.",
    },
    {
      header: "What metrics are used in AI LLM Comparison?",
      body: "The comparison covers several key metrics, including: Response speed, Accuracy in context and understanding, Domain-specific performance (e.g., customer support, creative writing), Integration flexibility.",
    },
    {
      header: "Who can benefit from using AI LLM Comparison?",
      body: "This tool is ideal for businesses and developers who want to select the most appropriate AI for their needs, whether it's for customer service, content creation, or technical automation.",
    },
    {
      header: "How does the comparison process work?",
      body: "Users can select up to three models, and the tool will provide a detailed, side-by-side analysis based on performance metrics and specific use cases.",
    },
    {
      header: "Can I switch between models during use?",
      body: "Yes, after comparison, you can switch between models to find the one that best suits your requirements for ongoing use.",
    },
    {
      header: "How does this tool help in improving business efficiency?",
      body: "By selecting the best AI model for specific tasks, businesses can improve workflow, reduce response times, and enhance customer experience, making operations smoother and more efficient.",
    },
  ];

  return (
    <div className="w-full h-full transition transform duration-1000 ease-linear">
      {items.map((item, index) => {
        const isActive = activeKey === index;

        return (
          <div
            key={index}
            className="mb-4 w-full   bg-white border text-[16px] sm:text-[20px] rounded-[20px] font-bold items-start ease-in-out transition-transform duration-1000 cursor-pointer"
          >
            <div
              className="flex flex-row w-full items-center p-4 justify-between cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <div
                className={`rounded-[20px] text-start flex flex-row leading-8 items-center w-full justify-between ${isActive ? "text-primary-green" : ""}`}
              >
                {item.header}
              </div>

              <div
                className={`flex ease-in-out transition-transform duration-300 items-center justify-center border w-12 h-12 bg-${isActive ? "[#2DA771]" : "white"} rounded-full ${isActive ? "-rotate-180" : "rotate-75"}`}
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
                    stroke={isActive ? "white" : "#2DA771"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-all duration-700 ease-linear ${isActive ? "max-h-40" : "max-h-0"}`}
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
      <div className="sm:px-0 px-6 max-w-[1000px] w-full items-center justify-center mx-auto">
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
              <span className="font-light ml-2">AI llm comparison</span>
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
