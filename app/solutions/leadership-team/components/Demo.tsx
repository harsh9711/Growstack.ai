import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Demo = () => {
  return (
    <section className="flex flex-col  sm:p-0 p-4 gap-y-10 sm:mt-40 mt-10">
      <div
        className="max-w-[1240px] mx-auto bg-primary-green py-10 w-full h-full rounded-[40px] flex flex-col gap-y-8 items-center justify-center text-white"
        data-aos="fade-up"
      >
        <h2 className="sm:text-[42px] text-[28px] text-white">Book a demo</h2>
        <p className="text-white text-center">
          See GrowStack in action and discover how it can revolutionize your
          business.
        </p>
        <Link href="/demo" className="no-underline">
          <button className="bg-white font-bold flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
            Get demo <ArrowRight />
          </button>
        </Link>
      </div>

      <div className="hidden sm:flex flex-col sm:flex-row  max-w-[1240px] w-full gap-x-10 sm:gap-x-28 items-center mx-auto justify-between ">
        <div
          className="relative max-w-[621px] mx-auto py-10 w-full h-full flex flex-col gap-y-8 items-start justify-center text-white"
          data-aos="fade-right"
        >
          <div
            className="absolute inset-0 w-full h-full bg-[#13745D]"
            style={{
              transform: "skew(-20deg)",
              borderRadius: "40px",
            }}
          ></div>
          <div className="relative z-10 w-full max-w-[421px] mx-auto h-full flex flex-col gap-y-6 items-center justify-center">
            <h2 className="sm:text-[42px] text-[28px] font-extrabold text-white">
              Free trial
            </h2>
            <p className="text-white max-w-[373px] sm:text-[18px] text-start text-[14px] leading-tight w-full">
              Experience GrowStack's full potential with a risk-free trial.
            </p>
            <Link href="/auth/register" className="no-underline">
              <button className="bg-white font-bold flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                Get free trial <ArrowRight />
              </button>
            </Link>
          </div>
        </div>

        <div
          className="relative max-w-[621px] mx-auto py-10 w-full h-full flex flex-col gap-y-8 items-start justify-center text-white"
          data-aos="fade-left"
        >
          <div
            className="absolute inset-0 w-full h-full bg-[#55917E]"
            style={{
              transform: "skew(20deg)",
              borderRadius: "40px",
            }}
          ></div>
          <div className="relative z-10 w-full max-w-[421px] mx-auto h-full flex flex-col gap-y-6 items-center justify-center">
            <h2 className="sm:text-[42px] text-[28px] font-extrabold text-white">
              Contact our team
            </h2>
            <p className="text-white max-w-[373px] sm:text-[18px] text-start text-[14px] leading-tight w-full">
              Get personalized guidance and find the perfect solution for your
              needs.
            </p>
            <Link href="/contact" className="no-underline">
              <button className="bg-white font-bold flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                Contact Us <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" sm:hidden flex flex-col sm:flex-row  max-w-[1240px] w-full gap-y-10 sm:gap-x-28 items-center mx-auto justify-between ">
        <div className="max-w-[1240px] mx-auto bg-[#13745D] py-10 w-full h-full rounded-[40px] flex flex-col gap-y-8 items-center justify-center text-white">
          <div className="relative z-10 w-full max-w-[421px] mx-auto h-full flex flex-col gap-y-6 items-center justify-center">
            <h2 className="sm:text-[42px] text-[28px] font-extrabold text-white">
              Free trial
            </h2>
            <p className="text-white max-w-[373px] sm:text-[18px] text-center text-[14px] leading-tight w-full">
              Experience GrowStack's full potential with a risk-free trial.
            </p>
            <Link href="/auth/register" className="no-underline">
              <button className="bg-white font-bold flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                Get free trial <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
        <div className="max-w-[1240px] mx-auto bg-[#55917E] py-10 w-full h-full rounded-[40px] flex flex-col gap-y-8 items-center justify-center text-white">
          <div className="relative z-10 w-full max-w-[421px] mx-auto h-full flex flex-col gap-y-6 items-center justify-center">
            <h2 className="sm:text-[42px] text-[28px] font-extrabold text-white">
              Contact our team
            </h2>
            <p className="text-white max-w-[373px] sm:text-[18px] text-center text-[14px] leading-tight w-full">
              Get personalized guidance and find the perfect solution for your
              needs.
            </p>
            <Link href="/auth/register" className="no-underline">
              <button className="bg-white font-bold flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                Contact Us <ArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
