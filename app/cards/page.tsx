"use client";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";

const Box = dynamic(() => import("./Box"), {
  ssr: false,
});

const SixCard = () => {
  return (
    <div className="py-8 sm:p-0 md:p-4">
      <div className="max-w-[1340px] sm:p-0 p-4 flex flex-col  md:items-center xl:items-start justify-center items-center gap-y-6 sm:gap-y-8 w-full mx-auto sm:py-40">
        <div
          className="max-w-fit   rounded-2xl flex items-center justify-center w-full px-4 py-2 text-primary-lightgreen bg-[#2DA77114]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[10px] sm:text-[16px] font-extrabold">
            Value
          </h2>
        </div>
        <div
          className="flex flex-col sm:text-start text-center gap-6 justify-between items-center sm:items-start"
          data-aos="fade-right"
        >
          <h1 className="text-[16px] sm:text-[28px] xl:text-[40px]  leading-tight font-semibold text-black">
            What value do <span className="font-light">we add? </span>
          </h1>
        </div>
        <Box />
      </div>
    </div>
  );
};

export default SixCard;
