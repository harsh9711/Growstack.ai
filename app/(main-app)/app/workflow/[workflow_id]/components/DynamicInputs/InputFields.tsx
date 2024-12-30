import { DynamicInputProps } from "@/types/workflows";
import { getTypeFromParam } from "@/utils/dataResolver";
import React, { memo } from "react";
import Tooltip from "../tooltip/Tooltip";

const InputFields: React.FC<DynamicInputProps> = ({
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
        <div key={inputKey} className="input-box mb-3">
            <div className="label-box flex gap-2 items-center mb-1 relative">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}{" "}
                    {param.required && <span className="text-[#CF0000]">*</span>}
                </label>

                <Tooltip
                    description={param?.description || ""}
                    position="bottom-full left-[-23px]"
                />
            </div>
            <div className="nodrag input-group">
                <input
                    type={getTypeFromParam(param.type)}
                    value={param?.value || ""}
                    placeholder={param?.placeholder || ""}
                    className="nopan nodrag form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                    required={!!param.required}
                    onChange={e => {
                        if (param?.maxValue && param.type === 'number' && e.target.value > param?.maxValue) return;
                        handleInputChange(inputKey, param.type, e.target.value)
                    }}
                    onFocus={handleInputFocus}
                    max={getTypeFromParam(param.type) === "number" ? param?.maxValue : undefined}
                    disabled={!!param?.disabled}
                />
                {focusedInputKey === inputKey &&
                    variableNames &&
                    variableNames.length > 0 && (
                        <ul className="absolute top-[49%] left-[17px] mt-1 w-full bg-white shadow-lg rounded-[10px] z-10 overflow-hidden border">
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

export default memo(InputFields);
