import React, { useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";


const SelectOption: React.FC<DynamicInputProps> = ({ param, inputKey }) => {
    console.log("SelectOption", param);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div key={inputKey} className="input-box mb-3">
            <div className="label-box flex gap-2 items-center mb-1">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}
                    {param.required && <span className="text-[#CF0000]">*</span>}
                </label>

                <Tooltip
                    description={param?.description || ""}
                    position="bottom-full left-[-23px]"
                />
            </div>

            <div className="input-group border-0 relative overflow-hidden">
                <input
                    type="text"
                    placeholder="Add option"
                    className="form-control outline-0 shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                />

                <button
                    className="option-button absolute right-2 top-4"
                    onClick={toggleDropdown}
                >
                    <img
                        src="/assets/node_icon/add-option-icon.svg"
                        alt="add option icon"
                    />
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 left-0 z-10 mx-auto w-[360px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        {param?.options &&
                            param.options.map((option, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                >
                                    {option.label}
                                </a>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};


export default SelectOption