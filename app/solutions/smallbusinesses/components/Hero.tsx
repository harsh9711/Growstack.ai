"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RepeatText from "../../midmarketenterprise/components/RepeatText";
import Link from "next/link";

const HeroSection: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <section className="2xl:px-36  ">
        <div
          className="relative flex items-center w-full h-full   pt-10 2xl:pt-32 xl:pb-52 2xl:pb-52  bg-gradient-to-b from-[#ffffff]/30 to-[#61C453]/20 "
          data-aos="fade-up"
        >
          <div className="w-full h-full mx-auto flex flex-col  justify-center items-center max-h-[1110px] max-w-[1774px] ">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div
                className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto"
                data-aos="zoom-in"
              >
                <div className=" text-[#034737] shadow-lg shadow-gradient-to-b from-[#000000]/70 to-[#000000]/30  border whitespace-nowrap py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[289px] ">
                  Growstack for large enterprises
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="xl:text-[40px] 2xl:text-[48px] text-[24px]   leading-12 flex flex-col  items-center justify-center text-[#14171B] bg-clip-text ">
                    <span className="font-semibold text-center">
                      Small Businesses
                    </span>
                    <span className="font-light text-center">
                      Maximize efficiency with all-in-one AI marketing
                    </span>
                  </h1>

                  <p className="text-[16px] 2xl:text-[18px]  px-6 items-center justify-center text-center max-w-[819px] leading-loose">
                    Growstack's all-in-one AI marketing platform is designed for
                    small businesses facing tight budgets and limited manpower.
                    Our suite of AI-powered tools automates content creation,
                    optimizes marketing workflows and enhances customer
                    interactions, enabling small businesses to achieve
                    significant marketing efficiency and drive growth.
                  </p>
                  <div
                    className="relative flex xl:flex-row  2xl:flex-row items-center justify-center gap-x-auto 2xl:gap-x-20"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <Image
                      src="/hero1.svg"
                      width={1951}
                      height={448}
                      alt="img"
                      className="2xl:flex xl:flex hidden  w-[350px] h-[350px]"
                    />

                    <div className="flex flex-col flex-wrap gap-y-10 xl:gap-y-24 mt-4 items-center justify-center ">
                      <div className="flex flex-row  items-center justify-center gap-8 ">
                        <Link href="/auth/register" className="no-underline">
                          {" "}
                          <button
                            className="bg-white text-[#034737] font-medium flex items-center gap-2 sm:py-4 sm:px-7 p-3.5 rounded-xl hover:font-bold shadow-md shadow-[#00000025]"
                            data-aos="fade-right"
                          >
                            Free trial <ArrowRight className="text-[#034737]" />
                          </button>
                        </Link>
                        <Link href="/demo" className="no-underline">
                          {" "}
                          <button
                            className="bg-white text-[#034737] font-medium flex items-center gap-2 sm:py-4 sm:px-7 p-3.5 rounded-xl hover:font-bold shadow-md shadow-[#00000025]"
                            data-aos="fade-left"
                          >
                            Get a demo <ArrowRight className="text-[#14171B]" />
                          </button>{" "}
                        </Link>
                      </div>
                      <div
                        className="relative flex flex-row gap-x-20"
                        data-aos="fade-up"
                      >
                        <Image
                          src="/hero2.svg"
                          width={1951}
                          height={448}
                          alt="img"
                          className="w-[500px] h-[200px]"
                        />
                      </div>
                    </div>
                    <Image
                      src="/hero3.svg"
                      width={1951}
                      height={448}
                      alt="img"
                      className="2xl:flex xl:flex hidden w-[350px] h-[350px] items-center justify-center"
                      data-aos="fade-up"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-row justify-between w-full xl:max-w-[1550px] 2xl:max-w-[1550px] mx-auto">
        {/* <button className="flex items-center 2xl:gap-2 ">
          <Image
            src="/playstore.svg"
            alt="image"
            width={247}
            height={73}
            className="relative 2xl:-top-24  max-h-[100px] h-full xl:-top-24"
            data-aos="fade-up"
          />
        </button> */}

        <div
          className="bg-black z-[40] relative flex-col 2xl:flex xl:flex hidden -top-24 max-w-[700px] 2xl:max-w-[1030px] max-h-[244px]  py-4 h-full w-full rounded-[20px] items-center justify-center mx-auto text-white"
          data-aos="fade-up"
        >
          <h2 className="font-bold text-[28px] mt-2 text-center">
            Growstack's Solutions for
          </h2>
          <h2 className="font-light text-[28px] text-center ">
            Small Business Success
          </h2>

          <p className="mt-4 text-white text-[16px]  2xl:text-[18px] max-w-[612px] w-full items-center font-light justify-center mx-auto text-center">
            Discover how Growstack's AI-driven tools streamline your tasks and
            drive success for small businesses
          </p>
        </div>
        {/* <button className="flex items-center -mt-6  2xl:gap-2 ">
          <Image
            src="/apple.png"
            alt="image"
            width={220}
            height={74}
            className="relative 2xl:-top-24 max-h-[60px] h-full  xl:-top-24"
            data-aos="fade-up"
          />
        </button> */}
      </div>
      <div className="absolute 2xl:flex xl:flex hidden max-w-[1920px] w-full overflow-hidden xl:top-[1050px] 2xl:top-[1220px]">
        <RepeatText />
      </div>
    </>
  );
};

export default HeroSection;
