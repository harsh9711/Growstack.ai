import React, { useState, useEffect } from "react";
import Image from "next/image";
import { NodeState } from "@/types/workflows";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { convertNodeData } from "@/utils/dataResolver";
import { addNode, addNodeData, createNode, removeNode } from "@/lib/features/workflow/node.slice";
import { calculateNextNodePosition } from "@/utils/helper";
import { unwrapResult } from "@reduxjs/toolkit";


interface NodeData {
  name: string;
  logoUrl?: string;
  node: NodeState;
}

interface GroupedIntegrations {
  [key: string]: NodeData[];
}


const IntegrationCategory = ({ setNodes }: any): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");


  const { masterNode } = useAppSelector(state => state.masterNode);
  const { workFlowData } = useAppSelector(state => state.workflows);
  const { nodes } = useAppSelector(state => state.nodes);

  if ((masterNode && !masterNode.length) || !masterNode) {
    return <div>Data not found</div>;
  }

  const generalData = masterNode?.filter(
    item =>
      item.category.toLowerCase() === "integration" &&
      (item.type === "gmail" || item.type === "linkedin")
  );

  // console.log("generalData", generalData);

  const modifiedNodes = generalData?.map(convertNodeData);

  const integrationData = modifiedNodes?.reduce(
    (acc: { [key: string]: typeof modifiedNodes }, model) => {
      if (!acc[model.subCategory]) {
        acc[model.subCategory] = [];
      }
      acc[model.subCategory].push(model);
      return acc;
    },
    {}
  );

  const filterGeneralsBySearch = (integrations: GroupedIntegrations): GroupedIntegrations => {
    if (!searchQuery) return integrations;
    
    const filteredGenerals: GroupedIntegrations = {};
    
    Object.keys(integrations).forEach((subCategory) => {
      const filteredItems = integrations[subCategory].filter((item: NodeData) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filteredItems.length > 0) {
        filteredGenerals[subCategory] = filteredItems;
      }
    });
    
    return filteredGenerals;
  };

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  useEffect(() => {
    if (Object.keys(integrationData || {}).length > 0 && !selectedSubCategory) {
      const firstSubCategory = Object.keys(integrationData)[0];
      setSelectedSubCategory(firstSubCategory);
    }
  }, [integrationData, selectedSubCategory]);

  // const handleClick = (nodeData: NodeState) => {
  //   console.log("nodeData", nodeData);
  //   setNodes((prevNodes: NodeState[]) => {
  //     const lastNode = prevNodes[prevNodes.length - 1];
  //     let nextNodeX = 200;
  //     let nextNodeY = 0;
  //     if (lastNode) {
  //       nextNodeX = lastNode.position.x + 200;
  //       nextNodeY = lastNode.position.y;

  //       if (nextNodeX > 1600) {
  //         nextNodeX = 200;
  //         nextNodeY += 200;
  //       }
  //     }

  //     return [
  //       ...prevNodes,
  //       {
  //         ...nodeData,
  //         id: Date.now().toString(),
  //         position: { x: nextNodeX, y: nextNodeY },
  //       },
  //     ];
  //   });
  // };


  const handleClick = async (nodeData: NodeState) => {
    try {
      const lastNode = nodes[nodes.length - 1];
      const { nextNodeX, nextNodeY } = calculateNextNodePosition(lastNode);

      const resultAction = await dispatch(
        createNode({
          workflowId: workFlowData._id,
          nodeMasterId: nodeData.id,
          name: nodeData.data?.label,
          type: nodeData?.type,
          description: nodeData.data?.descriptions || "",
          position: { x: nextNodeX, y: nextNodeY },
          parameters: {},
        })
      );
      const result = unwrapResult(resultAction);

      if (!result._id) return;

      const newNode = {
        ...nodeData,
        id: result._id,
        position: { x: nextNodeX, y: nextNodeY },
      };

      setNodes((nds: NodeState[]) => nds.concat(newNode));
      dispatch(addNode(newNode));
    } catch (error) {
      console.error("Error adding node:", error);
    }
  };



  const handleDragStart = (event: React.DragEvent, item: NodeState) => {
    dispatch(addNodeData(item));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="absolute bg-white w-[470px] h-[500px] top-[120px] rounded-2xl overflow-y-auto backdrop-blur-sm drop-shadow-2xl">
      <div className="bg-white p-5 pt-0">
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between py-5">
            <h4 className="text-xl font-medium text-[#14171B] leading-6">
              Integrations
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="main-box">
          <div className="flex flex-wrap flex-row gap-2 mb-4">
            {Object?.keys(filterGeneralsBySearch(integrationData)).map((subCategory, index) => (
              <div
                key={index}
                className={`flex flex-row p-3 rounded-lg items-center cursor-pointer ${selectedSubCategory === subCategory
                  ? "bg-[#FB8491]"
                  : "bg-[#E9E9E9]"
                  }`}
                onClick={() => setSelectedSubCategory(subCategory)}
              >
                <p
                  className={`ml-2 text-sm font-normal leading-4 flex items-center gap-2 ${selectedSubCategory === subCategory
                    ? "text-white"
                    : "text-[#14171B]"
                    }`}
                >
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1667 0.982619C18.9201 0.880441 18.6486 0.853702 18.3867 0.905784C18.1248 0.957865 17.8843 1.08643 17.6955 1.27522L15.1236 3.84729V2.27959C15.1236 1.16317 14.2184 0.257812 13.1018 0.257812H2.02188C0.90531 0.257812 0 1.16317 0 2.27959V9.7203C0 10.8367 0.90531 11.7421 2.02188 11.7421H13.1018C14.2184 11.7421 15.1236 10.8367 15.1236 9.7203V8.15255L17.6955 10.7246C17.8208 10.8501 17.9697 10.9496 18.1336 11.0175C18.2974 11.0854 18.4731 11.1203 18.6504 11.1203C18.8243 11.1203 18.9997 11.0864 19.1667 11.0173C19.4134 10.9151 19.6242 10.742 19.7725 10.52C19.9208 10.298 20 10.0371 20 9.77008V2.22976C20 1.96279 19.9208 1.70181 19.7725 1.47982C19.6242 1.25784 19.4134 1.08481 19.1667 0.982619ZM9.50243 6.52373L6.74666 8.64098C6.63127 8.72971 6.48977 8.77777 6.34421 8.77769C6.25747 8.77771 6.17158 8.76064 6.09144 8.72745C6.0113 8.69426 5.93849 8.64561 5.87716 8.58427C5.81583 8.52294 5.76719 8.45011 5.73401 8.36997C5.70084 8.28983 5.68378 8.20393 5.68381 8.1172V3.88265C5.68378 3.75934 5.71828 3.63849 5.78341 3.53379C5.84854 3.42909 5.94169 3.34473 6.05231 3.29026C6.1629 3.23571 6.28656 3.21323 6.40927 3.22536C6.53198 3.2375 6.64884 3.28376 6.74661 3.35891L9.50238 5.47611C9.58269 5.53779 9.64774 5.61711 9.6925 5.70793C9.73727 5.79875 9.76055 5.89865 9.76056 5.99991C9.76056 6.10117 9.73729 6.20107 9.69253 6.29189C9.64777 6.38272 9.58273 6.46204 9.50243 6.52373Z"
                      fill={
                        selectedSubCategory === subCategory ? "#fff" : "#F1B916"
                      }
                    />
                  </svg>

                  {subCategory}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap pt-1">
            {filterGeneralsBySearch(integrationData)[selectedSubCategory]?.map((item, _) => (
              // <div
              //   key={item.node.id}
              //   className="h-auto w-full bg-transparent mb-2 rounded-lg flex justify-center items-center cursor-pointer border border-[#E5E5E5] p-3"
              //   onClick={() => handleClick(item.node)}
              //   draggable
              //   onDragStart={event => {
              //     handleDragStart(event, item.node);
              //   }}
              //   onDragEnd={() => {
              //     dispatch(removeNode());
              //   }}
              // >
              //   <div className="h-full w-full rounded-lg bg-white flex items-center gap-3">
              //     {item.logoUrl && (
              //       <Image
              //         src={item.logoUrl}
              //         alt="Logo"
              //         width={50}
              //         height={50}
              //         draggable={false}
              //         className="rounded-lg"
              //       />
              //     )}

              //     <div className="w-full">
              //       <h3 className="text-[16px] leading-7 font-medium text-[#020817]">
              //         {item.name}
              //       </h3>

              //       {item.description && (
              //         <p className="text-[14px] leading-6 font-normal text-[#5B5D60]">
              //           {item.description.length > 40
              //             ? `${item.description.substring(0, 40)}...`
              //             : item.description}
              //         </p>
              //       )}
              //     </div>
              //   </div>
              // </div>

              <div
                key={_.toString()}
                className="h-[92px] w-[130px] bg-transparent m-1 rounded-lg flex justify-center items-center cursor-pointer border border-[#E5E5E5]"
                onClick={() => handleClick(item.node)}
                draggable
                onDragStart={event => {
                  handleDragStart(event, item.node);
                }}
                onDragEnd={() => {
                  dispatch(removeNode());
                }}
              >
                <div className="h-full w-full rounded-lg bg-white flex justify-center items-center flex-col">
                  {item?.logoUrl && (
                    <Image
                      src={item.logoUrl}
                      alt={item.name}
                      width={26}
                      height={17}
                      draggable={false}
                    />
                  )}
                  <p className="text-sm leading-5 font-medium text-[#020817] mt-2">
                    {item.name}
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

export default IntegrationCategory;
