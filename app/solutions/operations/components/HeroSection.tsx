import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { ArrowRight } from "lucide-react";
import "../../../../styles/myanimation.css";
import Link from "next/link";
const HeroSection = ({
  logoUrl = "/images/logo.png",
  logoAlt = "Custom Logo",
  bgGradient = "bg-[#14171B]",
  title = "Streamline your business",
  subtitle = "operations with Growstack",
  description = "Optimize processes and enhance communication with Growstack’s innovative solutions. Empower your team to overcome challenges and drive operational excellence.",
  primaryButtonText = "Free trial",
  secondaryButtonText = "Get demo",
  playStoreImage = "/play2.png",
  appleStoreImage = "/apple2.png",
  heroImage = "/operationshero.svg",
  heroImageAlt = "Center Image",
}) => {
  return (
    <section className={`${bgGradient} w-full mb-10 2xl:mb-20 overflow-hidden`}>
      <Navbar logoUrl={logoUrl} logoAlt={logoAlt} backgroundColor="white" />

      <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full  h-full justify-center mx-auto">
        <div className="w-full flex flex-row justify-between brightness-110 relative items-center mt-10 mb-10 2xl:mt-32 2xl:mb-20">
          <div className="w-full max-w-[700px] gap-y-4 flex flex-col">
            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="bg-[#0347374D]/10 text-white py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[350px] 2xl:max-w-[340px] shadow-lg w-full tracking-widest"
            >
              Growstack for Business Operations
            </div>

            <div className="2xl:max-w-3xl w-full brightness-95">
              <h1
                data-aos="fade-right"
                data-aos-duration="1500"
                className="text-[26px] xl:text-[48px] w-full leading-normal text-white"
              >
                <span className="font-semibold text-white">{title}</span>
                <br />
                <span className="font-light 2xl:whitespace-nowrap text-white">
                  {subtitle}
                </span>
              </h1>
              <p
                data-aos="fade-right"
                data-aos-duration="1500"
                className="text-[16px] 2xl:text-[18px] text-white mt-4 w-full max-w-[600px] leading-normal font-light"
              >
                {description}
              </p>

              <div className="flex flex-col gap-20 mt-10">
                <div
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="flex flex-row gap-8 group text-[12px] 2xl:text-[18px]"
                >
                  <Link href="/auth/register" className="no-underline">
                    <button className=" bg-[#034737] font-medium flex items-center gap-2 text-white 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md ">
                      {primaryButtonText} <ArrowRight />
                    </button>
                  </Link>
                  <Link href="/auth/register" className="no-underline">
                    {" "}
                    <button className="border border-white flex items-center gap-2 text-white hover:font-bold font-medium 2xl:py-4 py-2 px-2  2xl:px-7 rounded-xl shadow-md shadow-[#00000025]">
                      {secondaryButtonText}{" "}
                      <ArrowRight className="text-white" />
                    </button>
                  </Link>
                </div>

                {/* <div
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="flex  flex-wrap gap-4"
                >
                  <button className="flex items-center gap-2 text-primary-green rounded-xl">
                    <Image
                      className="w-full h-full"
                      src={playStoreImage}
                      alt="Play Store"
                      width={180}
                      height={400}
                    />
                  </button>
                  <button className="flex items-center gap-2 text-primary-green rounded-xl">
                    <Image
                      className="w-full h-full"
                      src={appleStoreImage}
                      alt="Apple Store"
                      width={180}
                      height={400}
                    />
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <svg
            className="w-[200px] 2xl:flex xl:flex hidden absolute translate-x-[700px] -translate-y-60"
            width="175"
            height="171"
            viewBox="0 0 175 171"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_7234_30783)">
              <path
                className="arrow-path"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.97437 77.731C62.7688 47.56 115.397 68.7594 149.998 105.372C150.594 105.999 151.7 105.968 152.465 105.297C153.231 104.626 153.373 103.57 152.777 102.943C117.209 65.3029 62.9696 43.8839 5.61239 74.901C4.71807 75.3826 4.29756 76.409 4.67284 77.1936C5.04583 77.9749 6.07624 78.2153 6.97437 77.731Z"
                fill="#A9FF9B"
              />
              <path
                className="arrow-path"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M150.738 103.469C147.888 102.774 144.329 101.862 143.92 101.77C132.837 99.2847 121.663 98.6423 109.742 99.5587C108.775 99.6319 107.928 100.438 107.853 101.354C107.778 102.271 108.506 102.955 109.473 102.881C121.033 101.989 131.87 102.609 142.621 105.022C143.248 105.162 151.246 107.217 152.916 107.511C153.6 107.635 154.062 107.495 154.169 107.453C154.744 107.247 155.063 106.899 155.259 106.594C155.478 106.25 155.704 105.618 155.502 104.851C155.286 104.05 154.39 102.565 154.199 102.168C151.335 96.1666 147.54 89.7906 145.43 83.0294C143.417 76.5819 142.936 69.7757 146.574 62.6006C147.017 61.7273 146.673 60.7851 145.81 60.4981C144.947 60.2111 143.885 60.6907 143.442 61.5639C139.376 69.5864 139.792 77.21 142.04 84.4153C144.139 91.1362 147.849 97.49 150.738 103.469Z"
                fill="#A9FF9B"
              />
            </g>
            <defs>
              <clipPath id="clip0_7234_30783">
                <rect
                  width="113.284"
                  height="133.882"
                  fill="white"
                  transform="translate(65.7031 170.608) rotate(-125.45)"
                />
              </clipPath>
            </defs>
          </svg>

          <div className="2xl:flex mt-10 xl:flex lg:flex md:flex hidden items-end relative w-full justify-end">
            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="w-full relative z-0"
            >
              <Image
                className="xl:w-[1500px] w-full 2xl:w-full  2xl:translate-x-80 xl:translate-x-40 h-full"
                src={heroImage}
                alt={heroImageAlt}
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
