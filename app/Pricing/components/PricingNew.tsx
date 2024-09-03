"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/myanimation.css";
import "aos/dist/aos.css";
import AOS from "aos";
interface PricingRowProps {
  description: string;
  value1: string;
  value2: string;
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
      <div className="text-[12px] justify-center items-center grid grid-cols-2 gap-6 w-full">
        <h2 className="text-center">{value1}</h2>
        <h2 className="text-center">{value2}</h2>
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
      bgColor: "bg-[#034737]/10",
    },
    {
      description: "Product AI",
      value1: "$0.4 cents per image",
      value2: "$0.2 cents per image",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      description: "Text to Videos",
      value1: "$3 per video",
      value2: "$2 per video",
      bgColor: "bg-[#034737]/10",
    },
    {
      description:
        "Social Media Sharing and Scheduler, Social Media Conversation hub",
      value1: "No",
      value2: "Yes",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      description: "AI Workflows",
      value1: "Based on images, video & text",
      value2: "Based on images, video & text",
      bgColor: "bg-[#034737]/10",
    },
    {
      description: "Social Media Analytics",
      value1: "No",
      value2: "Yes",
      bgColor: "bg-[#FBFBFB]",
    },
    {
      description: "Webscraping, Contact (Consent & Verification is extra)",
      value1: "No",
      value2: "Credit based",
      bgColor: "bg-[#034737]/10",
    },
    {
      description: "Max discount for yearly plans",
      value1: "25% Off",
      value2: "50% Discount",
      bgColor: "bg-[#FBFBFB]",
    },
  ];
  const [billingPeriod, setBillingPeriod] = useState("Monthly");
  const isMonthly = billingPeriod === "Monthly";

  const handleBillingPeriodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBillingPeriod(e.target.value);
  }; useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="bg-[#FBFBFB] border rounded-[20px] px-4 w-full max-w-[1000px] relative"    data-aos="fade-up">
      <svg
        className="absolute -translate-y-16 translate-x-[700px]"
        width="31"
        height="56"
        viewBox="0 0 31 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="arrow-path"
          d="M22.2579 49.62L20.9666 50.1513C23.5384 47.8123 26.0597 45.3914 26.9537 41.8855C28.2309 36.8994 24.7454 32.5244 20.5544 30.3342C18.1275 29.0681 15.4788 28.338 12.9036 27.467C10.8697 26.7827 6.54029 25.5681 7.05045 22.6331C7.27084 21.3986 8.18761 20.2689 8.94041 19.3161C9.82447 18.1923 10.8262 17.1669 11.8043 16.1276C13.2849 14.5549 14.9236 12.7089 15.0982 10.4298C15.2994 7.82312 13.1837 5.78917 11.0606 4.68703C8.69155 3.46611 6.09722 3.05642 3.50228 3.58248L3.62063 4.47189C5.9968 4.33373 8.44344 4.75704 10.5429 5.95216C12.7791 7.23186 14.6972 9.4661 13.1075 12.0383C11.8392 14.094 9.72022 15.6186 8.1185 17.3999C6.74863 18.9168 5.14882 20.8651 5.13476 23.0404C5.10242 27.8542 12.0349 29.1064 15.4468 30.2438C19.7252 31.6627 25.5952 34.3957 25.524 39.8003C25.4865 42.4526 23.8919 44.772 22.1902 46.6495C21.0556 47.904 19.8661 49.0924 18.7183 50.3188L19.1585 48.7856C19.3019 47.9993 18.1377 47.353 17.7713 48.2022C17.1348 49.6637 16.5888 51.1646 15.9687 52.6337C15.5742 53.5594 16.4088 54.5108 17.3561 54.0281C19.2046 53.0929 21.1645 52.3392 22.9784 51.3497C23.888 50.8542 23.2684 49.2881 22.2579 49.62Z"
          fill="#034737"
        />
      </svg>
      <div className="w-full max-w-[220px] rounded-2xl items-center justify-center flex flex-col py-4 bg-[#034737] absolute top-[-55px] right-4 z-10">
        <h2 className="text-[16px] font-semibold mb-2 bg-white rounded-full px-10 py-2">
          Best Value
        </h2>
        <h2 className="text-[18px] font-medium mb-2 text-white">
          Premium user
        </h2>
        <h2 className="text-[18px] text-[#9F9F9F] font-semibold line-through">
          {isMonthly ? "US$30.00" : "US$300.00"}
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
      <div className="border-[#B8B8B8] absolute right-[485px] border-[1px] h-full max-h-[180px] translate-y-4"></div>

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
        <div className="flex flex-col  items-center relative right-56">
          <h2 className="text-[20px] font-medium mb-2">Pro user</h2>
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
      </div>
      {pricingData.map((row, index) => (
        <PricingRow
          key={index}
          description={row.description}
          value1={row.value1}
          value2={row.value2}
          bgColor={row.bgColor}
        />
      ))}
    </div>
  );
};

export default PricingNew;
