"use client";
import React from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Banner from "@/components/customMarketingGpt/banner/Banner";
import Efficiency from "@/components/customMarketingGpt/efficiency/Efficiency";
import CraftBrand from "@/components/customMarketingGpt/craftBrand/CraftBrand";
import UseCases from "@/components/customMarketingGpt/useCases/UseCases";
import CoreFeatures from "@/components/customMarketingGpt/coreFeatures/CoreFeatures";
import Faqs from "@/components/home/faq/Faqs";

function Page() {
    return (
        <React.Fragment>
            <div className='transNav'>
                <Navbar />
                <Banner />
                <Efficiency />
                <CraftBrand />
                <UseCases />
                <CoreFeatures />
                <Faqs />
                <Footer />
            </div>
        </React.Fragment>
    );
}

export default Page;
