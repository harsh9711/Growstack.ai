import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { BsCheckCircle } from "react-icons/bs"; // Import an icon for bullet points

const props = [
  {
    img: "/stories.svg",
    title: "Schedule ",
    subtitle: "a personalized demo",

    subpointspheading: "Get tailored insights",
    subpointspdiscription:
      "Want to see Growstack in action? Schedule a personalized demo with one of our experts.",

    subpheading: "What to expect",
    Subsubpoints: [
      {
        pbolddiscription: "",
        subpdiscription:
          "A comprehensive walkthrough of Growstack's features tailored to your eCommerce needs.",
      },
      {
        pbolddiscription: "",
        subpdiscription:
          "In-depth discussions about your business challenges and how Growstack can address them.",
      },
      {
        pbolddiscription: "",
        subpdiscription:
          "Q&A session to answer any specific questions you may have about the platform.",
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
];

const AboveFaq = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="flex flex-col mt-10 gap-y-16 sm:gap-y-32 max-w-[1287px] w-full items-center mx-auto">
      {props.map((inf, index) => (
        <div
          key={index}
          className="flex flex-col max-w-[1287px] w-full mx-auto"
          data-aos="fade-up"
        >
          <div
            className="flex flex-col sm:flex-row-reverse mt-6 gap-16 items-center w-full justify-between"
            data-aos="fade-left"
          >
            <div data-aos="zoom-in" className="w-full ">
              <Image
                src={inf.img || "/default-image.svg"}
                width={560}
                height={450}
                alt="image"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full flex flex-col gap-y-10 items-center sm:items-start">
              <div className="bg-[#FAFBFC] max-w-[600px] rounded-[20px] p-8 flex flex-col gap-y-4 shadow-md">
                <h2
                  className="w-full text-primary-green font-bold text-[18px] sm:text-[20px] xl:text-[22px] text-center sm:text-left"
                  data-aos="fade-right"
                >
                  {inf.subpointspheading}
                </h2>
                <div
                  className="text-[#034737] text-[16px] sm:text-[18px] font-medium text-center sm:text-left"
                  data-aos="fade-up"
                >
                  <p>{inf.subpointspdiscription}</p>
                </div>
              </div>

              <div className="p-6 bg-[#FAFBFC] max-w-[600px] rounded-[20px] shadow-md">
                <h2
                  className="mt-2 w-full font-bold text-[#034737] text-[18px] xl:text-[20px] sm:text-[18px] text-center sm:text-left"
                  data-aos="fade-right"
                >
                  {inf.subpheading}
                </h2>
                <div
                  className="flex flex-col gap-y-4 mt-4"
                  data-aos="fade-up"
                >
                  {inf.Subsubpoints.map((information, index) => (
                    <div
                      className="flex items-start gap-2 text-[16px] sm:text-[18px] font-medium text-[#034737]"
                      key={index}
                    >
                      <BsCheckCircle className="text-green-500 mt-1" />
                      <span>{information.subpdiscription}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboveFaq;
