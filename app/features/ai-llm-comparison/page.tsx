"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import "../../../styles/myanimation.css";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import CardResponsive from "./component/CardResponsive";
import Benefits from "./component/Benefits";
import Faq from "./component/Faq";
import Image from "next/image";
import Card from "./component/Card";

const page = () => {
  return (
    <main className="flex flex-col relative w-full overflow-hidden overflow-y-scroll mx-auto">
      <span className="relatvie z-20">
        <Navbar logoUrl="/images/logo.png" logoAlt="Custom Logo" />
      </span>
      <section className="sm:px-20 px-0">
        <div className="bg-[#F3F7F6] rounded-b-[60px] sm:pt-16  w-full  mb-10 sm:mb-20">
          <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[895px] sm:max-h-[700px]  h-full justify-center mx-auto">
            <div className="w-full flex flex-col lg:flex-row gap-10 justify-between brightness-110 relative   items-center mt-10 mb-4 sm:mb-10  2xl:mt-32 2xl:mb-60">
              <div className="w-full max-w-[700px] items-center sm:items-start gap-y-4 flex flex-col">
                <div className="bg-[#03473714]   text-[#034737] hover:shadow-md whitespace-nowrap justify-center py-2 px-4 flex items-center text-center text-[10px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[140px]">
                  AI LLM Comparison
                </div>{" "}
                <div className=" w-full brightness-95   ">
                  <h1 className="text-[26px] max-w-[357px] xl:text-[40px] leading-tight  sm:!text-left !text-center text-black ">
                    <span className="font-semibold">
                      Choose the best AI model
                    </span>
                    <span className="font-extralight ml-2">for your needs</span>
                  </h1>
                  <p className="text-[12px] sm:text-[18px] text-black mt-4 w-full lg:max-w-[600px] sm:!text-left !text-center gap-4 flex flex-col leading-tight font-light ">
                    <span>
                      Selecting the right AI model can make all the difference.
                    </span>
                    <br />
                    The AI LLM Comparison tool on Growstack ensures that you're
                    not just choosing an AI, but the right AI. Empower your
                    business with precise model recommendations, expert
                    insights, and customization options to maximize the impact
                    of artificial intelligence on your operations.
                  </p>
                  <div className="flex flex-col gap-20  items-center justify-center sm:justify-start sm:items-start  mt-10">
                    <div className="flex flex-row gap-8  group text-[12px] sm:text-[18px]">
                      <Link href="/auth/register" className="no-underline">
                        {" "}
                        <button className="bg-white font-medium flex items-center gap-2 text-[#034737] sm:py-4 sm:px-7 rounded-xl p-2 group-hover:font-bold shadow-md hover:shadow-">
                          Free trial <ArrowRight />
                        </button>
                      </Link>
                      <Link href="/demo" className="no-underline">
                        {" "}
                        <button className="border border-black flex items-center gap-2 text-black hover:font-bold font-medium sm:py-4 sm:px-7 p-2 rounded-xl shadow-md shadow-[#00000025]">
                          Get demo
                          <ArrowRight className="text-black" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="2xl:flex xl:flex hidden max-w-[848px] w-full items-center justify-center relative">
                <Image
                  src="/features/images/i1.svg"
                  width={80}
                  height={80}
                  alt="image"
                  className="absolute -translate-y-[285px] -translate-x-[180px] "
                />
                <Image
                  src="/features/images/i2.svg"
                  width={70}
                  height={70}
                  alt="image"
                  className="absolute -translate-y-[240px] translate-x-[138px] "
                />
                <Image
                  src="/features/images/i3.svg"
                  width={70}
                  height={70}
                  alt="image"
                  className="absolute -translate-y-32 -translate-x-8 "
                />
                <Image
                  src="/features/images/i4.svg"
                  width={70}
                  height={70}
                  alt="image"
                  className="absolute left-[70px]  top-[435px] animate-image-effect "
                />
                <Image
                  src="/features/images/i5.svg"
                  width={70}
                  height={70}
                  alt="image"
                  className="absolute translate-y-[70px] translate-x-[265px] "
                />
                <Image
                  src="/features/images/i6.svg"
                  width={70}
                  height={70}
                  alt="image"
                  className="absolute translate-y-[280px] translate-x-[20px] "
                />

                <div>
                  {" "}
                  <svg
                    className="drawing-effecthero 2xl:flex xl:flex hidden"
                    width="653"
                    height="690"
                    viewBox="0 0 653 690"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M102.562 575.836V616.609C102.562 623.538 108.179 629.155 115.108 629.155H294.194"
                      stroke="#034737"
                    />
                    <path
                      d="M91.2045 373.376C98.813 368.984 108.187 368.984 115.795 373.376L180.338 410.64C187.947 415.033 192.634 423.151 192.634 431.936V506.464C192.634 515.249 187.947 523.368 180.338 527.76L115.795 565.024C108.187 569.417 98.813 569.417 91.2045 565.024L26.6618 527.76C19.0534 523.368 14.3664 515.249 14.3664 506.464V431.936C14.3664 423.151 19.0534 415.033 26.6618 410.64L91.2045 373.376Z"
                      stroke="#034737"
                    />
                    <path
                      d="M142.016 4.05458C145.743 1.90286 150.334 1.90286 154.061 4.05457L193.666 26.9205C197.393 29.0723 199.689 33.0488 199.689 37.3522V83.0841C199.689 87.3876 197.393 91.3641 193.666 93.5158L154.061 116.382C150.334 118.534 145.743 118.534 142.016 116.382L102.411 93.5158C98.6839 91.3641 96.388 87.3876 96.388 83.0842V37.3522C96.388 33.0488 98.6839 29.0723 102.411 26.9205L142.016 4.05458Z"
                      stroke="#034737"
                    />
                    <path
                      d="M459.414 44.827C463.141 42.6753 467.733 42.6753 471.46 44.827L511.065 67.693C514.792 69.8447 517.087 73.8212 517.087 78.1247V123.857C517.087 128.16 514.792 132.137 511.065 134.288L471.46 157.154C467.733 159.306 463.141 159.306 459.414 157.154L419.809 134.288C416.082 132.137 413.786 128.16 413.786 123.857V78.1247C413.786 73.8213 416.082 69.8447 419.809 67.693L459.414 44.827Z"
                      stroke="#034737"
                    />
                    <path
                      d="M287.543 165.264C291.27 163.112 295.862 163.112 299.589 165.264L339.194 188.13C342.92 190.281 345.216 194.258 345.216 198.561V244.293C345.216 248.597 342.92 252.573 339.194 254.725L299.589 277.591C295.862 279.742 291.27 279.742 287.543 277.591L247.938 254.725C244.211 252.573 241.915 248.597 241.915 244.293V198.561C241.915 194.258 244.211 190.281 247.938 188.13L287.543 165.264Z"
                      stroke="#034737"
                    />
                    <path
                      d="M586.195 359.055C589.922 356.903 594.514 356.903 598.241 359.055L637.846 381.921C641.573 384.072 643.869 388.049 643.869 392.352V438.084C643.869 442.388 641.573 446.364 637.846 448.516L598.241 471.382C594.514 473.534 589.922 473.534 586.195 471.382L546.59 448.516C542.864 446.364 540.568 442.388 540.568 438.084V392.352C540.568 388.049 542.864 384.072 546.59 381.921L586.195 359.055Z"
                      stroke="#034737"
                    />
                    <path
                      d="M344.625 573.618C348.352 571.466 352.944 571.466 356.671 573.618L396.276 596.484C400.002 598.636 402.298 602.612 402.298 606.916V652.648C402.298 656.951 400.002 660.928 396.276 663.079L356.671 685.945C352.944 688.097 348.352 688.097 344.625 685.945L305.02 663.079C301.293 660.928 298.997 656.951 298.997 652.648V606.916C298.997 602.612 301.293 598.636 305.02 596.484L344.625 573.618Z"
                      stroke="#034737"
                    />
                    <path
                      d="M103.188 362.877V267.532C103.188 260.603 108.804 254.986 115.733 254.986H139.256C146.184 254.986 151.801 249.37 151.801 242.441V124.514"
                      stroke="#034737"
                    />
                    <circle
                      cx="151.802"
                      cy="192.573"
                      r="12.6727"
                      fill="#F3F7F6"
                      stroke="#034737"
                    />
                    <circle
                      cx="207.001"
                      cy="629.782"
                      r="12.6727"
                      fill="#F3F7F6"
                      stroke="#034737"
                    />
                    <path
                      d="M202.297 468.886H292.624C299.553 468.886 305.17 463.269 305.17 456.341V430.936C305.17 424.007 310.786 418.391 317.715 418.391H534.751"
                      stroke="#034737"
                    />
                    <path
                      d="M200.102 429.055H230.524C237.453 429.055 243.07 423.438 243.07 416.509V382.323C243.07 375.394 248.687 369.777 255.615 369.777H277.57C284.498 369.777 290.115 364.161 290.115 357.232V284.468"
                      stroke="#034737"
                    />
                    <path
                      d="M199.473 512.795H453.204C460.133 512.795 465.75 507.179 465.75 500.25V166.854"
                      stroke="#034737"
                    />
                    <circle
                      cx="290.431"
                      cy="328.063"
                      r="12.6727"
                      fill="#F3F7F6"
                      stroke="#034737"
                    />
                    <circle
                      cx="465.438"
                      cy="415.882"
                      r="12.6727"
                      fill="#F3F7F6"
                      stroke="#034737"
                    />
                    <circle
                      cx="340.61"
                      cy="511.854"
                      r="12.6727"
                      fill="#F3F7F6"
                      stroke="#034737"
                    />
                  </svg>
                </div>
              </div>
              <Image
                src="/hero.svg"
                width={700}
                height={70}
                alt="image"
                className="xl:hidden w-full max-w-[300px] lg:max-w-[500px] h-full 2xl:hidden flex"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="2xl:flex xl:flex hidden sm:pt-20 items-center justify-center mx-auto">
        <Card />
      </section>
      <section className="flex 2xl:hidden xl:hidden  items-center justify-center mx-auto p-6">
        <CardResponsive />
      </section>
      <section className="px-6 sm:px-10 ">
        <Benefits />
      </section>

      <section className="items-center justify-center flex flex-col  sm:py-20  overflow-hidden ">
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
      <Footer />
    </main>
  );
};
export default page;
