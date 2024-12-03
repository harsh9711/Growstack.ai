import React, { useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";

const RangeSlider: React.FC<DynamicInputProps> = ({ param, inputKey, handleInputChange }) => {
    // const [value, setValue] = useState(57.194);
    const value = 57.194

    // const handleSliderChange = (e: { target: { value: any } }) => {
    //     const newValue = e.target.value;
    //     setValue(newValue);
    // };

    const stopNodeDrag = (event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation();
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

            <div className="input-group">
                <div className="range-slider-box flex w-full mx-auto items-center justify-center">
                    <div className="py-1 relative w-full">
                        <div className="h-2 bg-[#F2F2F2] rounded-full">
                            <div
                                className="absolute h-2 rounded-full bg-[#2DA771]"
                                style={{ width: `${param?.value || value}%`, left: "0" }}
                            ></div>
                            <div
                                className="absolute h-4 w-4 bg-[#2DA771] shadow border border-[#2DA771] rounded-full cursor-pointer"
                                unselectable="on"
                                style={{ left: `${param?.value || value}%`, top: "0" }}
                            >
                                <span className="sr-only">Slider thumb</span>
                            </div>
                        </div>
                    </div>
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={param?.value || ""}
                    // onChange={handleSliderChange}
                    onChange={e =>
                        handleInputChange(inputKey, param.type, e.target.value)
                    }
                    onMouseDown={stopNodeDrag}
                    onTouchStart={stopNodeDrag}
                    className="w-full"
                />

                <div className="range-text flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#5B5D60]">0</span>
                    <span className="text-[12px] font-medium text-[#5B5D60]">1</span>
                </div>
            </div>
        </div>
    );
};

export default RangeSlider