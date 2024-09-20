import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "./components/HeroSection";
import ContentBox from "./components/Box";
import { rrp } from "../../privacyPolicy"; // Importing the rrp data
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/footer/Footer";

const rrpPage: React.FC = () => {
  // Renamed component to avoid naming conflict
  return (
    <div className="flex flex-col">
      <div className="relative z-40">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />
      </div>
      <HeroSection
        title="Refund &
return policy"
        description="At GrowStack.ai, we prioritize customer satisfaction with a clear, fair, and flexible return & refund policy for all our digital products and services."
        lastUpdatedDate="17-09-2024"
      />
      <section className="bg-white mt-20">
        <Image
          src="/1.svg"
          width={100}
          height={100}
          alt="image"
          className="absolute -translate-y-40 z-0 w-full h-full"
        />
        <div className="max-w-[1000px] relative z-20 w-full justify-center items-center mx-auto">
          <ContentBox
            title={rrp.heading}
            introduction={rrp.introduction}
            content={rrp.content}
            linksSections={rrp.links_sections}
            linksSections2={rrp.links_sections2}
            howYourInformationMayBeUsed={rrp.how_your_information_may_be_used}
          />
        </div>
        <Image
          src="/2.svg"
          width={100}
          height={100}
          alt="image"
          className="absolute -translate-y-[1000px] z-0 w-full h-full"
        />
      </section>
      <Footer />
    </div>
  );
};

export default rrpPage;
