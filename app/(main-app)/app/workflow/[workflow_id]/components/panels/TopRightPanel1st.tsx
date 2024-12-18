import React, { useState } from "react";
import Image from "next/image";
import { dummyData2 } from "../data";
import instance, { automation, CustomAxiosInstance } from "@/config/axios.config";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addVariable } from "@/lib/features/workflow/node.slice";

const TopRightPanel1st = (): React.ReactElement => {
    const dispatch = useAppDispatch();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { workFlowData } = useAppSelector(state => state.workflows);
    const { variables, nodes } = useAppSelector(state => state.nodes);
    console.log("variables--->", nodes);

    const runWorkFlow = async () => {
        try {
            const data = variables
                .filter((variable, index) => variable.variableType === "inputType" && index === 0)
                ?.map(variable => ({
                    variableName: variable.variableName,
                    variableValue: variable.variableValue,
                }));

            console.log("data", data);

            if (!workFlowData._id) return;

            // const result = await CustomAxiosInstance().post(
            //     `/workflow/${workFlowData?._id}/run/`,
            //     data
            // );

            const result = await instance.post(`${automation}/workflow/${workFlowData?._id}/run/`, data);
            console.log("Run Workflow", result);
        } catch (error) {
            console.log("Run Workflow Error", error);
        }
    };

    const handleInputChange = (
        nodeID: string,
        variableName: string,
        variableValue: string,
        workflowID: string
    ) => {
        dispatch(
            addVariable({
                nodeID,
                variableName,
                variableValue,
                workflowID,
                variableType: "inputType",
            })
        );
    };

    const openPopup = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="flex items-center">
            {dummyData2.map((item, index) => (
                <div
                    key={index.toString()}
                    className="h-[44px] w-[54px] border-2 border-white flex justify-center rounded-lg items-center bg-gradient-to-b from-[#F8F8FA] to-[#F8F8FA] mx-2.5 cursor-pointer"
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                    />
                </div>
            ))}

            <button
                className="h-[52px] w-[98px] bg-[#2DA771] rounded-lg text-white"
                onClick={openPopup}
            >
                Publish
            </button>

            {isPopupVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center flex-col">
                        {variables
                            .filter(variable => variable.variableType === "inputType")
                            ?.map((variable, index) => (
                                <div key={index} className="flex flex-col mx-2.5 my-2">
                                    <label className="text-sm text-gray-700">
                                        {variable.variableName}
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={variable.variableValue || ""}
                                        value={variable.variableValue}
                                        onChange={e =>
                                            handleInputChange(
                                                variable.nodeID,
                                                variable.variableName,
                                                e.target.value,
                                                variable.workflowID
                                            )
                                        }
                                        className="h-[44px] w-[150px] border-2 border-gray-300 rounded-lg px-2"
                                    />
                                </div>
                            ))}

                        <button
                            className="h-[45px] w-[80px] bg-[#2DA771] rounded-lg text-white"
                            onClick={runWorkFlow}
                        >
                            Run
                        </button>
                        <button
                            className="h-[45px] w-[80px] bg-[#2DA771] rounded-lg text-white mt-2"
                            onClick={closePopup}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default TopRightPanel1st;
