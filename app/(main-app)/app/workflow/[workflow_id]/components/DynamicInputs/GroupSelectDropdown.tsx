import React, { useEffect, useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const GroupSelectDropdown: React.FC<DynamicInputProps> = ({
  param,
  inputKey,
  handleInputChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    param?.value
      ? Array.isArray(param.value)
        ? param.value
        : [param.value]
      : []
  );

  useEffect(() => {
    if (!param.value && param.options && param.options.length > 0) {
      handleInputChange(inputKey, param.type, param.options[0].value);
    } else if (param.value) {
      setSelectedValues(
        Array.isArray(param.value) ? param.value : [param.value]
      );
    }
  }, [param, inputKey, handleInputChange]);

  const handleChange = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    handleInputChange(inputKey, param.type, newSelectedValues);
  };

  const handleRemoveBadge = (value: string) => {
    const newSelectedValues = selectedValues.filter(v => v !== value);
    setSelectedValues(newSelectedValues);
    handleInputChange(inputKey, param.type, newSelectedValues);
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
        <Select
          value={selectedValues.join(", ")}
          onValueChange={value => handleChange(value)}
          required={!!param.required}
        >
          <SelectTrigger className="bg-[#F2F2F2] p-3 text-[#14171B] text-[12px] font-medium w-full rounded-[10px] cursor-pointer flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {selectedValues.length > 0 ? (
                selectedValues.map(val => (
                  <span
                    key={val}
                    className="bg-[#2DA771] text-[#fff] text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1"
                  >
                    {val}
                    <button
                      type="button"
                      className="text-[#fff] text-xs"
                      onClick={() => handleRemoveBadge(val)}
                    >
                      &times;
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Select options</span>
              )}
            </div>
          </SelectTrigger>
          <SelectContent>
            {param?.options?.map((option: any) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleChange(option.value)}
                    className="mr-2"
                  />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {param?.error && (
          <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
        )}
      </div>
    </div>
  );
};

export default GroupSelectDropdown;
