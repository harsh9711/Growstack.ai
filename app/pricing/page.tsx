"use client"

import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "./components/HeroSection";
import MainBox from "./components/MainBox";
import PricingNew from "./components/PricingNew";
import Footer from "@/components/footer/Footer";
// import TickIcon from "./TickIcon";
// import DashIcon from "./DashIcon";
import { ContentBoxProps } from "@/types/Box";
import "aos/dist/aos.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


const PricingPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="relative z-40">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />
      </div>
      <HeroSection
        title="Get the AI copilot for better marketing results"
        description="Flexible pricing for all business sizes—pay for only what you need with Growstack."
      />
      <svg
        className="absolute -translate-y-96 translate-x-64"
        width="31"
        height="56"
        viewBox="0 0 31 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="arrow-path"
          d="M22.2579 49.62L20.9666 50.1513C23.5384 47.8123 26.0597 45.3914 26.9537 41.8855C28.2309 36.8994 24.7454 32.5244 20.5544 30.3342C18.1275 29.0681 15.4788 28.338 12.9036 27.467C10.8697 26.7827 6.54029 25.5681 7.05045 22.6331C7.27084 21.3986 8.18761 20.2689 8.94041 19.3161C9.82447 18.1923 10.8262 17.1669 11.8043 16.1276C13.2849 14.5549 14.9236 12.7089 15.0982 10.4298C15.2994 7.82312 13.1837 5.78917 11.0606 4.68703C8.69155 3.46611 6.09722 3.05642 3.50228 3.58248L3.62063 4.47189C5.9968 4.33373 8.44344 4.75704 10.5429 5.95216C12.7791 7.23186 14.6972 9.4661 13.1075 12.0383C11.8392 14.094 9.72022 15.6186 8.1185 17.3999C6.74863 18.9168 5.14882 20.8651 5.13476 23.0404C5.10242 27.8542 12.0349 29.1064 15.4468 30.2438C19.7252 31.6627 25.5952 34.3957 25.524 39.8003C25.4865 42.4526 23.8919 44.772 22.1902 46.6495C21.0556 47.904 19.8661 49.0924 18.7183 50.3188L19.1585 48.7856C19.3019 47.9993 18.1377 47.353 17.7713 48.2022C17.1348 49.6637 16.5888 51.1646 15.9687 52.6337C15.5742 53.5594 16.4088 54.5108 17.3561 54.0281C19.2046 53.0929 21.1645 52.3392 22.9784 51.3497C23.888 50.8542 23.2684 49.2881 22.2579 49.62Z"
          fill="#034737"
        />
      </svg>
      <div className="w-full max-w-[1600px] px-4 mx-auto !mt-40 mb-40">
        <PricingNew />
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
