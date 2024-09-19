"use client";
import AiBuilder from "@/components/aiWebsiteAndEmailBuilder/aiBuilder/AiBuilder";
import Banner from "@/components/aiWebsiteAndEmailBuilder/banner/Banner";
import ConceptCode from "@/components/aiWebsiteAndEmailBuilder/conceptCode/ConceptCode";
import SingleHub from "@/components/aiWebsiteAndEmailBuilder/singleHub/SingleHub";
import Template from "@/components/aiWebsiteAndEmailBuilder/template/Template";
import UseIt from "@/components/aiWebsiteAndEmailBuilder/useIt/UseIt";
import Footer from "@/components/footer/Footer";
import Faqs from "@/components/home/faq/Faqs";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

function Page() {
    return (
        <React.Fragment>
            <Navbar />
            <Banner />
            <ConceptCode />
            <AiBuilder />
            <SingleHub />
            <Template />
            <UseIt />
            {/* <Faqs /> */}
            <Footer />
        </React.Fragment>
    );
}

export default Page;
