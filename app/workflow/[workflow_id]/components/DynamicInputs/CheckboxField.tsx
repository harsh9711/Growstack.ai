import React from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";


const CheckboxField: React.FC<DynamicInputProps> = ({ param, inputKey, handleInputChange }) => {
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
                    <div className="flex items-center space-x-2 mt-2" key={index}>
                        <input
                            type="checkbox"
                            id="example"
                            className="h-[16px] w-[16px] rounded border-[0.5px] border-[#E2E2E2] text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="example"
                            className="text-sm font-medium text-[#14171B]"
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
        </div>
    );
};


export default CheckboxField