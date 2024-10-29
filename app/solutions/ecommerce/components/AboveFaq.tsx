import Image from "next/image";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsDot } from "react-icons/bs";
import Link from "next/link";
import  "../../../../styles/animate.css";

const props = [
  {
    img: "/girlspecs.svg",
    title: "Schedule",
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
  },
];

const AboveFaq = () => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
    });
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500); // Reset animation after 500ms
  };

  return (
    <div className="flex flex-col gap-y-16 sm:gap-y-32 max-w-[1287px] w-full items-center mx-auto">
      {props.map((inf, index) => (
        <div key={index} className="flex flex-col max-w-[1287px] w-full mx-auto" data-aos="fade-up">
          <div className="flex flex-col sm:flex-row-reverse mt-6 gap-16 items-center w-full justify-between" data-aos="fade-left">
            <div data-aos="zoom-in" className="w-full flex flex-col items-end">
              <Link href="/demo">
                <button onClick={handleClick} className={isClicked ? "animateScaleup" : ""}>
                  <Image
                    src="/stories.svg"
                    width={150}
                    height={155}
                    alt="image"
                    className="rounded-lg"
                  />
                </button>
              </Link>
              <Image
                src={inf.img || "/default-image.svg"}
                width={700}
                height={650}
                alt="image"
                className="w-full rounded-lg"
              />
            </div>
            <div className="w-full flex flex-col gap-y-10 items-center sm:items-start">
              <div className="bg-[#FFFFFF] border-[#E4E4E4] max-w-[600px] rounded-[20px] py-8 flex flex-col gap-y-4 shadow-md">
                <div className="bg-primary-green py-2 px-6 rounded-r-full max-w-fit">
                  <h2 className="w-full text-white font-bold text-[16px] sm:text-[20px] text-center sm:text-left" data-aos="fade-right">
                    {inf.subpointspheading}
                  </h2>
                </div>
                <div className="text-[#034737] text-[16px] px-8 sm:text-[18px] font-medium text-center sm:text-left" data-aos="fade-up">
                  <p>{inf.subpointspdiscription}</p>
                </div>
              </div>
              <div className="py-8 bg-[#FFFFFF] border-[#E4E4E4] max-w-[600px] rounded-[20px] shadow-md">
                <div className="bg-primary-green py-2 px-6 rounded-r-full max-w-fit">
                  <h2 className="w-full font-bold text-white text-[18px] xl:text-[20px] sm:text-[18px] text-center sm:text-left" data-aos="fade-right">
                    {inf.subpheading}
                  </h2>
                </div>
                <div className="flex px-8 flex-col gap-y-4 mt-4" data-aos="fade-up">
                  {inf.Subsubpoints.map((information, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[16px] sm:text-[18px] font-medium text-[#034737]">
                      <BsDot className="text-primary-green mt-1 text-2xl" />
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
