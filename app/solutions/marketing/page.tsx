"use client";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/solutionMarketing/banner/Banner";
import MarketingExpertise from "@/components/solutionMarketing/marketingExpertise/MarketingExpertise";
import MarketingEfficiency from "@/components/solutionMarketing/marketingEfficiency/MarketingEfficiency";
import MarketingAutomate from "@/components/solutionMarketing/marketingAutomate/MarketingAutomate";
import MarketingInsights from "@/components/solutionMarketing/marketingInsights/MarketingInsights";
import MarketingTechnology from "@/components/solutionMarketing/marketingTechnology/MarketingTechnology";
import MarketingStreamline from "@/components/solutionMarketing/marketingStreamline/MarketingStreamline";
import ImageGallery from "@/components/solutionMarketing/marketingEfficiency/MarketingEfficiency";
import ImageGalleryResponsive from "./ZoomEffectrespopnsive";

const Page: React.FC = () => {
  return (
    <React.Fragment>
      <div className="">
        <Navbar />
        <Banner />
        <MarketingExpertise />
        <section className="items-center justify-center mx-auto flex flex-col w-full bg-[url('/images_growstack/solutions/efficiencyBack.png')] bg-cover bg-[100%] bg-no-repeat">
          <div className="flex flex-col items-center justify-center sm:py-20 mx-auto overflow-hidden">
            <div className="w-full gap-y-4 flex flex-col items-center justify-center mx-auto ">
              <div className="bg-[rgba(3,71,55,.102)] hover:shadow-md  whitespace-nowrap  text-[#034737] py-2 px-4 flex items-center text-center text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[110px]">
                Efficiency
              </div>

              <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
                <h1 className="text-[22px] 2xl:text-[42px] leading-12 2xl:flex-row xl:flex-row flex-col flex gap-2  items-center justify-center text-black">
                  <span className="font-semibold text-center">
                    Produce high quality
                  </span>
                  <span className="font-light text-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                    content efficiently
                  </span>
                </h1>
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
          </div>
        </section>
        <MarketingAutomate />
        <div className="w-full flex py-24  flex-col items-center justify-center">
          <MarketingInsights />
        </div>
        <MarketingTechnology />
        <MarketingStreamline />
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Page;
