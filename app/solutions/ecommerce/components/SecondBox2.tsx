import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const props = [
  {
    img: "/ecommerce/2.svg",
    title: "Reduce cart abandonment ",
    subtitle: "and boost conversion rates",
    classNames: "flex-row-reverse",
    subpointspheading: "Challenge",
    subpointspdiscription:
      "A substantial number of potential customers abandon their shopping carts before completing a purchase, leading to lost sales and revenue.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI templates",
        subpdiscription:
          "Automate personalized follow-up emails and reminders for abandoned carts.",
      },
      {
        pbolddiscription: "Recommendation engine",
        subpdiscription:
          "Provide tailored product suggestions based on user behavior to encourage purchase completion.",
      },
    ],
    value:
      "Recover lost sales and significantly increase conversion rates by encouraging customers to complete their purchases.",
  },
  {
    img: "/ecommerce/3.svg",
    classNames: "flex-row-reverse",
    title: "Streamline inventory management ",
    subtitle: "and fulfillment",
    subpointspheading: "Challenge",
    subpointspdiscription:
      "Efficiently managing inventory levels and ensuring timely fulfillment are critical to maintaining customer satisfaction and avoiding stock outs or overstock situations.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI workflow builder",
        subpdiscription:
          "Optimize inventory management processes by automating stock level alerts and order fulfillment workflows.",
      },
      {
        pbolddiscription: "Contact intelligence",
        subpdiscription:
          "Maintain up-to-date supplier and logistics contacts for seamless communication and coordination.",
      },
    ],
    value:
      "Improve operational efficiency, reduce costs associated with excess inventory, and enhance customer satisfaction with timely deliveries.",
  },
  {
    classNames: "flex-row-reverse",
    img: "/ecommerce/4.svg",
    title: "Enhance customer service ",
    subtitle: "and response times",
    subpointspheading: "Challenge",
    subpointspdiscription:
      "Providing prompt and effective customer support is essential for maintaining trust and loyalty, yet scaling support operations can be challenging.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI assistant",
        subpdiscription:
          "Offer 24/7 customer support, answering frequently asked questions and providing product information.",
      },
      {
        pbolddiscription: "WhatsApp and Telegram automation",
        subpdiscription:
          "Enable instant customer communication through popular messaging platforms, improving accessibility.",
      },
    ],
    value:
      "Increase customer satisfaction and loyalty by ensuring quick and efficient service, while reducing the operational burden on support teams.",
  },
  {
    classNames: "flex-row-reverse",
    img: "/ecommerce/5.svg", 
    title: "Personalize marketing ",
    subtitle: "and product recommendations",
    subpointspheading: "Challenge",
    subpointspdiscription:
      "Delivering personalized experiences and relevant product recommendations is key to enhancing customer engagement and increasing sales, but it requires sophisticated data analysis and automation.",
    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI Custom GPT",
        subpdiscription:
          "Generate tailored marketing messages and product descriptions based on customer data.",
      },
      {
        pbolddiscription: "Text to Video",
        subpdiscription:
          "Create personalized video content for product promotions, enhancing customer engagement.",
      },
      {
        pbolddiscription: "AI Content Wizard",
        subpdiscription:
          "Streamline content creation for marketing campaigns, ensuring consistency and relevance.",
      },
    ],
    value:
      "Boost customer engagement and conversion rates by providing relevant and timely recommendations that resonate with individual preferences.",
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
    <div className="flex flex-col mt-10 gap-y-10 sm:gap-y-20 w-full items-start mx-auto">
      {props.map((inf, index) => (
        <div
          key={index}
          className="flex flex-col xl:py-24 bg-[#FAFBFC] rounded-[40px] px-10 py-10 max-w-[1520px] xl:w-[1520px] xl:px-40 items-start justify-center sm:max-h-[925px] xl:h-[925px] gap-y-6 h-full w-full mx-auto transition-all duration-300 ease-in-out hover:shadow-2xl"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-y-6 items-center sm:items-start">
            <div className="bg-[#03473714] py-2 px-3.5 flex sm:items-start items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit">
              Customer stories
            </div>
            <div className="flex sm:text-start text-center flex-col gap-y-4">
              <h2 className="font-light text-[26px] xl:text-[40px]">
                <span className="font-bold">{inf.title}</span>
                {inf.subtitle}
              </h2>
            </div>
          </div>

          <div
            className={`flex flex-col sm:${inf.classNames} mt-6 items-center gap-20 w-full justify-between`}
            data-aos="fade-left"
          >
           
              <div className="w-1/2 flex-shrink-0">
                <Image
                  src={inf.img || "/default-image.svg"}
                  width={1400}
                  height={1400}
                  alt="image"
                  className="w-full object-cover"
                />
              </div>
              <div className="w-1/2 max-w-[600px] flex flex-col gap-y-2 items-center sm:items-start">
                <h2
                  className="w-full font-bold text-[16px] text-primary-green xl:text-[20px] sm:text-start text-center sm:text-[18px]"
                  data-aos="fade-right"
                >
                  {inf.subpointspheading}
                </h2>
                <div
                  className="bg-white text-[#034737] rounded-[10px] sm:text-start text-center p-4 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]"
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
                <div className="flex bg-white flex-col" data-aos="fade-up">
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
                    className="bg-white mt-4 rounded-[10px] p-6 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]"
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
