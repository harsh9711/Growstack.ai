import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import "../../../../styles/animate.css";
import { ArrowRight } from "lucide-react";

const props = [
  {
    img: "/slogo.svg",
    title: "Schedule",
    subtitle: "a personalized demo",
    subpointspheading: "Unlock your potential",
    subpointspdiscription:
      "Experience the power of Growstack with a 7-day risk-free trial. Our platform offers a comprehensive suite of features tailored to meet the needs of eCommerce businesses.",
    subpheading: "What you’ll get",
    Subsubpoints: [
      {
        pbolddiscription:
          "AI-powered tools, automation workflows, and analytics dashboards.",
        subpdiscription: "Full access to all core features, including ",
      },
      {
        pbolddiscription: "",
        subpdiscription:
          "A hands-on opportunity to explore how Growstack can streamline your operations, boost conversion rates, and enhance customer engagement.",
      },
    ],
  },
];

const AboveFaq2 = () => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
    });
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  return (
    <div className="flex flex-col gap-y-16 sm:gap-y-32 max-w-[1287px] w-full items-center mx-auto">
      {props.map((inf, index) => (
        <div
          key={index}
          className="flex flex-col max-w-[1287px] w-full mx-auto"
          data-aos="fade-up"
        >
          <div
            className="flex flex-col sm:flex-row-reverse mt-6 gap-16 items-center w-full justify-between"
            data-aos="fade-left"
          >
            <div data-aos="zoom-in" className="w-full flex flex-col items-end">
              <Image
                src={inf.img || "/default-image.svg"}
                width={700}
                height={650}
                alt="image"
                className="w-full  transition-transform hover:scale-105"
              />
            </div>
            <div className="w-full flex flex-col gap-y-10 items-center sm:items-start">
              <div className="bg-[#FFFFFF] border-[#E4E4E4] max-w-[600px] rounded-[20px] py-8 flex flex-col gap-y-4 shadow-lg transition-all hover:shadow-xl">
                <div
                  className="bg-primary-green py-2 px-6 rounded-r-full max-w-fit"
                  data-aos="fade-right"
                >
                  <h2 className="text-white font-bold text-[16px] sm:text-[20px]">
                    {inf.subpointspheading}
                  </h2>
                </div>
                <div
                  className="text-[#034737] text-[16px] px-6 sm:text-[18px] font-medium"
                  data-aos="fade-up"
                >
                  <p>{inf.subpointspdiscription}</p>
                  <div
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="flex flex-row items-start justify-start mt-4 gap-8 group text-[12px] 2xl:text-[18px]"
                  >
                    <Link href="/auth/register" className="no-underline">
                      {" "}
                      <button className="bg-white   border-primary-green  border font-bold flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7  rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                        Free Trial <ArrowRight />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="py-8  bg-[#FFFFFF] border-[#E4E4E4] max-w-[600px] rounded-[20px] shadow-lg transition-all hover:shadow-xl">
                <div
                  className="bg-primary-green py-2 px-6 rounded-r-full max-w-fit"
                  data-aos="fade-right"
                >
                  <h2 className="font-bold text-white text-[18px] xl:text-[20px] sm:text-[18px]">
                    {inf.subpheading}
                  </h2>
                </div>
                <div
                  className="flex flex-col px-6  gap-y-4 mt-4"
                  data-aos="fade-up"
                >
                  {inf.Subsubpoints.map((information, idx) => (
                    <div
                      key={idx}
                      className="flex  items-start gap-2 text-[16px] sm:text-[18px] font-medium text-black"
                    >
                      <BsDot className="text-black mt-1 text-2xl" />
                      <span>{information.subpdiscription} <span className="font-bold">{information.pbolddiscription}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboveFaq2;
