import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "@/components/home/drag-features/icons/ArrowRight";
import "../../../../styles/new.css";
const HeroSection = () => {
  return (
    <div className="bg-[url('/leaderhero.png')] bg-cover bg-no-repeat relative flex items-center justify-center 2xl:p-0 p-4 w-full 2xl:max-h-[1112px] h-full mx-auto">
      <div className="w-full flex flex-col justify-center items-center brightness-110 relative gap-y-6 mt-2 mb-6 2xl:mt-32 2xl:mb-40">
        <div className="w-full max-w-[700px] flex flex-col items-center gap-y-4">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white text-black py-2 2xl:px-4 text-center flex items-center justify-center text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[300px] 2xl:max-w-[352px] shadow-lg w-full tracking-widest"
          >
            Growstack for Technology Industry
          </div>

          <div className="2xl:max-w-[663px] w-full brightness-95 text-center">
            <h1
              data-aos="fade-right"
              data-aos-duration="1500"
              className="text-[26px] xl:text-[40px] 2xl:text-[48px] w-full leading-normal text-white"
            >
              <span className="font-semibold">
                Transform your retail experience
              </span>
              {"   "}
              <span className="font-light">with GrowStack</span>
            </h1>
            <p
              data-aos="fade-right"
              data-aos-duration="1500"
              className="text-[16px] 2xl:text-[18px] text-white mt-4 w-full max-w-[600px] leading-normal font-light"
            >
              Empower your retail operations with AI-driven solutions for
              enhanced customer engagement, streamlined processes, and
              data-driven insights.{" "}
            </p>

            <div className="flex flex-col gap-20 mt-10">
              <div
                data-aos="fade-right"
                data-aos-duration="1500"
                className="flex flex-row items-center justify-center gap-8 group text-[12px] 2xl:text-[18px]"
              >
                <Link href="/auth/register" className="no-underline">
                  <button className="bg-white font-medium flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                    Get free trial <ArrowRight />
                  </button>
                </Link>
                <Link href="/demo" className="no-underline">
                  <button className="font-medium flex items-center gap-2 text-white 2xl:py-4 2xl:px-7 border border-white rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                    Get a demo
                    <ArrowRight className="text-white" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
