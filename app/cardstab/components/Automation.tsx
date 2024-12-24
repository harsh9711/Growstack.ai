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
        width="44"
        height="44"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.25 22.5L23.75 25L23.75 21.25C23.75 16.4175 19.8325 12.5 15 12.5C10.1675 12.5 6.25 16.4175 6.25 21.25L6.25 25L3.75 22.5"
          stroke="#14171B"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15.5 3.75C15.5 3.47386 15.2761 3.25 15 3.25C14.7239 3.25 14.5 3.47386 14.5 3.75L15.5 3.75ZM15 26.25L14.5 26.25C14.5 26.4522 14.6218 26.6345 14.8087 26.7119C14.9955 26.7893 15.2106 26.7466 15.3536 26.6036L15 26.25ZM17.8536 24.1036C18.0488 23.9083 18.0488 23.5917 17.8536 23.3964C17.6583 23.2012 17.3417 23.2012 17.1464 23.3964L17.8536 24.1036ZM12.8536 23.3964C12.6583 23.2012 12.3417 23.2012 12.1464 23.3964C11.9512 23.5917 11.9512 23.9083 12.1464 24.1036L12.8536 23.3964ZM14.6464 26.6036C14.8417 26.7988 15.1583 26.7988 15.3536 26.6036C15.5488 26.4083 15.5488 26.0917 15.3536 25.8964L14.6464 26.6036ZM14.5 3.75L14.5 26.25L15.5 26.25L15.5 3.75L14.5 3.75ZM15.3536 26.6036L17.8536 24.1036L17.1464 23.3964L14.6464 25.8964L15.3536 26.6036ZM12.1464 24.1036L14.6464 26.6036L15.3536 25.8964L12.8536 23.3964L12.1464 24.1036Z"
          fill="#14171B"
        />
      </svg>
    ),
    name: "Prospect scraping",
    description: "",
    button: "Explore",
    href: "/features/prospect-scraping-and-contacts",
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

const Automation = () => {
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

export default Automation;
