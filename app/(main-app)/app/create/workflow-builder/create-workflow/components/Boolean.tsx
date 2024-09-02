import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@radix-ui/react-switch";

interface BooleanProps {
  option: any;
  index: number;
  setActiveAction: (params: any) => void;
  suggestionOptions: any[];
  setSuggestionOptions: (options: any[]) => void;
}

const Boolean: React.FC<BooleanProps> = ({
  option,
  index,
  setActiveAction,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    option.input_default_value || false
  );
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>("Image");

  useEffect(() => {
    if (selectedRadioValue === "Video") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }

    setActiveAction((prevState: any) => ({
      ...prevState,
      preset_json: {
        ...prevState.preset_json,
        body: {
          ...prevState.preset_json.body,
          inputs: prevState.preset_json.body.inputs.map(
            (input: any, i: number) => {
              if (i === index && input.input_type === "BOOLEAN") {
                return {
                  ...input,
                  input_default_value: isChecked,
                };
              }
              return input;
            }
          ),
        },
      },
    }));
  }, [selectedRadioValue, isChecked]);

  const handleValueChange = (value: string) => {
    setSelectedRadioValue(value);
    if (value === "Video") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
    setActiveAction((prevState: any) => ({
      ...prevState,
      preset_json: {
        ...prevState.preset_json,
        body: {
          ...prevState.preset_json.body,
          inputs: prevState.preset_json.body.inputs.map(
            (input: any, i: number) => {
              if (i === index && input.input_type === "BOOLEAN") {
                return {
                  ...input,
                  input_default_value: checked,
                };
              }
              return input;
            }
          ),
        },
      },
    }));
  };

  return (
    <div>
      <div className="font-medium text-xl  capitalize">
        {option.input_label}
      </div>
      <Switch
        checked={isChecked}
        onCheckedChange={handleSwitchChange}
        className=""
      />
      <div key={index} className="m">
        <RadioGroup
          value={selectedRadioValue}
          onValueChange={handleValueChange}
          className="w-full flex items-center max-w-[300px]"
        >
          <div className="flex space-x-2 w-full">
            <RadioGroupItem value="Image" id="r1" />
            <label htmlFor="r1">Image</label>
          </div>
          <div className="flex space-x-2 w-full">
            <RadioGroupItem value="Video" id="r2" />
            <label htmlFor="r2">Video</label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Boolean;
