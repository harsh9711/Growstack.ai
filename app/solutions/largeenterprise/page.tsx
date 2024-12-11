"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import "swiper/css/navigation";
import ImageGallery from "./components/ZoomEffect";
import TestimonialsSlider from "./components/Slider";
import MarketingTechnology from "./components/marketingTechnology/MarketingTechnology";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import ImageGalleryResponsive from "./components/ZoomEffectrespopnsive";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

const Home = () => {
  const totalItems = 5;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto">
      <Navbar logoUrl="/imagelogo.svg" logoAlt="Custom Logo" />
      <section className="">
        <div className="relative flex items-center w-full h-full  rounded-b-[60px] pt-10  2xl:pt-20 bg-[#F3F7F6] ">
          <div className="w-full h-full mx-auto flex flex-col  justify-between max-h-[600px] 2xl:max-h-[770px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] text-[#034737] whitespace-nowrap py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[283px] ">
                  Growstack for large enterprises
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="text-[24px] xl:text-[40px] 2xl:xl:text-[48px]  leading-tight flex flex-col  items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                    <span className="font-semibold text-center">
                      Streamline complex
                    </span>
                    <span className="font-light text-center">
                      operation's with advance AI solutions
                    </span>
                  </h1>

                  <p className="text-[16px] 2xl:text-[18px] leading-tight px-10 sm:px-0  items-center justify-center text-center max-w-[819px] ">
                    Growstack's advanced Al tools and scalable solutions address
                    the unique challenges of large enterprises by ensuring
                    global alignment, consistent marketing and sales, effective
                    personalization and seamless data integration.{" "}
                  </p>
                  <div className="flex flex-col gap-24 mt-4 pb-10 sm:pb-0 items-center justify-center ">
                    <div className="flex flex-row gap-8 ">
                      <Link href="/auth/register" className="no-underline">
                        {" "}
                        <button className="bg-[#034737] text-white font-medium flex items-center gap-2 py-4 px-7 rounded-xl hover:font-bold shadow-md shadow-[#00000025]">
                          Free trial <ArrowRight />
                        </button>
                      </Link>

                      <Link href="/demo" className="no-underline">
                        <button className="border border-[#D9D9D9] flex items-center gap-2 text-black hover:font-bold font-medium py-4 px-7 rounded-xl shadow-lg shadow-[#00000025]">
                          Get a demo <ArrowRight className="text-black" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="2xl:flex xl:flex w-full h-full hidden relative translate-y-16  -translate-x-52 ">
              <Image
                src="/solutions/dlk.svg"
                width={1951}
                height={448}
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" mt-10">
        <div
          className=" w-full max-w-[1920px] h-full xl:h-[402px] 2xl:h-[502px] gap-y-4 flex flex-col items-center justify-center mx-auto"
          style={{
            backgroundImage: "url(/solutions/background.svg)",
            maxWidth: "2000px",
          }}
        >
          <div className="relative flex flex-col gap-y-4 justify-center items-center mx-auto bg-cover py-10 2xl:py-20 bg-center bg-no-repeat">
            <h1 className="text-[24px] xl:text-[40px] 2xl:text-[48px] leading-tight flex flex-col items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent relative z-10">
              <span className="font-semibold text-center">
                Comprehensive solution for
              </span>
              <span className="font-light text-center">
                enterprise level success
              </span>
            </h1>

            <p className="text-[18px] text-center max-w-[819px] leading-loose relative z-10">
              Discover how GrowStacks advanced AI solutions streamline processes
            </p>
          </div>
        </div>
      </section>
      <section className="">
        <MarketingTechnology />
      </section>
      <section className="">
        <div className="relative flex items-center w-full h-full py-10 2xl:py-40 bg-white overflow-hidden">
          <div className="w-full h-full mx-auto flex flex-col justify-between max-h-[950px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className="w-full gap-y-4  flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] hover:shadow-md  whitespace-nowrap  text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[150px]">
                  stay connected
                </div>

                <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
                  <h1 className="xl:text-[26px] 2xl:text-[40px] leading-normal flex gap-4 items-center justify-center text-black">
                    <span className="font-semibold text-center">
                      Breaking down data silos
                    </span>
                  </h1>
                </div>
              </div>
              <div className="flex flex-col sm:p-0 p-6 sm:flex-row sm:mt-10 w-full items-center justify-center  mx-auto sm:gap-20 max-w-[1600px]">
                <div className=" flex flex-col gap-y-6 sm:gap-y-20 items-start  justify-center sm:w-1/4">
                  {" "}
                  <p className="text-left leading-normal items-center justify-center w-full sm:max-w-[1026px]">
                    In large enterprises, various teams collaborate to manage
                    operations, develop strategies and handle day-to-day
                    functions. By using Growstack, you can ensure that your
                    teams stay connected and seamlessly share information,
                    effectively preventing data silos and fostering
                    collaboration across your organization.
                  </p>
                  <Link href="/auth/register" className="no-underline">
                    {" "}
                    <button className="bg-[#034737] text-white font-medium flex items-center gap-2 sm:py-4 sm:px-7 p-2 rounded-xl hover:font-bold shadow-md shadow-[#00000025]">
                      Free trial <ArrowRight />
                    </button>
                  </Link>
                </div>
                <div
                  ref={ref}
                  className="mt-6 relative w-full sm:h-[394.8px] sm:max-w-[700px] h-[197.4px] max-w-[350px] flex items-center justify-center overflow-hidden bg-white brightness-105"
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      inView
                        ? { scale: 1, opacity: 1 }
                        : { scale: 1, opacity: 0 }
                    }
                    transition={{ duration: 1.5 }}
                  >
                    <video
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src="/dashline.mp4" type="video/mp4" />
                      <track
                        src="/path/to/captions.vtt"
                        kind="subtitles"
                        srcLang="en"
                        label="English"
                      />
                    </video>
                  </motion.div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-green flex flex-col items-center justify-center py-20 overflow-hidden">
        <div className="w-full gap-y-4 flex flex-col items-center justify-center mx-auto ">
          <div className="bg-white/10 hover:shadow-md  whitespace-nowrap  text-white py-2 px-4 flex items-center text-center text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[135px]">
            Globalization
          </div>

          <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
            <h1 className="text-[22px] xl:text-[26px] 2xl:text-[40px] leading-tight 2xl:flex-row xl:flex-row flex-col flex gap-2  items-center justify-center text-white">
              <span className="font-semibold text-center">
                Managing complex,
              </span>
              <span className="font-light text-center">global operations</span>
            </h1>
            {/* <p className="text-center text-white/30 tracking-normal items-center justify-center w-full max-w-[1026px]">
              In <span className="text-[#A9FF9B]">large enterprises,</span>{" "}
              various teams collaborate to manage operations, develop
              strategies, and handle day-to-day functions.
            </p> */}
          </div>
        </div>

        <div>
          {" "}
          <div className="2xl:flex xl:flex hidden mt-20 w-full h-full items-center justify-center mx-auto">
            <ImageGallery />
          </div>
          <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
            <ImageGalleryResponsive />
          </div>
        </div>
      </section>

      <section className=" overflow-hidden  ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute h-[1000px] 2xl:flex hidden  transform scale-y-[-1]  translate-x-10  z-0 translate-y-[500px] "
            alt="image"
          />
        </div>

        <MarketingStreamline />
      </section>
      <Footer />
    </main>
  );
};

export default Home;
