import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { variableNameSchema } from "./utils/validations";

interface FileUploadInputSectionProps {
  onParamsChange: (params: ShortTextParams) => void;
}

interface ShortTextParams {
  display_name: string;
  description: string;
  required: boolean;
  variable_name: string;
  multiple_files: boolean;
}
export default function FileUploadInputSection({ onParamsChange }: FileUploadInputSectionProps) {
  const [params, setParams] = useState<ShortTextParams>({
    display_name: "",
    description: "",
    required: false,
    variable_name: "",
    multiple_files: false,
  });
  const [variableNameError, setVariableNameError] = useState('');


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
          <label className="font-medium flex gap-2 items-center">Accept multiple files</label>
          <Switch
            checked={params.multiple_files}
            onCheckedChange={(checked) => updateParams({ multiple_files: checked })}
          />
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
