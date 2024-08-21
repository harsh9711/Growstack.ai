"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import GridComponent from "./components/GridBoxes";
import ImageGalleryLine from "./components/ImageGalleryline";
import Navbar from "@/components/navbar/Navbar";
import LoadingBar from "./components/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import GridComponentSecond from "./components/GridBoxes2";
import ImageGalleryLineResponsive from "./components/ImageGallerylineresponsive";
import ImageGallery from "./components/ZoomEffect";
import ImageGalleryResponsive from "./components/ZoomEffectrespopnsive";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import { motion, inView } from "framer-motion";
import MarketingTechnology from "../largeenterprise/components/marketingTechnology/MarketingTechnology";
import Footer from "@/app/(landing)/components/Footer";
import Banner from "./banner/Banner";
const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white">
      <section className="bg-gradient-to-r to-[#FFF4CB]/100 via-[#E6FFE2]/100 from-[#A9FF9B]/50 w-full mb-10 2xl:mb-20 overflow-hidden">
        <Navbar
        
          logoUrl="/images/logo.png"
          logoAlt="Custom Logo"
          backgroundColor="transparent"
        />

        <div className="relative flex items-center max-w-[1920px] 2xl:p-0 p-4 w-full 2xl:max-h-[1112px] h-full justify-center mx-auto">
          <div className="w-full flex flex-row justify-between brightness-110 relative 2xl:left-52 items-center mt-10 mb-10 2xl:mt-32 2xl:mb-60">
            <div className="w-full gap-y-4 flex flex-col">
              <div
                data-aos="fade-right"
                data-aos-duration="1200"
                className="bg-white text-black py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[200px] 2xl:max-w-[252px] shadow-lg w-full tracking-widest"
              >
                Growstack for Sales Team
              </div>

              <div className="2xl:max-w-3xl w-full brightness-95">
                <h1
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="text-[26px] 2xl:text-[56px] max-w-2xl leading-12 text-black"
                >
                  <span className="font-semibold">Transform your sales</span>
                  <br />{" "}
                  <span className="font-light">process with Growstack</span>
                </h1>
                <p
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="text-[16px] 2xl:text-[18px] text-black mt-4 w-full max-w-[600px] leading-loose font-light"
                >
                  Unlock the full potential of your sales team with Growstack's
                  advanced suite of tools and features. Our platform addresses
                  your biggest challenges and empowers your team to achieve and
                  exceed their goals.
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
                    <button className="border border-black flex items-center gap-2 text-black hover:font-bold font-medium 2xl:py-4 py-2 px-2  2xl:px-7 rounded-xl shadow-md shadow-[#00000025]">
                      See demo
                      <ArrowRight className="text-black" />
                    </button>
                  </div>

                  <div
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="flex flex-row  gap-4 2xl:gap-4"
                  >
                    <button className=" flex items-center gap-2  text-primary-green rounded-xl  ">
                      <svg
                        className="w-full h-full"
                        width="197"
                        height="60"
                        viewBox="0 0 197 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.910156"
                          width="196.364"
                          height="58.1818"
                          rx="10"
                          fill="black"
                        />
                        <path
                          d="M99.1048 32.5473C95.6837 32.5473 92.8953 35.1494 92.8953 38.7334C92.8953 42.2956 95.6837 44.9196 99.1048 44.9196C102.527 44.9196 105.316 42.2956 105.316 38.7334C105.314 35.1494 102.526 32.5473 99.1048 32.5473ZM99.1048 42.4847C97.2299 42.4847 95.6139 40.9385 95.6139 38.7349C95.6139 36.508 97.2313 34.9851 99.1048 34.9851C100.98 34.9851 102.596 36.508 102.596 38.7349C102.596 40.9371 100.98 42.4847 99.1048 42.4847ZM85.5571 32.5473C82.136 32.5473 79.3477 35.1494 79.3477 38.7334C79.3477 42.2956 82.136 44.9196 85.5571 44.9196C88.9797 44.9196 91.768 42.2956 91.768 38.7334C91.768 35.1494 88.9797 32.5473 85.5571 32.5473ZM85.5571 42.4847C83.6822 42.4847 82.0662 40.9385 82.0662 38.7349C82.0662 36.508 83.6837 34.9851 85.5571 34.9851C87.432 34.9851 89.048 36.508 89.048 38.7349C89.0495 40.9371 87.432 42.4847 85.5571 42.4847ZM69.4437 34.4469V37.0709H75.7244C75.5368 38.5473 75.0451 39.6251 74.2946 40.3742C73.3811 41.2876 71.9513 42.2956 69.4437 42.2956C65.5775 42.2956 62.5549 39.1785 62.5549 35.3124C62.5549 31.4462 65.5775 28.3291 69.4437 28.3291C71.5295 28.3291 73.0524 29.1494 74.1768 30.204L76.0284 28.3524C74.4575 26.8527 72.3731 25.7051 69.4437 25.7051C64.1477 25.7051 59.6953 30.0164 59.6953 35.3124C59.6953 40.6084 64.1477 44.9196 69.4437 44.9196C72.3019 44.9196 74.459 43.9814 76.1448 42.2243C77.8786 40.4905 78.4182 38.0527 78.4182 36.0847C78.4182 35.4767 78.3717 34.9138 78.2771 34.4454H69.4437V34.4469ZM135.346 36.4847C134.831 35.1029 133.26 32.5473 130.05 32.5473C126.863 32.5473 124.215 35.0549 124.215 38.7334C124.215 42.2011 126.84 44.9196 130.354 44.9196C133.189 44.9196 134.83 43.1858 135.511 42.1778L133.401 40.7713C132.699 41.8025 131.737 42.4818 130.354 42.4818C128.972 42.4818 127.988 41.8491 127.355 40.6069L135.627 37.1858L135.346 36.4847ZM126.91 38.5473C126.84 36.156 128.761 34.9385 130.145 34.9385C131.223 34.9385 132.136 35.4782 132.441 36.2505L126.91 38.5473ZM120.185 44.5458H122.903V26.3625H120.185V44.5458ZM115.732 33.9305H115.639C115.029 33.2033 113.857 32.5473 112.382 32.5473C109.288 32.5473 106.453 35.2658 106.453 38.7582C106.453 42.2258 109.288 44.9211 112.382 44.9211C113.858 44.9211 115.029 44.2651 115.639 43.516H115.732V44.4062C115.732 46.7727 114.466 48.0382 112.428 48.0382C110.764 48.0382 109.733 46.844 109.311 45.836L106.945 46.8207C107.624 48.46 109.428 50.476 112.428 50.476C115.615 50.476 118.311 48.6011 118.311 44.0309V32.924H115.733V33.9305H115.732ZM112.616 42.4847C110.741 42.4847 109.172 40.9138 109.172 38.7582C109.172 36.5778 110.741 34.9851 112.616 34.9851C114.466 34.9851 115.919 36.5778 115.919 38.7582C115.919 40.9138 114.466 42.4847 112.616 42.4847ZM148.079 26.3625H141.576V44.5458H144.289V37.6571H148.078C151.086 37.6571 154.044 35.4796 154.044 32.0105C154.044 28.5414 151.087 26.3625 148.079 26.3625ZM148.149 35.1262H144.289V28.8934H148.149C150.178 28.8934 151.33 30.5734 151.33 32.0105C151.33 33.4185 150.178 35.1262 148.149 35.1262ZM164.923 32.5153C162.958 32.5153 160.923 33.3807 160.081 35.2993L162.489 36.3043C163.004 35.2993 163.964 34.9705 164.969 34.9705C166.373 34.9705 167.8 35.8127 167.823 37.3094V37.4971C167.332 37.2163 166.279 36.796 164.993 36.796C162.396 36.796 159.752 38.2229 159.752 40.8891C159.752 43.3225 161.881 44.8891 164.267 44.8891C166.091 44.8891 167.097 44.0702 167.729 43.1102H167.822V44.5138H170.443V37.5422C170.444 34.316 168.033 32.5153 164.923 32.5153ZM164.594 42.4804C163.707 42.4804 162.466 42.0353 162.466 40.9356C162.466 39.532 164.011 38.9938 165.345 38.9938C166.536 38.9938 167.099 39.2513 167.823 39.6018C167.612 41.2876 166.162 42.4804 164.594 42.4804ZM179.988 32.9123L176.876 40.796H176.783L173.554 32.9123H170.631L175.473 43.9305L172.712 50.06H175.543L183.006 32.9123H179.988ZM155.543 44.5458H158.255V26.3625H155.543V44.5458Z"
                          fill="white"
                        />
                        <path
                          d="M68.9717 15.8099C68.9717 17.0288 68.611 17.999 67.8881 18.7233C67.0677 19.5844 65.9972 20.015 64.6823 20.015C63.4226 20.015 62.3506 19.5786 61.4706 18.7059C60.5892 17.8317 60.1484 16.7495 60.1484 15.4579C60.1484 14.1648 60.5892 13.0826 61.4706 12.2099C62.3506 11.3357 63.4226 10.8993 64.6823 10.8993C65.3077 10.8993 65.9055 11.0215 66.4728 11.2644C67.0415 11.5088 67.4968 11.8331 67.8372 12.239L67.0706 13.007C66.4932 12.3161 65.6975 11.9713 64.6808 11.9713C63.7615 11.9713 62.9673 12.2942 62.2968 12.9401C61.6263 13.5859 61.2917 14.4251 61.2917 15.4564C61.2917 16.4877 61.6263 17.327 62.2968 17.9728C62.9673 18.6186 63.7615 18.9415 64.6808 18.9415C65.6553 18.9415 66.4684 18.6171 67.1186 17.967C67.5404 17.5437 67.7848 16.9546 67.8503 16.1997H64.6808V15.151H68.9092C68.9528 15.3793 68.9717 15.599 68.9717 15.8099Z"
                          fill="white"
                        />
                        <path
                          d="M75.6773 12.1649H71.7035V14.9314H75.2875V15.9801H71.7035V18.7467H75.6773V19.8201H70.582V11.0929H75.6773V12.1649Z"
                          fill="white"
                        />
                        <path
                          d="M80.4059 19.8201H79.2844V12.1649H76.8466V11.0929H82.8437V12.1649H80.4059V19.8201Z"
                          fill="white"
                        />
                        <path
                          d="M87.1825 19.8201V11.0929H88.304V19.8201H87.1825Z"
                          fill="white"
                        />
                        <path
                          d="M93.2773 19.8201H92.1559V12.1649H89.718V11.0929H95.7151V12.1649H93.2773V19.8201Z"
                          fill="white"
                        />
                        <path
                          d="M107.068 18.6928C106.209 19.5743 105.143 20.015 103.868 20.015C102.592 20.015 101.526 19.5743 100.669 18.6928C99.8108 17.8114 99.3832 16.7321 99.3832 15.4565C99.3832 14.1808 99.8108 13.1016 100.669 12.2201C101.526 11.3387 102.592 10.8965 103.868 10.8965C105.136 10.8965 106.201 11.3401 107.062 12.2259C107.923 13.1118 108.353 14.1881 108.353 15.4565C108.353 16.7321 107.924 17.8114 107.068 18.6928ZM101.497 17.9612C102.142 18.6158 102.932 18.9416 103.868 18.9416C104.803 18.9416 105.594 18.6143 106.238 17.9612C106.884 17.3067 107.209 16.4718 107.209 15.4565C107.209 14.4412 106.884 13.6063 106.238 12.9518C105.594 12.2972 104.803 11.9714 103.868 11.9714C102.932 11.9714 102.142 12.2987 101.497 12.9518C100.852 13.6063 100.528 14.4412 100.528 15.4565C100.528 16.4718 100.852 17.3067 101.497 17.9612Z"
                          fill="white"
                        />
                        <path
                          d="M109.927 19.8201V11.0929H111.292L115.533 17.8812H115.581L115.533 16.1998V11.0929H116.654V19.8201H115.484L111.046 12.7016H110.998L111.046 14.383V19.8201H109.927Z"
                          fill="white"
                        />
                        <path
                          d="M68.9717 15.8099C68.9717 17.0288 68.611 17.999 67.8881 18.7233C67.0677 19.5844 65.9972 20.015 64.6823 20.015C63.4226 20.015 62.3506 19.5786 61.4706 18.7059C60.5892 17.8317 60.1484 16.7495 60.1484 15.4579C60.1484 14.1648 60.5892 13.0826 61.4706 12.2099C62.3506 11.3357 63.4226 10.8993 64.6823 10.8993C65.3077 10.8993 65.9055 11.0215 66.4728 11.2644C67.0415 11.5088 67.4968 11.8331 67.8372 12.239L67.0706 13.007C66.4932 12.3161 65.6975 11.9713 64.6808 11.9713C63.7615 11.9713 62.9673 12.2942 62.2968 12.9401C61.6263 13.5859 61.2917 14.4251 61.2917 15.4564C61.2917 16.4877 61.6263 17.327 62.2968 17.9728C62.9673 18.6186 63.7615 18.9415 64.6808 18.9415C65.6553 18.9415 66.4684 18.6171 67.1186 17.967C67.5404 17.5437 67.7848 16.9546 67.8503 16.1997H64.6808V15.151H68.9092C68.9528 15.3793 68.9717 15.599 68.9717 15.8099Z"
                          stroke="white"
                          stroke-width="0.290909"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M75.6773 12.1649H71.7035V14.9314H75.2875V15.9801H71.7035V18.7467H75.6773V19.8201H70.582V11.0929H75.6773V12.1649Z"
                          stroke="white"
                          stroke-width="0.290909"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M80.4059 19.8201H79.2844V12.1649H76.8466V11.0929H82.8437V12.1649H80.4059V19.8201Z"
                          stroke="white"
                          stroke-width="0.290909"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M87.1825 19.8201V11.0929H88.304V19.8201H87.1825Z"
                          stroke="white"
                          stroke-width="0.290909"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M93.2773 19.8201H92.1559V12.1649H89.718V11.0929H95.7151V12.1649H93.2773V19.8201Z"
                          stroke="white"
                          stroke-width="0.290909"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M107.068 18.6928C106.209 19.5743 105.143 20.015 103.868 20.015C102.592 20.015 101.526 19.5743 100.669 18.6928C99.8108 17.8114 99.3832 16.7321 99.3832 15.4565C99.3832 14.1808 99.8108 13.1016 100.669 12.2201C101.526 11.3387 102.592 10.8965 103.868 10.8965C105.136 10.8965 106.201 11.3401 107.062 12.2259C107.923 13.1118 108.353 14.1881 108.353 15.4565C108.353 16.7321 107.924 17.8114 107.068 18.6928ZM101.497 17.9612C102.142 18.6158 102.932 18.9416 103.868 18.9416C104.803 18.9416 105.594 18.6143 106.238 17.9612C106.884 17.3067 107.209 16.4718 107.209 15.4565C107.209 14.4412 106.884 13.6063 106.238 12.9518C105.594 12.2972 104.803 11.9714 103.868 11.9714C102.932 11.9714 102.142 12.2987 101.497 12.9518C100.852 13.6063 100.528 14.4412 100.528 15.4565C100.528 16.4718 100.852 17.3067 101.497 17.9612Z"
                          stroke="white"
                          stroke-width="0.290909"
                          stroke-miterlimit="10"
                        />
                        <path
                          d="M109.927 19.8201V11.0929H111.292L115.533 17.8812H115.581L115.533 16.1998V11.0929H116.654V19.8201H115.484L111.046 12.7016H110.998L111.046 14.383V19.8201H109.927Z"
                          stroke="white"
                          stroke-width="0.290909"
                          stroke-miterlimit="10"
                        />
                        <g filter="url(#filter0_ii_4500_14622)">
                          <path
                            d="M15.1813 11.8738C14.758 12.3218 14.5078 13.017 14.5078 13.9174V46.0861C14.5078 46.9879 14.758 47.6818 15.1813 48.1298L15.2889 48.2345L33.3093 30.2141V30.0018V29.7894L15.2889 11.7676L15.1813 11.8738Z"
                            fill="url(#paint0_linear_4500_14622)"
                          />
                          <path
                            d="M39.3183 36.2239L33.3125 30.2152V30.0028V29.7905L39.3198 23.7832L39.455 23.8603L46.5721 27.9039C48.6041 29.0588 48.6041 30.9483 46.5721 32.1047L39.455 36.1483L39.3183 36.2239Z"
                            fill="url(#paint1_linear_4500_14622)"
                          />
                          <g filter="url(#filter1_i_4500_14622)">
                            <path
                              d="M39.4502 36.146L33.3062 30.002L15.1797 48.13C15.8488 48.8398 16.9557 48.927 18.2022 48.2201L39.4502 36.146Z"
                              fill="url(#paint2_linear_4500_14622)"
                            />
                          </g>
                          <path
                            d="M39.4502 23.8584L18.2022 11.7857C16.9557 11.0773 15.8488 11.1661 15.1797 11.8759L33.3077 30.0039L39.4502 23.8584Z"
                            fill="url(#paint3_linear_4500_14622)"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_ii_4500_14622"
                            x="14.5078"
                            y="11.2969"
                            width="33.5898"
                            height="37.4116"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="-0.218182" />
                            <feComposite
                              in2="hardAlpha"
                              operator="arithmetic"
                              k2="-1"
                              k3="1"
                            />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="shape"
                              result="effect1_innerShadow_4500_14622"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="0.218182" />
                            <feComposite
                              in2="hardAlpha"
                              operator="arithmetic"
                              k2="-1"
                              k3="1"
                            />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="effect1_innerShadow_4500_14622"
                              result="effect2_innerShadow_4500_14622"
                            />
                          </filter>
                          <filter
                            id="filter1_i_4500_14622"
                            x="15.1797"
                            y="30.002"
                            width="24.2695"
                            height="18.7065"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="-0.218182" />
                            <feComposite
                              in2="hardAlpha"
                              operator="arithmetic"
                              k2="-1"
                              k3="1"
                            />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="shape"
                              result="effect1_innerShadow_4500_14622"
                            />
                          </filter>
                          <linearGradient
                            id="paint0_linear_4500_14622"
                            x1="31.7119"
                            y1="13.577"
                            x2="7.3017"
                            y2="37.9872"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#00A0FF" />
                            <stop offset="0.0066" stop-color="#00A1FF" />
                            <stop offset="0.2601" stop-color="#00BEFF" />
                            <stop offset="0.5122" stop-color="#00D2FF" />
                            <stop offset="0.7604" stop-color="#00DFFF" />
                            <stop offset="1" stop-color="#00E3FF" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_4500_14622"
                            x1="49.2172"
                            y1="30.0028"
                            x2="14.0232"
                            y2="30.0028"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFE000" />
                            <stop offset="0.4087" stop-color="#FFBD00" />
                            <stop offset="0.7754" stop-color="#FFA500" />
                            <stop offset="1" stop-color="#FF9C00" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_4500_14622"
                            x1="36.1137"
                            y1="33.3385"
                            x2="3.01038"
                            y2="66.4418"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FF3A44" />
                            <stop offset="1" stop-color="#C31162" />
                          </linearGradient>
                          <linearGradient
                            id="paint3_linear_4500_14622"
                            x1="10.6145"
                            y1="1.16724"
                            x2="25.396"
                            y2="15.9488"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#32A071" />
                            <stop offset="0.0685" stop-color="#2DA771" />
                            <stop offset="0.4762" stop-color="#15CF74" />
                            <stop offset="0.8009" stop-color="#06E775" />
                            <stop offset="1" stop-color="#00F076" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </button>
                    <button className="flex items-center gap-2   text-primary-green rounded-xl">
                      <Image
                        className="w-full h-full "
                        src="/apple.png"
                        alt="Apple"
                        width={180}
                        height={400}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="2xl:flex xl:flex lg:flex hidden items-center justify-center overflow-hidden">
              <div
                data-aos="fade-left"
                data-aos-duration="1500"
                className="w-full relative z-0 right-0"
              >
                <Image
                  className="w-[1200px] h-full"
                  src="/solutions/herosales.svg"
                  alt="Center Image"
                  width={842}
                  height={463}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <Banner /> */}
      </section>

      <section className="relative mx-auto items-center justify-center 2xl:py-20 bg-white">
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            Manage
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
            className="text-center text-[22px] 2xl:text-[42px] leading-normal"
          >
            <span className="text-black font-bold">Generate and manage </span>
            <span className="text-black font-extralight"> quality leads</span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="items-center justify-center mx-auto relative 2xl:right-12 2xl:top-10"
          >
            <GridComponent />
          </div>
        </div>
      </section>
      <section className="bg-[#034737] mx-auto w-full flex items-center justify-center py-10 2xl:py-20 2xl:mt-20">
        <div
          data-aos="fade-up"
          data-aos-duration="1800"
          data-aos-delay="600"
          className="flex flex-col items-center justify-center gap-y-10"
        >
          <div>
            <LoadingBar />
          </div>
        </div>
      </section>

      <section className="relative w-full 2xl:mt-20">
        <div className="2xl:flex hidden flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLine />
        </div>
        <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLineResponsive />
        </div>
      </section>
      <section className="relative mx-auto w-full items-center justify-center mt-10 2xl:mt-0 py-20 bg-[#E2F0CB4D]">
        <Image
          src="/solutions/background.svg"
          width={100}
          height={100}
          alt="design"
          className="w-full absolute"
        />
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            track
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
            className="text-center text-[32px] 2xl:text-[42px] leading-normal"
          >
            <span className="text-black font-bold">Track and optimize</span>
            <span className="text-black font-extralight">
              {" "}
              sales performance
            </span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="items-center justify-center mx-auto relative 2xl:right-12 2xl:top-4"
          >
            <GridComponentSecond />
          </div>
        </div>
      </section>
      <section className="items-center justify-center mx-auto w-full py-20">
        <div className="w-full gap-y-4 flex flex-col items-center justify-center mx-auto ">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            competitive{" "}
          </div>

          <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
            <h1 className="text-[22px] 2xl:text-[42px] leading-12 flex flex-col 2xl:flex-row gap-4 items-center justify-center text-black">
              <span className="font-semibold text-center">
                Gain a competitive
              </span>
              <span className="font-light text-center"> market edge</span>
            </h1>
          </div>
        </div>
        <div className="2xl:flex hidden mt-20 items-center justify-center mx-auto">
          <ImageGallery />
        </div>
        <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryResponsive />
        </div>
      </section>
      <section className=" overflow-hidden  ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute h-[1000px]  transform scale-y-[-1]  translate-x-10  z-0 translate-y-[500px] "
            alt="image"
          />
        </div>

        <MarketingStreamline />
      </section>
      <Footer />
    </main>
  );
};

export default page;
