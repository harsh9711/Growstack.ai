import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const props = [
  {
    img: "/media/a1.svg",
    color: "#ffffff",
    title: "Streamline ",
    subtitle: "content production",
    classNames: "flex-row",
    subpointspheading: "Challenge",
    subpointspdiscription:
      "A substantial number of potential customers abandon their shopping carts before completing a purchase, leading to lost sales and revenue.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI Workflow Builder, Text to Avatar, Text to Video",
        subpdiscription:
          "Growstack's AI Workflow Builder automates content production stages, from ideation to publishing. With Text to Avatar and Text to Video features, teams can quickly convert written content into engaging video formats and avatar-led presentations, reducing manual intervention and speeding up the process.",
      },
    ],
    value:
      "Recover lost sales and significantly increase conversion rates by encouraging customers to complete their purchases.",
  },
  {
    img: "/media/a2.svg",
    color: "#FAFBFC",
    classNames: "flex-row-reverse",
    title: "Personalize ",
    subtitle: "audience engagement",
    subpointspheading: "Challenge",
    subpointspdiscription:
      "Media organizations find it difficult to tailor content to individual user preferences across multiple platforms such as Instagram, Facebook, Twitter (X), LinkedIn, TikTok, and Telegram.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "Recommendation Engine & Social Media AI Insights",
        subpdiscription:
          "Growstack’s Recommendation Engine and AI Insights analyze user behavior to deliver personalized content recommendations and engagement strategies.",
      },
    ],
    value:
      "Higher audience engagement, improved user retention, and deeper insights into audience preferences.",
  },

  {
    img: "/media/a3.svg",
    color: "fFfffff",
    classNames: "flex-row",
    title: "Personalize ",
    subtitle: "audience engagement",
    subpointspheading: "Challenge",
    subpointspdiscription:
      "Managing content distribution across different platforms is complex, leading to inconsistent posting schedules and reduced visibility.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "Scheduler & Content Calendar",
        subpdiscription:
          "Growstack's Scheduler and Content Calendar allow for automated, multi-platform posting with a unified view of all scheduled content.",
      },
    ],
    value:
      "Improved content visibility, consistent scheduling, and efficient multi-channel distribution.",
  },
  {
    img: "/media/a4.svg",
    color: "#FAFBFC",
    classNames: "flex-row-reverse",
    title: "Personalize ",
    subtitle: " audience engagement",
    subpointspheading: "Challenge",
    subpointspdiscription:
      "Media companies struggle to make sense of the vast amounts of data available for driving content and marketing strategies.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "Social Media Analytics & AI Insights",
        subpdiscription:
          " Growstack's Recommendation Engine and AI Insights analyze user behavior to deliver personalized content recommendations and engagement strategies.",
      },
    ],
    value:
      "Data-driven content strategies, optimized marketing efforts, and improved ROI..",
  },
  {
    img: "/media/a5.svg",
    color: "#ffffff",
    classNames: "flex-row",
    title: "Monetize ",
    subtitle: "and maximize revenue",
    impressions: {
      value: "16,942",
      percentage: "+8.5%",
    },
    subpointspheading: "Challenge",
    subpointspdiscription:
      "Identifying and implementing effective monetization strategies in a competitive media landscape can be challenging.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI Assistants, AI Custom GPT",
        subpdiscription:
          " Growstack's AI Assistants streamline ad management, campaign optimization, and content strategies. AI Custom GPT enables personalized content creation and dynamic ad generation tailored to specific audience segments, enhancing the impact of targeted advertising.",
      },
    ],
    value:
      "Increased ad revenue, more effective content monetization strategies, personalized user experiences, and improved overall financial performance.",
    output: {
      action: "Click to add outputs",
    },
  },
];

const SecondBox2 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="flex flex-col mt-10 gap-y-10 sm:gap-y-52 w-full items-start mx-auto">
      {props.map((inf, index) => (
        <div
          key={index}
          className="flex flex-col rounded-[40px] max-w-[1280px] xl:w-[1280px] items-start justify-center sm:max-h-[600px] xl:h-[600px] gap-y-4   h-full w-full mx-auto  "
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-y-6 items-center sm:items-start">
            <div className="flex sm:text-start text-center flex-col gap-y-4">
              <h2 className="font-light text-[26px] xl:text-[40px]">
                <span className="font-bold">{inf.title}</span>
                {inf.subtitle}
              </h2>
            </div>
          </div>

          <div
            className={`flex flex-col sm:${inf.classNames} mt-6 items-center gap-x-20  w-full justify-between`}
            data-aos="fade-left"
          >
            <div className="w-full h-full ">
              <Image
                src={inf.img || "/default-image.svg"}
                width={1400}
                height={1400}
                alt="image"
                className="w-full h-full"
              />
            </div>
            <div className="w-3/4 max-w-[600px] flex flex-col gap-y-2 items-center sm:items-start">
              <h2
                className="w-full font-bold text-[16px] text-primary-green xl:text-[20px] sm:text-start text-center sm:text-[18px]"
                data-aos="fade-right"
              >
                {inf.subpointspheading}
              </h2>
              <div
                className={`bg-[${inf.color}] border shadow-lg  rounded-[10px] text-[#034737]  sm:text-start text-center p-4 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]`}
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
              <div
                className={`flex  bg-[${inf.color}]  border  rounded-[10px]  flex-col shadow-lg`}
                data-aos="fade-up"
              >
                {inf.Subsubpoints.map((information, index) => (
                  <div
                    className="rounded-[10px] p-6 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]"
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
              <div className="flex flex-col" data-aos="fade-up">
                <div
                  className={`  bg-[${inf.color}]  border  shadow-lg rounded-[10px] mt-4  p-6 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]`}
                  key={index}
                >
                  <div className="flex">
                    <h2 className="font-bold">
                      Value: <span className="font-medium">{inf.value}</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecondBox2;
