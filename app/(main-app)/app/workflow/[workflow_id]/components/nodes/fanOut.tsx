import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import React, { useState } from "react";
import { FanOutNodeProps } from "./types";
import { useAppSelector } from "@/lib/hooks";
import { NodeState } from "@/types/workflows";
import { convertNodeData } from "@/utils/dataResolver";

const FanOut = ({ data, id, isConnectable }: NodeProps<FanOutNodeProps>) => {
  const nodeMaster = useAppSelector(state =>
    state.masterNode.masterNode.filter(
      node =>
        node.category?.toLowerCase() === "integration" ||
        node.category?.toLowerCase() === "llms" ||
        node.category?.toLowerCase() === "tools"
    )
  );

  const modifiedNodes = nodeMaster?.map(convertNodeData);

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

  console.log('---groupedGenerals---', JSON.stringify(groupedGenerals, null, 2));

  const { setNodes } = useReactFlow();
  // const { nodes } = useAppSelector(state => state.nodes);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleButtonClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // const filteredNodes = nodes?.filter(node =>
  //   // node.data.label.toLowerCase().includes(searchTerm.toLowerCase())
  //   []
  // );

  const handleNodeClick = (node: NodeState) => {
    const subFlow = {
      id: `a${Date.now()}`,
      type: node.type,
      position: { x: 10, y: 90 },
      data: node.data,
      parentId: id,
      extent: "parent",
    };

    setNodes((prevNodes: any) => {
      return [...prevNodes, subFlow];
    });

    console.log(node, "sdsd ---dsd");
  };

  return (
    <div>
      <section className="fanout-sec relative">
        <div className="fanout-box w-[400px] h-[400px] border-[2px] border-dashed border-[#2DA771] rounded-[25px] relative">
          <div className="fanout-node-image absolute top-[-65px] right-0 left-0 mx-auto">
            <img
              src="/assets/node_icon/fanout-node-bg.svg"
              alt="fanout icon"
              className="mx-auto"
            />
          </div>

          <div className="fanout-switch absolute top-[40px] left-0 right-0 mx-auto">
            <img
              src="/assets/node_icon/fanout-switch.svg"
              alt="fanout icon"
              className="mx-auto"
            />
          </div>
        </div>

        <div className="node-edge absolute top-1/2 transform -translate-y-1/2 right-[-45%] flex items-center">
          <div className="border-t-2 border-dashed border-[#2DA771] w-[150px] mr-1" />
          {!showSearch ? (
            <button
              className="w-[20px] h-[20px] flex items-center justify-center border-solid border-[2px] border-[#2DA771] text-[#2DA771] rounded-full"
              onClick={handleButtonClick}
            >
              +
            </button>
          ) : (
            <button
              className="w-[20px] h-[20px] flex items-center justify-center border-solid border-[2px] border-[#2DA771] text-[#2DA771] rounded-full"
              onClick={handleButtonClick}
            >
              <span className="mb-[3px]">x</span>
            </button>
          )}
        </div>

        {showSearch && (
          <div className="search-box absolute top-1/2 transform -translate-y-1/2 right-[-147%] w-full bg-white border border-[#2DA771] rounded-full p-4">
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none p-3 rounded-[10px]"
            />

            <div className="absolute bg-white border-[1px] shadow-lg bottom-[-60px] w-full rounded-[15px]">
              {/* <ul className="mt-2 max-h-40 overflow-y-auto">
                {groupedGenerals.map((node, index) => (
                  <li
                    key={index}
                    className="p-2 mb-2 cursor-pointer"
                    onClick={() => handleNodeClick(node)}
                  >
                    {node.data.label}
                  </li>
                ))}
              </ul> */}

              <ul className="mt-2 max-h-40 overflow-y-auto">
                {Object.entries(groupedGenerals)?.map(([category, nodes]) =>
                  nodes.map((nodeWrapper, index) => (
                    <li
                      key={index}
                      className="p-2 mb-2 cursor-pointer"
                      onClick={() => handleNodeClick(nodeWrapper.node)}
                    >
                      {nodeWrapper.node.data.label}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* <div
            style={{
                width: "400px",
                height: "400px",
                border: "2px dashed #2DA771",
                background: "transparent",
                position: "relative",
            }}
        >
            <h1>FanOut</h1>

            <div className="node-edge absolute top-1/2 transform -translate-y-1/2 right-[-80px] flex items-center border">
                <div className="h-px border-t-2 border-dashed border-[#2DA771] w-[65px] mr-1" />
                <button
                    className="w-5 h-5 bg-white border-2 border-[#2DA771] rounded-full flex items-center justify-center text-[#2DA771] text-lg font-bold transform translate-x-1/2 -translate-y-1/2 p-0 m-0 leading-none"
                    onClick={handleButtonClick}
                >
                    +
                </button>
            </div>

            {showSearch && (
                <div className="search-box absolute top-full left-0 mt-2 w-full bg-white border border-[#2DA771] rounded p-2">
                    <input
                        type="text"
                        placeholder="Search nodes..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-[#2DA771] rounded"
                    />
                    <ul className="mt-2 max-h-40 overflow-y-auto">
                        {filteredNodes.map((node, index) => (
                            <li key={index} className="p-2 border-b border-[#2DA771] cursor-pointer" onClick={() => handleNodeClick(node)}>
                                {node.data.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div> */}
    </div>
  );
};

export default FanOut;
