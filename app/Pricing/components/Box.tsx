import React from "react";
import TickIcon from "./TickIcon";
import DashIcon from "./DashIcon";
import { ContentBoxProps } from "@/types/Box";
import "aos/dist/aos.css";

const ContentBox: React.FC<ContentBoxProps> = ({ sections }) => {
  const allFeatures = sections.flatMap((section) => section.features);

  return (
    <div className="max-w-[1240px] w-full px-4 mx-auto">
      {" "}
      <div className="flex flex-row justify-between text-[20px] font-semibold">
        <h2>Details</h2>
        <span className="flex gap-[211px]">
          <h2>Pro user</h2>
          <h2>Business</h2>
        </span>
      </div>{" "}
      <div className="border-t my-10 border-[#000000]/10"></div>
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="flex flex-col w-full gap-y-8 mt-6"
          data-aos="fade-up"
        >
          <h2 className="font-semibold text-[24px] sm:text-[28px] md:text-[32px]">
            {section.title}
          </h2>
          <div>
            {section.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                data-aos="fade-left"
                data-aos-delay={featureIndex * 100}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between gap-y-4 sm:gap-y-0">
                  <span className="text-[14px] sm:text-[16px] flex flex-col gap-y-2">
                    <h2 className="font-bold text-[18px] sm:text-[20px]">
                      {feature.title}
                    </h2>
                    <p className="text-[#000000]/60 max-w-[500px] w-full">
                      {feature.description}
                    </p>
                  </span>
                  <span className="flex flex-row mr-6 items-center  gap-[280px]">
                    {feature.hasDash && <DashIcon />}
                    {feature.tickCount &&
                      Array.from({ length: feature.tickCount }, (_, i) => (
                        <TickIcon key={i} />
                      ))}
                  </span>
                </div>

                {allFeatures.indexOf(feature) < allFeatures.length - 1 && (
                  <div className="border-b mt-4 mb-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentBox;
