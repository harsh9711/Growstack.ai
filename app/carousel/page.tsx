import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { solutions, solutionsteams } from "@/types/data";
import Image from "next/image";
import Link from "next/link";

const Carousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const [hovered2Index, setHovered2Index] = useState<null | number>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-[#F4F6F6] rounded-[60px]">
      {/* Header and Solution Title */}
      <div className="w-full bg-[#F4F6F6] rounded-[60px] py-20 gap-y-4 flex flex-col items-center justify-center mx-auto">
        <div className="flex flex-col gap-y-6 items-center justify-center mx-auto">
          <div className="bg-[#0347371A] text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase max-w-[123px]">
            SOLUTIONS
          </div>
          <div className="flex flex-col gap-y-4 justify-center items-center">
            <h1 className="text-[24px] xl:text-[56px] font-semibold text-center">
              Enterprise-strong <span className="font-light">foundation</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Company Types Section */}
      <div className="flex items-center space-x-4 text-[28px] px-20 font-bold">
        <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
        <span className="text-[#034737]">Company types</span>
        <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
      </div>

      {/* Solutions List */}
      <div
        data-aos="slide-right"
        className="flex flex-wrap xl:flex-row gap-10 mt-10 items-center justify-center mx-auto"
      >
        {solutions.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ backgroundColor: item.bgcolor }}
            className={`p-4 flex ${hoveredIndex === index ? "flex-row" : "flex-col"
              } max-w-${hoveredIndex === index ? "[300px]" : "[150px]"
              } h-[220px] transition-all duration-300 ease-in-out gap-6 justify-between text-white w-full rounded-[20px]`}
          >
            <div className="flex flex-col gap-y-6 items-center justify-center">
              <div className="max-w-[92px] w-full cursor-pointer">
                <Image
                  src={item.imageUrl}
                  width={100}
                  height={100}
                  alt="image"
                  className="transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              {hoveredIndex === index && (
                <Link href={item.href}>
                  <svg
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 transform hover:scale-125"
                  >
                    <path
                      d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                      fill="#A9FF9B"
                    />
                  </svg>
                </Link>
              )}
            </div>
            <div
              style={{ color: item.textcolor }}
              className={`flex flex-col gap-y-4 ${hoveredIndex === index ? "items-start mt-4" : "items-center"
                }  w-full`}
            >
              <h2
                style={{ color: item.textcolor }}
                className="text-[20px] text-center  font-semibold"
              >
                {item.name}
              </h2>
              {hoveredIndex === index && (
                <p
                  style={{ color: item.textcolor }}
                  className={`text-[18px] font-medium max-w-[260px]`}
                >
                  {item.role}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-10 space-x-10 text-[28px] px-20 font-bold">
        <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
        <span className="text-[#034737]">Teams</span>
        <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
      </div>

      {/* Swiper Slider */}
      <div
        data-aos="slide-right"
        className="flex flex-wrap xl:flex-roww gap-10  py-10 pb-20 items-center justify-center mx-auto"
      >
        {solutionsteams.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setHovered2Index(index)}
            onMouseLeave={() => setHovered2Index(null)}
            style={{ backgroundColor: item.bgcolor }}
            className={`p-4 flex ${hovered2Index === index ? "flex-row" : "flex-col"
              } max-w-${hovered2Index === index ? "[300px]" : "[150px]"
              } h-[220px] transition-all duration-300 ease-in-out gap-6 justify-between text-white w-full rounded-[20px]`}
          >
            <div className="flecarosuellandingx flex-col gap-y-6 items-center cursor-pointer justify-center">
              <div className="max-w-[92px] w-full">
                <Image
                  src={item.imageUrl}
                  width={100}
                  height={100}
                  alt="image"
                  className="transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              {hovered2Index === index && (
                <Link href={item.href}>
                  {" "}
                  <svg
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 transform hover:scale-125"
                  >
                    <path
                      d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                      fill="#A9FF9B"
                    />
                  </svg>
                </Link>
              )}
            </div>
            <div
              style={{ color: item.textcolor }}
              className={`flex flex-col gap-y-4 ${hovered2Index === index ? "items-start mt-4" : "items-center"
                }  w-full`}
            >
              <h2
                style={{ color: item.textcolor }}
                className="text-[20px]  text-center font-semibold"
              >
                {item.name}
              </h2>
              {hovered2Index === index && (
                <p
                  style={{ color: item.textcolor }}
                  className={`text-[18px] font-medium max-w-[260px]`}
                >
                  {item.role}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
