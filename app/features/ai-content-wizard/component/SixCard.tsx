import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  CircleIcon1,
  CircleIcon2,
  CircleIcon3,
  CircleIcon4,
  CircleIcon5,
  CircleIcon6,
} from "@/components/svgs/icons";
export const cases = [
  {
    id: 1,
    imageUrl: <CircleIcon1 />,
    name: "Save ",
    subname: "time",
    description: "Automate routine tasks to focus on strategy and big ideas.",
  },
  {
    id: 2,
    imageUrl: <CircleIcon2 />,
    name: "Ignite ",
    subname: "creativity",
    description: "AI-powered suggestions spark fresh content angles and ideas.",
  },

  {
    id: 3,
    imageUrl: <CircleIcon3 />,
    name: "Boost ",
    subname: "productivity",
    description: "Speed up your content journey from concept to completion.",
  },
  {
    id: 4,
    imageUrl: <CircleIcon4 />,
    name: "Versatile ",
    subname: "applications",
    description:
      "Perfect for blogs, marketing, product descriptions, and more.",
  },
  {
    id: 5,
    imageUrl: <CircleIcon5 />,
    name: "Visuals ",
    subname: "included",
    description: "Automatically generate images, making your content ready to publish.",
  },
  {
    id: 6,
    imageUrl: <CircleIcon6 />,
    name: "Scalable ",
    subname: "solutions",
    description:
      "Effortlessly handle projects of any size, from single posts to bulk content creation.",
  },
];
const Box = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
      {cases.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="relative text-black p-8 text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out max-w-[400px] max-h-[258px] py-20  h-full flex flex-col gap-y-4  justify-center group overflow-hidden"
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
          <p className="text-[16px] max-w-[320px] font-light text-black transition-colors duration-300">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

const SixCard = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="max-w-[1340px] flex flex-col sm:items-start items-center gap-y-6 sm:gap-y-16  w-full mx-auto">
        <div
          className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-[#034737] bg-[#03473714]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[12px] font-extrabold">
            BENEFITS
          </h2>
        </div>
        <div
          className="flex flex-col sm:flex-row sm:text-start text-center gap-6 w-full justify-between items-center"
          data-aos="fade-right"
        >
          <h1 className="text-[26px] xl:text-[40px] max-w-[500px] gap-2 leading-tight font-semibold  text-black">
            Why AI content wizard is your
            <span className="font-light"> top Content creation tool </span>
          </h1>
          <p className="sm:text-[18px] text-[16px] font-medium max-w-[600px]">
            Lorem ipsum dolor sit amet consectetur. Nunc enim luctus quis eget
            aliquam. Fusce nunc a nunc pellentesque.
          </p>
        </div>
        <div>
          <Box />
        </div>
      </div>
    </div>
  );
};

export default SixCard;
