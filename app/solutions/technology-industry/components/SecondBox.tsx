import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const props = [
  {
    classNaming: "flex-row-reverse",
    img: "/solutions/image1.svg",
    title: "Streamlined project",
    subtitle: "management for dev teams",

    subpointspheading: "Challenge",
    subpointspdiscription:
      "Development teams often juggle multiple projects, requiring seamless coordination and efficient task management.",

    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI Workflow Builder",
        subpdiscription: "Automates workflows and streamlines operations",
      },
      {
        pbolddiscription: "Scheduler",
        subpdiscription:
          "Assigns tasks, tracks progress in real-time, and ensures on-time project delivery with fewer bottlenecks",
      },
    ],
    Subsubsubpoints: [
      {
        heading: "Efficiency",
      },
      {
        heading: "On-time delivery",
      },
    ],
  },
  {
    classNaming: "flex-row",
    img: "/solutions/image2.svg",
    title: "Enhanced cybersecurity ",
    subtitle: "monitoring and response",

    subpointspheading: "Challenge",
    subpointspdiscription:
      "Tech companies face constant cybersecurity threats and need real-time monitoring and threat detection.",

    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "Cyber AI",
        subpdiscription:
          "Delivers actionable security insights and automates threat detection to stay ahead of cyberattacks",
      },
      {
        pbolddiscription: "AI Secured Chat",
        subpdiscription:
          "Enables secure internal communication, protecting sensitive information",
      },
    ],
    Subsubsubpoints: [
      {
        heading: "Proactive threat detection",
      },
      {
        heading: "Information security",
      },
    ],
  },
  {
    classNaming: "flex-row",
    img: "/solutions/image3.svg",
    title: "Seamless CRM",
    subtitle: "integration for sales teams",

    subpointspheading: "Challenge",
    subpointspdiscription:
      "Technology companies struggle with fragmented CRM systems that hamper customer management and sales efforts.",

    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "CRMIntegrator AI",
        subpdiscription:
          "Ensures seamless CRM integration for improved data management",
      },
      {
        pbolddiscription: "Lead Tracking & Follow-ups",
        subpdiscription:
          "Simplifies lead tracking, follow-ups, and customer interactions for sales teams",
      },
    ],
    Subsubsubpoints: [
      {
        heading: "Collaboration",
      },
      {
        heading: "Sales efficiency",
      },
    ],
  },
  // 2nd Addition: Content Creation Challenge
  {
    classNaming: "flex-row-reverse",
    img: "/solutions/image4.svg",
    title: "Content Creation",
    subtitle: "for new tech product launches",

    subpointspheading: "Challenge",
    subpointspdiscription:
      "Launching new tech products requires content creation for websites, marketing, and product documentation.",

    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI Templates",
        subpdiscription: "Automates content creation with pre-built frameworks",
      },
      {
        pbolddiscription: "AI Content Wizard",
        subpdiscription:
          "Quickly generates optimized website copy, marketing materials, and user guides for new products",
      },
    ],
    Subsubsubpoints: [
      {
        heading: "Content optimization",
      },
      {
        heading: "Faster time-to-market",
      },
    ],
  },
  // 3rd Addition: Competitive Advantage Challenge
  {
    classNaming: "flex-row",
    img: "/solutions/image5.svg",
    title: "Market Intelligence",
    subtitle: "and staying competitive in the tech industry",

    subpointspheading: "Challenge",
    subpointspdiscription:
      "Staying competitive in the tech industry requires keeping an eye on emerging trends and market shifts.",

    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI Assistant",
        subpdiscription:
          "Provides real-time insights to support data-driven decision-making",
      },
      {
        pbolddiscription: "AI Custom GPT",
        subpdiscription:
          "Delivers industry research, enabling teams to innovate faster",
      },
    ],
    Subsubsubpoints: [
      {
        heading: "Market intelligence",
      },
      {
        heading: "Faster innovation",
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
              <h2
                className="w-full font-bold text-[16px] xl:text-[20px] sm:text-start text-center sm:text-[18px]"
                data-aos="fade-right"
              >
                {inf.subpointspheading}
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
              </h2>
              <div className="flex flex-col gap-y-4" data-aos="fade-up">
                {inf.Subsubpoints.map((information, index) => (
                  <div
                    className="bg-[#FAFBFC] rounded-[10px] p-6 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]"
                    key={index}
                  >
                    <div className="flex">
                      <h2 className="font-bold">
                        {information.pbolddiscription}:{" "}
                        <span className="font-medium">
                          {information.subpdiscription}
                        </span>
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex mt-4 flex-row max-w-[450px] items-center gap-4 font-medium w-full sm:text-[16px] text-[14px]">
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecondBox;
