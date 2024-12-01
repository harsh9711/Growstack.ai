import React, { memo, useState } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { GeneralInputNodeProps } from "./types";
import DynamicInput from "../inputsFields";
import { extractParameterValues } from "@/utils/dataResolver";
import {
    addVariable,
    deleteNodeById,
    removeNodeById,
    updateNodeById,
    updateNodeParameter,
} from "@/lib/features/workflow/node.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { WorkflowNodeState } from "@/types/workflows";

const ShortText = memo(
    ({
        data,
        isConnectable,
        id,
        positionAbsoluteX,
        positionAbsoluteY,
    }: NodeProps<GeneralInputNodeProps>) => {
        // const { parameters, nodeMasterId } = data;


        console.log("id-->", id);

        const { setNodes } = useReactFlow();
        const dispatch = useAppDispatch();

        const { workFlowData } = useAppSelector(state => state.workflows);
        const { isLoading } = useAppSelector(state => state.nodes);
        const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

        const node = useAppSelector(state =>
            state.nodes.nodes.find(node => node.id === id)
        );

        console.log("node-->", JSON.stringify(node, null, 2));

        const [variableName, setVariableName] = useState<string>("");
        const [isNextBoxOpen, setIsNextBoxOpen] = useState(false);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

        const getInputType = (label: string) => {
            switch (label) {
                case "Short Text":
                    return "text";
                case "Long Text":
                    return "text_area";
                case "Number":
                    return "number";
                case "Boolean":
                    return "checkbox";
                case "File Upload":
                    return "button_upload";
                case "Checklist":
                    return "select_option";
                default:
                    return "text";
            }
        };

        const handleDropdownClick = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };

        const handleInputChange = (key: any, type: any, value: any) => {
            console.log("key-->", key, "type-->", type, "value-->", value);
            dispatch(updateNodeParameter({ nodeId: id, key, type, value }));
        };

        const handleNextClick = async () => {
            if (!node?.data?.parameters) return;

            const requiredParams = Object.values(node.data.parameters).filter(
                param => param.required
            );
            const allRequiredParamsFilled = requiredParams.every(
                param => param?.value
            );

            if (allRequiredParamsFilled) {
                const updatedValue = extractParameterValues(node.data.parameters);

                console.log("updatedValue-->", updatedValue);

                dispatch(
                    addVariable({
                        nodeID: id,
                        variableName: node?.data?.parameters?.variableName?.value || "",
                        workflowID: workFlowData._id || "",
                        variableValue:
                            updatedValue.defaultValue ||
                            updatedValue.fileType ||
                            updatedValue.options,
                        variableType: "inputType",
                    })
                );

                try {
                    const bodyPayload = {
                        workflowId: workFlowData._id,
                        nodeMasterId: node.data.nodeMasterId,
                        position: { x: positionAbsoluteX, y: positionAbsoluteY },
                        dependencies: [],
                        parameters: updatedValue,
                    };

                    await dispatch(
                        updateNodeById({
                            id: id,
                            data: bodyPayload as unknown as WorkflowNodeState,
                        })
                    );

                    dispatch(
                        updateNodeParameter({
                            nodeId: id,
                            key: "nextParameter",
                            label: updatedValue.inputLabel,
                            type: getInputType(node?.data?.label),
                            value:
                                updatedValue?.defaultValue ||
                                updatedValue.fileType ||
                                updatedValue.options,
                            placeholder: updatedValue?.placeholder,
                            required: !!updatedValue?.required,
                            description: updatedValue?.description,
                            error: "",
                        })
                    );

                    setIsNextBoxOpen(true);
                } catch (error: any) {
                    console.error("error-->", error?.message);
                }
            } else {
                requiredParams.forEach(param => {
                    const key = node?.data?.parameters
                        ? Object.keys(node.data.parameters).find(
                            k => node.data.parameters?.[k] === param
                        )
                        : undefined;
                    if (key && !param.value) {
                        dispatch(
                            updateNodeParameter({
                                nodeId: id,
                                key: key,
                                type: "error",
                                value: "This field is required",
                            })
                        );
                    }
                });
            }
        };

        const handleToggleAdvancedOptions = () => {
            setShowAdvancedOptions(!showAdvancedOptions);
        };

        const handleDeleteNode = () => {
            setNodes(nds => nds.filter(nds => nds.id !== id));
            dispatch(removeNodeById(id));
            dispatch(deleteNodeById(id));
        };

        return (
            <div>
                <div className="short-text-box relative" id="small-box">
                    <div className="short-text-info-image relative">
                        <div className="short-text text-center">
                            <h4 className="text-sm font-medium text-[#2DA771]">
                                {data?.label || ""}
                            </h4>

                            <input
                                type="text"
                                className="text-xs font-medium text-[#14171B] bg-transparent border-transparent focus:border-transparent focus:ring-0"
                                placeholder="Enter description"
                            />
                        </div>
                        <div className="text-image text-center relative">
                            <div className="absolute pointer-events-auto border border-[#2DA771] h-[20px] w-[20px] rounded-full flex justify-center items-center bg-white">
                                <button
                                    onClick={handleDeleteNode}
                                    className="text-[#000] p-0 m-0 leading-none"
                                >
                                    ×
                                </button>
                            </div>
                            <img
                                src="/assets/node_icon/node-bg.svg"
                                alt="background icon"
                                className="w-[140px] mx-auto"
                            />
                            <img
                                src="/assets/node_icon/short-single.svg"
                                alt="foreground icon"
                                className="w-[30px] mx-auto absolute top-[55px] left-0 right-0"
                            />

                            <div className="absolute top-1/2 transform -translate-y-1/2 right-[-60px] flex items-center">
                                <div className="h-px border-t-2 border-dashed border-[#2DA771] w-[65px] mr-1" />
                                <Handle
                                    id={`${id}-source`}
                                    type="source"
                                    position={Position.Right}
                                    className="w-5 h-5 bg-white border-2 border-[#2DA771] rounded-full flex items-center justify-center text-[#2DA771] text-lg font-bold transform translate-x-1/2 -translate-y-1/2 p-0 m-0 leading-none"
                                    onConnect={params => console.log("handle onConnect", params)}
                                    isConnectable={isConnectable}
                                >
                                    +
                                </Handle>

                                <Handle
                                    type="source"
                                    position={Position.Left}
                                    className="w-[10px] h-[10px] bg-[#2DA771]"
                                    isConnectable={false}
                                />
                            </div>
                        </div>

                        <div
                            className="toggle-button-box absolute right-0 left-0 mx-auto bottom-[-10px] z-10 cursor-pointer"
                            onClick={handleDropdownClick}
                        >
                            <img
                                src="/assets/node_icon/toggle-switch.svg"
                                alt="toggle switch"
                                className="w-[25px] mx-auto"
                                style={{ transform: isDropdownOpen ? "rotate(180deg)" : "" }}
                            />
                        </div>
                    </div>

                    {isDropdownOpen && (
                        <div className="short-text-form bg-white p-4 border-2 border-[#2DA771] rounded-[20px] w-[400px] absolute left-1/2 transform -translate-x-1/2">
                            <div className="short-text-heading bg-[#FFE6FF] p-4 rounded-[16px] mb-2">
                                {data?.icon && (
                                    <img
                                        src={data.icon}
                                        alt={data.label}
                                        className="w-[20px] mb-2"
                                    />
                                )}

                                <h4 className="text-sm font-medium text-[#14171B]">
                                    {data?.label || ""}
                                </h4>
                            </div>
                            {!isNextBoxOpen ? (
                                <div className="form-box">
                                    {node?.data?.parameters &&
                                        Object.entries(node.data.parameters).filter(
                                            ([key, param]: any) =>
                                                param.required || showAdvancedOptions
                                        ).map(([key, param]) => {
                                            if (key === "nextParameter") {
                                                return null;
                                            }
                                            return (
                                                <DynamicInput
                                                    key={key}
                                                    inputKey={key}
                                                    param={param}
                                                    handleInputChange={handleInputChange}
                                                    toggleTooltip={() => { }}
                                                    visibleTooltip={{}}
                                                />
                                            );
                                        })}
                                    <div className="advance-option-button-box mb-3">
                                        <button
                                            onClick={handleToggleAdvancedOptions}
                                            className="w-full text-center bg-transparent border-0 underline text-[12px] text-[#2DA771]"
                                        >
                                            {showAdvancedOptions
                                                ? "Hide Advanced Options"
                                                : "Show Advanced Options"}
                                        </button>
                                    </div>
                                    <div className="submit-button">
                                        <button
                                            onClick={handleNextClick}
                                            className="bg-[#2DA771] text-white text-sm font-medium p-3 w-full rounded-[10px]"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <div className="flex justify-center items-center">
                                                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                                                </div>
                                            ) : (
                                                "Next"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="form-box">
                                    {node?.data?.parameters?.nextParameter && (
                                        <DynamicInput
                                            key="nextParameter"
                                            inputKey="nextParameter"
                                            param={node.data.parameters.nextParameter}
                                            handleInputChange={() => { }}
                                            toggleTooltip={() => { }}
                                            visibleTooltip={{}}
                                        />
                                    )}

                                    {node?.data?.parameters?.variableName?.value && (
                                        <div className="text-box mb-5">
                                            <h4 className="text-[#14171B] flex items-center gap-2 font-medium text-sm">
                                                Variable name:{" "}
                                                <span className="bg-[#FFE6FF] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                                                    {node.data.parameters.variableName.value}
                                                </span>
                                            </h4>
                                        </div>
                                    )}

                                    <div className="submit-button">
                                        <button
                                            onClick={() => {
                                                setIsNextBoxOpen(false);
                                            }}
                                            className=" bg-transparent border-2 border-[#2DA771] text-[#2DA771] text-sm font-medium p-3 w-full rounded-[10px]"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export default ShortText;
