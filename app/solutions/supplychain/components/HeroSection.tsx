import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "../../../../styles/myanimation.css";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      data-aos="fade-in"
      data-aos-duration="2000"
      data-aos-delay="500"
      className="max-h-screen bg-[#2DA771] 2xl:bg-transparent mx:  w-full mb-10 2xl:mb-20  items-center justify-center mx-auto"
    >
      <Navbar
        logoUrl="/logo/growstack1.png"
        logoAlt="Custom Logo"
        backgroundColor="white"
      />
      <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] p-4 w-full h-full justify-center mx-auto">
        <div className="w-full flex flex-row sm:text-start text-center justify-between brightness-110 relative gap-x-20 items-center mt-10 mb-10 2xl:mt-40 2xl:mb-40">
          <div className="w-full max-w-[900px] gap-y-4 flex flex-col">
            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="bg-white text-black py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[300px] 2xl:max-w-[352px] shadow-lg w-full tracking-widest"
            >
              Growstack for Finance
            </div>

            <div className="w-full brightness-95">
              <h1
                data-aos="fade-right"
                data-aos-duration="1500"
                className="text-[26px] xl:text-[40px] 2xl:text-[48px] w-full leading-normal text-white"
              >
                <span className="font-semibold w-full 2xl:whitespace-nowrap">
                  Supply Chain
                </span>
                <br />
                <span className="font-light 2xl:whitespace-nowrap">
                  Revolutionize Your Supply Chain operations with Growstack
                </span>
              </h1>
              <p
                data-aos="fade-right"
                data-aos-duration="1500"
                className="text-[16px] 2xl:text-[18px] text-white mt-4 w-full max-w-[600px] leading-normal font-light"
              >
                Streamline financial processes, enhance data accuracy, and drive
                smarter decisions with Growstack's AI tools. Optimize your
                finance operations for efficiency and clarity.
              </p>

              <div className="flex flex-col gap-20 mt-10">
                <div
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="flex flex-row gap-8 group text-[12px] 2xl:text-[18px]"
                >
                  <Link href="/auth/register" className="no-underline">
                    {" "}
                    <button className="bg-white font-medium flex items-center gap-2 text-[#034737]  2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md">
                      Free trial <ArrowRight />
                    </button>
                  </Link>
                  <Link href="/auth/register" className="no-underline">
                    {" "}
                    <button className="border border-white flex items-center gap-2 text-white hover:font-bold font-medium 2xl:py-4 py-2 px-2 2xl:px-7 rounded-xl shadow-md shadow-[#00000025]">
                      Get a demo
                      <ArrowRight className="text-white" />
                    </button>
                  </Link>
                </div>

                {/* <div
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="flex flex-row gap-4"
                >
                  <button className="flex items-center gap-2 text-primary-green rounded-xl">
                    <Image
                      className="w-full h-full"
                      src="/play2.png"
                      alt="Play Store"
                      width={180}
                      height={400}
                    />
                  </button>
                  <button className="flex items-center gap-2 text-primary-green rounded-xl">
                    <Image
                      className="w-full h-full"
                      src="/apple2.png"
                      alt="Apple Store"
                      width={180}
                      height={400}
                    />
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <div className="2xl:flex xl:flex lg:flex md:flex hidden 2xl:translate-x-80 items-end relative w-full justify-end rounded-2xl shadow-3xl ">
            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="w-full relative z-0"
            >
              <div className="absolute inset-0 translate-y-6 bg-opacity-30 -translate-x-6 w-full h-full bg-[#000000] rounded-2xl"></div>
              <Image
                className=" w-full  h-full rounded-2xl border shadow-3xl relative z-10"
                src="/dashboardchain.png"
                alt="Center Image"
                width={842}
                height={463}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
