import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SecondLastCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out",
      offset: 1,
    });
    AOS.refresh();
  }, []);

  return (
    <div
      className="max-w-[1760px] pb-40 pt-10 sm:pb-0 sm:py-20 flex flex-col items-center gap-y-8 justify-center rounded-[60px] mx-auto w-full xl:max-h-[1264px] h-full bg-[#F4F4F4]"
      data-aos="flip-left" // Rotate the whole green container first
      data-aos-duration="1500" // Rotation duration
    >
      <div className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-black bg-[#03473714]">
        <h2 className="text-center capitalize text-[10px]">BENEFITS</h2>
      </div>
      <div>
        <h1 className="text-[26px] xl:text-[40px] flex flex-col  leading-tight text-center text-black">
          <span className="font-semibold">
            How AI content wizard outperforms
          </span>

          <span className="font-light">the competition </span>
        </h1>
      </div>

      <div className="max-w-[400px] pb-32   sm:max-w-[1000px]  sm:mt-10  w-full">
        {/* First Column */}

        <div className="flex flex-row  ">
          <div className=" flex flex-col h-full gap-y-10">
            <div>
              <h2 className="opacity-0 text-primary-green text-[10px] font-bold sm:text-[28px] pt-8">
                AI{" "}
              </h2>
            </div>
            <div className="space-y-4">
              {[
                "Content creation",
                "AI models",
                "Integrated Workflow",
                "Customizable Outlines",
                "Image Generation",
                "Task Automation",
                "Speed of Execution",
                "Multilingual  Support ",
                "Personalization ",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-[#03473714] " : "bg-[#FFFFFF14]"
                  } text-[10px] sm:text-[16px] p-4  max-h-20 h-full  rounded-l-2xl font-medium text-center  sm:text-start max-w-[400px] w-full `}
                >
                  <h2 className="">{item}</h2>
                </div>
              ))}
            </div>
          </div>

          <div className="items-center flex flex-col bg-[#D2F1E6] h-full rounded-l-2xl gap-y-10">
            <div>
              <h2 className="text-primary-green text-[10px] font-bold sm:text-[28px] pt-8">
                AI Content Wizard
              </h2>
            </div>
            <div className="space-y-4">
              {[
                "Streamlined process for text and images",
                "Choose various advanced models",
                "Idea generation, publication all in one",
                "Flexible structures to match style,   tone",
                "Create visuals directly in the platform",
                "Eliminates manual tasks",
                "Accelerated from start to finish",
                "Generate  content in multiple languages",
                "High level of customization and adaptability",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-[#03473714]" : "bg-[#FFFFFF14]"
                  } text-[10px] sm:text-[16px] p-4 ${
                    idx === 8
                      ? "pb-36 sm:pb-10 rounded-bl-xl  bg-[#03473714]"
                      : ""
                  } font-medium text-center max-h-20 h-full  max-w-[400px] w-full `}
                >
                  <h2>{item}</h2>
                </div>
              ))}
            </div>
          </div>
          <div className="items-center flex flex-col bg-[#E7E7E7] h-full rounded-r-2xl gap-y-10">
            <div>
              <h2 className="text-primary-green text-[10px] font-bold sm:text-[28px] pt-8">
                Competitors
              </h2>
            </div>
            <div className="space-y-4">
              {[
                "Unlinked features",
                "Limited model selection",
                "Requires multiple tools for each step",
                "Limited outline customization",
                "Separate tools for images and content",
                "Requires copying outputs between  tools",
                "Slower, due to disconnected tools",
                "Limited or no multilingual features ",
                "Lacks comprehensive customization options",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "bg-[#03473714]" : "bg-[#FFFFFF14]"
                  } text-[10px] sm:text-[16px] p-4 ${
                    idx === 8 ? "pb-36 sm:pb-10  bg-[#03473714]" : ""
                  } font-medium text-center max-h-20 h-full rounded-r-2xl max-w-[400px] w-full `}
                >
                  <h2>{item}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondLastCard;
