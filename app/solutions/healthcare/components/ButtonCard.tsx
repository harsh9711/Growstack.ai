import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { Icon1011, Icon311, Icon911 } from "@/components/svgs/icons";
import ArrowRight from "@/components/home/drag-features/icons/ArrowRight";
import Link from "next/link";

export const cases = [
  {
    id: 1,
    imageUrl: <Icon311 />,
    name: "Tailored experience",
    description:
      "Get a demo customized to your specific needs and challenges in the media industry.",
  },
  {
    id: 2,
    imageUrl: <Icon911 />,
    name: "Live Q&A",
    subname: "real-time",
    description:
      "Ask questions in real-time and get insights on how Growstack can benefit your organization.",
  },
  {
    id: 3,
    imageUrl: <Icon1011 />,
    name: "Explore features",
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
          className="relative text-black bg-white rounded-[20px] hover:shadow-lg p-4 text-center sm:text-start items-center sm:items-start  transition-transform duration-500 ease-in-out  w-full max-w-[610px] border-2   max-h-[200px] sm:max-h-[252px] py-20  h-full flex flex-col gap-y-2  justify-center group overflow-hidden"
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

          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="flex flex-row items-center justify-center sm:items-start sm:justify-start gap-8 group text-[12px] 2xl:text-[18px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300"
          >
            <Link href="/demo" className="no-underline">
              <button className="font-medium flex items-center gap-2 text-primary-green 2xl:py-4 2xl:px-7 border border-primary-green rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                See Demo
                <ArrowRight className="text-primary-green" />
              </button>
            </Link>
          </div>
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
              src="/girlgrowstack.svg"
              width={400}
              height={700}
              alt={"girlgrowstack"}
            />
          </div>
          <Box />
        </div>
      </div>
    </div>
  );
};

export default ButtonCard;
