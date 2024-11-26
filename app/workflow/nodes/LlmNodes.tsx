import React, { useState } from "react";
import { type NodeProps } from "@xyflow/react";
import { type ShortTextNodeProps } from "./types";
import DynamicInput from "../inputsFields";

const LlmNodes = ({ data, id }: NodeProps<ShortTextNodeProps>) => {
    const { parameters } = data;

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

    const handleNextClick = () => {
        const requiredParams = currentParameter
            ? Object.values(currentParameter).filter(param => param.required)
            : [];

        const allRequiredParamsFilled = requiredParams.every(param => param.value);

        if (allRequiredParamsFilled) {
            setIsNextBoxOpen(true);
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

            setNextParameter(prevState => ({
                ...prevState,
                "6": {
                    ...prevState["6"],
                    required: value,
                },
            }));
            return;
        }

        setCurrentParameter(prevState => {
            const updatedState = {
                ...prevState,
                [key]: {
                    ...(prevState?.[key] || {}),
                    value: value,
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
                        <img
                            src="/assets/node_icon/llm-single.svg"
                            alt="open ai node image"
                        />
                        <img
                            src={data?.icon || "/assets/node_icon/node-bg.svg"}
                            alt="short text icon"
                            className="w-[30px] mx-auto absolute top-[45px] left-0 right-0"
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
                                {" "}
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
                                {/* <div className="topic-box mb-3">
                                    <div className="topic-text w-auto p-3 inline-block rounded-full bg-[#DAEAF6]">
                                        <h5 className="text-[12px] font-medium text-[#14171B]">
                                            topic
                                        </h5>
                                    </div>
                                </div> */}
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
};

export default LlmNodes;
