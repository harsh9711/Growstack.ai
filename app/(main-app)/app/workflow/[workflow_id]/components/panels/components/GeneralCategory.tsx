import React, { useState } from "react";
import Image from "next/image";
import {
  addNode,
  addNodeData,
  createNode,
  removeNode,
} from "@/lib/features/workflow/node.slice";
import { NodeState } from "@/types/workflows";
import "reactflow/dist/style.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { convertNodeData } from "@/utils/dataResolver";
import { calculateNextNodePosition } from "@/utils/helper";
import { unwrapResult } from "@reduxjs/toolkit";

interface NodeData {
  name: string;
  logoUrl?: string;
  node: NodeState;
}

interface GroupedGenerals {
  [key: string]: NodeData[];
}


const GeneralCategory = ({ setNodes, setSelectedCategory }: any): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { nodes } = useAppSelector(state => state.nodes);
  const { masterNode } = useAppSelector(state => state.masterNode);
  const { workFlowData } = useAppSelector(state => state.workflows);
  const [searchQuery, setSearchQuery] = useState("");

  if ((masterNode && !masterNode.length) || !masterNode) {
    return <div>Data not found</div>;
  }

  const generalData = masterNode?.filter(
    item => item.category.toLocaleLowerCase() === "general"
  );
  const modifiedNodes = generalData?.map(convertNodeData);

  const groupedGenerals = modifiedNodes?.reduce(
    (acc: { [key: string]: typeof modifiedNodes }, model) => {
      if (!acc[model.subCategory]) {
        acc[model.subCategory] = [];
      }
      acc[model.subCategory].push(model);
      return acc;
    },
    {}
  );

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

  const filterGeneralsBySearch = (generals: GroupedGenerals): GroupedGenerals => {
    if (!searchQuery) return generals;
    
    const filteredGenerals: GroupedGenerals = {};
    
    Object.keys(generals).forEach((subCategory) => {
      const filteredItems = generals[subCategory].filter((item: NodeData) => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (filteredItems.length > 0) {
        filteredGenerals[subCategory] = filteredItems;
      }
    });
    
    return filteredGenerals;
  };

  return (
    <>
      <div className="bg-white absolute w-[470px] h-[500px] top-[120px] rounded-2xl overflow-y-auto backdrop-blur-sm drop-shadow-2xl">
        <div className="bg-white p-5 pt-0">
          <div className="sticky top-0 z-10 bg-white">
            <div className="flex items-center justify-between pt-5">
              <h4 className="text-xl font-medium text-[#14171B] leading-6">
                General
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
            <hr className="border-0 border-t border-gray-300 my-5" />
          </div>

          <div className="flex flex-wrap h-full overflow-y-auto">
            {groupedGenerals && 
            // Object.keys(groupedGenerals).map((subCategory, index) => (
              Object.keys(filterGeneralsBySearch(groupedGenerals)).map((subCategory, index) => (

              <div key={index.toString()} className="mb-2.5 w-full">
                <h3 className="text-base leading-6 font-normal text-[#878787]">
                  {subCategory}
                </h3>
                <div className="flex flex-wrap pt-1">
                  {/* {groupedGenerals[subCategory].map((item, _) => ( */}
                  {filterGeneralsBySearch(groupedGenerals)[subCategory].map((item, _) => (
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
                        setSelectedCategory(false)
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralCategory;
