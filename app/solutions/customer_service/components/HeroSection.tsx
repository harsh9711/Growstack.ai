import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-[url('/b1.png')] bg-cover  w-full mb-10 2xl:mb-20 items-center justify-center mx-auto">
      <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[1112px] h-full justify-center mx-auto">
        <div className="w-full flex flex-row justify-between brightness-110 relative gap-x-20 items-center mt-10 mb-10 2xl:mt-36 2xl:mb-40">
          <div className="w-full max-w-[700px] gap-y-4 flex flex-col">
            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="bg-[#61C45333]/20 text-[#61C453] py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[300px] 2xl:max-w-[352px] shadow-lg w-full tracking-widest"
            >
              Growstack for Revenue operations Team
            </div>

            <div className="2xl:max-w-3xl w-full brightness-95">
              <h1
                data-aos="fade-right"
                data-aos-duration="1500"
                className="text-[26px] xl:text-[48px] w-full leading-normal text-white"
              >
                <span className="font-semibold">Elevate customer </span>
                <br />
                <span className="font-light 2xl:whitespace-nowrap">
                  service with advanced
                </span>
                <br />
                <span className="font-extralight text-[#61C453] 2xl:whitespace-nowrap">
                  AI solutions
                </span>
              </h1>
              <p
                data-aos="fade-right"
                data-aos-duration="1500"
                className="text-[16px] 2xl:text-[18px] text-white mt-4 w-full max-w-[600px] leading-normal font-light"
              >
                Take your revenue operations to the next level with Growstack’s
                cutting-edge tools and solutions. From optimizing data
                management to enhancing team alignment, our platform addresses
                your key challenges and drives your team towards achieving
                exceptional results.
              </p>

              <div className="flex flex-col gap-20 mt-10">
                <div
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="flex flex-row gap-8 group text-[12px] 2xl:text-[18px]"
                >
                  <button className="bg-white font-medium flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                    Get free trial <ArrowRight />
                  </button>
                  <button className="border border-white flex items-center gap-2 text-white hover:font-bold font-medium 2xl:py-4 py-2 px-2 2xl:px-7 rounded-xl shadow-md shadow-[#00000025]">
                    See demo
                    <ArrowRight className="text-white" />
                  </button>
                </div>

                <div
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
                </div>
              </div>
            </div>
          </div>

          <div className="2xl:flex xl:flex lg:flex md:flex hidden items-end relative w-full justify-end">
            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="w-full relative z-0"
            >
              <Image
                className="xl:w-[1500px] w-full 2xl:w-[1500px] h-full"
                src="/customer.svg"
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
