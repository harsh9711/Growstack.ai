import React from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";

const RangeSlider: React.FC<DynamicInputProps> = ({
  param,
  inputKey,
  handleInputChange,
}) => {
  const stopNodeDrag = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    handleInputChange(inputKey, param.type, newValue);
  };

  return (
    <div className="input-box mb-3 nodrag" key={inputKey}>
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
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={param?.value || 0}
          onChange={handleSliderChange}
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

export default RangeSlider;
