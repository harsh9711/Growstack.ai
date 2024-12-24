import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AgentsDepartment.scss";
import Link from "next/link";
function AgentsDepartment() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="bg-[#FAFBFC] py-10 md:py-16 lg:py-[70px]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Hero Card */}
            <div
              className=" my-2 my-md-3"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <span className="user">From idea to video in minutes 🔥</span>
              <h3 className="heading">
                <span>Agent for </span> <br />
                every department
              </h3>
              <Link
                href="/auth/register"
                className="group mt-2.5 px-5 py-4 hover:text-white hover:bg-[#2DA771] hover:border-[#2DA771] bg-white text-black border border-[#D7D7D7] text-base font-bold rounded-lg transition-all duration-300 no-underline flex flex-row gap-3 w-fit"
              >
                Get Started{" "}
                <img
                  src="/images_growstack/home/arrow.svg"
                  alt="arrow"
                  className="group-hover:invert"
                />
              </Link>
            </div>

            {[
              {
                icon: "/ms1.svg",
                title: "Insight",
                subtitle: "analysts",
                description:
                  "Ensure your business stays compliant with the ever-evolving legal landscape. Our Legal & Compliance AI Agents offer precise, real-time insights and complex legal processes, reducing risks and safeguarding your organization's reputation.",
              },
              {
                icon: "/ms2.svg",
                title: "Marketing & branding",
                subtitle: "agents",
                description:
                  "Transform your marketing strategies with our AI-driven Marketing & Branding Agents. Leverage advanced analytics and personalized content to captivate your audience, elevate your brand, and drive impactful campaigns.",
              },
              {
                icon: "/ms3.svg",
                title: "Sales",
                subtitle: "agents",
                description:
                  "Boost your sales performance with our cutting-edge Sales AI Agents. Our AI solutions streamline your sales processes, enhance customer interactions, and maximize your revenue potential.",
              },
              {
                icon: "/ms4.svg",
                title: "Customer success",
                subtitle: "architects",
                description:
                  "Optimize your executive workflows with our AI-powered C-Level Agents. Provide C-suite leaders with data-driven insights, and enhance strategic decision-making for superior organizational leadership.",
              },
              {
                icon: "/ms5.svg",
                title: "Tech",
                subtitle: "wizards",
                description:
                  "Elevate your human resources functions with our AI-enabled HR Agents. From recruitment to employee engagement, our intelligent solutions streamline HR operations, foster a positive workplace culture, and enhance overall productivity.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white border border-[#E3E3E3] rounded-[20px] p-6 md:p-10 transition-shadow duration-300 hover:shadow-lg"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <div className="icon">
                  <img src={card.icon} alt="icon" />
                </div>
                <h5 className="text-xl md:text-2xl font-bold text-black mt-4 mb-3">
                  <span className="block">{card.title}</span>
                  {card.subtitle}
                </h5>
                <p className="text-sm md:text-base text-black">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AgentsDepartment;
