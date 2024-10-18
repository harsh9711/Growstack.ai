import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { InputType } from "@/types/common";

interface DropdownProps {
  option: InputType;
  setActiveAction: (params: any) => void;
  index: number;
}

const Dropdown = ({ option, setActiveAction, index }: DropdownProps) => {
  const initialSelectedOption =
    option.variable_value ||
    (Array.isArray(option.variable_values) && option.variable_values.length > 0
      ? option.variable_values[0]
      : "");

  const [selectedOption, setSelectedOption] = useState<string>(
    initialSelectedOption
  );

  let dropDownOptions: { label: string; value: string }[] = (
    Array.isArray(option.variable_values)
      ? option.variable_values
      : [option.variable_values]
  )
    .filter(value => value !== "")
    .map((value: any) => ({
      label: value,
      value: value,
    }));

  if (dropDownOptions.length === 0 && option.variable_value) {
    dropDownOptions = [
      { label: option.variable_value, value: option.variable_value },
    ];
  }

  const selectedOptionLabel = dropDownOptions.find(
    opt => opt.value === selectedOption
  )?.label;

  useEffect(() => {
    setActiveAction((prevState: any) => ({
      ...prevState,
      preset_json: {
        ...prevState.preset_json,
        body: prevState.preset_json.body.map((input: InputType, i: number) => {
          if (i === index && input.variable_type === "DROPDOWN") {
            return {
              ...input,
              variable_value: selectedOption,
            };
          }
          return input;
        }),
      },
    }));
  }, [selectedOption]);

  return (
    <React.Fragment>
      <div className="font-medium mb-2 capitalize text-xl">
        {option.variable_label}
      </div>
      <Select value={selectedOption} onValueChange={setSelectedOption}>
        <SelectTrigger className="w-full h-12 rounded-lg border border-primary-green bg-white text-primary-green">
          <SelectValue placeholder="Select an option">
            {selectedOptionLabel && (
              <div className="flex items-center gap-2">
                {selectedOptionLabel}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dropDownOptions.map(
              ({ label, value }: { label: string; value: string }) => (
                <SelectItem key={value} value={value}>
                  <div
                    className={clsx(
                      "flex items-center gap-2",
                      selectedOption === value &&
                        "text-primary-green font-medium"
                    )}
                  >
                    {label}
                  </div>
                </SelectItem>
              )
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </React.Fragment>
  );
};

export default Dropdown;
