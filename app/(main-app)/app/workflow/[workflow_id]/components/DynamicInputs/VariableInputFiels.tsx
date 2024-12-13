import { DynamicInputProps } from "@/types/workflows";
import { getTypeFromParam } from "@/utils/dataResolver";
import React from "react";
import Tooltip from "../tooltip/Tooltip";

const VariableInputFields: React.FC<DynamicInputProps> = ({
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
            {param && param?.disabled === true ? (
                <div className="text-box mb-5">
                    <h4 className="text-[#14171B] flex items-center gap-2 font-medium text-sm">
                        <span className="bg-[#FCF4DD] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                            {param?.value || ""}
                        </span>
                    </h4>
                </div>
            ) : (
                <div className="nodrag input-group">
                    <input
                        type={getTypeFromParam(param.type)}
                        value={param?.value || ""}
                        placeholder={param?.placeholder || ""}
                        className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                        required={!!param.required}
                        onChange={e =>
                            handleInputChange(inputKey, param.type, e.target.value)
                        }
                        onFocus={handleInputFocus}
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
            )}
        </div>
    );
};

export default VariableInputFields;
