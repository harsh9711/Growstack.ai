"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/config/axios.config";
import { Feature } from "@/types/Box";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import Link from "next/link";

const PricingPage: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const tabs = ["Monthly billing", "Yearly billing"];
  const searchParams = useSearchParams();
  const tabQueryParam = searchParams.get("tab");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabDistanceFromLeft, setDistanceFromLeft] = useState(0);

  useEffect(() => {
    const tab = tabQueryParam ? Number(tabQueryParam) : 0;
    setSelectedTabIndex(tab);
    const totalTabs = tabs.length;
    const percentage = (tab / totalTabs) * 100;
    setDistanceFromLeft(percentage);
  }, [tabQueryParam]);

  const handleTabClick = (index: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", index.toString());
    history.replaceState(null, "", `?${params.toString()}`);
    setSelectedTabIndex(index);
  };

  const PlanCard = ({ plan }: { plan: Feature }) => {
    const router = useRouter();
    const tickIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 text-[#034737]"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 00-1.414 0L8.5 12.086 4.707 8.293a1 1 0 00-1.414 1.414l4.5 4.5a1 1 0 001.414 0l7.5-7.5a1 1 0 000-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );
    const [loading, setLoading] = useState(false);
  
    const handleButtonClick = async (plan: Feature) => {
      setLoading(true);
      try {
        const product = {
          price_id: plan.id,
          plan_type: plan.title,
        };
  
        const currency = "usd";
        const response = await instance.post(
          `${API_URL}/users/api/v1/payments/create-checkout-session`,
          { product, currency }
        );
        const { url } = response.data;
        window.location.href = url;
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else {
          toast.error(error.message || "An error occurred");
        }
        console.error("Error creating checkout session:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const suffix = selectedTabIndex === 0 ? plan.priceSuffix || "/mo" : "/yr";
    const marginBottom =
      plan.title === "Basic"
        ? "mb-20"
        : plan.title === "Class"
        ? "mb-20"
        : "mb-4";
  
    const renderFeature = (feature: string) => {
      if (feature.includes(":")) {
        return (
          <p
            className="flex text-[12px] xl:text-[18px] font-medium items-center gap-x-2"
            data-aos="fade-left"
          >
            {tickIcon}
            <span className="text-black">{feature.split(":")[0]}:</span>
            <span className="text-[#034737] font-semibold">
              {feature.split(":")[1]}
            </span>
          </p>
        );
      }
      return (
        <p
          className="flex text-[12px] xl:text-[18px] font-medium items-center gap-x-2"
          data-aos="fade-left"
        >
          {tickIcon}
          {feature}
        </p>
      );
    };
  
    return (
    <div
        className="items-center justify-center mx-auto max-w-[700px] xl:max-h-[700px] h-full w-full bg-[#F5F5F5] rounded-xl flex flex-col py-6 transition-all duration-300 border border-transparent hover:border-[#034737] hover:shadow-lg hover:bg-white hover:scale-105 shadow-sm hover:border-[4px] border-[2px]"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="text-center w-full flex flex-col gap-y-4">
          <h2
            className="px-8 text-[#000000] text-[20px] xl:text-[24px] font-extrabold"
            data-aos="fade-down"
          >
            {plan.title}
          </h2>
          <h2
            className="px-8 text-[24px] xl:text-[48px] text-center justify-center font-bold flex gap-2 items-center text-[#034737]"
            data-aos="fade-up"
          >
            {selectedTabIndex === 0 ? plan.monthlyPrice : plan.yearlyPrice}
            <span className="text-[20px] xl:text-[28px] opacity-20 text-black">
              {suffix}
            </span>
          </h2>
          <p
            className="px-8 opacity-60 w-full max-w-[450px] mx-auto"
            data-aos="fade-up"
          >
            {plan.description}
          </p>
          <div className="border-[#B8B8B8] px-10 border w-full mt-4 mb-10"></div>
        </div>
        <div className={`flex flex-col gap-y-4 ${marginBottom}`}>
          {plan.featureList.map((feature, index) => (
            <React.Fragment key={index}>
              {renderFeature(feature)}
            </React.Fragment>
          ))}
        </div>
        <div className="flex items-center justify-center w-full mt-auto">
          <button
            className={` ${plan.buttonStyle} group-hover:bg-[#034737] items-center justify-center mx-auto border-[#034737] rounded-xl py-4 max-w-[405px] w-full transition-all duration-300 hover:bg-[#034737] hover:text-white`}
            data-aos="zoom-in"
            onClick={() => handleButtonClick(plan)}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto"></div>
            ) : (
              <h2>Select plan</h2>
            )}
          </button>
        </div>
      </div>
    );
  };

  

  const renderContent = (selectedTabIndex: number) => {
    const features = [
      {
        id: "price_1PuoqDLJfGs6Fay30N578pcf",
        title: "Basic",
        monthlyPrice: "20.00$",
        yearlyPrice: "200.00$",
        priceSuffix: "/mo",

        description:
          "Powerful AI features to create & improve your content everywhere you work online.",
        buttonLabel: "Contact sales",
        buttonStyle: "bg-[#034737]/10 text-[#034737]",
        featureList: [
          "AI Apps, AI Chat, AI Assistants, AI Playground, Custom GPT, ",
          "Mobile App +  Chrome Extension, AI Article Wizard, Image Generation",
          "Product AI : $0.4 cents per image",
          "Text to Video : $3 per video ",
          "AI Workflows : Based on images, video & text",
          "Max discount for yearly plans : 25% Off",
        ],
      },
      {
        id: "price_1PuoqDLJfGs6Fay30N578pcf",
        title: "Business",
        monthlyPrice: "99.00$",
        yearlyPrice: "999.00$",
        description:
          "Personalized AI features with additional control, security, team training & tech support.",
        buttonLabel: "Contact sales",
        buttonStyle: "bg-[#034737]/10 text-[#034737]",
        featureList: [
          "AI Apps, AI Chat, AI Assistants, AI Playground, Custom GPT, ",
          "Mobile App +  Chrome Extension, AI Article Wizard, Image Generation",
          "Product AI : $0.4 cents per image",
          "Text to Video : $3 per video ",
          "AI Workflows : Based on images, video & text",
          "Social Media Analytics",
          "Webscraping, Contact (Consent & Verification is extra) : Credit based",
          "Max discount for yearly plans : 50% Discount",
        ],
      },
    ];

    return (
      <div className="flex flex-wrap items-center justify-center mx-auto gap-4 mt-6">
        {features.map((plan, idx) => (
          <PlanCard key={idx} plan={plan} />
        ))}
      </div>
    );
  };
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out',
    });
  }, []);
  return (
    <div className="flex flex-col maz-h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className="relative bg-white  xl:max-h-[988px] h-full w-full max-w-[1500px] mx-4 sm:mx-6 md:mx-8 lg:mx-auto rounded-2xl shadow-lg"
         data-aos="zoom-in"
          data-aos-duration="500"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="p-6 mx-auto flex xl:flex-row flex-col gap-10 overflow-hidden w-full  items-center justify-between"
            data-aos="fade-right"
          >
            <div
              className="flex xl:p-0 p-4 flex-col w-full gap-4"
              data-aos="fade-up"
            >
              <h2 className="text-black w-full font-bold xl:text-[28px] text-[14px] tracking-normal"  data-aos="zoom-in" >
                Choose a plan
              </h2>
              <p className="justify-end text-black text-[18px] font-extralight">
                Upgrade your plan anytime for more advanced features
              </p>
            </div>
            <div
              className="mt-6 xl:p-0 p-4 max-w-[400px] border-[#034737] text-[#034737] w-full flex justify-end"
              data-aos="fade-left"
            >
              <Link href="/">
                <button className="border-[#034737]  border rounded-xl font-semibold text-[#034737] px-10 py-4 ">
                  Sign out
                </button>
              </Link>
            </div>
          </div>
          <div className="border "></div>
          <section className="p-4">
            <div className="w-full border max-w-md flex gap-4 justify-center mx-auto item-center bg-[#F5F5F5] shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
              <div className="w-full flex relative">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                      selectedTabIndex === index
                        ? "!text-white font-semibold"
                        : "!text-[#034737]"
                    }`}
                    onClick={() => handleTabClick(index)}   data-aos="zoom-in" 
                  >
                    {tab}
                  </div>
                ))}
                <div
                  className="absolute bottom-0 h-[48px] bg-[#034737] custom-transition rounded-xl"
                  style={{
                    left: `calc(${tabDistanceFromLeft}%)`,
                    width: `${100 / tabs.length}%`,
                  }}data-aos="zoom-in" 
                ></div>
              </div>
              <h2
                className="!text-[#034737] mt-3.5 text-center w-full max-w-[100px] transition-opacity duration-300"
                style={{
                  opacity: selectedTabIndex === 1 ? 1 : 0.3,
                }}
              >
                (Save ~20%)
              </h2>
            </div>

            {renderContent(selectedTabIndex)}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
