import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Icon11,
  Icon21,
  Icon31,
  Icon41,
  Icon51,
} from "@/components/svgs/icons";

export const cases = [
  {
    id: 1,
    imageUrl: <Icon11 />,
    name: "Tailored AI solutions",
    description: "Custom tools designed to meet retail challenges.",
  },
  {
    id: 2,
    imageUrl: <Icon21 />,
    name: "Comprehensive Platform ",
    description:
      "Integrates content creation, customer engagement, analytics, and automation in one place.",
  },

  {
    id: 3,
    imageUrl: <Icon31 />,
    name: "Scalability",
    description: "Adapts to your business growth without constraints.",
  },
  {
    id: 4,
    imageUrl: <Icon41 />,
    name: "Proven results",
    description:
      "Demonstrated success in driving growth and enhancing customer satisfaction.",
    // buttonclass: "Signup now",
    // link: "/auth/register",
  },
  {
    id: 5,
    imageUrl: <Icon51 />,
    name: "Expert support",
    description:
      "Dedicated team available to maximize your success with our platform.",
    // buttonclass: "Book a demo",
    // link: "/demo",
  },
];
export const cases2 = [
  {
    id: 4,
    imageUrl: <Icon41 />,
    name: "Proven results",
    description:
      "Demonstrated success in driving growth and enhancing customer satisfaction.",
    // buttonclass: "Signup now",
    // link: "/auth/register",
  },
  {
    id: 5,
    imageUrl: <Icon51 />,
    name: "Expert support",
    description:
      "Dedicated team available to maximize your success with our platform.",
    // buttonclass: "Book a demo",
    // link: "/demo",
  },
];
const Box = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",

      offset: 1,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {cases.slice(0, 3).map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="relative text-black bg-white rounded-[20px] hover:shadow-lg p-8 shadow-primary-green text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out max-w-[400px]  max-h-[200px] sm:max-h-[300px] py-20  h-full flex flex-col gap-y-4  justify-center group overflow-hidden"
        >
          <div className="relative z-10 fill-black  group-hover:fill-primary-green">
            {item.imageUrl}
          </div>
          <h2 className="sm:text-[24px] text-[16px] font-bold group-hover:text-[#13745D] transition-colors duration-300">
            {item.name}{" "}
            {/* <span className="sm:text-[24px] text-[16px] font-light group-hover:text-[#13745D] transition-colors duration-300">
              {item.subname}
            </span> */}
          </h2>
          <p className="text-[12px] sm:text-[16px] max-w-[320px] font-light text-black transition-colors duration-300">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};
const Box2 = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",

      offset: 1,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8">
      {cases2.map((item, index) => (
        <div
          key={index + 3}
          data-aos="fade-up"
          className="relative text-black bg-white rounded-[20px] hover:shadow-lg shadow-primary-green p-8 text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out max-w-[580px]  max-h-[250px] sm:max-h-[300px] py-20  h-full flex flex-col gap-y-4  justify-center group overflow-hidden"
        >
          <div className="relative z-10 fill-black  group-hover:fill-primary-green">
            {item.imageUrl}
          </div>
          <h2 className="sm:text-[24px] text-[16px] font-bold group-hover:text-[#13745D] transition-colors duration-300">
            {item.name}{" "}
            {/* <span className="sm:text-[24px] text-[16px] font-light group-hover:text-[#13745D] transition-colors duration-300">
              {item.subname}
            </span> */}
          </h2>
          <p className="text-[12px] sm:text-[16px] max-w-[490px] font-light text-black transition-colors duration-300">
            {item.description}
          </p>
          {/* <Link href={item.link}>
            {" "}
            <button className=" font-medium   transition-transform duration-500  border-primary-green ease-in-out items-center gap-2 text-black  group-hover:text-white 2xl:py-4 2xl:px-7 border bg-white group-hover:bg-primary-green rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
              {item.buttonclass}
            </button>
          </Link> */}
        </div>
      ))}
    </div>
  );
};
const SixCard = () => {
  return (
    <div>
      <div className="max-w-[1340px] flex flex-col sm:items-start items-center gap-y-6 sm:gap-y-8  w-full mx-auto">
        <div
          className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-[#034737] bg-[#03473714]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[12px] font-extrabold">
            Harnessing AI
          </h2>
        </div>
        <div
          className="flex flex-col sm:text-start text-center gap-6 w-full justify-between items-center sm:items-start"
          data-aos="fade-right"
        >
          <h1 className="text-[26px] xl:text-[40px] w-full gap-2 leading-tight font-semibold  text-black">
            Transform your retail
            <span className="font-light"> experience with Growstack</span>
          </h1>
          <div className="flex flex-col gap-y-4">
            {" "}
            <h2 className="font-extrabold sm:text-[28px] text-[16px]">
              Ready to elevate your retail business?
            </h2>
            <p className="sm:text-[18px] text-[16px] font-medium w-full">
              Discover how Growstack's AI-powered solutions can transform your
              operations, enhance customer engagement, and drive growth.
            </p>
          </div>
        </div>
        <div className="bg-[#FAFBFC] flex flex-col sm:items-start items-center gap-y-6 p-6 max-w-[1240px] w-full rounded-[30px] ">
          <h2 className=" font-extrabold sm:text-[28px] text-[16px] ">
            Why choose Growstack?
          </h2>
          <Box /> <Box2 />
        </div>
        {/* <div className="bg-[#FAFBFC] sm:items-start items-center  flex flex-col gap-y-6  p-6 max-w-[1240px] w-full rounded-[30px] ">
         
         
        </div> */}
      </div>
    </div>
  );
};

export default SixCard;
