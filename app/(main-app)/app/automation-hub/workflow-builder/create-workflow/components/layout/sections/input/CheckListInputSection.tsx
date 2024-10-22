import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { variableNameSchema } from "./utils/validations";
import { Minus, Plus } from "lucide-react";

interface CheckListParams {
  display_name: string;
  options: string[];
  description: string;
  required: boolean;
  variable_name: string;
}

interface CheckListInputSectionProps {
  onParamsChange: (params: CheckListParams) => void;
  inputParams: CheckListParams | {};
  variableNameError: string;
  setVariableNameError: (params: string) => void;
}

export default function CheckListInputSection({
  onParamsChange,
  inputParams,
  variableNameError,
  setVariableNameError,
}: CheckListInputSectionProps) {
  const [params, setParams] = useState<CheckListParams>({
    display_name: (inputParams as CheckListParams).display_name || "",
    options: (inputParams as CheckListParams).options || [""],
    description: (inputParams as CheckListParams).description || "",
    required: (inputParams as CheckListParams).required || false,
    variable_name: (inputParams as CheckListParams).variable_name || "",
  });

  useEffect(() => {
    onParamsChange(params);
  }, [params, onParamsChange]);

  const updateParams = (updates: Partial<CheckListParams>) => {
    const updatedParams = { ...params, ...updates };

    if (updates.display_name) {
      updatedParams.variable_name = updates.display_name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
    } else if (updates.display_name === "") {
      updatedParams.variable_name = "";
    }

    setParams(updatedParams);
    if ("variable_name" in updatedParams) {
      try {
        variableNameSchema.parse(updatedParams.variable_name);
        setVariableNameError("");
      } catch (err) {
        if (err instanceof z.ZodError) {
          setVariableNameError(err.errors[0].message);
        }
      }
    }
  };

  const handleAddOption = () => {
    setParams(prev => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const handleRemoveOption = (index: number) => {
    setParams(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...params.options];
    updatedOptions[index] = value;
    setParams({ ...params, options: updatedOptions });
  };

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Input label</label>
          <Input
            type="text"
            value={params.display_name}
            onChange={e => updateParams({ display_name: e.target.value })}
            placeholder="Input label"
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Options</label>
          <div className="flex flex-col gap-2">
            {params.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="text"
                  value={option}
                  onChange={e => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                {params.options.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <Minus />
                  </button>
                )}
                {index === params.options.length - 1 && (
                  <button
                    type="button"
                    className="text-primary-green"
                    onClick={handleAddOption}
                  >
                    <Plus className="mr-2" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">
            Description{" "}
            <span className="text-primary-black text-opacity-30 text-xs">
              Optional
            </span>{" "}
          </label>
          <textarea
            value={params.description}
            onChange={e => updateParams({ description: e.target.value })}
            placeholder="Input description"
            className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-xl"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">
            Required
          </label>
          <Switch
            checked={params.required}
            onCheckedChange={checked => updateParams({ required: checked })}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Variable name</label>
          <Input
            type="text"
            value={params.variable_name}
            onChange={e => updateParams({ variable_name: e.target.value })}
            placeholder="Input Variable name"
          />
          <p className="text-red-400 text-xs"> {variableNameError}</p>
        </div>
      </div>
    </Motion>
  );
}
