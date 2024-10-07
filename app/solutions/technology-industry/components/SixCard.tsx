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

export const cases = [
  {
    id: 1,
    imageUrl: <Icon1 />,
    name: "Save ",
    subname: "time",
    description: "Automate routine tasks to focus on strategy and big ideas.",
  },
  {
    id: 2,
    imageUrl: <Icon2 />,
    name: "Ignite ",
    subname: "creativity",
    description: "AI-powered suggestions spark fresh content angles and ideas.",
  },

  {
    id: 3,
    imageUrl: <Icon3 />,
    name: "Boost ",
    subname: "productivity",
    description: "Speed up your content journey from concept to completion.",
  },
  {
    id: 4,
    imageUrl: <Icon4 />,
    name: "Versatile ",
    subname: "applications",
    description:
      "Perfect for blogs, marketing, product descriptions, and more.",
  },
  {
    id: 5,
    imageUrl: <Icon5 />,
    name: "Visuals ",
    subname: "included",
    description:
      "Automatically generate images, making your content ready to publish.",
  },
  {
    id: 6,
    imageUrl: <Icon6 />,
    name: "Scalable ",
    subname: "solutions",
    description:
      "Effortlessly handle projects of any size, from single posts to bulk content creation.",
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
      {cases.slice(0,3).map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="relative text-black bg-white rounded-[20px] hover:shadow-lg p-8 text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out max-w-[400px] max-h-[300px] py-20  h-full flex flex-col gap-y-4  justify-center group overflow-hidden"
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
          <button className=" font-medium group-hover:flex hidden  transition-transform duration-500 ease-in-out items-center gap-2 text-white 2xl:py-4 2xl:px-7 border bg-primary-green border-white  rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
            Signup now
            <ArrowRight className="text-white" />
          </button>
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
      {cases.slice(3,6).map((item, index) => (
        <div
          key={index +3}
          data-aos="fade-up"
          className="relative text-black bg-white rounded-[20px] hover:shadow-lg p-8 text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out max-w-[400px] max-h-[300px] py-20  h-full flex flex-col gap-y-4  justify-center group overflow-hidden"
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
          <button className=" font-medium group-hover:flex hidden  transition-transform duration-500 ease-in-out items-center gap-2 text-white 2xl:py-4 2xl:px-7 border bg-primary-green border-white  rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
            Signup now
            <ArrowRight className="text-white" />
          </button>
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
        <div className="bg-[#FAFBFC] flex flex-col gap-y-6 p-6 max-w-[1240px] w-full rounded-[30px] ">
          <h2 className=" font-extrabold sm:text-[28px] text-[16px] ">Why choose Growstack?</h2>
          <Box />
        </div>
        <div className="bg-[#FAFBFC] flex flex-col gap-y-6  p-6 max-w-[1240px] w-full rounded-[30px] ">
          <h2 className=" font-extrabold sm:text-[28px] text-[16px] ">Explore your options</h2> <Box2 />
        </div>
      </div>
    </div>
  );
};

export default SixCard;
