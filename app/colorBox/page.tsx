"use client"
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const Capability2 = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="py-20 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center">
          <div
            className="w-full flex gap-y-4  flex-col sm:w-1/2"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <div className="py-2 sm:py-3 bg-[#03473714] px-4 sm:px-5 font-semibold text-[10px] sm:text-[14px] rounded-full max-w-fit">
              Other Features
            </div>
            <h1 className="text-[16px] sm:text-[24px] xl:text-[42px] leading-normal font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
              Expand your capabilities <br />
              <span className="font-light"> with seamless integrations</span>
            </h1>
          </div>
          <div
            className="w-full sm:w-1/2 mt-6 sm:mt-0"
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <p className="text-base font-medium text-gray-600">
              Unlock the full potential of your business with integrated AI
              solutions for reputation management and automated communication.
            </p>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center mt-8 gap-8">
            <div
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="bg-[#F582A5] p-8 rounded-xl shadow-md mb-4">
                <div className="mb-6">
                  <h5 className="text-2xl font-semibold">
                    Reputation management
                  </h5>
                  <p className="text-sm mt-2">
                    Monitor and improve your ratings across multiple review
                    platforms, ensuring your brand shines.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="/images_growstack/home/trust.svg"
                      alt="Trustpilot Logo"
                    />
                    <div className="flex xl:flex-row flex-col items-center gap-2 mt-3">
                      <img src="/images_growstack/home/tstar.svg" alt="star" />
                      <p className="text-sm font-bold">4.9/5 | 9010 reviews</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="/images_growstack/home/Google.svg"
                      alt="Google Logo"
                    />
                    <div className="flex xl:flex-row flex-col items-center gap-2 mt-3">
                      <img src="/images_growstack/home/gstar.svg" alt="star" />
                      <p className="text-sm font-bold">4.4/5 | 4443 reviews</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="/images_growstack/home/Hostadvice.svg"
                      alt="Hostadvice Logo"
                    />
                    <div className="flex xl:flex-row flex-col items-center gap-2 mt-3">
                      <img src="/images_growstack/home/gstar.svg" alt="star" />
                      <p className="text-sm font-bold">4.6/5 | 1562 reviews</p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src="/images_growstack/home/Serchen.svg"
                      alt="Serchen Logo"
                    />
                    <div className="flex xl:flex-row flex-col items-center gap-2 mt-3">
                      <img src="/images_growstack/home/sstar.svg" alt="star" />
                      <p className="text-sm font-bold">4.6/5 | 621 reviews</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#C6D88F] p-8 rounded-xl shadow-md">
                <div className="mb-6">
                  <img
                    src="/images_growstack/home/cm.svg"
                    alt="cm"
                    className="mb-4"
                  />
                  <h5 className="text-2xl font-semibold">Contact management</h5>
                  <p className="text-sm mt-2">
                    Keep your contact information organized and protected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col  items-center mt-8 gap-8"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <div
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="bg-[#C1B1E4] p-8 rounded-xl shadow-md mb-4">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-start">
                    {" "}
                    <h5 className="text-2xl font-semibold">
                      WhatsApp and Telegram automation <br />{" "}
                      <span>with our apps</span>
                    </h5>
                    <p className="text-sm mt-4">
                      Utilize our apps to automate messaging workflows, maintain
                      engagement  and boost customer satisfaction.
                    </p>
                  </div>
                  <div className="text-center mt-6">
                    <Image
                      src="/images_growstack/home/wt.svg"
                      alt="GrowStack Logo"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[#FDDF6E] p-8 rounded-xl shadow-md">
                <h5 className="text-2xl font-semibold">
                  Discover valuable contacts <br />{" "}
                  <span>with Google web scraping</span>
                </h5>
                <p className="text-sm mt-4">
                  Use our Google web scraping tool to identify and collect
                  contact details, enhancing your marketing and outreach
                  efforts.
                </p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capability2;
