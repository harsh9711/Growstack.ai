import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const props = [
  {
    img: "/ecommerce/1.svg",
    title: "Streamlined project",
    subtitle: "management for dev teams",

    subpointspheading: "Challenge",
    subpointspdiscription:
      "Standing out in a saturated market requires significant investment in marketing and customer acquisition strategies, driving up costs and reducing profit margins.",

    subpheading: "Growstack solution",
    Subsubpoints: [
      {
        pbolddiscription: "AI secured chat",
        subpdiscription:
          "Engage potential customers in real-time, ensuring quick responses and increasing conversion chances.",
      },
      {
        pbolddiscription: "Social media AI insights",
        subpdiscription:
          "Gain valuable analytics to refine targeting and optimize marketing spend.",
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

const SecondBox = () => {
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
            className={`flex flex-col sm:flex-row-reverse mt-6 items-end  w-full justify-between`}
            data-aos="fade-left"
          >
            <div data-aos="zoom-in" className="w-full ">
              <Image
                src={inf.img || "/default-image.svg"}
                width={1000} 
                height={1000}
                alt="image"
               
                className="w-full " 
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
              <div className="flex bg-[#FAFBFC] flex-col " data-aos="fade-up">
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
              <div className="flex flex-col " data-aos="fade-up">
                <div
                  className="bg-[#FAFBFC] mt-4 rounded-[10px] p-6 font-medium w-full sm:max-w-[505px] sm:text-[16px] text-[14px]"
                  key={index}
                >
                  <div className="flex">
                    <h2 className="font-bold">
                      Value:{" "}
                      <span className="font-medium">
                        Achieve higher return on investment (ROI) by reaching
                        potential customers more efficiently, resulting in
                        increased sales and improved profit margins.
                      </span>
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

export default SecondBox;
