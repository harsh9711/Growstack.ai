import React from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";

const TextAreaField: React.FC<DynamicInputProps> = ({
    param,
    inputKey,
    handleInputChange,
    variableNames,
    focusedInputKey,
    setFocusedInputKey,
}) => {
    const handleInputFocus = () => {
        if (!setFocusedInputKey) return;
        setFocusedInputKey(inputKey);
    };
    return (
        <div className="input-box mb-3">
            <div className="label-box flex items-center gap-2 relative mb-1">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}{" "}
                    {param.required && <span className="text-[#CF0000]">*</span>}
                </label>
                <Tooltip
                    description={param?.description || ""}
                    position="bottom-full left-[-23px]"
                />
            </div>

            <div className="nodrag input-group relative">
                <textarea
                    rows={5}
                    placeholder={param.placeholder || ""}
                    value={param?.value || ""}
                    className="form-control outline-0 shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    maxLength={param?.maxLength || 5000}
                    onFocus={handleInputFocus}
                    onChange={e =>
                        handleInputChange(inputKey, param.type, e.target.value)
                    }
                />
                {focusedInputKey === inputKey &&
                    variableNames &&
                    variableNames.length > 0 && (
                        <ul className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-[10px] z-10 overflow-hidden border">
                            {variableNames.map((value: any, index: any) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={e => {
                                        const variableName = e.currentTarget.textContent;
                                        handleInputChange(
                                            inputKey,
                                            param.type,
                                            `${param.value?.trim() || ""}{${variableName}}`,
                                            value.nodeId
                                        );
                                    }}
                                >
                                    {value.variableName}
                                </li>
                            ))}
                        </ul>
                    )}

                {param?.error && (
                    <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
                )}
            </div>
        </div>
    );
};

export default TextAreaField