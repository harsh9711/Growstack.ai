import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const YearlyCard = () => {
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

  const features = [
    {
      title: "Basic",
      price: "19.99$",
      priceSuffix: "/yr",
      description:
        "Powerful AI features to create & improve your content everywhere you work online.",
      buttonLabel: "Start free trial",
      buttonStyle: "bg-[#034737] text-white",
      featureList: [
        "1 user seat",
        "1 Brand Voice",
        "Access to GrowStack Chat",
        "Access to SEO mode",
        "Use AI everywhere with browser extension",
      ],
    },
    {
      title: "Business",
      price: "Custom pricing",
      description:
        "Personalized AI features with additional control, security, team training & tech support.",
      buttonLabel: "Contact sales",
      buttonStyle: "bg-[#034737]/10 text-[#034737]",
      featureList: [
        "Unlimited feature usage",
        "Groups & document collaboration",
        "Performance Analytics & Insights",
        "Custom Style Guides with X-ray view",
        "Enterprise-grade security & governance",
        "Advanced admin panel with permissions",
        "Custom workflows and templates*",
        "API access*",
        "Dedicated account management team with premium support",
      ],
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {features.map((plan, idx) => (
        <div
          key={idx}
          className="px-8 items-center max-w-[505px] xl:max-h-[726px] h-full w-full bg-[#F5F5F5] rounded-xl flex flex-col gap-y-2 justify-between py-6"
          data-aos="fade-up"
        >
          <div className="text-center flex flex-col gap-y-4">
            <h2
              className="text-[#000000] text-[20px] xl:text-[24px] font-bold"
              data-aos="fade-down"
            >
              {plan.title}
            </h2>
            <h2
              className="text-[24px] xl:text-[34px] text-center justify-center font-bold flex gap-2 items-center text-[#034737]"
              data-aos="fade-up"
            >
              {plan.price}
              {plan.priceSuffix && (
                <span className="text-[20px] xl:text-[28px] opacity-20 text-black">
                  {plan.priceSuffix}
                </span>
              )}
            </h2>
            <p
              className="opacity-60 w-full max-w-[450px] mx-auto"
              data-aos="fade-up"
            >
              {plan.description}
            </p>
          </div>
          <button
            className={`my-4 ${plan.buttonStyle} rounded-xl py-4 max-w-[405px] w-full`}
            data-aos="zoom-in"
          >
            {plan.buttonLabel}
          </button>
          <div className="flex flex-col gap-y-4 mb-60">
            {plan.featureList.map((feature, index) => (
              <p
                key={index}
                className="flex text-[12px] xl:text-[18px] font-medium items-center gap-x-2"
                data-aos="fade-left"
              >
                {tickIcon}
                {feature}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default YearlyCard;
