"use client";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// Lazy load components
const Banner = React.lazy(
  () => import("@/components/solutionMarketing/banner/Banner")
);
const MarketingExpertise = React.lazy(
  () =>
    import(
      "@/components/solutionMarketing/marketingExpertise/MarketingExpertise"
    )
);
const MarketingAutomate = React.lazy(
  () =>
    import("@/components/solutionMarketing/marketingAutomate/MarketingAutomate")
);
const MarketingInsights = React.lazy(
  () =>
    import("@/components/solutionMarketing/marketingInsights/MarketingInsights")
);
const MarketingTechnology = React.lazy(
  () =>
    import(
      "@/components/solutionMarketing/marketingTechnology/MarketingTechnology"
    )
);
const MarketingStreamline = React.lazy(
  () =>
    import(
      "@/components/solutionMarketing/marketingStreamline/MarketingStreamline"
    )
);
const ImageGallery = React.lazy(
  () =>
    import(
      "@/components/solutionMarketing/marketingEfficiency/MarketingEfficiency"
    )
);
const ImageGalleryResponsive = React.lazy(
  () => import("./ZoomEffectrespopnsive")
);

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2DA771]"></div>
  </div>
);

const Page: React.FC = () => {
  return (
    <React.Fragment>
      <div className="">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Banner />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <MarketingExpertise />
        </Suspense>
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
              <div className="2xl:flex xl:flex hidden mt-20 w-full h-full items-center justify-center mx-auto">
                <Suspense fallback={<LoadingSpinner />}>
                  <ImageGallery />
                </Suspense>
              </div>
              <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto items-center gap-4">
                <Suspense fallback={<LoadingSpinner />}>
                  <ImageGalleryResponsive />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
        <Suspense fallback={<LoadingSpinner />}>
          <MarketingAutomate />
        </Suspense>
        <div className="w-full flex py-24 flex-col items-center justify-center">
          <Suspense fallback={<LoadingSpinner />}>
            <MarketingInsights />
          </Suspense>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <MarketingTechnology />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <MarketingStreamline />
        </Suspense>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Page;
