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
      duration: 800,
      easing: "ease-in-out",
      offset: 50,
    });
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
    <div className="flex justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1340px] flex flex-col items-center gap-y-8 w-full">
        <Image
          className="absolute z-0 left-40 w-[50%] h-auto max-w-[500px]"
          src="/girldesign.svg"
          width={1000}
          height={1000}
          alt="Illustration of a girl representing Growstack"
          data-aos="fade-right"
          data-aos-delay="100"
        />
        <div className="flex flex-col sm:flex-row items-center gap-y-6 p-8 max-w-[1240px] w-full rounded-[30px]">
          <div className="relative hidden sm:flex items-center justify-center right-40">
            <Image
              className=" relative z-20 w-[90%] left-48 sm:w-[400px] h-auto"
              src="/girlgrowstack.svg"
              width={400}
              height={700}
              alt="Illustration of a girl with rocket animation"
              data-aos="fade-up"
              data-aos-delay="600"
            />
            <Image
              className="absolute z-10 left-0 sm:left-20 top-20 w-[80%] sm:w-[450px] h-auto"
              src="/greenwhite2.svg"
              width={450}
              height={450}
              alt="Background graphic with green and white theme"
              data-aos="fade-up"
              data-aos-delay="300"
            />
            <Image
              className="motionrolling absolute z-40 top-0 left-0 sm:left-24 sm:top-44 w-[40%] sm:w-[200px] h-auto"
              src="/fan.svg"
              width={200}
              height={200}
              alt="Rotating fan animation"
              data-aos="fade-up"
              data-aos-delay="400"
            />
            <Image
              className="absolute z-40 top-20 left-20 sm:left-44 sm:top-60 w-[20%] sm:w-[50px] h-auto"
              src="/logooffan.svg"
              width={50}
              height={50}
              alt="Fan logo with rotation animation"
              data-aos="fade-up"
              data-aos-delay="500"
            />
          </div>
          <Box />
        </div>
      </div>
    </div>
  );
};

export default ButtonCard;
