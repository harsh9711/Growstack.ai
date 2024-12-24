import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ArrowRight from "@/components/home/drag-features/icons/ArrowRight";
import Link from "next/link";

const cases = [
  {
    id: 1,
    imageUrl: (
      <svg
        width="62"
        height="39"
        viewBox="0 0 32 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.07202 9.57185H6.35769"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 1C2.77518 1 4.21425 2.43908 4.21425 4.21429V14.9286C4.21425 16.7038 2.77518 18.1429 1 18.1429"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.42982 1C5.65464 1 4.21558 2.43908 4.21558 4.21429V14.9286C4.21558 16.7038 5.65464 18.1429 7.42982 18.1429"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24.572 7.4295L29.4502 4.99093C29.7822 4.82501 30.1765 4.84277 30.4922 5.03786C30.808 5.23296 31.0003 5.5776 31.0005 5.94879V13.1959C31.0003 13.5671 30.808 13.9118 30.4922 14.1069C30.1765 14.302 29.7822 14.3197 29.4502 14.1538L24.572 11.7152V7.4295Z"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <rect
          x="11.7158"
          y="3.14355"
          width="12.857"
          height="12.8571"
          rx="2.14284"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    name: "Text to Avatar and AI Backdrop",
    description: "",
    button: "Explore",
    href: "/text-to-avatar-and-ai-backdrop",
  },
  {
    id: 2,
    imageUrl: (
      <svg
        width="44"
        height="44"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="6.25"
          cy="6.25"
          r="2.5"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          cx="23.75"
          cy="6.25"
          r="2.5"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          cx="6.25"
          cy="23.75"
          r="2.5"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          cx="23.75"
          cy="23.75"
          r="2.5"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.25 8.75V21.25"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.75 6.25H21.25"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.75 23.75H21.25"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M23.75 8.75V21.25"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    name: "Social Planner Hub",
    description: "",
    button: "Explore",
    href: "/social-planner-hub",
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
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-8">
      {cases.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="relative text-black bg-[#FFFFFF] border-[#2DA771] rounded-[20px] hover:shadow-lg p-4 text-center sm:text-start items-center sm:items-start transition-transform duration-500 ease-in-out w-full max-w-[610px] border-2     flex flex-col gap-y-2 justify-between group overflow-hidden"
        >
          <div className=" fill-black group-hover:fill-primary-lightgreen">
            {item.imageUrl}
          </div>
          <div className="flex-grow">
            <h2 className="sm:text-[16px] text-[12px] font-bold  text-black  transition-colors duration-300">
              {item.name}{" "}
            </h2>
            <p className="text-[12px] sm:text-[16px] w-full  font-light text-black transition-colors duration-300">
              {item.description}
            </p>
          </div>

          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="flex flex-row items-start justify-center sm:items-start sm:justify-start gap-8 group text-[12px] 2xl:text-[18px] transition-opacity duration-300 "
          >
            <Link href={item.href} className="no-underline">
              <button className="font-medium flex items-center gap-2 bg-transparent  text-black group-hover:text-primary-lightgreen  group-hover:font-bold ">
                {item.button}
                <ArrowRight className="text-black group-hover:text-primary-lightgreen" />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const SocialPortal = () => {
  return (
    <div>
      <div className="max-w-[1340px] flex flex-col sm:items-start items-center gap-y-6 sm:gap-y-8 w-full mx-auto">
        <div className="flex flex-row items-center gap-y-6 sm:p-6 max-w-[1240px] w-full rounded-[30px] ">
          <Box />
        </div>
      </div>
    </div>
  );
};

export default SocialPortal;
