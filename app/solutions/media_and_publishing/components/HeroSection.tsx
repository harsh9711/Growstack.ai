import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "@/components/home/drag-features/icons/ArrowRight";
import "../../../../styles/new.css";
import "../../../../styles/retail.css";

const HeroSection = () => {
  return (
    <div className="bg-black sm:bg-white sm:bg-[url('/media/black.svg')] zoom-background rounded-b-[100px] sm:rounded-none bg-cover bg-no-repeat relative flex items-center fade-in-background 2xl:p-0 p-4 w-full h-full justify-center mx-auto">
      <div className="w-full max-w-[1220px] 2xl:max-w-[1350px]  flex flex-row justify-between brightness-110 relative gap-x-20  items-center mt-2 mb-6 2xl:mt-32 2xl:mb-40">
        <div className="w-full max-w-[700px] gap-y-4 sm:items-start items-center  flex flex-col">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-[#ffffff] text-primary-green py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[300px] 2xl:max-w-[352px] shadow-lg w-full tracking-widest"
          >
            Growstack for Media & Publishing
          </div>

          <div className="2xl:max-w-[603px] w-full brightness-95">
            <h1
              data-aos="fade-right"
              data-aos-duration="1500"
              className="text-[26px] xl:text-[40px] 2xl:text-[48px] text-center sm:text-start   w-full leading-normal text-white"
            >
              <span className="font-semibold">
                Media & Publishing<br></br>
                <span className="font-light">
                  Unlock the future of media & publishing with AI solutions
                </span>
              </span>{" "}
            </h1>
            <p
              data-aos="fade-right"
              data-aos-duration="1500"
              className="text-[16px] 2xl:text-[18px] sm:text-start text-center text-white mt-4 w-full max-w-[600px] leading-normal font-light"
            >
              Harness the power of AI to enhance content creation, streamline
              workflows, and engage your audience like never before.
            </p>

            <div className="flex flex-col gap-20 mt-10">
              <div
                data-aos="fade-right"
                data-aos-duration="1500"
                className="flex flex-row items-center justify-center sm:items-start sm:justify-start gap-8 group text-[12px] 2xl:text-[18px]"
              >
                <Link href="/auth/register" className="no-underline">
                  {" "}
                  <button className="bg-white font-medium flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7  rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                    Get a free trial <ArrowRight />
                  </button>
                </Link>
                <Link href="/demo" className="no-underline">
                  {" "}
                  <button className=" font-medium flex items-center gap-2 text-white 2xl:py-4 2xl:px-7 border border-white  rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                    Get a demo
                    <ArrowRight className="text-white" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="2xl:flex xl:flex lg:flex md:flex hidden items-end relative w-full  justify-end ">
          <div
            data-aos="fade-left"
            data-aos-duration="1500"
            className="w-full relative z-0 "
          >
            <Image
              className="xl:w-[1500px] w-full 2xl:w-[2200px]  h-full"
              src="/media/hero.svg"
              alt="Center Image"
              width={1012}
              height={812}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
