import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiSelectCheckboxProps {
    param: any;
    inputKey: string;
    handleInputChange: (key: string, type: string, value: any) => void;

}
interface Option {
    label: string;
    value: string;
    category?: string;
}

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
    param,
    inputKey,
    handleInputChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const options: Option[] = param.options || [];
    const selectedValues = param.value || [];

    const handleSelectionChange = (optionValue: string, checked: boolean) => {
        const newValues = checked
            ? [...selectedValues, optionValue]
            : selectedValues.filter((v: string) => v !== optionValue);

        handleInputChange(inputKey, "multiselect_checkbox", newValues);
    };

    return (
        <div className="relative">
            <label className="text-[15px]">{param.label || "Select Options"}</label>
            <div
                className="w-full p-4 h-[46px] border border-gray-100 bg-[#F5F5F5] rounded-lg mt-2 flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-sm">
                    {selectedValues.length
                        ? `${selectedValues.length} items selected`
                        : "Select options"}
                </span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    <div className="p-2 space-y-1">
                        {options.map((option: Option) => (
                            <div
                                key={option.value}
                                className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelectionChange(
                                        option.value,
                                        !selectedValues.includes(option.value)
                                    );
                                }}
                            >
                                <Checkbox
                                    id={option.value}
                                    checked={selectedValues.includes(option.value)}
                                    onCheckedChange={(checked) => {
                                        handleSelectionChange(option.value, !!checked);
                                    }}
                                />
                                <label htmlFor={option.value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full cursor-pointer">
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelectCheckbox;