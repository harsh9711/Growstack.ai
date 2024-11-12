import { useEffect } from "react";
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

export const cases = [
  {
    id: 1,
    text: "Comprehensive Suite of Features",
    imageUrl: <Icon1 />,
    name: "All-in-one solution",
    description:
      "Access a wide range of tools designed to address every aspect of eCommerce management, from marketing automation to customer service and inventory management.",
  },
  {
    id: 2,
    text: "Cost Efficiency",
    imageUrl: <Icon2 />,
    name: "Lower operating costs",
    description:
      "Streamline processes and reduce overhead with automated workflows and intelligent systems, ultimately increasing profit margins.",
  },
  {
    id: 3,
    text: "Scalability",
    imageUrl: <Icon3 />,
    name: "Grow with confidence",
    description:
      "Whether you're a startup or an established brand, Growstack scales with your business, adapting to your evolving needs without compromising performance.",
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
          className="relative text-black bg-white group  max-h-[350px] rounded-[20px] shadow-lg hover:shadow-2xl text-center sm:text-start items-center sm:items-start transition-transform duration-500 ease-in-out max-w-[400px] h-full flex flex-col gap-y-4 justify-center group overflow-hidden"
        >
          <div className="bg-[#A4E2CC] text-start py-4 font-bold text-white pl-6 group-hover:pl-0 duration-500 transition-transform ease-out  group-hover:text-center sm:text-[20px] items-center justify-center text-[16px] w-full rounded-t-[20px] h-full group-hover:bg-primary-green">
            {item.text}
          </div>
          <div className="flex flex-col  sm:items-start items-center gap-y-4 px-8 py-4">
            <div className="relative z-10 w-20 fill-black group-hover:fill-primary-green">
              {item.imageUrl}
            </div>
            <h2 className="sm:text-[20px]  text-[16px] w-full font-bold group-hover:text-[#13745D] transition-colors duration-300">
              {item.name}{" "}
             
            </h2>
            <p className="text-[14px] sm:text-[16px] max-w-[320px] font-light text-black transition-colors duration-300">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const SixCard = () => {
  return (
    <div className="py-8">
      <div className="max-w-[1340px] flex flex-col sm:items-start items-center gap-y-6 sm:gap-y-8 w-full mx-auto">
        <div
          className="max-w-[184px] rounded-2xl flex items-center justify-center w-full px-4 py-2  text-[#034737] bg-[#03473714]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[12px] sm:text-[16px] font-extrabold">
          Customer stories
          </h2>
        </div>
        <div
          className="flex flex-col sm:text-start text-center gap-6 w-full justify-between items-center sm:items-start"
          data-aos="fade-right"
        >
          <h1 className="text-[28px] xl:text-[40px] w-full leading-tight font-semibold text-black">
            Why choose <span className="font-light">Growstack</span>
          </h1>
        </div>

        <Box />
      </div>
    </div>
  );
};

export default SixCard;
