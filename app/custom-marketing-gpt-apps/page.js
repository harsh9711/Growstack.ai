"use client";
import React, { Suspense } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Banner from "@/components/customMarketingGpt/banner/Banner";

// Lazy load components except Banner
const Efficiency = React.lazy(
  () => import("@/components/customMarketingGpt/efficiency/Efficiency")
);
const CraftBrand = React.lazy(
  () => import("@/components/customMarketingGpt/craftBrand/CraftBrand")
);
const UseCases = React.lazy(
  () => import("@/components/customMarketingGpt/useCases/UseCases")
);
const CoreFeatures = React.lazy(
  () => import("@/components/customMarketingGpt/coreFeatures/CoreFeatures")
);
const Faqs = React.lazy(() => import("@/components/home/faq/Faqs"));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#034737]"></div>
  </div>
);

function Page() {
  return (
    <React.Fragment>
      <div className="transNav">
        <Navbar />
        <Banner />

        <Suspense fallback={<LoadingSpinner />}>
          <Efficiency />
          <CraftBrand />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <UseCases />
          <CoreFeatures />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Faqs />
        </Suspense>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Page;
