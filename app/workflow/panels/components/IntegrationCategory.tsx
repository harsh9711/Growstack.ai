import React from "react";
import Image from "next/image";
import { AllData } from "../../data";
import { useDispatch } from "react-redux";
import { addNode } from "@/lib/features/workflow/node.slice";
import { NodeDataState, NodeState } from "@/types/workflows";

const IntegrationCategory = ({ setNodes }: any): React.ReactElement => {
    const integrationData = AllData.filter(
        item => item.category === "integrations"
    );

    const [selectedSubCategory, setSelectedSubCategory] =
        React.useState<string>("CRM");

    const groupedIntegrations = integrationData.reduce(
        (acc: { [key: string]: typeof integrationData }, model) => {
            if (!acc[model.subCategory]) {
                acc[model.subCategory] = [];
            }
            acc[model.subCategory].push(model);
            return acc;
        },
        {}
    );

    const handleClick = (nodeData: NodeState) => {
        setNodes((prevNodes: NodeState[]) => [
            ...prevNodes,
            { ...nodeData, id: Date.now().toString() },
        ]);
    };

    return (
        <div className="absolute bg-white w-4/5 h-[500px] top-[120px] rounded-2xl overflow-y-auto backdrop-blur-sm shadow-md">
            <div className="bg-white p-5 pt-0" >
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
                            />
                        </div>
                    </div>
                </div>

                <div className="h-full overflow-y-auto flex flex-col">
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                        {Object.keys(groupedIntegrations).map((subCategory, index) => (
                            <ul key={index.toString()} className="m-2">
                                <li
                                    className={`p-2.5 rounded-lg cursor-pointer ${selectedSubCategory === subCategory ? 'bg-[#F88390]' : 'bg-[#E9E9E9]'
                                        }`}
                                    onClick={() => setSelectedSubCategory(subCategory)}
                                >
                                    <p
                                        className={`text-[12px] leading-6 font-normal ${selectedSubCategory === subCategory ? 'text-[#ffffff]' : 'text-[#14171B]'
                                            } font-weight-400`}
                                    >
                                        {subCategory}
                                    </p>
                                </li>
                            </ul>
                        ))}
                    </div>

                    <div className="flex flex-wrap p-2.5">
                        {groupedIntegrations[selectedSubCategory].map((item, _) => (
                            <div
                                key={_.toString()}
                                onClick={() => handleClick(item.node)}
                                className="h-[118px] w-[116px] bg-transparent m-1 rounded-lg flex justify-center items-center cursor-pointer border border-[#E5E5E5]"
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
                                    <p className="text-sm leading-5 font-medium text-[#020817] mt-2 text-center">
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
