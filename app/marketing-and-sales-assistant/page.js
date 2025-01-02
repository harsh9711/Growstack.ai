"use client";
import React, { Suspense } from "react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/marketingSalesAssistant/banner/Banner";
const AiEnhanced = React.lazy(
  () => import("@/components/marketingSalesAssistant/aiEnhanced/AiEnhanced")
);
const AiSlider = React.lazy(
  () => import("@/components/marketingSalesAssistant/aiSlider/AiSlider")
);
const Interface = React.lazy(
  () => import("@/components/marketingSalesAssistant/interface/Interface")
);
const Benefits = React.lazy(
  () => import("@/components/marketingSalesAssistant/benefits/Benefits")
);
const AgentsDepartment = React.lazy(
  () =>
    import(
      "@/components/marketingSalesAssistant/agentsDepartment/AgentsDepartment"
    )
);

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2DA771]"></div>
  </div>
);

function Page() {
  return (
    <React.Fragment>
      <div className="transNav">
        <Navbar />
        <Banner />
        <Suspense fallback={<LoadingSpinner />}>
          <AiEnhanced />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <AiSlider />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Interface />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <AgentsDepartment />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Benefits />
        </Suspense>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Page;
