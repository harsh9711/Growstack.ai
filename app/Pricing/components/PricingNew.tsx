"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/myanimation.css";
import "aos/dist/aos.css";
import AOS from "aos";
interface PricingRowProps {
  description: string;
  value1: string;
  value2: string;
  value3: string;
  bgColor: string;
}

const PricingRow: React.FC<PricingRowProps> = ({
  description,
  value1,
  value2,
  bgColor,
}) => {
  return (
    <div
      className={`mt-6 grid grid-cols-[1.2fr_1px_1fr] items-center gap-20 p-4 rounded-[20px] ${bgColor} font-semibold text-[12px] xl:text-[16px]`}
      data-aos="fade-up"
    >
      <div className=" w-full">
        <p>{description}</p>
      </div>
      <div className="h-full border-l  -translate-x-6 border-[#B8B8B8] border-[1px]"></div>
      <div className="text-[6px] justify-center items-center grid grid-cols-3 gap-6 w-full">
        <h2 className="text-center text-[18px]">{value1}</h2>
        <h2 className="text-center text-[18px]   ">{value2}</h2>
        <h2 className="text-center text-[18px]">{value2}</h2>
      </div>
    </div>
  );
};

const PricingNew: React.FC = () => {
  const CustomIcon = () => (
    <svg
      width="30"
      height="33"
      viewBox="0 0 30 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30 1.63802C30 1.63802 29.0103 15.6437 26.2786 21.3244C21.1637 31.9686 15.0004 32.9899 15.0004 32.9899C15.0004 32.9899 8.8377 31.9686 3.7214 21.3244C0.991845 15.6437 0 1.63802 0 1.63802L14.9996 0L30 1.63802Z"
        fill="#034737"
      />
      <path
        d="M21.0562 10.1919L22.3012 11.4369L13.485 20.2531L9.09375 15.8597L10.3388 14.6154L13.4871 17.7638L21.0562 10.1919Z"
        fill="white"
      />
    </svg>
  );
  const pricingData = [
    {
      description:
        "AI Apps, AI Chat, AI Assistants, AI Playground, Custom GPT, Mobile App + Chrome Extension, AI Article Wizard, Image Generation",
      value1: "Yes",
      value2: "Yes",
      value3: "Yes",
      bgColor: "bg-[#034737]/10",
    },
    {
      description: "Product AI",
      value1: "$0.4 cents per image",
      value2: "$0.3 Cents Per Image",
      value3: "$0.3 Cents Per Image",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      description: "Text to Videos",
      value1: "$3 per video",
      value2: "$2 per video",
      value3: "$1.5 Per Video",
      bgColor: "bg-[#034737]/10",
    },
    {
      description:
        "Social Media Sharing and Scheduler, Social Media Conversation hub",
      value1: "No",
      value2: "Yes",
      value3: "Yes",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      description: "AI Workflows",
      value1: "No",
      value2: "Yes",
      value3: "Yes, Credit Based, 2k Workflow Credits / Mo.",
      bgColor: "bg-[#034737]/10",
    },
    {
      description: "Social Media Analytics",
      value1: "No",
      value2: "Yes",
      value3: "Yes",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      description: "Webscraping, Contact (Consent & Verification is extra)",
      value1: "No",
      value2: "No",
      value3: "No",
      bgColor: "bg-[#034737]/10",
    },
    {
      description: "Max discount for yearly plans",
      value1: "25% Off",
      value2: "50% Discount",
      value3: "30% Discount",
      bgColor: "bg-[#FBFBFB]",
    },
  ];
  const [billingPeriod, setBillingPeriod] = useState("Monthly");
  const isMonthly = billingPeriod === "Monthly";

  const handleBillingPeriodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBillingPeriod(e.target.value);
  };
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div
      className="bg-[#FBFBFB] border rounded-[20px] px-4 w-full max-w-[1400px] relative"
      data-aos="fade-up"
    >
      <svg
        className="absolute -translate-y-16 translate-x-[700px]"
        width="31"
        height="56"
        viewBox="0 0 31 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG content */}
      </svg>
      <div className="w-full max-w-[220px] rounded-2xl items-center justify-center flex flex-col py-4 bg-[#034737] absolute top-[-55px] left-[960px] z-10">
        <h2 className="text-[16px] font-semibold mb-2 bg-white rounded-full px-10 py-2">
          Best Value
        </h2>
        <h2 className="text-[18px] font-medium mb-2 text-white">Influencer</h2>
        <h2 className="text-[18px] text-[#9F9F9F] font-semibold line-through">
          {isMonthly ? "US$120.00" : "US$300.00"}
        </h2>
        <h2 className="text-[28px] font-semibold text-[#A9FF9B]">
          {isMonthly ? "US$99.00" : "US$990.00"}
        </h2>
        <h2 className="text-[16px] text-[#9F9F9F] font-medium">
          Per {billingPeriod.toLowerCase()}
        </h2>
        <button className="mt-6 bg-white text-[#034737] border-[#034737] font-semibold border rounded-[10px] px-10 py-2">
          Subscribe now
        </button>
      </div>

      <div className="border-[#B8B8B8] absolute left-[730px] border-[1px] h-full max-h-[180px] translate-y-4"></div>

      <div className="flex flex-row items-center justify-between p-4">
        <div>
          <label htmlFor="billing-period">Plan:</label>
          <select
            id="billing-period"
            value={billingPeriod}
            onChange={handleBillingPeriodChange}
            className="ml-2 border rounded-[10px] px-2 py-1"
          >
            <option value="Monthly">Monthly Plan</option>
            <option value="Yearly">Yearly Plan</option>
          </select>
          <span className="flex gap-4 mt-2">
            <CustomIcon />
            <h2 className="font-bold">Pricing Strategy</h2>
          </span>
        </div>

        {/* Pro user section */}
        <div className="flex flex-col  items-center relative left-24">
          <h2 className="text-[20px] font-medium mb-2">Pro </h2>
          <h2 className="text-[18px] text-[#9F9F9F] font-semibold line-through">
            {isMonthly ? "US$30.00" : "US$300.00"}
          </h2>
          <h2 className="text-[28px] font-semibold">
            {isMonthly ? "US$20.00" : "US$200.00"}
          </h2>
          <h2 className="text-[16px] text-[#9F9F9F] font-medium">
            Per {billingPeriod.toLowerCase()}
          </h2>
          <button className="mt-4 text-[#034737] border-[#034737] font-semibold border rounded-[10px] px-10 py-2">
            Subscribe now
          </button>
        </div>

        {/* New row for Standard user */}
        <div className="flex flex-col  items-center relative left-10">
          <h2 className="text-[20px] font-medium mb-2">Business</h2>
          <h2 className="text-[18px] text-[#9F9F9F] font-semibold line-through">
            {isMonthly ? "US$199" : "US$150.00"}
          </h2>
          <h2 className="text-[28px] font-semibold">
            {isMonthly ? "US$2388.00" : "US$100.00"}
          </h2>
          <h2 className="text-[16px] text-[#9F9F9F] font-medium">
            Per {billingPeriod.toLowerCase()}
          </h2>
          <button className="mt-4 text-[#034737] border-[#034737] font-semibold border rounded-[10px] px-10 py-2">
            Subscribe now
          </button>
        </div>
      </div>

      {pricingData.map((row, index) => (
        <PricingRow
          key={index}
          description={row.description}
          value1={row.value1}
          value2={row.value2}
          bgColor={row.bgColor}
          value3={row.value3}
        />
      ))}
    </div>
  );
};

export default PricingNew;
