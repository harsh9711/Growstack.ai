  import React from "react";
  import Image from "next/image";
  import Navbar from "@/components/navbar/Navbar";
  import HeroSection from "./components/HeroSection";
  import ContentBox from "./components/Box";
  import { tnc } from "../../privacyPolicy";import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/footer/Footer";

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
          title="Terms of services"
          description="Lorem ipsum dolor sit amet consectetur. Morbi est at odio elementum ornare."
          lastUpdatedDate="28-08-2024"
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
              howYourInformationMayBeUsed={
                tnc.how_your_information_may_be_used
              }
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
