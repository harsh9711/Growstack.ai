import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";

interface CheckboxProps {
  option: any;
  index: number;
  setActiveAction: (params: any) => void;
  suggestionOptions: any[];
  setSuggestionOptions: (options: any[]) => void;
}

const CheckboxComponent: React.FC<CheckboxProps> = ({
  option,
  index,
  setActiveAction,
  suggestionOptions,
  setSuggestionOptions,
}) => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(option.input_default_value)) {
      setCheckedValues(option.input_default_value);
    }
  }, [option.input_default_value]);

  const handleSwitchChange = (platform: string, checked: boolean) => {
    setCheckedValues((prev) => {
      const updatedValues = checked
        ? [...prev, platform]
        : prev.filter((value) => value !== platform);

      console.log("Checked Values Array:", updatedValues);

      setActiveAction((prevState: any) => ({
        ...prevState,
        preset_json: {
          ...prevState.preset_json,
          body: {
            ...prevState.preset_json.body,
            inputs: prevState.preset_json.body.inputs.map(
              (input: any, i: number) => {
                if (i === index && input.input_type === "CHECKBOX") {
                  return {
                    ...input,
                    input_default_value: updatedValues,
                  };
                }
                return input;
              }
            ),
          },
        },
      }));

      return updatedValues;
    });
  };

  return (
    <div>
      <div className="font-medium text-xl mb-2 mt-8 capitalize">
        {option.input_label}
      </div>
      <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
        <label className="font-medium">Facebook</label>
        <Switch
          checked={checkedValues.includes("facebook")}
          onCheckedChange={(checked) => handleSwitchChange("facebook", checked)}
        />
      </div>
      <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
        <label className="font-medium">Twitter</label>
        <Switch
          checked={checkedValues.includes("twitter")}
          onCheckedChange={(checked) => handleSwitchChange("twitter", checked)}
        />
      </div>
      <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
        <label className="font-medium">LinkedIn</label>
        <Switch
          checked={checkedValues.includes("linkedin")}
          onCheckedChange={(checked) => handleSwitchChange("linkedin", checked)}
        />
      </div>
      <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
        <label className="font-medium">Instagram</label>
        <Switch
          checked={checkedValues.includes("instagram")}
          onCheckedChange={(checked) =>
            handleSwitchChange("instagram", checked)
          }
        />
      </div>
    </div>
  );
};

export default CheckboxComponent;
