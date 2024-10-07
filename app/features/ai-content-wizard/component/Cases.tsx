import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "../../../../styles/myanimation.css";
import "aos/dist/aos.css";
import {
  HandsIcon,
  Magnifying,
  PieChart,
  UIcon,
  UIcon2,
  Worldicon,
  Worldicon2,
  Zoomicon,
  BoxIcon,
  DiamondIcon,
  Zoomicon2,
  Worldicon3,
  Worldicon4,
  Worldicon5,
  Worldicon6,
} from "@/components/svgs/icons";
export const cases = [
  {
    id: 1,
    imageUrl: <UIcon2 />,
    name: "AI-Powered Idea Generation",
    subname: "01",
    description:
      "Instantly generate unique and relevant content ideas based on your keywords or topics. Why it's valuable: Skip the creative block and quickly find inspiration, ensuring you never run out of fresh topics.",
  },
  {
    id: 2,
    imageUrl: <Zoomicon2 />,
    name: "Customizable Outlines",
    subname: "02",
    description:
      "Build detailed outlines with flexible structures, tailored to fit your writing style and tone. Why it's valuable: Stay organized and ensure your content flows seamlessly from one section to the next, regardless of format or audience.",
  },

  {
    id: 3,
    imageUrl: <Worldicon3 />,
    name: "Talking Points Development",
    subname: "03",
    description:
      "Generate key talking points for each section of your outline, ensuring no crucial detail is missed. Why it's valuable: Keep your content well-structured and focused on the main ideas, reducing the effort spent on manual research.",
  },
  {
    id: 4,
    imageUrl: <Worldicon4 />,
    name: "AI-Generated Images",
    subname: "04",
    description:
      "Create images to complement your content, automatically generated based on the text and keywords. Why it's valuable: Enhance your content visually without the need for external tools, making your articles more engaging and professional.",
  },
  {
    id: 5,
    imageUrl: <Worldicon5 />,
    name: "Multilingual Support",
    subname: "05",
    description:
      "Generate content in multiple languages including English, Spanish, French, and more. Why it's valuable: Expand your content's reach by easily creating material for diverse global audiences.",
  },
  {
    id: 6,
    imageUrl: <Worldicon6 />,
    name: "Seamless Content Integration",
    subname: "06",
    description:
      "Edit, export, and publish your content with ease across platforms. Why it's valuable: Finish your content in one place and easily transfer it to your preferred CMS, saving you time and effort.",
  },
];
const Box = () => {
 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10">
      {cases.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className={`relative text-black text-start  ${
            (item.id === 5 || item.id === 6)  ? "" : "border-b-2"
          } flex  p-6 transition-transform duration-500 ease-in-out max-w-[660px] sm:max-h-[358px]  h-full flex-col sm:text-start text-center sm:flex-row gap-6 items-center sm:items-start justify-between group overflow-hidden`}
        >
          <div className="" data-aos="zoom-in">
            {item.imageUrl}
          </div>
          <div className="relative sm:text-start flex flex-col text-center z-10 text-[#14171B] group-hover:fill-primary-green">
            <span className="sm:text-[48px] text-[#14171B]/30 text-[16px] font-bold group-hover:text-[#13745D] transition-colors duration-300">
              {item.subname}
            </span>
            <h2 className="xl:text-[24px] text-[16px] font-bold group-hover:text-[#13745D] transition-colors duration-300">
              {item.name}{" "}
            </h2>
            <p className="text-[14px] xl:text-[16px] max-w-[420px] mb-10 xl:mb-6  font-light text-black transition-colors duration-300">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Cases = () => {
  useEffect(() => {
    AOS.init({
      duration: 100, 
      easing: "ease-out", 
      offset: 1,
    });
    AOS.refresh(); 
  }, []);

  return (
    <div>
      <div className="max-w-[1340px] flex flex-col sm:items-start items-center gap-y-6 w-full mx-auto">
        <div
          className="max-w-[124px] rounded-2xl item-center justify-center w-full py-2 text-[#034737] bg-[#03473714]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[12px] font-extrabold">
            FEATURES
          </h2>
        </div>
        <div
          className="flex flex-row w-full justify-between items-center"
          data-aos="fade-right"
        >
          <h1 className="text-[26px] xl:text-[40px] xl:max-w-[500px] gap-2 leading-tight font-semibold sm:text-left text-center text-black">
            Features that elevate your<span className="font-light"> content game </span>
          </h1>
        </div>
        <div>
          <Box />
        </div>
      </div>
    </div>
  );
};

export default Cases;
