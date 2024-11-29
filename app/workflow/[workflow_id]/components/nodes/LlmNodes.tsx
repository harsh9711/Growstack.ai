import React, { memo, useState } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { type ShortTextNodeProps } from "./types";
import DynamicInput from "../inputsFields";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeNodeById, updateNode, updateNodeById } from "@/lib/features/workflow/node.slice";
import { extractParameterValues } from "@/utils/dataResolver";
import { WorkflowNodeState } from "@/types/workflows";

const LlmNodes = memo(
    ({ data, isConnectable, id, positionAbsoluteX, positionAbsoluteY }: NodeProps<ShortTextNodeProps>) => {
        const { parameters, nodeMasterId } = data;
        const dispatch = useAppDispatch();
        const { nodes, workflows } = useAppSelector(state => state);

        const { setNodes } = useReactFlow();

        const initialParameters =
            parameters &&
            Object.entries(parameters).reduce(
                (acc: { [key: string]: any }, [key, param]: [string, any]) => {
                    acc[key] = {
                        ...param,
                        value: "",
                        error: "",
                    };
                    return acc;
                },
                {}
            );

        const [currentParameter, setCurrentParameter] = useState(initialParameters);
        const [nextParameter, setNextParameter] = useState<{ [key: string]: any }>({
            "6": {
                label: "Topic",
                type: "text_topic",
                required: false,
                options: [],
                description: `Add Topic`,
                value: "",
                error: "",
            },
        });
        const [variableName, setVariableName] = useState<string | null>(null);
        const [isNextBoxOpen, setIsNextBoxOpen] = useState(false);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [visibleTooltip, setVisibleTooltip] = useState<{
            [key: string]: boolean;
        }>({});

        const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

        const handleToggleAdvancedOptions = () => {
            setShowAdvancedOptions(!showAdvancedOptions);
        };

        const handleDropdownClick = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };

        const convertToUnderscore = (value: string): string => {
            return value.toLowerCase().replace(/\s+/g, "_");
        };

        const toggleTooltip = (index: string, isVisible: boolean) => {
            setVisibleTooltip(prevState => ({
                ...prevState,
                [index]: isVisible,
            }));
        };

        const handleUpdateParameter = (id: string) => {
            let updatedData = nodes.nodes.find(node => node.id === id);

            if (updatedData) {
                updatedData = {
                    ...updatedData,
                    data: {
                        ...updatedData.data,
                        parameters: currentParameter,
                    },
                };

                // console.log("---updatedData---", updatedData);
                dispatch(updateNode(updatedData));
            }
        };

        const handleNextClick = async () => {

            console.log("currentParameter-->", currentParameter);
            if (!currentParameter) return;

            const requiredParams = currentParameter
                ? Object.values(currentParameter).filter(param => param.required)
                : [];

            const allRequiredParamsFilled = requiredParams.every(
                param => param.value
            );

            if (allRequiredParamsFilled) {
                console.log("allRequiredParamsFilled-->", allRequiredParamsFilled);
                handleUpdateParameter(id);

                const updatedValue = extractParameterValues(currentParameter);
                console.log("updatedValue-->", updatedValue);

                const nodeIdsWithMatchingVariables = nodes.nodes
                    ?.map((node) => {
                        const nodeVariableName = (node.data.parameters?.variableName as any)?.value;

                        console.log("---nodeVariableName---", nodeVariableName);

                        const matches = Object.values(updatedValue).some((value) => {
                            if (typeof value === "string") {
                                const matchedVariable = value.match(/\$\{([^\}]+)\}/)?.[1];
                                console.log(value, "---matchedVariable---", matchedVariable);

                                return matchedVariable === nodeVariableName;
                            }
                            return false;
                        });

                        console.log("---matches---", matches);

                        return matches ? node.id : null;
                    })
                    ?.filter(Boolean);

                console.log("Matching Node IDs:", nodeIdsWithMatchingVariables);


                console.log("---nodeIdsWithMatchingVariables---", nodeIdsWithMatchingVariables)

                try {
                    const bodyPayload = {
                        workflowId: workflows.workFlowData._id,
                        nodeMasterId,
                        dependencies: nodeIdsWithMatchingVariables,
                        position: { x: positionAbsoluteX, y: positionAbsoluteY },
                        parameters: updatedValue,
                    };

                    await dispatch(
                        updateNodeById({
                            id,
                            data: bodyPayload as unknown as WorkflowNodeState,
                        })
                    );
                } catch (error: any) {
                    console.error("error-->", error?.message);
                } finally {
                }
            } else {
                setCurrentParameter(prevState => {
                    const updatedState = { ...prevState };

                    requiredParams.forEach(param => {
                        const key = prevState
                            ? Object.keys(prevState).find(k => prevState[k] === param)
                            : undefined;
                        if (key && !param.value) {
                            updatedState[key] = {
                                ...(prevState?.[key] ?? {}),
                                error: "This field is required",
                            };
                        }
                    });

                    return updatedState;
                });
            }
        };

        const handleInputChange = (
            key: string,
            type: string,
            value: string | boolean
        ) => {
            if (typeof value === "boolean") {
                setCurrentParameter(prevState => ({
                    ...prevState,
                    [key]: {
                        ...(prevState?.[key] || {}),
                        value: value,
                        error: "",
                    },
                }));
                return;
            }

            setCurrentParameter(prevState => {
                const updatedState = {
                    ...prevState,
                    [key]: {
                        ...(prevState?.[key] || {}),
                        value: type === "text_variable_name" ? convertToUnderscore(value) : value,
                        error: "",
                    },
                };

                if (type === "text_input_label") {
                    const variableNameKey = prevState
                        ? Object.keys(prevState).find(
                            k => prevState[k].type === "text_variable_name"
                        )
                        : undefined;
                    if (variableNameKey) {
                        updatedState[variableNameKey] = {
                            ...(prevState?.[variableNameKey] || {}),
                            value: convertToUnderscore(value),
                            error: "",
                        };
                    }
                }
                if (type === "text_variable_name" || type === "text_input_label") {
                    setVariableName(convertToUnderscore(value));
                }
                return updatedState;
            });
        };

        const handleDeleteNode = () => {
            setNodes(nds => nds.filter(nds => nds.id !== id));
            dispatch(removeNodeById(id));
        };

        return (
            <div>
                <div className="short-text-box relative" id="small-box">
                    <div className="short-text-info-image relative">
                        <div className="short-text text-center">
                            <h4 className="text-sm font-medium text-[#2DA771]">LLM Nodes</h4>
                            <span className="text-xs font-medium text-[#14171B]">
                                ({data?.label || ""})
                            </span>
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
                                src="/assets/node_icon/llm-single.svg"
                                alt="open ai node image"
                            />
                            <img
                                src={data?.icon || "/assets/node_icon/node-bg.svg"}
                                alt="short text icon"
                                className="mx-auto absolute top-[45px] left-0 right-0"
                            />
                            <div className="absolute top-1/2 transform -translate-y-1/2 right-[-60px] flex items-center">
                                <div className="h-px border-t-2 border-dashed border-[#2DA771] w-[60px] mr-1" />
                                <Handle
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
                            <Handle
                                id={`${id}-target`}
                                type="target"
                                position={Position.Left}
                                className="w-[10px] h-[10px] bg-[#2DA771]"
                                isConnectable={false}
                            />
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
                            <div className="node-form-heading-text p-3 bg-[#DAEAF6] rounded-[16px] mb-3">
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
                                    {currentParameter &&
                                        Object.entries(currentParameter)
                                            .filter(
                                                ([key, param]: any) =>
                                                    param.required || showAdvancedOptions
                                            )
                                            .map(([key, param]: any) => {
                                                return (
                                                    <DynamicInput
                                                        key={key}
                                                        inputKey={key}
                                                        param={param}
                                                        handleInputChange={handleInputChange}
                                                        toggleTooltip={toggleTooltip}
                                                        visibleTooltip={visibleTooltip}
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
                                    {variableName && (
                                        <div className="topic-box mb-3">
                                            <div className="topic-text w-auto p-3 inline-block rounded-full bg-[#DAEAF6]">
                                                <h5 className="text-[12px] font-medium text-[#14171B]">
                                                    {variableName}
                                                </h5>
                                            </div>
                                        </div>
                                    )}

                                    <div className="submit-button">
                                        <button
                                            onClick={handleNextClick}
                                            className="bg-[#2DA771] text-white text-sm font-medium p-3 w-full rounded-[10px]"
                                            disabled={nodes.isLoading}
                                        >
                                            {nodes.isLoading ? (
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
                                    {nextParameter &&
                                        Object.entries(nextParameter).map(([key, param]: any) => (
                                            <DynamicInput
                                                key={key}
                                                inputKey={key}
                                                param={param}
                                                handleInputChange={handleInputChange}
                                                toggleTooltip={toggleTooltip}
                                                visibleTooltip={visibleTooltip}
                                            />
                                        ))}

                                    {variableName && (
                                        <div className="text-box mb-5">
                                            <h4 className="text-[#14171B] flex items-center gap-2 font-medium text-sm">
                                                Variable name:{" "}
                                                <span className="bg-[#FFE6FF] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                                                    {variableName}
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

export default LlmNodes;
