import React, { useEffect, useState } from "react";
import { dummyData3 } from "../data";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const TopRightPanel2nd = ({
  setActiveTab,
  activeTab,
  setIsFromTimeline,
}: any) => {
  const route = useRouter();
  const { workFlowData } = useAppSelector(state => state.workflows);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setActiveTab(index);
    localStorage.setItem("workflowActiveTab", index.toString());
  };
  useEffect(() => {
    const savedTab = localStorage.getItem("workflowActiveTab");
    const isFromTimeline = localStorage.getItem("isFromTimeline");
    if (savedTab) {
      setActiveTab(parseInt(savedTab));
      if (isFromTimeline) {
        setIsFromTimeline(true);
        setTimeout(() => {
          localStorage.removeItem("isFromTimeline");
        }, 5000);
      } else {
        setIsFromTimeline(false);
      }
    } else {
      // setIsFromTimeline(false);
      setActiveTab(0);
    }
  }, [setActiveTab]);

  return (
    <div className="flex items-center  rounded-lg justify-center relative p-1">
      <div
        className="w-[198px] h-[44px] flex justify-center items-center rounded-lg cursor-pointer absolute left-[40px]"
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
        <div className="bg-white">
          <button
            key={index.toString()}
            className={`flex justify-center items-center m-2 cursor-pointer px-2.5 py-1.5 rounded-md text-base font-normal ${
              activeTab === index
                ? "text-white bg-[#2DA771]"
                : "text-black bg-transparent"
            } shadow-lg`}
            onClick={() => handleClick(index)}
          >
            {item.text}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TopRightPanel2nd;
