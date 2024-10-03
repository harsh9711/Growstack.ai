import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { HandsIcon, Magnifying, PieChart, UIcon, Worldicon, Worldicon2, Zoomicon ,BoxIcon, DiamondIcon} from "@/components/svgs/icons";
export const cases = [
  {
    id: 1,
    imageUrl: <UIcon />,
    name: "Effective lead ",
    subname: "generation",
    description:
      "Identify and capture high-value prospects with precise business data to build targeted lead lists.",
  },
  {
    id: 2,
    imageUrl: <Zoomicon/>,
    name: "In-depth market ",
    subname: "research",
    description:
      "Analyze market trends and competitive landscapes to make informed strategic decisions.",
  },

  {
    id: 3,
    imageUrl: <Worldicon/>,
    name: "Workflow automation and scheduling",
    role: "Automate tasks and streamline workflows with AI Workflows, scheduling and managing campaigns seamlessly for timely content distribution.",
    companyImage: "No doubt, Spend.In is the best!",
  },
  {
    id: 4,
    imageUrl: <Worldicon2/>,
    name: "Local business ",
    subname: "expansion",
    description:
      "Explore potential locations for expansion by assessing local business data and market opportunities.",
  },
  {
    id: 5,
    imageUrl: <Magnifying/>,
    name: "Competitive ",
    subname: "analysis",
    description:
      "Monitor and evaluate competitors to benchmark your business and identify areas for improvement.",
  },
  {
    id: 6,
    imageUrl:<PieChart/>,
    name: "Customer ",
    subname: "segmentation",
    description:
      "Segment customers based on geographic and demographic data for more targeted marketing campaigns.",
  },
  {
    id: 7,
    imageUrl: <HandsIcon/>,
    name: "Effective lead ",
    subname: "generation",
    description:
      "Identify and capture high-value prospects with precise business data to build targeted lead lists.",
  },
  {
    id:8,
    imageUrl:  <DiamondIcon/>,
    name: "Effective lead ",
    subname: "generation",
    description:
      "Identify and capture high-value prospects with precise business data to build targeted lead lists.",
  },
  {
    id: 9,
    imageUrl:<BoxIcon/>,
    name: "Effective lead ",
    subname: "generation",
    description:
      "Identify and capture high-value prospects with precise business data to build targeted lead lists.",
  },
];
const Box = () => {
    // Initialize AOS
    useEffect(() => {
      AOS.init({
        duration: 1000, // Duration of animations
        easing: 'ease-in-out', // Easing function
        once: true, // Whether animation should happen only once
      });
    }, []);
  
    return (
      <div className="grid grid-cols-3 gap-y-10">
        {cases.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up" // AOS animation attribute
            className="relative text-black p-8 text-start hover:bg-[#F0F4F3] shadow-lg transition-transform duration-500 ease-in-out max-w-[400px] max-h-[258px] py-20 rounded-[20px] h-full flex flex-col gap-y-4 items-start justify-center group overflow-hidden"
          >
            <div className="absolute inset-0 border-r-8 border-b-8 rounded-[20px] group-hover:border-[#13745D] transition-all duration-500 ease-out" />
            
            <div className="relative z-10 text-[#14171B] group-hover:fill-primary-green">
              {item.imageUrl}
            </div>
            <h2 className="sm:text-[24px] text-[16px] font-bold group-hover:text-[#13745D] transition-colors duration-300">
              {item.name}{" "}
              <span className="sm:text-[24px] text-[16px] font-light group-hover:text-[#13745D] transition-colors duration-300">
                {item.subname}
              </span>
            </h2>
            <p className="text-[16px] max-w-[320px] text-start font-light text-black transition-colors duration-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    );
  };
  

const Cases = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      <div className="max-w-[1340px] flex flex-col gap-y-12 w-full mx-auto">
        <div
          className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-[#034737] bg-[#03473714]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[12px] font-extrabold">
            USE CASES
          </h2>
        </div>
        <div
          className="flex flex-row w-full justify-between items-center"
          data-aos="fade-right"
        >
          <h1 className="text-[26px] xl:text-[40px] max-w-[500px] gap-2 leading-tight font-semibold sm:text-left text-center text-black">
            Unlock potential with targeted{" "}
            <span className="font-light"> use cases </span>
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

export default Cases;
