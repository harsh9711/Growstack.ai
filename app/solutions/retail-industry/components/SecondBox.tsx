import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const props = [
  {
    classNaming: "flex-row-reverse",
    img: "/retail/1.png",
    title: "Digital presence",
    subtitle: " & content management",
    Subpoints: [
      {
        subpointspheading: "Challenge",
        subpointspdiscription:
          "Difficulty maintaining consistency across multiple social media platforms and e-commerce sites while producing engaging content.",
      },
      {
        subpointspheading: "Growstack solution",
        subpointspdiscription:
          "Utilize AI Content Wizard and Social Media Automation tools to streamline content creation and manage digital presence.",
      },
      {
        subpointspheading: "Value generated",
        subpointspdiscription:
          "Enhanced brand visibility and engagement through timely, high-quality content across all channels.",
      },
    ],
  },
  {
    classNaming: "flex-row",
    img: "/retail/2.png",
    title: "Personalized engagement",
    subtitle: " & communication",
    Subpoints: [
      {
        subpointspheading: "Challenge",
        subpointspdiscription:
          "Struggling to deliver tailored customer experiences and maintain consistent communication across various platforms.",
      },
      {
        subpointspheading: "Growstack solution",
        subpointspdiscription:
          "Implement AI Assistant for automated customer interactions and AI Custom GPT for personalized messaging.",
      },
      {
        subpointspheading: "Value generated",
        subpointspdiscription:
          "Improved customer satisfaction and loyalty through personalized, real-time engagement.",
      },
    ],
  },
  {
    classNaming: "flex-row-reverse",
    img: "/retail/3.png",
    title: "Data utilization",
    subtitle: " for decision-making",
    Subpoints: [
      {
        subpointspheading: "Challenge",
        subpointspdiscription:
          "Difficulty extracting actionable insights from customer and sales data while tracking social media performance.",
      },
      {
        subpointspheading: "Growstack solution",
        subpointspdiscription:
          "Leverage AI Analytics and Social Media Insights to gather and analyze data effectively.",
      },
      {
        subpointspheading: "Value generated",
        subpointspdiscription:
          "Empowered decision-making based on data-driven insights, leading to targeted marketing strategies.",
      },
    ],
  },
  {
    classNaming: "flex-row",
    img: "/retail/4.png",
    title: "Workflow ",
    subtitle: "automation",
    Subpoints: [
      {
        subpointspheading: "Challenge",
        subpointspdiscription:
          "Manual processes in order management and customer support slow down operational efficiency.",
      },
      {
        subpointspheading: "Growstack solution",
        subpointspdiscription:
          "Use AI Workflow Builder to automate repetitive tasks and streamline processes.",
      },
      {
        subpointspheading: "Value generated",
        subpointspdiscription:
          "Increased operational efficiency and reduced response times, enabling staff to focus on higher-value tasks.",
      },
    ],
  },
];

const SecondBox = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="flex flex-col mt-10 sm:mt-20 gap-y-16 sm:gap-y-32 max-w-[1287px] w-full items-center mx-auto">
      {props.map((inf, index) => (
        <div
          key={index}
          className="flex flex-col max-w-[1287px] w-full mx-auto"
          data-aos="fade-up"
        >
          <h2
            className="w-full font-light text-[20px] xl:text-[36px] sm:text-[24px] text-center sm:text-left"
            data-aos="fade-right"
          >
            <span className="font-bold">{inf.title} </span> {inf.subtitle}
          </h2>
          <div
            className={`flex flex-col sm:flex-row mt-6 sm:mt-16 ${inf.classNaming} gap-6 sm:gap-10 w-full justify-between`}
            data-aos="fade-left"
          >
            <div data-aos="zoom-in" className="w-full sm:w-auto">
              <Image
                src={inf.img || "/default-image.svg"}
                width={720}
                height={500}
                alt="image"
                className="w-full sm:max-w-[720px]"
              />
            </div>
            <div className="max-w-[600px] w-full flex flex-col gap-y-2 items-center sm:items-start">
              {/* <h2
                className="w-full font-bold text-[16px] xl:text-[20px] sm:text-start text-center sm:text-[18px]"
                data-aos="fade-right"
              >
                {inf.}
              </h2>
              <div
                className="bg-[#FAFBFC] text-[#034737] rounded-[10px] sm:text-start text-center p-4 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]"
                data-aos="fade-up"
              >
                <p>{inf.subpointspdiscription}</p>
              </div>
              <h2
                className="mt-2 w-full font-bold text-[#034737] sm:text-start text-center text-[16px] xl:text-[20px] sm:text-[18px]"
                data-aos="fade-right"
              >
                {inf.subpheading}
              </h2> */}
              <div className="flex flex-col gap-y-4" data-aos="fade-up">
                {inf.Subpoints.map((information, index) => (
                  <div
                    className="bg-[#FAFBFC] rounded-[10px] p-6 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]"
                    key={index}
                  >
                    <div className="flex">
                      <h2 className="font-bold">
                        {information.subpointspheading}:{" "}
                        <span className="font-medium">
                          {information.subpointspdiscription}
                        </span>
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="flex mt-4 flex-row max-w-[450px] items-center gap-4 font-medium w-full sm:text-[16px] text-[14px]">
                {inf.Subsubsubpoints.map((information, index) => (
                  <div
                    className="bg-[#03473714] flex items-center justify-center w-full rounded-[20px] p-2"
                    key={index}
                  >
                    <h2 className="font-bold flex items-center">
                      {information.heading}
                    </h2>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecondBox;
