import React, { useEffect, useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

const DropDown: React.FC<DynamicInputProps> = ({ param, inputKey, handleInputChange }) => {

    useEffect(() => {
        if (!param.value && param.options && param.options.length > 0) {
            handleInputChange(inputKey, param.type, param.options[0].value);
        }
    }, []);

    const groupedOptions = param?.options && param.options.reduce((acc: any, option: any) => {
        const category = option.category || "Other";
        if (!acc[category]) acc[category] = [];
        acc[category].push(option);
        return acc;
    }, {});

    console.log(
        param, "param"
    );

    const handleChange = (value: string) => {
        handleInputChange(inputKey, param.type, value);
    };

    return (
        <div key={inputKey} className="input-box mb-3">
            <div className="label-box flex gap-2 items-center mb-1 relative">
                <label className="text-[12px] text-[#14171B] font-medium">
                    {param.label}
                    {param.required && <span className="text-[#CF0000]">*</span>}
                </label>
                <Tooltip
                    description={param?.description || ""}
                    position="bottom-full left-[-23px]"
                />
            </div>
            <div className="input-group">
                {/* <select
                    id="options"
                    name="options"
                    className="form-control outline-0 shadow-none w-full p-3 cursor-pointer rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    required={!!param.required}
                    value={param?.value || ""}
                    onChange={e =>
                        handleInputChange(inputKey, param.type, e.target.value)
                    }
                >
                    {param?.options &&
                        param.options.map((option: any, index: number) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select> */}
                <Select value={param?.value || ""} required={!!param.required} onValueChange={handleChange}>
                <SelectTrigger className="bg-[#F2F2F2] p-3 text-[#14171B] text-[12px] font-medium w-full rounded-[10px] cursor-pointer flex items-center justify-between">
                        <span className="flex flex-col items-start text-[16px] font-semibold text-left">
                            <h3 className="text-[12px] mb-1.5 font-normal text-left">
                                {param.label}
                            </h3>
                            <SelectValue placeholder="Select the allowed file type for upload" />
                        </span>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(groupedOptions).map((el) => (
                            <SelectGroup key={el}>
                                <div className="font-semibold text-[14px] mt-2">{el}</div>
                                {groupedOptions[el].map((option: any) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        ))}
                    </SelectContent>
                </Select>
                {param?.error && (
                    <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
                )}

                <Select>

                </Select>
            </div>
        </div>
    );
};


export default DropDown