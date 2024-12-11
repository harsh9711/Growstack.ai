import React, { useEffect, useState } from "react";
import { dummyData3 } from "../data";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { extractParameterValues } from "@/utils/dataResolver";
import { NodeState } from "@/types/workflows";
import { prepareNodesPayload } from "@/utils/helper";
import { useEdges } from "@xyflow/react";

const TopRightPanel2nd = ({
  setActiveTab,
  activeTab,
  setIsFromTimeline,
}: any) => {
  const route = useRouter();
  const { workFlowData } = useAppSelector(state => state.workflows);
  const { nodes } = useAppSelector(state => state.nodes);
  const edges = useEdges();

  // console.log('---edges---', edges)

  // console.log("-----JsonNOdes----", JSON.stringify(nodes, null, 2));

  // const [activeIndex, setActiveIndex] = useState(0);

  // console.log("---workFlowData----", workFlowData);

  const handleClick = (index: number) => {
    setActiveTab(index);
    localStorage.setItem("workflowActiveTab", index.toString());
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("workflowActiveTab");
    if (savedTab) {
      setActiveTab(parseInt(savedTab));
    } else {
      setActiveTab(0);
    }
  }, [setActiveTab]);

  const handleSaveWorkFlow = async () => {
    try {
      const bodyPayload = {
        name: workFlowData.name,
        description: workFlowData.description || "",
        nodes: prepareNodesPayload(nodes, workFlowData._id || ""),
        edges: edges,
      };

      console.log('----bodyPayload---', bodyPayload)

    } catch (error) {
      console.log('----error---', error)
    }
  };

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
        <div className="bg-white" key={index.toString()}>
          <button
            key={index.toString()}
            className={`flex justify-center items-center m-2 cursor-pointer px-2.5 py-1.5 rounded-md text-base font-normal ${activeTab === index
              ? "text-white bg-[#2DA771]"
              : "text-black bg-transparent"
              } shadow-lg`}
            onClick={() => handleClick(index)}
          >
            {item.text}
          </button>
        </div>
      ))}

      <div>
        <Button variant="outline" className="w-32 h-[44px] bg-[#2DA771]" onClick={handleSaveWorkFlow}>
          Save
        </Button>
        <Button
          variant="default"
          className="w-32 h-[44px] bg-[#2DA771]"
          title="Publish"
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default TopRightPanel2nd;
