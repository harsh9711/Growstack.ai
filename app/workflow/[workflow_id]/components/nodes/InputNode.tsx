import React, { useState } from "react";
import { type NodeProps } from "@xyflow/react";
import { type ShortTextNodeProps } from "./types";
import DynamicInput from "../inputsFields";

const InputNode = ({ data, id }: NodeProps<ShortTextNodeProps>) => {
    const { parameters, label, icon } = data as {
        parameters: any;
        label: string;
        icon?: string;
    };
    // const { parameters, label, icon } = data;
    const [newParameters, setNewParameters] = useState({});
    const [variableName, setVariableName] = useState<string | null>(null);
    const [isNextBoxOpen, setIsNextBoxOpen] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [visibleTooltip, setVisibleTooltip] = useState<{
        [key: string]: boolean;
    }>({});

    const toggleTooltip = (index: string, isVisible: boolean) => {
        setVisibleTooltip(prevState => ({
            ...prevState,
            [index]: isVisible,
        }));
    };

    const handleNextClick = () => {
        setIsNextBoxOpen(true);
    };

    const handleEditClick = () => {
        setIsNextBoxOpen(false);
    };

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === "3" && value && parameters) {
            const newKey = Object.keys(parameters).length.toString();
            setNewParameters(prevState => ({
                ...prevState,
                [newKey]: {
                    label: value,
                    type: "text",
                    required: true,
                    options: [],
                    description: `Add ${value}`,
                },
            }));
            setVariableName(value);
        }
    };

    return (
        <div>
            <div className="short-text-box relative" id="small-box">
                <div className="short-text-info-image relative">
                    <div className="short-text text-center">
                        <h4 className="text-sm font-medium text-[#2DA771]">
                            General input
                        </h4>
                        <span className="text-xs font-medium text-[#14171B]">
                            ({label}){" "}
                        </span>
                    </div>

                    <div className="text-image text-center">
                        <img
                            src="/assets/node_icon/shorttext-img.png"
                            alt="short text icon"
                            className="w-[140px] mx-auto"
                        />
                    </div>
                    <div
                        className="toggle-button-box absolute right-0 left-0 mx-auto bottom-[-10px] z-10 cursor-pointer"
                        onClick={handleDropdownClick}
                    >
                        <img
                            src="/assets/node_icon/toggle-switch.png"
                            alt="toggle switch"
                            className="w-[25px] mx-auto"
                            style={{ transform: isDropdownOpen ? "rotate(180deg)" : "" }}
                        />
                    </div>
                </div>

                {isDropdownOpen && (
                    <div className="short-text-form bg-white p-4 border-2 border-[#2DA771] rounded-[20px] w-[400px] absolute left-1/2 transform -translate-x-1/2">
                        <div className="short-text-heading bg-[#FFE6FF] p-4 rounded-[16px] mb-2">
                            <img src={icon} alt="short text icon" className="w-[20px] mb-2" />

                            <h5 className="text-sm text-[#14171B] font-medium"> {label}</h5>
                        </div>
                        {isNextBoxOpen ? (
                            <div className="form-box">
                                {parameters &&
                                    Object.entries(parameters).map(([key, param]: any) => {
                                        { console.log("key---->", Object.entries(parameters)) }
                                        { console.log("key---->", key) }
                                        return (
                                            // <DynamicInput
                                            //     key={key}
                                            //     param={param}
                                            //     handleInputChange={handleInputChange}
                                            //     toggleTooltip={toggleTooltip}
                                            //     visibleTooltip={visibleTooltip}
                                            // />
                                            <></>
                                        )
                                    })}
                                <div className="submit-button">
                                    <button
                                        onClick={handleEditClick}
                                        className="bg-[#2DA771] text-white text-sm font-medium p-3 w-full rounded-[10px]"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="form-box">
                                {newParameters &&
                                    Object.entries(newParameters).map(([key, param]: any) => (
                                        <div key={key} className="input-box mb-3">
                                            <div className="label-box flex gap-2 items-center mb-1 relative">
                                                <label className="font-medium text-[#14171B] text-[12px]">
                                                    {param.label}{" "}
                                                    {param.required && (
                                                        <span className="text-[#CF0000]">*</span>
                                                    )}
                                                </label>
                                                <span
                                                    onMouseEnter={() => toggleTooltip(key, true)}
                                                    onMouseLeave={() => toggleTooltip(key, false)}
                                                    className="cursor-pointer"
                                                >
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <circle
                                                            cx="9"
                                                            cy="9"
                                                            r="6.75"
                                                            stroke="#C3C3C3"
                                                            strokeWidth="0.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M9.00406 6H9.01156"
                                                            stroke="#C3C3C3"
                                                            strokeWidth="0.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8.25 9H9V12H9.75"
                                                            stroke="#C3C3C3"
                                                            strokeWidth="0.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                                {visibleTooltip[key] && (
                                                    <div className="absolute bottom-[80%] left-[140px] transform -translate-x-1/2 mb-2 w-max bg-white text-black text-xs p-2 rounded shadow-lg z-10">
                                                        {param.description}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="input-group">
                                                <input
                                                    type={param.type}
                                                    placeholder={`Enter ${param.label.toLowerCase()}`}
                                                    className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                                                    onChange={e => handleInputChange(key, e.target.value)}
                                                />
                                            </div>
                                        </div>
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
                                        onClick={handleNextClick}
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

export default InputNode;
