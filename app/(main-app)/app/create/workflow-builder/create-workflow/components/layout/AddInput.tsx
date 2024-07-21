"use client";

import Motion from "@/components/Motion";
import {
  FileUpload,
  LongText,
  NumberHashtag,
  ShortText,
  Switch as SwitchIcon,
} from "@/components/svgs";
import clsx from "clsx";
import { ArrowRight, Edit, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import ProvidersDrawer from "../ProvidersDrawer";
import FileUploadInputSection from "./sections/input/FileUploadInputSection";
import LongTextInputSection from "./sections/input/LongTextInputSection";
import NumberInputSection from "./sections/input/NumberInputSection";
import ShortTextInputSection from "./sections/input/ShortTextInputSection";
import YesOrNoInputSection from "./sections/input/YesOrNoInputSection";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

interface AddInputProps {
  setAddNewInput: (params: boolean) => void;
  inputConfig: any[];
  setInputConfigs: (params: any) => void;
}

export default function AddInput({
  setAddNewInput,
  inputConfig,
  setInputConfigs,
}: AddInputProps) {
  const [inputType, setInputType] = useState("Short text");
  const [viewAllInputs, setViewAllInputs] = useState(inputConfig.length !== 0);
  const [inputParams, setInputParams] = useState<{ variable_name?: string }>(
    {}
  );
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [editID, setEditID] = useState("");
  const [variableNameError, setVariableNameError] = useState(
    "Must be at least 1 character long"
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("workflow_id");
    if (id) {
      setWorkflowId(id);
    }
  }, []);
  const inputTypes = [
    {
      icon: <ShortText />,
      name: "SHORT TEXT",
    },
    {
      icon: <LongText />,
      name: "Long text",
    },
    {
      icon: <SwitchIcon />,
      name: "Yes/No",
    },
    {
      icon: <NumberHashtag />,
      name: "Number",
    },
    // {
    //   icon: <FileUpload />,
    //   name: "File Upload",
    // },
  ];

  const renderInputSection = () => {
    switch (inputType) {
      case "SHORT TEXT":
        return (
          <ShortTextInputSection
            onParamsChange={setInputParams}
            inputParams={inputParams}
            variableNameError={variableNameError}
            setVariableNameError={setVariableNameError}
          />
        );
      case "Long text":
        return (
          <LongTextInputSection
            onParamsChange={setInputParams}
            inputParams={inputParams}
            variableNameError={variableNameError}
            setVariableNameError={setVariableNameError}
          />
        );
      case "Yes/No":
        return (
          <YesOrNoInputSection
            onParamsChange={setInputParams}
            inputParams={inputParams}
            variableNameError={variableNameError}
            setVariableNameError={setVariableNameError}
          />
        );
      case "Number":
        return (
          <NumberInputSection
            onParamsChange={setInputParams}
            inputParams={inputParams}
            variableNameError={variableNameError}
            setVariableNameError={setVariableNameError}
          />
        );
      // case "File Upload":
      //   return <FileUploadInputSection onParamsChange={setInputParams} variableNameError={variableNameError} setVariableNameError={setVariableNameError} />;
    }
  };
  const handleAddClick = async () => {
    try {
      if (!workflowId) {
        console.error("workflow_id is missing");
        return;
      }
      const response = await instance.post(
        `${API_URL}/workflow/api/v1/${workflowId}/inputconfig/`,
        { type: inputType, ...inputParams }
      );
      const newInputConfigs = response.data.data.input_configs;

      setInputConfigs([...newInputConfigs]); // Replace existing inputs with new ones
      setInputParams({}); // Clear inputParams after adding

      setViewAllInputs(true);
    } catch (error) {
      console.error("Error adding input:", error);
    }
  };
  const handleDeleteInput = async (inputId: string) => {
    try {
      if (!workflowId) {
        console.error("workflow_id is missing");
        return;
      }
      const updatedInputs = inputConfig.filter(
        (input) => input._id !== inputId
      );
      setInputConfigs(updatedInputs);
      await instance.delete(
        `${API_URL}/workflow/api/v1/${workflowId}/inputconfig/${inputId}`
      );
    } catch (error) {
      console.error("Error deleting input:", error);
    }
  };
  const handleEditClick = async (inputId: string) => {
    try {
      // Find the input to update
      const inputToUpdate = inputConfig.find((input) => input._id === inputId);
      if (!inputToUpdate) {
        console.error(`Input with id ${inputId} not found.`);
        return;
      }
      setEditID(inputId);
      setInputParams(inputToUpdate);
    } catch (error) {
      console.error("Error updating input:", error);
      // fetchExistingInputs(workflowId); // Re-fetch inputs to revert UI state on error
    }
  };

  const updateInput = async () => {
    try {
      const updatedInputs = inputConfig.map((input) =>
        input._id === editID ? { ...input, ...inputParams } : input
      );
      setInputConfigs(updatedInputs);
      const payload = updatedInputs.find((input) => input._id === editID);
      const response = await instance.put(
        `${API_URL}/workflow/api/v1/${workflowId}/inputconfig/${editID}`,
        {
          "input_configs.$.type": payload?.type,
          "input_configs.$.variable_name": payload?.variable_name,
          "input_configs.$.required": payload?.required,
          "input_configs.$.placeholder": payload?.placeholder,
          "input_configs.$.display_name": payload?.display_name,
          "input_configs.$.description": payload?.description,
          "input_configs.$.default_value": payload?.default_value,
        }
      );
      setEditID("");
      toast.success("Input updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error updating input");
    }
  };

  return !viewAllInputs || editID ? (
    <div className="space-y-4 mt-5">
      <h1 className="text-lg font-semibold">Input type</h1>
      <div className="grid grid-cols-3 gap-3 !mb-6">
        {inputTypes.map((input, index) => (
          <div
            onClick={() => setInputType(input.name)}
            key={index}
            className={clsx(
              "flex flex-col items-center justify-center gap-3 border border-[#F5F5F5] p-4 rounded-lg text-sm cursor-pointer hover:bg-primary-light-gray/40 transition-all duration-300",
              input.name === inputType &&
                "bg-[#0347371c] border border-primary-green hover:bg-[#0347371d]"
            )}
          >
            {React.cloneElement(input.icon, { className: "mx-auto" })}
            {input.name}
          </div>
        ))}
      </div>
      {renderInputSection()}

      <div className="flex justify-end gap-4">
        <button
          className="py-3 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6"
          onClick={
            inputConfig.length
              ? () => {
                  setViewAllInputs(true), setEditID(""), setInputParams({});
                }
              : () => setAddNewInput(false)
          }
        >
          Cancel
        </button>
        <button
          onClick={editID ? updateInput : handleAddClick}
          className={`py-3 px-6 bg-primary-green rounded-xl text-white mt-6 hover:bg-primary-green/90 transition-all duration-300 ${
            variableNameError && "opacity-50"
          }`}
          disabled={!!variableNameError}
        >
          {editID ? "Save" : "Add"}
        </button>
      </div>
    </div>
  ) : (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="space-y-4 mt-5">
        <h1 className="text-lg font-semibold">
          Input type ({inputConfig.length})
        </h1>
        {inputConfig.map((input, index) => (
          <div
            key={index}
            className="bg-[#F5F5F5] h-14 w-full rounded-xl flex items-center justify-between px-4 mb-4"
          >
            <span>{input?.variable_name}</span>
            <div className="flex gap-3 items-center text-gray-400">
              <Edit
                className="cursor-pointer"
                size={20}
                onClick={() => handleEditClick(input._id)}
              />
              <Trash2
                className="cursor-pointer"
                size={20}
                onClick={() => handleDeleteInput(input._id)}
              />
            </div>
          </div>
        ))}
        <div className="flex gap-3">
          <button
            onClick={() => setViewAllInputs(false)}
            className="w-full text-center border border-[#E8E8E8] text-primary-green hover:bg-primary-green/10 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Plus />
            Add input
          </button>
          <ProvidersDrawer
            trigger={
              <button className="w-full text-center bg-primary-green text-white hover:bg-primary-green/90 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2">
                <ArrowRight size={20} />
                Continue
              </button>
            }
          />
        </div>
      </div>
    </Motion>
  );
}
