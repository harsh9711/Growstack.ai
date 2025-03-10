import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "./components/HeroSection";
import ContentBox from "./components/Box";
import { tos } from "../../privacyPolicy";
import Footer from "@/components/footer/Footer";

const TosPage: React.FC = () => {
  // Renamed component to avoid naming conflict
  return (
    <div className="flex flex-col">
      <div className="relative z-40">
        <Navbar
          logoUrl="/logo/growstack1.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />
      </div>
      <HeroSection
        title="Privacy policy"
        description=" Your privacy matters to us. Review how we collect, use, and protect your personal information."
        lastUpdatedDate="12-09-2024"
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
            title={tos.heading}
            introduction={tos.introduction}
            content={tos.content}
            linksSections={tos.links_sections}
            linksSections2={tos.links_sections2}
            howYourInformationMayBeUsed={tos.how_your_information_may_be_used}
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

export default TosPage;
