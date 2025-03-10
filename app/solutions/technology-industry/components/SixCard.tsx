import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
} from "@/components/svgs/icons";
import ArrowRight from "@/components/home/drag-features/icons/ArrowRight";
import Link from "next/link";

export const cases = [
  {
    id: 1,
    imageUrl: <Icon1 />,
    name: "Innovative solutions",
    description:
      "Tailored AI tools designed to meet the unique needs of technology businesses.",
  },
  {
    id: 2,
    imageUrl: <Icon2 />,
    name: "Enhanced productivity ",
    subname: "creativity",
    description:
      "Streamlined processes that free up your team's time for what truly matters—innovation.",
  },

  {
    id: 3,
    imageUrl: <Icon3 />,
    name: "Robust security",
    description:
      "Protect your data and ensure compliance with industry standards.",
  },
  {
    id: 4,
    imageUrl: <Icon4 />,
    name: "Start your free Trial",
    description:
      "Experience the power of Growstack firsthand with our free trial.",
    buttonclass: "Signup now",
    link: "/auth/register",
  },
  {
    id: 5,
    imageUrl: <Icon5 />,
    name: "Request a demo",
    description: "See how Growstack can transform your operations with a demo.",
    buttonclass: "Book a demo",
    link: "/demo",
  },
  {
    id: 6,
    imageUrl: <Icon6 />,
    name: "Contact us",
    description:
      "Have questions or need more information? Reach out to our team!",
    buttonclass: "Contact us",
    link: "/contact",
  },
];
export const cases2 = [
  {
    id: 4,
    imageUrl: <Icon4 />,
    name: "Start your free Trial",
    description:
      "Experience the power of Growstack firsthand with our free trial.",
    buttonclass: "Signup now",
    link: "/auth/register",
  },
  {
    id: 5,
    imageUrl: <Icon5 />,
    name: "Request a demo",
    description: "See how Growstack can transform your operations with a demo.",
    buttonclass: "Book a demo",
    link: "/demo",
  },
  {
    id: 6,
    imageUrl: <Icon6 />,
    name: "Contact us",
    description:
      "Have questions or need more information? Reach out to our team!",
    buttonclass: "Contact us",
    link: "/contact",
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
          className="relative text-black bg-white rounded-[20px] hover:shadow-lg p-8 text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out max-w-[400px]  max-h-[200px] sm:max-h-[300px] py-20  h-full flex flex-col gap-y-4  justify-center group overflow-hidden"
        >
          <div className="relative z-10 fill-black  group-hover:fill-primary-green">
            {item.imageUrl}
          </div>
          <h2 className="sm:text-[24px] text-[16px] font-bold group-hover:text-[#13745D] transition-colors duration-300">
            {item.name}{" "}
            <span className="sm:text-[24px] text-[16px] font-light group-hover:text-[#13745D] transition-colors duration-300">
              {item.subname}
            </span>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {cases2.map((item, index) => (
        <div
          key={index + 3}
          data-aos="fade-up"
          className="relative text-black bg-white rounded-[20px] hover:shadow-lg p-8 text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out max-w-[400px]  max-h-[250px] sm:max-h-[300px] py-20  h-full flex flex-col gap-y-4  justify-center group overflow-hidden"
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
          <Link href={item.link}>
            {" "}
            <button className=" font-medium   transition-transform duration-500  border-primary-green ease-in-out items-center gap-2 text-black  group-hover:text-white 2xl:py-4 2xl:px-7 border bg-white group-hover:bg-primary-green rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
              {item.buttonclass}
            </button>
          </Link>
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
            Transform your technology
            <span className="font-light"> business today! </span>
          </h1>
          <p className="sm:text-[18px] text-[16px] font-medium w-full">
            Are you ready to overcome challenges and unlock the full potential
            of your tech operations? Growstack is here to provide you with the
            AI-powered tools and insights you need to thrive in a competitive
            landscape.
          </p>
        </div>
        <div className="bg-[#FAFBFC] flex flex-col sm:items-start items-center gap-y-6 p-6 max-w-[1240px] w-full rounded-[30px] ">
          <h2 className=" font-extrabold sm:text-[28px] text-[16px] ">
            Why choose Growstack?
          </h2>
          <Box />
        </div>
        <div className="bg-[#FAFBFC] sm:items-start items-center  flex flex-col gap-y-6  p-6 max-w-[1240px] w-full rounded-[30px] ">
          <h2 className=" font-extrabold sm:text-[28px] text-[16px] ">
            Explore your options
          </h2>{" "}
          <Box2 />
        </div>
      </div>
    </div>
  );
};

export default SixCard;
