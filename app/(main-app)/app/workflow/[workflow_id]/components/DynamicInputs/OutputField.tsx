import React from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";

const OutputField: React.FC<DynamicInputProps> = ({ param, inputKey, handleInputChange }) => {
    return (
        <div key={inputKey} className="input-box mt-3 mb-3">
            <div className="label-box flex gap-2 items-center mb-1">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}
                    <span>
                        {param.required && <span className="text-[#CF0000]">*</span>}
                    </span>
                </label>
                <Tooltip
                    description={param?.description || ""}
                    position="bottom-full left-[-23px]"
                />
                {param?.error && (
                    <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
                )}
            </div>

            {param?.options &&
                param.options.map((option, index) => (
                    <div className="text-box mb-5">
                        <h4 className="text-[#14171B] flex items-center gap-2 font-medium text-sm">
                            <span className="bg-[#FCF4DD] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                                {option.label}
                            </span>
                        </h4>
                    </div>
                ))}
        </div>
    );
};

export default OutputField;
