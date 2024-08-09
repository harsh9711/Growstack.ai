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
// I commented this bootstrapp CDN because of conflicting styles with tailwindcss, NB: I'll uncomment it as soon as reliable solution is found
// import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Faqs />
      <Footer />
    </React.Fragment>
  );
}

export default Page;
