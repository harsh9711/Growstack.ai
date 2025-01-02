"use client";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/textToVideoAndProductAi/banner/Banner";

const VideoSolution = React.lazy(
  () =>
    import("@/components/textToVideoAndProductAi/VideoSolution/VideoSolution")
);
const ElevateBrand = React.lazy(
  () => import("@/components/textToVideoAndProductAi/elevateBrand/ElevateBrand")
);
const AiProduct = React.lazy(
  () => import("@/components/textToVideoAndProductAi/aiProduct/AiProduct")
);
const AiSlider = React.lazy(
  () => import("@/components/textToVideoAndProductAi/aiTextSlider/AiTextSlider")
);
const CoreProduct = React.lazy(
  () => import("@/components/textToVideoAndProductAi/coreProduct/CoreProduct")
);
const Editing = React.lazy(
  () => import("@/components/textToVideoAndProductAi/editing/Editing")
);
const Faqs = React.lazy(() => import("@/components/home/faq/Faqs"));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2DA771]"></div>
  </div>
);

function Page() {
  return (
    <React.Fragment>
      <Navbar />
      <Banner />
      <Suspense fallback={<LoadingSpinner />}>
        <VideoSolution />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <ElevateBrand />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <AiProduct />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <AiSlider />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <CoreProduct />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Editing />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Faqs />
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default Page;
