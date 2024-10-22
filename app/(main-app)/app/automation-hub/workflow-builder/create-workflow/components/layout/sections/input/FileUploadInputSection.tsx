import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { variableNameSchema } from "./utils/validations";

interface FileUploadInputSectionProps {
  onParamsChange: (params: FileParams) => void;
  inputParams: FileParams | {};
  variableNameError: string;
  setVariableNameError: (params: string) => void;
}

interface FileParams {
  display_name: string;
  description: string;
  required: boolean;
  variable_name: string;
  multiple_files: boolean;
  file_type: string;
}

export default function FileUploadInputSection({
  onParamsChange,
  inputParams,
  variableNameError,
  setVariableNameError,
}: FileUploadInputSectionProps) {
  const [params, setParams] = useState<FileParams>({
    display_name: (inputParams as FileParams).display_name || "",
    description: (inputParams as FileParams).description || "",
    required: (inputParams as FileParams).required || false,
    variable_name: (inputParams as FileParams).variable_name || "",
    multiple_files: (inputParams as FileParams).multiple_files || false,
    file_type: (inputParams as FileParams).file_type || "IMAGE",
  });

  useEffect(() => {
    onParamsChange(params);
  }, [params, onParamsChange]);

  const updateParams = (updates: Partial<FileParams>) => {
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
          <label className="font-medium flex gap-2 items-center">
            Description{" "}
            <span className="text-primary-black text-opacity-30 text-xs">
              Optional
            </span>{" "}
          </label>
          <textarea
            value={params.description}
            onChange={e => updateParams({ description: e.target.value })}
            placeholder="Input label"
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
          <label className="font-medium text-sm">File Type</label>
          <div className="relative">
            <select
              required
              value={params.file_type}
              onChange={e => updateParams({ file_type: e.target.value })}
              className="block w-full px-4 py-3 pr-8 leading-tight bg-[#F2F2F2] text-gray-700 rounded-xl appearance-none transition ease-in-out duration-150"
            >
              <option value="IMAGE">IMAGE</option>
              <option value="VIDEO">VIDEO</option>
              <option value="AUDIO">AUDIO</option>
              <option value="PDF">PDF</option>
              <option value="DOC">DOC</option>
              <option value="DOCX">DOCX</option>
              <option value="XLS">XLS</option>
              <option value="XLSX">XLSX</option>
              <option value="TXT">TXT</option>
              <option value="CSV">CSV</option>
              <option value="OTHERS">OTHERS</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>
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
