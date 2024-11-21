import React from "react";
import Image from "next/image";
import { AllData } from "../../data";
import { addNode, removeNode } from "@/lib/features/workflow/node.slice";
import { NodeState } from "@/types/workflows";
import { useAppDispatch } from "@/lib/hooks";

const LllmsCategory = ({ setNodes }: any): React.ReactElement => {

    const dispatch = useAppDispatch();

    const llmsData = AllData.filter(item => item.category === "llms");

    const groupedModels = llmsData.reduce(
        (acc: { [key: string]: typeof llmsData }, model) => {
            if (!acc[model.subCategory]) {
                acc[model.subCategory] = [];
            }
            acc[model.subCategory].push(model);
            return acc;
        },
        {}
    );

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

    const handleDragStart = (event: React.DragEvent, item: NodeState) => {
        dispatch(addNode(item));
        event.dataTransfer.effectAllowed = "move";
    };


    return (
        <div className="absolute w-4/5 h-[500px] top-[120px] rounded-2xl overflow-y-auto backdrop-blur-sm shadow-md">
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
                            />
                        </div>
                    </div>

                    <hr className="border-0 border-t border-gray-300 my-5" />
                </div>


                <div className="flex flex-wrap h-full overflow-y-auto">
                    {Object.keys(groupedModels).map((subCategory, index) => (
                        <div key={index.toString()} className="mb-2.5 w-full">
                            <h3 className="text-base leading-6 font-normal text-[#878787]">
                                {subCategory}
                            </h3>
                            <div className="flex flex-wrap pt-1">
                                {groupedModels[subCategory].map(item => (
                                    <div
                                        key={item.id}
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
                                            {item.image && (
                                                <Image
                                                    src={item.image.src}
                                                    alt={item.image.alt}
                                                    width={item.image.width}
                                                    height={item.image.height}
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
    );
};

export default LllmsCategory;
