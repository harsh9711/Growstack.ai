import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { Icon1011, Icon311, Icon911 } from "@/components/svgs/icons";
import ArrowRight from "@/components/home/drag-features/icons/ArrowRight";
import Link from "next/link";
import "../../../../styles/animate.css";
export const cases = [
  {
    id: 1,
    imageUrl: <Icon311 />,
    name: "Tailored experience",
    background: "bg-[#E7F4FF]",
    description:
      "Get a demo customized to your specific needs and challenges in the media industry.",
  },
  {
    id: 2,
    imageUrl: <Icon911 />,
    name: "Live Q&A",
    background: "bg-[#FEF6D4]",

    subname: "real-time",
    description:
      "Ask questions in real-time and get insights on how Growstack can benefit your organization.",
  },
  {
    id: 3,
    imageUrl: <Icon1011 />,
    name: "Explore features",
    background: "bg-[#FAE8F1]",

    description:
      "Discover how to leverage our tools, including AI Custom GPT, Content Calendar, and more.",
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
    <div className="flex flex-col gap-8">
      {cases.slice(0, 3).map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className={`relative text-black ${item.background} rounded-[20px] hover:shadow-lg p-4 text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out  w-full max-w-[610px] border-2   max-h-[200px] sm:max-h-[252px] h-full flex flex-col gap-y-2  justify-center group overflow-hidden`}
        >
          <div className="relative z-10 fill-black  group-hover:fill-primary-green">
            {item.imageUrl}
          </div>
          <h2 className="sm:text-[16px] text-[12px] font-bold group-hover:text-[#13745D] transition-colors duration-300">
            {item.name}{" "}
            <span className="sm:text-[24px] text-[16px] font-light group-hover:text-[#13745D] transition-colors duration-300">
              {item.subname}
            </span>
          </h2>
          <p className="text-[12px] sm:text-[16px] w-full font-light text-black transition-colors duration-300">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

const ButtonCard = () => {
  return (
    <div>
      <div className="max-w-[1340px] flex flex-col sm:items-start items-center gap-y-6 sm:gap-y-8  w-full mx-auto">
        <Image
          className="absolute z-0 left-40"
          src="/girldesign.svg"
          width={1000}
          height={1000}
          alt={"girlgrowstack"}
        />{" "}
        <div className=" flex flex-row  items-center gap-y-6 p-6 max-w-[1240px] w-full rounded-[30px] ">
          <div>
            <Image
              className="rocketUpAnimation relative z-20 "
              src="/girlgrowstack.svg"
              width={400}
              height={700}
              alt={"girlgrowstack"}
            />{" "}
            <Image
              className="absolute -translate-y-[600px] z-0 left-80"
              src="/greenwhite2.svg"
              width={450}
              height={450}
              alt={"girlgrowstack"}
            />{" "}
            <Image
              className="relative motionrolling  z-40 -translate-y-96"
              src="/fan.svg"
              width={200}
              height={200}
              alt={"girlgrowstack"}
            />{" "}
          </div>
          <Box />
        </div>
      </div>
    </div>
  );
};

export default ButtonCard;
