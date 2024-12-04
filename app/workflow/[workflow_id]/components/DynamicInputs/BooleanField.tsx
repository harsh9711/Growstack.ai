import { DynamicInputProps } from "@/types/workflows";
import React from "react";
import Tooltip from "../tooltip/Tooltip";

const BooleanField: React.FC<DynamicInputProps> = ({
    param,
    inputKey,
    handleInputChange,
}) => {
    return (
        <div
            key={inputKey}
            className="input-box flex items-center justify-between mb-3"
        >
            <div className="label-box flex gap-2 items-center mb-1 relative">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}
                    {param.required && <span className="text-[#CF0000]">*</span>}
                </label>
                <Tooltip
                    description={param?.description || ""}
                    position="bottom-full left-[-23px]"
                />
            </div>
            <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type={"checkbox"}
                        className="sr-only peer"
                        checked={!!param.value}
                        onChange={e =>
                            handleInputChange(inputKey, param.type, e.target.checked)
                        }
                    />
                    <div className="w-11 h-6 bg-gray-300 shadow-md peer-focus:outline-none peer-focus:ring-2-none peer-focus:ring-none rounded-full peer-checked:bg-[#2DA771]"></div>
                    <div className="peer-checked:translate-x-5 absolute left-0 top-0 m-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                </label>
            </div>
        </div>
    );
};

export default BooleanField;
