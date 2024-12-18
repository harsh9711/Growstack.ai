import React, { useEffect } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";

const DropDown: React.FC<DynamicInputProps> = ({ param, inputKey, handleInputChange }) => {
  // useEffect(() => {
  // if(param.value)
  // if (!param.value && param.options && param.options.length > 0) {
  //   handleInputChange(inputKey, param.type, param.required ? param.options[0].value : "");
  // }
  // }, []);

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
        <select
          id="options"
          name="options"
          className="form-control outline-0 shadow-none w-full p-3 cursor-pointer rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
          required={!!param.required}
          value={param?.value || ""}
          onChange={e =>
            handleInputChange(inputKey, param.type, e.target.value)
          }
          disabled={!!param?.disabled}
        >
          <option value="" disabled>
            Select value
          </option>
          {param?.options &&
            param.options.map((option: any, index: number) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
        {param?.error && (
          <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
        )}
      </div>
    </div>
  );
};

export default DropDown;
