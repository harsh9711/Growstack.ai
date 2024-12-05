import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import React, { useState } from "react";
import { FanOutNodeProps } from "./types";
import { useAppSelector } from "@/lib/hooks";
import { NodeState } from "@/types/workflows";

const FanOut = ({ data, id, isConnectable }: NodeProps<FanOutNodeProps>) => {
    const { setNodes } = useReactFlow();
    const { nodes } = useAppSelector(state => state.nodes);
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleButtonClick = () => {
        setShowSearch(!showSearch);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredNodes = nodes.filter(node =>
        node.data.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNodeClick = (node: NodeState) => {

        const subFlow = {
            id: `a${Date.now()}`,
            type: node.type,
            position: { x: 10, y: 90 },
            data: node.data,
            parentId: id,
            extent: 'parent'
        };

        setNodes((prevNodes: any) => {
            return [...prevNodes, subFlow];
        });

        console.log(node, "sdsd ---dsd");

    }

    return (
        <div
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
        </div>
    );
};

export default FanOut;