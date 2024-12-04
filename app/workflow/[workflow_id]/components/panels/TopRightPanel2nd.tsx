import React, { useState } from "react";
import { dummyData3 } from "../data";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const TopRightPanel2nd = ({ setActiveTab }: any) => {
  const route = useRouter();
  const { workFlowData } = useAppSelector(state => state.workflows);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setActiveTab(index);
  };

  return (
    <div
      className="flex items-center border-2 border-white rounded-lg bg-gradient-to-b from-[#F2F2F2] to-[#F8F8FA] justify-center relative shadow-lg p-1"
    >
      <div
        className="w-[198px] h-[44px] flex justify-center items-center bg-[#ffffff] rounded-lg cursor-pointer absolute left-[40px] shadow-lg"
        onClick={() => {
          route.back();
        }}
      >
        <Image
          src="/images/workflow/back.svg"
          alt="back"
          width={24}
          height={24}
        />
        <p className="text-[14px] font-semibold leading-[21px] font-poppins ml-2.5">
          {workFlowData?.name || ""}
        </p>
      </div>
      {dummyData3.map((item, index) => (
        <button
          key={index.toString()}
          className={`flex justify-center items-center m-2 cursor-pointer px-2.5 py-1.5 rounded-md text-base font-normal ${activeIndex === index
            ? "text-white bg-[#2DA771]"
            : "text-black bg-transparent"
            } shadow-lg`}
          onClick={() => handleClick(index)}
        >
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default TopRightPanel2nd;
