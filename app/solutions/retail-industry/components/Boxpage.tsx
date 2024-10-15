import Image from "next/image";
import React from "react";

const Boxpage = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row-reverse max-w-[1287px] gap-6  w-full justify-between items-center mx-auto">
      <div>
        <Image src="/retail/1.svg" width={600} height={500} alt="image" />
      </div>
      <div className="max-w-[505px] w-full flex flex-col gap-y-6 items-center sm:items-start">
        <div className="bg-[#03473714] py-2 px-3.5 flex sm:items-start items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
          Harnessing AI
        </div>
        <div className="flex sm:items-start items-center flex-col gap-y-4">
          <h2 className="font-light sm:text-start text-center text-[26px] xl:text-[40px]">
            <span className="font-bold">Streamlining retail with </span>
            AI-powered efficiency
          </h2>
          <p className="sm:text-[16px] text-[12px] sm:text-start text-center font-medium">
            Growstack is an AI-powered platform that streamlines operations and
            boosts productivity for technology businesses. Our intelligent tools
            automate tasks, provide valuable insights, and enhance security,
            allowing you to focus on innovation.
          </p>
          <h2 className="sm:text-[24px] text-[16px] font-bold text-[#034737]">
            AI-driven efficiency and insights for retail success{" "}
          </h2>

          <ul className="straight-line-list pt-4 text-[12px]  text-start items-start flex flex-col sm:text-[18px] text-black">
            <li>Seamless integration with retail workflows for efficiency.</li>
            <li>AI tools to automate communication, content creation, and marketing.</li>
            <li>Empower retailers with data insights for better decision-making.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Boxpage;
