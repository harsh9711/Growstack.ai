"use client";
import React, { Suspense } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Banner from "@/components/socialPlannerHub/banner/Banner";

// Lazy load components
const Partnership = React.lazy(
  () => import("@/components/socialPlannerHub/partnership/Partnership")
);
const SocialInteraction = React.lazy(
  () =>
    import("@/components/socialPlannerHub/socialInteraction/SocialInteraction")
);
const Schedule = React.lazy(
  () => import("@/components/socialPlannerHub/schedule/Schedule")
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
      <div className="clrNav">
        <Navbar logoUrl="/logo/growstack.svg" logoAlt="Custom Logo" />
        <Banner />

        {/* Group related sections together for smoother loading experience */}
        <Suspense fallback={<LoadingSpinner />}>
          <Partnership />
          <SocialInteraction />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <Schedule />
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
