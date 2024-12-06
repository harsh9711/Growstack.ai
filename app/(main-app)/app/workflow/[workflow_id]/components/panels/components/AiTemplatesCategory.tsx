import React from "react";
import Image from "next/image";
import { AllData, templatesHeader } from "../../data";
import { useDispatch } from "react-redux";
import { addNodeData } from "@/lib/features/workflow/node.slice";
import { NodeDataState, NodeState } from "@/types/workflows";

const AiTemplatesCategory = ({ setNodes }: any): React.ReactElement => {
  const [selectedItem, setSelectedItem] = React.useState<number | null>(null);
  const aiTemplates = AllData.filter(item => item.category === "ai-templates");

  const handleClick = (nodeData: NodeState) => {
    setNodes((prevNodes: NodeState[]) => {
      const lastNode = prevNodes[prevNodes.length - 1];
      let nextNodeX = 200;
      let nextNodeY = 0;
      if (lastNode) {
        nextNodeX = lastNode.position.x + 200;
        nextNodeY = lastNode.position.y;

        if (nextNodeX > 1600) {
          nextNodeX = 200;
          nextNodeY += 200;
        }
      }

      return [
        ...prevNodes,
        {
          ...nodeData,
          id: Date.now().toString(),
          position: { x: nextNodeX, y: nextNodeY },
        },
      ];
    });
  };

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
  };

  return (
    <div className="absolute w-4/5 h-[500px] top-[120px] rounded-2xl overflow-y-auto backdrop-blur-sm drop-shadow-2xl">
      <div className="bg-white p-5  pt-0">
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between  pt-5">
            <h4 className="text-xl font-medium text-[#14171B] leading-6">
              AI Templates
            </h4>
            <div className="flex items-center p-2 rounded-lg border border-[#EBEBEB] mr-2.5 bg-[#F7F7F7]">
              <Image
                src="/images/workflow/search-normal.svg"
                alt="Search"
                width={16}
                height={16}
                className="cursor-pointer mr-2.5 text-sm font-normal text-[#5A5963]"
              />
              <input
                type="text"
                placeholder="Search"
                className="bg-[#F7F7F7]"
              />
            </div>
          </div>
          <hr className="border-none border-t border-[#E5E5E5] my-5" />
        </div>

        <div className="flex flex-wrap h-full overflow-y-auto">
          <div className="flex flex-wrap flex-row gap-2  pb-4">
            {templatesHeader.map((item, index) => (
              <div
                key={index}
                className={`flex flex-row m-0.5 p-2.5 rounded-lg items-center cursor-pointer ${selectedItem === item.id ? "bg-[#B785FF]" : "bg-[#E9E9E9]"}`}
                onClick={() => handleItemClick(item.id)}
              >
                <Image
                  src={item.image.src}
                  alt="loading"
                  width={item.image.width}
                  height={item.image.height}
                  draggable={false}
                />
                <p
                  className={`ml-2 text-sm font-normal leading-4 ${selectedItem === item.id ? "text-white" : "text-[#14171B]"}`}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap ">
            {aiTemplates.map(item => (
              <div
                key={item.id}
                className="h-[97px] w-[130px] bg-transparent m-1 rounded-lg flex justify-center items-center cursor-pointer border border-[#E5E5E5]"
              >
                <div className="h-full w-full rounded-lg bg-white flex justify-center items-center flex-col">
                  {item.image && (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={35}
                      height={35}
                      draggable={false}
                    />
                  )}
                  <p className="text-sm leading-5 font-medium text-[#020817] mt-2 text-center">
                    {item.name.length > 20
                      ? `${item.name.substring(0, 20)}...`
                      : item.name}
                    <span className="hidden absolute bg-white text-black text-center rounded-lg p-1 z-10 bottom-[125%] left-1/2 ml-[-60px] shadow-md">
                      {item.name}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTemplatesCategory;
