import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import clsx from 'clsx';

interface DropdownProps {
  option: any;
  setActiveAction: (params: any) => void;
  index: number;
}

const Dropdown = ({ option, setActiveAction, index }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState(option.input_default_value);

  const dropDownOptions: { label: string; value: string }[] = option.input_values.map(
    (option: any) => ({
      label: option,
      value: option,
    })
  );
  const selectedOptionLabel = dropDownOptions.find((opt) => opt.value === selectedOption)?.label;

  useEffect(() => {
    setActiveAction((prevState: any) => ({
      ...prevState,
      preset_json: {
        ...prevState.preset_json,
        body: {
          ...prevState.preset_json.body,
          inputs: prevState.preset_json.body.inputs.map((input: any, i: number) => {
            if (i === index && input.input_type === 'DROPDOWN') {
              return {
                ...input,
                input_default_value: selectedOptionLabel,
              };
            }
            return input;
          }),
        },
      },
    }));
  }, [selectedOption]);

  return (
    <React.Fragment>
      <div className="font-medium mb-2 capitalize text-xl">{option.input_label}</div>
      <Select value={selectedOption} onValueChange={setSelectedOption}>
        <SelectTrigger className="w-full h-12 rounded-lg border border-primary-green bg-white text-primary-green">
          <SelectValue placeholder="Select an option">
            {selectedOptionLabel && (
              <div className="flex items-center gap-2">{selectedOptionLabel}</div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dropDownOptions.map(({ label, value }: { label: string; value: string }) => (
              <SelectItem key={value} value={value}>
                <div
                  className={clsx(
                    'flex items-center gap-2',
                    selectedOption === value && 'text-primary-green font-medium'
                  )}
                >
                  {label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </React.Fragment>
  );
};

export default Dropdown;
