"use client";
import Image from "next/image";
import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../../styles/retail.css";
import Footer from "@/components/footer/Footer";

const HeroSection = lazy(() => import("./components/HeroSection"));
const SecondBox2 = lazy(() => import("./components/SecondBox2"));
const Benefits = lazy(() => import("./components/Benefits"));
const Faq = lazy(() => import("./components/Faq"));
const SixCard = lazy(() => import("./components/SixCard"));
const ButtonCard = lazy(() => import("./components/ButtonCard"));
const ButtonCard2 = lazy(() => import("./components/ButtonCard2"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2DA771]"></div>
  </div>
);

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto">
      <section className=" w-full  rounded-b-[60px] sm:rounded-b-[0px] items-center justify-center mx-auto">
        <Navbar
          logoUrl="/logo/growstack1.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />

        <HeroSection />
      </section>
      <Suspense fallback={<LoadingSpinner />}>
        <section className="sm:px-0 px-6 pt-10  max-w-[1200px] mx-auto flex flex-col items-start  sm:pt-32">
          <div className="  flex flex-col  mb-4 sm:mb-10 w-full max-w-[1120px] gap-y-6 items-start">
            <div className="bg-[#03473714] py-2 px-3.5 flex sm:items-start items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
              Customer stories
            </div>
            <div className="flex sm:text-start text-center max-w-[1140px] w-full flex-col gap-y-4">
              <h2 className="font-light text-[26px] xl:text-[40px]">
                <span className="font-bold">
                  Overcome industry challenges with{" "}
                </span>
                AI-driven solutions
              </h2>
            </div>{" "}
          </div>{" "}
          <SecondBox2 />
        </section>
        <section className="pt-10 sm:px-0 px-6  sm:pt-32">
          <Benefits />
        </section>
        <section className="sm:px-0 px-6"></section>
        <section className="pt-10 sm:px-0 px-6  sm:pt-32">
          <SixCard />
        </section>
        <section className="bg-[#FAFBFC] sm:bg-[url('/curl.svg')] zoom-background2 sm:mt-36 mt-10 rounded-b-[100px] sm:rounded-none bg-cover bg-no-repeat relative sm:p-0 px-6 mx-auto pt-10  sm:pt-32 flex flex-col items-center max-w-[1492px] w-full">
          <div className="  flex flex-col  items-center  ">
            <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
              Customer stories
            </div>
            <div className="flex mt-6 max-w-[810px] w-full  text-center   flex-row  items-start justify-center gap-y-4">
              <svg
                className="sm:flex hidden translate-x-10 -translate-y-20"
                width="102"
                height="100"
                viewBox="0 0 102 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M56.7584 82.5514L41.4613 81.7761L34.0597 81.396C31.4531 81.2612 28.7961 80.9593 26.1893 81.0441C25.2455 81.0693 25.3623 81.9718 25.6964 82.6103C26.1317 83.4444 27.0645 84.28 28.0213 84.3973C30.635 84.7242 33.3178 84.7111 35.9467 84.8445L43.3484 85.2246L58.6505 86.0086C59.6393 86.0612 59.4634 84.9965 59.1494 84.3926C58.729 83.5845 57.7249 82.6054 56.7498 82.5564L56.7584 82.5514Z"
                  fill="#034737"
                />
                <path
                  d="M60.9598 61.7092C48.1142 50.2 35.3686 38.5639 22.3885 27.2017C21.9389 26.8031 20.8246 25.8529 20.1984 26.4685C19.607 27.064 20.5128 28.273 20.9301 28.6557C33.6411 40.3118 46.5879 51.7163 59.4421 63.2205C59.9153 63.6401 61.077 64.6322 61.7277 63.9793C62.3452 63.3688 61.408 62.0855 60.9634 61.6955L60.9598 61.7092Z"
                  fill="#034737"
                />
                <path
                  d="M78.8684 55.2254L79.5415 40.0912L79.8742 32.6476C79.9893 30.087 80.232 27.4874 80.1636 24.9288C80.1337 24.057 79.2702 23.1814 78.5948 22.7515C78.2452 22.5261 76.9501 21.9228 76.8484 22.7667C76.5361 25.3257 76.5452 27.9416 76.4351 30.5109L76.1024 37.9545L75.413 53.3405C75.3521 54.7151 78.7794 57.2513 78.8734 55.2341L78.8684 55.2254Z"
                  fill="#034737"
                />
              </svg>
              <h1 className="text-[26px] xl:text-[40px] w-full gap-2 leading-tight font-semibold  text-black">
                Experience Growstack
                <span className="font-light"> risk-free! </span>
              </h1>
            </div>{" "}
            <ButtonCard2 />
          </div>
        </section>
        <section className="sm:p-0 px-6 mx-auto pt-10  sm:pt-32 flex flex-col items-center max-w-[1520px] w-full">
          <div className="  flex flex-col gap-y-8 items-center sm:items-start ">
            <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
              Customer stories
            </div>
            <div className="flex max-w-[610px] w-full  text-center sm:text-start   flex-col  items-start justify-center gap-y-4">
              <h1 className="text-[26px] xl:text-[40px] w-full gap-2 leading-tight font-semibold  text-black">
                See Growstack
                <span className="font-light"> in action! </span>
              </h1>
              <p className="sm:text-[18px] text-[16px] flex items-end sm:text-start text-center font-medium w-full">
                Interested in how Growstack can transform your media and
                publishing processes? Schedule a personalized demo with our
                experts to see our features in action.{" "}
                <svg
                  className="sm:flex hidden w-full"
                  width="70"
                  height="67"
                  viewBox="0 0 70 67"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.5384 8.5049C41.1289 11.0168 45.777 15.3579 49.0822 19.2906C56.9452 28.6807 62.4625 39.4609 63.5489 47.601C63.5475 47.6488 64.2761 47.5689 65.1543 47.4023C67.3351 46.9895 68.644 46.8685 69.2961 47.0619C70.1043 47.2937 70.232 48.3371 69.6424 49.7583C68.065 53.4969 67.5243 54.9211 65.9551 59.4177C63.9616 65.0388 63.3193 66.2363 62.2348 66.4094C61.2689 66.5515 60.4535 65.8782 58.2533 63.1448C55.7505 59.9997 52.853 56.9262 49.3628 53.6437C46.1494 50.6372 45.9588 50.4337 45.979 49.7158C45.9605 48.9764 46.6841 48.7236 49.3908 48.4582C52.5591 48.1827 53.5573 47.9372 53.8777 47.3623C54.1672 46.8431 53.3683 44.1861 51.6727 39.9111C49.1864 33.7371 44.6374 26.2187 40.6045 21.6373C38.6164 19.3867 34.8362 15.9427 31.684 13.5535C26.7837 9.80103 20.5315 6.65595 16.2777 5.74293C11.828 4.81789 6.85153 5.51932 4.26541 7.43172C3.77373 7.81385 3.22362 8.52799 2.55174 9.73325C1.64346 11.3171 1.51178 11.4625 1.18321 11.2793C0.313468 10.7945 2.01399 6.51691 3.83422 4.61505C8.71782 -0.464372 17.272 -0.994214 27.56 3.1368C29.6955 3.98696 35.7387 7.23428 37.5384 8.5049ZM25.1945 3.83544C17.8173 1.25416 10.9257 1.30112 6.87526 3.97704C5.15523 5.1084 5.17816 5.33993 6.95036 4.79666C10.9308 3.56429 15.0088 3.74739 19.8999 5.38029C22.8462 6.3665 29.4832 10.1393 32.8557 12.7241C36.0646 15.1934 40.034 18.8888 41.9151 21.1041C45.2396 25.0475 48.9048 30.8337 51.3125 35.9674C52.7851 39.0972 55.191 45.6882 55.2594 46.7472C55.3732 48.6335 54.1669 49.2978 50.1051 49.5855C47.7544 49.7577 47.2307 49.8789 47.3207 50.1721C47.358 50.2415 48.5042 51.3666 49.8809 52.6688C53.3339 55.8818 56.0781 58.8212 58.5629 61.9077C59.7576 63.4001 60.9771 64.7118 61.4113 64.9782L62.1637 65.4462L62.7179 64.5885C63.0253 64.128 63.9241 61.834 64.7352 59.5154C65.5464 57.1969 66.7894 53.8309 67.4981 52.0142C68.8922 48.5137 68.9789 48.2218 68.7276 48.0818C68.6503 48.0387 67.3518 48.1412 65.8843 48.3196C64.3975 48.4872 63.0217 48.5467 62.8091 48.4281C62.5772 48.2988 62.022 46.7498 61.3607 44.4368C60.2359 40.4557 59.4313 38.3544 57.7294 34.9996C52.4476 24.5693 45.155 15.8375 36.4386 9.56885C36.0921 9.32705 33.9571 8.11256 31.7137 6.9106C28.6393 5.24535 27.0311 4.49466 25.1945 3.83544Z"
                    fill="#034737"
                  />
                </svg>
              </p>
            </div>{" "}
            {/* <AboveFaq /> */}
            <ButtonCard />
          </div>
        </section>
        <section className="items-center sm:px-0 px-6   justify-center flex flex-col  sm:py-20  overflow-hidden ">
          <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
            <Image
              src="/solutions/design.svg"
              width={1000}
              height={1800}
              alt="arrow"
              className="w-full overflow-hidden  absolute translate-y-[500px] -rotate-6 z-0"
            />
          </div>
          <Faq />
        </section>
      </Suspense>
      <Footer />
    </main>
  );
};

export default page;
