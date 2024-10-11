import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { } from "@/components/svgs/icons";
export const cases = [
  {
    id: 1,
    imageUrl: "/features/c11.svg",
    name: "For marketers",
    description:
      "Quickly produce SEO-optimized blog posts and compelling email newsletters to drive engagement and conversions.",
  },
  {
    id: 2,
    imageUrl: "/features/c12.svg",
    name: "For content creators",
    description:
      "Effortlessly craft engaging long-form articles and eye-catching social media posts to captivate your audience.",
  },

  {
    id: 3,
    imageUrl: "/features/c13.svg",
    name: "For business owners",

    description:
      "Simplify the creation of product descriptions and web content to enhance your online presence and attract customers.",
  },
  {
    id: 4,
    imageUrl: "/features/c14.svg",
    name: "For freelancers",

    description:
      "Boost productivity and save time by generating high-quality content for clients across various industries.",
  },
];
const Box = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-out",

      offset: 1,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 ">
      {cases.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className={`relative text-black hover:bg-[#F7FBF0] text-start border-2 rounded-[20px] flex  p-6 transition-transform duration-500 ease-in-out max-w-[660px] max-h-[500px]  h-full flex-row  items-start justify-between group overflow-hidden`}
        >
          <div className="relative z-10 text-[#14171B] flex flex-col gap-y-4 group-hover:fill-primary-green">
            <div className="" data-aos="zoom-in">
              <Image src={item.imageUrl} width={500} height={300} alt="image" />
            </div>
            <h2 className="sm:text-[24px] text-[16px] font-bold group-hover:text-[#13745D] transition-colors duration-300">
              {item.name}{" "}
            </h2>
            <p className="text-[12px] sm:text-[16px] max-w-[420px] mb-6 text-start font-light text-black transition-colors duration-300">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
const OneCard = () => {


  return (
    <div>
      <div className="max-w-[1340px] sm:items-start items-center flex flex-col gap-y-8  w-full mx-auto">
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
          <h1 className="text-[26px] xl:text-[40px] max-w-[900px] gap-2 leading-tight font-semibold sm:!text-left !text-center text-black">
            From marketers to freelancers:
            <br />
            <span className="font-light">
              AI content wizard in real-world scenarios
            </span>
          </h1>
        </div>
        <div>
          <Box />
        </div>
      </div>
    </div>
  );
};

export default OneCard;
