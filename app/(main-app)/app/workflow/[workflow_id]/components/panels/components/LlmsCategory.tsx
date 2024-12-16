import React, { useState } from "react";
import Image from "next/image";
import {
    addNode,
    addNodeData,
    createNode,
    removeNode,
} from "@/lib/features/workflow/node.slice";
import { NodeState } from "@/types/workflows";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { convertNodeData } from "@/utils/dataResolver";
import { calculateNextNodePosition } from "@/utils/helper";
import { unwrapResult } from "@reduxjs/toolkit";

const LllmsCategory = ({ setNodes }: any): React.ReactElement => {
    const dispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const { isLoading, masterNode } = useAppSelector(state => state.masterNode);
    const { workFlowData } = useAppSelector(state => state.workflows);
    const { nodes } = useAppSelector(state => state.nodes);
    if ((masterNode && !masterNode.length) || !masterNode) {
        return <div>Data not found</div>;
    }

    const llmsData = masterNode?.filter(
        item => item.category.toLocaleLowerCase() === "llms"
    );
    const modifiedNodes = llmsData.map(convertNodeData);

    const initialGroupedModels = modifiedNodes.reduce(
        (acc: { [key: string]: typeof modifiedNodes }, model) => {
            if (!acc[model.subCategory]) {
                acc[model.subCategory] = [];
            }
            acc[model.subCategory].push(model);
            return acc;
        },
        {}
    );

    const filteredGroupedModels = Object.keys(initialGroupedModels).reduce(
        (acc: { [key: string]: typeof modifiedNodes }, subCategory) => {
            const filteredModels = initialGroupedModels[subCategory].filter(model =>
                model.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            
            if (filteredModels.length > 0) {
                acc[subCategory] = filteredModels;
            }
            return acc;
        },
        {}
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

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

            if (newNode.data.label === "Generate Image") {
                const { model, numberOfImages, quality, prompt, style, size } = newNode
                    .data.parameters as unknown as any;

                newNode.data.parameters = {
                    ...newNode.data.parameters,
                    model: {
                        ...model,
                        value: "dall-e-3",
                    },
                    numberOfImages: {
                        ...numberOfImages,
                        value: 1,
                        disabled: true,
                    },
                    quality: {
                        ...quality,
                        value: "hd",
                    },
                    prompt: {
                        ...prompt,
                        maxLength: 4000,
                    },
                    style: {
                        ...style,
                        value: "vivid",
                    },
                    size: {
                        ...size,
                        options: [
                            {
                                label: "1024x1024",
                                value: "1024x1024",
                            },
                            {
                                label: "1792x1024",
                                value: "1792x1024",
                            },
                            {
                                label: "1024x1792",
                                value: "1024x1792",
                            },
                        ],
                    },
                };
            }

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
        <div className="absolute w-[470px] h-[500px] top-[120px] rounded-2xl overflow-y-auto backdrop-blur-sm drop-shadow-2xl">
            <div className="bg-white p-5 pt-0">
                <div className="sticky top-0 z-10 bg-white">
                    <div className="flex items-center justify-between pt-5">
                        <h4 className="text-xl font-medium text-[#14171B] leading-6">
                            AI Assistants
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
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    <hr className="border-0 border-t border-gray-300 my-5" />
                </div>

                <div className="flex flex-wrap h-full overflow-y-auto">
                    {Object.keys(filteredGroupedModels).map((subCategory, index) => (
                        <div key={index.toString()} className="mb-2.5 w-full">
                            <h3 className="text-base leading-6 font-normal text-[#878787]">
                                {subCategory}
                            </h3>
                            <div className="flex flex-wrap pt-1">
                                {filteredGroupedModels[subCategory].map((item, _) => {
                                    return (
                                        <div
                                            key={_.toString()}
                                            onClick={() => handleClick(item.node)}
                                            className="h-[92px] w-[130px] bg-transparent m-1 rounded-lg flex justify-center items-center cursor-pointer border border-[#E5E5E5]"
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
                                                    width={45}
                                                    height={45}
                                                    draggable={false}
                                                />
                                            )}
                                            <p className="text-sm leading-5 font-medium text-[#020817] mt-2">
                                                {item.name}
                                            </p>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LllmsCategory;
