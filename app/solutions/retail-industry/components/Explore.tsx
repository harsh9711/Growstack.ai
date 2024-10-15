import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

const Explore = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="bg-primary-green text-white flex flex-col justify-center items-start gap-y-8 p-6 max-w-[1240px] w-full rounded-[30px] shadow-lg">
        <h2 className="font-extrabold sm:text-[28px] text-[20px]">
          Explore your options
        </h2>
        <div className="flex flex-col sm:flex-row max-w-[575px]  sm:max-w-[1180px] w-full gap-y-10 sm:gap-x-28 items-center mx-auto justify-between">
          <div
            data-aos="fade-up"
            className="max-w-[575px] sm:max-w-[1120px] mx-auto bg-white text-black py-10 w-full h-full rounded-[20px] flex flex-col gap-y-8 items-start justify-center shadow-md transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="relative z-10 w-full mx-auto h-full flex flex-col sm:flex-row gap-y-6 px-8  sm:px-16  items-start  sm:items-center justify-between">
              <div className="flex flex-col gap-y-6 items-start text-left">
                <h2 className="text-[16px] sm:text-[20px] font-extrabold text-primary-green">
                  Start your free Trial
                </h2>
                <p className="text-black sm:text-[16px] text-[12px] leading-tight w-full text-left">
                  Experience the power of GrowStack firsthand with our free trial.
                </p>
              </div>
              <Link href="/auth/register" className="no-underline">
                <button className="bg-primary-green font-bold flex items-center gap-2 text-white 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
                  Signup now <ArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:items-start items-center gap-y-6 p-6 max-w-[1180px] w-full rounded-[20px]">
          <div className="flex flex-col sm:flex-row max-w-[1180px] w-full gap-y-10 sm:gap-x-16 items-center mx-auto justify-between">
            <div
              data-aos="fade-right"
              className="max-w-[575px] p-8 bg-white py-10 w-full h-full rounded-[20px] flex flex-col gap-y-8 items-start justify-center text-left shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative z-10 w-full h-full flex flex-col gap-y-6 items-start justify-center text-left">
                <h2 className="text-[16px] sm:text-[20px] font-extrabold text-primary-green">
                  Request a demo
                </h2>
                <p className="text-black sm:text-[16px] text-[12px] leading-tight w-full text-left">
                  See how Growstack can transform your operations with a personalized demo.
                </p>
                <Link href="/Demo" className="no-underline">
                  <button className="bg-white font-bold flex items-center border-primary-green border gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
                    Book a demo <ArrowRight />
                  </button>
                </Link>
              </div>
            </div>

            <div
              data-aos="fade-left"
              className="max-w-[575px] p-8 bg-white py-10 w-full h-full rounded-[20px] flex flex-col gap-y-8 items-start justify-center text-left shadow-md transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative z-10 w-full h-full flex flex-col gap-y-6 items-start justify-center text-left">
                <h2 className="text-[16px] sm:text-[20px] font-extrabold text-primary-green">
                  Contact us
                </h2>
                <p className="text-black sm:text-[16px] text-[12px] leading-tight w-full text-left">
                  Have questions or need more information? Reach out to our team!
                </p>
                <Link href="/contact" className="no-underline">
                  <button className="bg-white font-bold flex items-center border-primary-green border gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
                    Contact us <ArrowRight />
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

export default Explore;
