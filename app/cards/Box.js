import Image from "next/image";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const cases = [
  {
    id: 1,
    text: "Imagine having ",
    imageUrl: "/landingpagerevamp/1.svg",
    name: "Tony Stark's",
    description: "tech in your pocket.",
  },
  {
    id: 2,
    text: "You’re sipping coffee ☕, ",
    imageUrl: "/landingpagerevamp/2.svg",
    name: "",
    description:
      "and GrowStack is already taking care of your emails and LinkedIn replies – as smooth as Federer’s backhand.",
  },
  {
    id: 3,
    text: "Got a question? It’s like having ",
    imageUrl: "/landingpagerevamp/3.svg",
    name: "Sherlock ",
    description: "right beside you, finding answers with style and precision.",
  },
  {
    id: 4,
    text: "Need content? GrowStack has it covered, as effortlessly as  ",
    imageUrl: "/landingpagerevamp/4.svg",
    name: "MJ's moonwalker",
    description: "",
  },
  {
    id: 5,
    text: "And when you need support, it’s as reliable as ",
    imageUrl: "/landingpagerevamp/5.svg",
    name: "Rocky’s trainer",
    description: "in your corner.",
  },
  {
    id: 6,
    text: "GrowStack: your",
    imageUrl: "/landingpagerevamp/6.svg",
    name: " dream team,",
    description: "making work feel easy and fun!",
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
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-8">
      {cases.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="relative text-black bg-white hover:bg-[#F4F4F4] group rounded-[20px] shadow-lg hover:shadow-2xl text-center sm:text-start items-center sm:items-start transition-transform duration-500 ease-in-out max-w-[700px] h-full flex flex-col gap-y-4 justify-center overflow-hidden"
        >
          <div className="flex sm:items-start items-center gap-y-4 px-2 sm:px-8 py-4 ">
            <h2 className="text-[12px]  sm:text-[18px] xl:text-[24px] max-w-[700px]  text-black transition-colors duration-300">
              <span className=" font-bold">{item.text} </span>
              <span className="font-bold text-primary-lightgreen">
                {item.name}
              </span>{" "}
              <Image
                src={item.imageUrl}
                width={39}
                height={39}
                alt="images"
                className="inline-block align-middle"
              />{" "}
              {item.description}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Box;
