"use client";

import Motion from "@/components/Motion";
import { FileUpload, LongText, NumberHashtag, ShortText, Switch as SwitchIcon } from "@/components/svgs";
import clsx from "clsx";
import { ArrowRight, Edit, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProvidersDrawer from "../ProvidersDrawer";
import FileUploadInputSection from "./sections/input/FileUploadInputSection";
import LongTextInputSection from "./sections/input/LongTextInputSection";
import NumberInputSection from "./sections/input/NumberInputSection";
import ShortTextInputSection from "./sections/input/ShortTextInputSection";
import YesOrNoInputSection from "./sections/input/YesOrNoInputSection";
import axios from "axios";
import { API_URL } from "@/lib/api";

export default function AddInput() {
  const [inputType, setInputType] = useState("Short text");
  const [viewAllInputs, setViewAllInputs] = useState(false);
  const [inputParams, setInputParams] = useState<{ variable_name?: string }>({});
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [existingInputs, setExistingInputs] = useState<{
    _id: string; variable_name?: string 
}[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('workflow_id');
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
    {
      icon: <FileUpload />,
      name: "File Upload",
    },
  ];

  const renderInputSection = () => {
    switch (inputType) {
      case "SHORT TEXT":
        return <ShortTextInputSection onParamsChange={setInputParams} />;
      case "Long text":
        return <LongTextInputSection onParamsChange={setInputParams} />;
      case "Yes/No":
        return <YesOrNoInputSection onParamsChange={setInputParams}/>;
      case "Number":
        return <NumberInputSection onParamsChange={setInputParams} />;
      case "File Upload":
        return <FileUploadInputSection onParamsChange={setInputParams}  />;
    }
  };
  const handleAddClick = async () => {
    try {
      if (!workflowId) {
        console.error('workflow_id is missing');
        return;
      }
      const response = await axios.post(`${API_URL}/workflow/api/v1/${workflowId}/inputconfig/`, { type: inputType, ...inputParams });
      const newInputConfigs = response.data.data.input_configs;

    setExistingInputs([...newInputConfigs]); // Replace existing inputs with new ones
    setInputParams({}); // Clear inputParams after adding

    setViewAllInputs(true);
    } catch (error) {
      console.error('Error adding input:', error);
    }
  };
  const handleDeleteInput = async (inputId: string) => {
    try {
      if (!workflowId) {
        console.error('workflow_id is missing');
        return;
      }
      const updatedInputs = existingInputs.filter(input => input._id !== inputId);
      setExistingInputs(updatedInputs);
      await axios.delete(`${API_URL}/workflow/api/v1/${workflowId}/inputconfig/${inputId}`);

    } catch (error) {
      console.error('Error deleting input:', error);
      
    }
  };
  const handleEditInput = async (inputId: string, updatedInputType: string) => {
    try {
      // Find the input to update
      const inputToUpdate = existingInputs.find(input => input._id === inputId);
      if (!inputToUpdate) {
        console.error(`Input with id ${inputId} not found.`);
        return;
      }
      
      // Optimistically update the UI
      const updatedInputs = existingInputs.map(input =>
        input._id === inputId ? { ...input, type: updatedInputType } : input
      );
      setExistingInputs(updatedInputs);

      // Send PUT request to update input type
      await axios.put(`${API_URL}/workflow/api/v1/${workflowId}/inputconfig/${inputId}`, { type: updatedInputType });

    } catch (error) {
      console.error('Error updating input:', error);
      // fetchExistingInputs(workflowId); // Re-fetch inputs to revert UI state on error
    }
  };
  return !viewAllInputs ? (
    <div className="space-y-4 mt-5">
      <h1 className="text-lg font-semibold">Input type</h1>
      <div className="grid grid-cols-3 gap-3 !mb-6">
        {inputTypes.map((input, index) => (
          <div
            onClick={() => setInputType(input.name)}
            key={index}
            className={clsx(
              "flex flex-col items-center justify-center gap-3 border border-[#F5F5F5] p-4 rounded-lg text-sm cursor-pointer hover:bg-primary-light-gray/40 transition-all duration-300",
              input.name === inputType && "bg-[#0347371c] border border-primary-green hover:bg-[#0347371d]"
            )}>
            {React.cloneElement(input.icon, { className: "mx-auto" })}
            {input.name}
          </div>
        ))}
      </div>
      {renderInputSection()}

      <div className="flex justify-end gap-4">
        <button className="py-3 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6">Cancel</button>
        <button
          onClick={handleAddClick}
          className="py-3 px-6 bg-primary-green rounded-xl text-white mt-6 hover:bg-primary-green/90 transition-all duration-300">
          Add
        </button>
      </div>
    </div>
  ) : (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="space-y-4 mt-5">
      <h1 className="text-lg font-semibold">Input type ({existingInputs.length})</h1>
        {existingInputs.map((input, index) => (
          <div key={index} className="bg-[#F5F5F5] h-14 w-full rounded-xl flex items-center justify-between px-4 mb-4">
            <span>{input?.variable_name}</span>
            <div className="flex gap-3 items-center text-gray-400">
            <Edit className="cursor-pointer" size={20} onClick={() => handleEditInput(input._id, inputType)} />
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
            className="w-full text-center border border-[#E8E8E8] text-primary-green hover:bg-primary-green/10 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2">
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
