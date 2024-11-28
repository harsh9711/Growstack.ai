import React from "react";
import Image from "next/image";
import { NodeState } from "@/types/workflows";
import { tools } from "@/app/(main-app)/app/automation-hub/workflow-builder/create-workflow/components/data/tools";
import { assistantHeader } from "../../data";

const AiAssistanceCategory = ({ setNodes }: any): React.ReactElement => {
    const [selectedItem, setSelectedItem] = React.useState<number | null>(null);
    const aiAssistant = tools.filter(item => item.category === "Assistant");

    const handleClick = (nodeData: NodeState) => {
        setNodes((prevNodes: NodeState[]) => [
            ...prevNodes,
            { ...nodeData, id: Date.now().toString() },
        ]);
    };

    const handleItemClick = (id: number) => {
        setSelectedItem(id);
    };

    return (
        <div className="absolute w-4/5 h-[500px] top-[120px] rounded-2xl overflow-y-auto backdrop-blur-sm drop-shadow-2xl">
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
                    <hr className="border-none border-t border-[#E5E5E5] my-5" />
                </div>

                <div className="overflow-y-auto">
                    <div className="flex flex-wrap flex-row justify-evenly">
                        {assistantHeader.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-row m-0.5 p-2.5 rounded-lg items-center cursor-pointer ${selectedItem === item.id ? "bg-[#27C9AA]" : "bg-[#E9E9E9]"}`}
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

                    <div className="flex flex-col p-2.5">
                        {aiAssistant.map(item => (
                            <div
                                key={item.id}
                                className="h-auto w-full bg-transparent m-1 rounded-lg flex justify-center items-center cursor-pointer border border-[#E5E5E5] p-3.5"
                            >
                                <div className="h-full w-full rounded-lg bg-white flex items-center">
                                    {item.icon && (
                                        <Image
                                            src={item.icon}
                                            alt="loading"
                                            width={35}
                                            height={35}
                                            draggable={false}
                                            className="h-[50px] w-[50px] rounded-lg"
                                        />
                                    )}

                                    <div className="ml-3.5 w-full">
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg leading-7 font-medium text-[#020817]">
                                                {item.name}
                                            </p>

                                            <p className="text-base font-normal text-[#27C9AA] bg-[#27C9AA]/[0.15] leading-4 text-center p-1.5 rounded-full">
                                                {item.role}
                                            </p>
                                        </div>
                                        <p className="text-sm leading-6 font-normal text-[#5B5D60]">
                                            {item.description.length > 40
                                                ? `${item.description.substring(0, 40)}...`
                                                : item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiAssistanceCategory;
