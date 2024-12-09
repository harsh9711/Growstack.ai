import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "@/components/home/drag-features/icons/ArrowRight";
import "../../../../styles/new.css";
const HeroSection = () => {
  return (
    <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[1112px] h-full justify-center mx-auto">
      <div className="w-full flex flex-row justify-between brightness-110 relative gap-x-20  items-center mt-2 mb-6 2xl:mt-32 2xl:mb-40">
        <div className="w-full max-w-[700px] gap-y-4 flex flex-col">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white text-black py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[300px] 2xl:max-w-[352px] shadow-lg w-full tracking-widest"
          >
            Growstack for Leadership Team
          </div>

          <div className="2xl:max-w-3xl w-full brightness-95">
            <h1
              data-aos="fade-right"
              data-aos-duration="1500"
              className="text-[26px] xl:text-[40px] 2xl:text-[48px]   w-full leading-normal text-black"
            >
              <span className="font-semibold">
                Streamline decision making and operations
              </span>
              <br />{" "}
              <span className="font-light">with Growstack's AI solutions </span>
            </h1>
            <p
              data-aos="fade-right"
              data-aos-duration="1500"
              className="text-[16px] 2xl:text-[18px] text-black mt-4 w-full max-w-[600px] leading-normal font-light"
            >
              Leverage real-time analytics, automated workflows, and seamless
              communication to drive better business outcomes.
            </p>
            <ul
              data-aos="fade-right"
              data-aos-duration="1500"
              className="straight-line-list pt-4 text-[12px]  text-start items-start flex flex-col sm:text-[18px] text-black"
            >
              <li>Instant ideas to jumpstart your writing.</li>
              <li>Custom outlines to fit your style and tone.</li>
              <li>AI images to enhance your content seamlessly.</li>
              <li>Multilingual support to reach global audiences.</li>
            </ul>

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
                  <button className=" font-medium flex items-center gap-2 text-black 2xl:py-4 2xl:px-7 border border-black  rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                    Get a demo
                    <ArrowRight className="text-black" />
                  </button>
                </Link>
              </div>

              {/* <div
              data-aos="fade-right"
              data-aos-duration="1500"
              className="flex  flex-wrap gap-4"
            >
              <button className="flex items-center gap-2   text-primary-green rounded-xl">
                <Image
                  className="w-full  h-full"
                  src="/play2.png"
                  alt="Apple"
                  width={180}
                  height={400}
                />
              </button>
              <button className="flex items-center gap-2   text-primary-green rounded-xl">
                <Image
                  className="w-full  h-full "
                  src="/apple2.png"
                  alt="Apple"
                  width={180}
                  height={400}
                />
              </button>
            </div> */}
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
              className="xl:w-[1500px] w-full 2xl:w-[2000px]  h-full"
              src="/solutions/leadership.svg"
              alt="Center Image"
              width={912}
              height={712}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
