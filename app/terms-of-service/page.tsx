import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import { tnc } from "../../privacyPolicy";
import Footer from "@/components/footer/Footer";
import HeroSection from "./components/HeroSection";
import ContentBox from "./components/Box";

const Tnc: React.FC = () => {
  return (
    <div className=" flex flex-col ">
      <div className="relative z-40">
        {" "}
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />
      </div>
      <HeroSection
        title="Terms of Service"
        description=" Discover the terms that govern your use of Growstack's services and protect both parties' interests."
        lastUpdatedDate="16-09-2024"
      />
      <section className="bg-white mt-20">
        <Image
          src="/1.svg"
          width={100}
          height={100}
          alt="image"
          className="absolute -translate-y-40 z-0 w-full h-full"
        />{" "}
        <div className="max-w-[1000px] relative z-20 w-full justify-center items-center mx-auto ">
          <ContentBox
            title={tnc.heading}
            introduction={tnc.introduction}
            content={tnc.content}
            linksSection={tnc.links_section}
            collectionOfInformation={tnc.collection_of_information}
            howYourInformationMayBeUsed={tnc.how_your_information_may_be_used}
          />
        </div>
        <Image
          src="/2.svg"
          width={100}
          height={100}
          alt="image"
          className="absolute -translate-y-[1000px] z-0 w-full h-full"
        />{" "}
      </section>
      <Footer />
    </div>
  );
};

export default Tnc;
