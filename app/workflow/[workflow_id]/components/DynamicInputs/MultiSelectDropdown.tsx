import React, { useRef, useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";


const MultiSelectDropdown: React.FC<DynamicInputProps> = ({ param, inputKey, handleInputChange }) => {
    console.log("---param---", param);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleInputSelectChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.target.value);



    const handleRemoveItem = (item: string) => {
        const value = Array.isArray(param.value)
            ? param.value.filter((selected: any) => selected !== item)
            : [];
        handleInputChange(inputKey, param.type, value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            e.key === "Enter" &&
            inputValue.trim() &&
            !selectedItems.includes(inputValue.trim())
        ) {
            const value = Array.isArray(param.value)
                ? [...param.value, inputValue.trim()]
                : [inputValue.trim()];
            handleInputChange(inputKey, param.type, value);
            setInputValue("");
            e.preventDefault();
        }
    };

    return (
        <div className="input-box mb-3" key={inputKey}>
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

            <div ref={containerRef} className="relative w-full max-w-md mx-auto">
                <div className="flex flex-wrap gap-2 items-center p-3 rounded-[10px] bg-[#F2F2F2]">
                    {Array.isArray(param.value) &&
                        param?.value.map((item: any, i: any) => (
                            <div
                                key={i}
                                className="flex items-center bg-[#2DA771] text-[#fff] px-3 py-1 rounded-full text-sm"
                            >
                                {item}
                                <button
                                    onClick={() => handleRemoveItem(item)}
                                    className="ml-2 text-[#fff] hover:text-[#fff]"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}

                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputSelectChange}
                        onFocus={() => setIsOpen(true)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Add Option"
                        className="flex-grow bg-transparent outline-none text-[#14171B] text-sm font-medium"
                    />
                </div>

                <button
                    onClick={toggleDropdown}
                    className="absolute right-2 top-4 text-gray-500 hover:text-gray-700"
                >
                    <img
                        src="/assets/node_icon/add-option-icon.svg"
                        alt="add item"
                        className="w-5 h-5"
                    />
                </button>
            </div>
        </div>
    );
};

export default MultiSelectDropdown