import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { variableNameSchema } from "./utils/validations";

interface ShortTextInputSectionProps {
  onParamsChange: (params: ShortTextParams) => void;
  inputParams: ShortTextParams | {};
  variableNameError: string;
  setVariableNameError: (params: string) => void;
}

interface ShortTextParams {
  display_name: string;
  placeholder: string;
  default_value: string;
  description: string;
  required: boolean;
  variable_name: string;
}

export default function ShortTextInputSection({ onParamsChange, inputParams, variableNameError, setVariableNameError }: ShortTextInputSectionProps) {
  const [params, setParams] = useState<ShortTextParams>({
    display_name: (inputParams as ShortTextParams).display_name || "",
    placeholder:  (inputParams as ShortTextParams).placeholder || "",
    default_value: (inputParams as ShortTextParams).default_value || "",
    description: (inputParams as ShortTextParams).description || "",
    required: (inputParams as ShortTextParams).required || false,
    variable_name: (inputParams as ShortTextParams).variable_name || "",
  });

  useEffect(() => {
    onParamsChange(params);
  }, [params, onParamsChange]);

  const updateParams = (updates: Partial<ShortTextParams>) => {
    const updatedParams = { ...params, ...updates };

    if (updates.display_name) {
      updatedParams.variable_name = updates.display_name.trim().toLowerCase().replace(/\s+/g, "_");
    }
    else if (updates.display_name === "") {
      updatedParams.variable_name = ""
    }

    setParams(updatedParams);
    if ('variable_name' in updatedParams) {
      try {
        variableNameSchema.parse(updatedParams.variable_name);
        setVariableNameError('');
      } catch (err) {
        if (err instanceof z.ZodError) {
          setVariableNameError(err.errors[0].message);
        }
      }
    }
  };

  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Input label</label>
          <Input
            type="text"
            value={params.display_name}
            onChange={(e) => updateParams({ display_name: e.target.value })}
            placeholder="Input label"
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Placeholder</label>
          <Input
            type="text"
            value={params.placeholder}
            onChange={(e) => updateParams({ placeholder: e.target.value })}
            placeholder="None"
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Default value</label>
          <Input
            type="text"
            value={params.default_value}
            onChange={(e) => updateParams({ default_value: e.target.value })}
            placeholder="None"
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">
            Description{" "}
            <span className="text-primary-black text-opacity-30 text-xs">Optional</span>{" "}
          </label>
          <textarea
            value={params.description}
            onChange={(e) => updateParams({ description: e.target.value })}
            placeholder="Input label"
            className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-xl"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">Required</label>
          <Switch
            checked={params.required}
            onCheckedChange={(checked) => updateParams({ required: checked })}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Variable name</label>
          <Input
            type="text"
            value={params.variable_name}
            onChange={(e) => updateParams({ variable_name: e.target.value })}
            placeholder="Input Variable name"
          />
          <p className="text-red-400 text-xs"> {variableNameError}</p>
        </div>
      </div>
    </Motion>
  );
}
