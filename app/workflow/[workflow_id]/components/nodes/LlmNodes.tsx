import React, { memo, useCallback, useState } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { type ShortTextNodeProps } from "./types";
import DynamicInput from "../DynamicInputs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    addVariable,
    deleteNodeById,
    removeNodeById,
    updateNodeById,
    updateNodeParameter,
} from "@/lib/features/workflow/node.slice";
import { extractParameterValues } from "@/utils/dataResolver";
import { VariableNameProps, WorkflowNodeState } from "@/types/workflows";
import { getVariableName, isSpecialType } from "@/utils/helper";
import { useSnackbar } from "../snackbar/SnackbarContext";

const LlmNodes = memo(
    ({
        data,
        isConnectable,
        id,
        positionAbsoluteX,
        positionAbsoluteY,
    }: NodeProps<ShortTextNodeProps>) => {
        // const { parameters, nodeMasterId } = data;
        const dispatch = useAppDispatch();
        const { success } = useSnackbar();
        const { workFlowData } = useAppSelector(state => state.workflows);
        const { isLoading, variables, nodes } = useAppSelector(
            state => state.nodes
        );

        const node = useAppSelector(state =>
            state.nodes.nodes.find(node => node.id === id)
        );

        const { setNodes } = useReactFlow();

        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
        const [isEdit, setIsEdit] = useState(true);
        const [variableNames, setVariableNames] = useState<VariableNameProps[]>([]);
        const [dependencies, setDependencies] = useState<
            { key: string; nodeId: string }[]
        >([]);
        const [focusedInputKey, setFocusedInputKey] = useState<string | null>(null);

        const handleToggleAdvancedOptions = () => {
            setShowAdvancedOptions(!showAdvancedOptions);
        };

        const handleDropdownClick = () => {
            setIsDropdownOpen(!isDropdownOpen);
        };

        const handleInputChange = useCallback(
            (key: any, type: any, value: any, dependency?: string) => {
                console.log("key-->", key, "type-->", type, "value-->", value);

                console.log("dependencies-->", dependency);

                dispatch(updateNodeParameter({ nodeId: id, key, type, value }));

                if (!isSpecialType(type)) return;

                if (value && value.includes("$")) {
                    const index = nodes.findIndex(nds => nds.id === id);
                    const variableName = getVariableName(nodes, index);
                    console.log("variableName-->", variableName);
                    if (dependency) {
                        setDependencies(prevDependencies => {
                            const newDependency = { key, nodeId: dependency };
                            const uniqueDependencies = new Set([
                                ...prevDependencies,
                                newDependency,
                            ]);
                            return Array.from(uniqueDependencies);
                        });
                    }
                    const regex = /\$(?!\s*$).+/;
                    if (regex.test(value)) {
                        setVariableNames([]);
                    } else {
                        setVariableNames(
                            variableName.filter(
                                (name): name is VariableNameProps => name !== null
                            )
                        );
                    }
                } else {
                    setDependencies(pre => pre.filter(dep => dep.key !== key));
                    setVariableNames([]);
                }
            },
            [dispatch, id, nodes, dependencies, variableNames]
        );


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
                        variableType: "llms",
                    })
                );

                try {
                    const bodyPayload = {
                        workflowId: workFlowData._id,
                        nodeMasterId: node.data.nodeMasterId,
                        position: { x: positionAbsoluteX, y: positionAbsoluteY },
                        dependencies: dependencies.map(dps => dps.nodeId),
                        parameters: updatedValue,
                    };

                    await dispatch(
                        updateNodeById({
                            id: id,
                            data: bodyPayload as unknown as WorkflowNodeState,
                        })
                    );
                    success("Node updated successfully");
                    setIsEdit(false);
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

        const handleEditClick = () => {
            setIsEdit(!isEdit);
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
                            <div className="form-box">
                                {node?.data?.parameters &&
                                    Object.entries(node.data.parameters)
                                        .filter(
                                            ([key, param]: any) =>
                                                param.required || showAdvancedOptions
                                        )
                                        .map(([key, param]) => {
                                            return (
                                                <DynamicInput
                                                    key={key}
                                                    inputKey={key}
                                                    param={param}
                                                    handleInputChange={
                                                        isEdit ? handleInputChange : () => { }
                                                    }
                                                    variableNames={variableNames}
                                                    focusedInputKey={focusedInputKey}
                                                    setFocusedInputKey={setFocusedInputKey}
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

                                {isEdit ? (
                                    <div className="submit-button">
                                        <button
                                            onClick={handleNextClick}
                                            className=" bg-transparent border-2 border-[#2DA771] text-[#2DA771] text-sm font-medium p-3 w-full rounded-[10px]"
                                        >
                                            {isLoading ? (
                                                <div className="flex justify-center items-center">
                                                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                                                </div>
                                            ) : (
                                                "Save"
                                            )}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="submit-button">
                                        <button
                                            onClick={handleEditClick}
                                            className=" bg-transparent border-2 border-[#2DA771] text-[#2DA771] text-sm font-medium p-3 w-full rounded-[10px]"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export default LlmNodes;
