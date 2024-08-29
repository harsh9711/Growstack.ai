"use client";

import Motion from "@/components/Motion";
import {
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
import DotsLoader from "@/components/DotLoader";

interface AddInputProps {
  setAddNewInput: (params: boolean) => void;
  inputConfig: any[];
  setInputConfigs: (params: any) => void;
  onSelectAction: (params: any, index: number) => void;
}

export default function AddInput({
  setAddNewInput,
  inputConfig,
  setInputConfigs,
  onSelectAction
}: AddInputProps) {
  const [inputType, setInputType] = useState("Short text");
  const [viewAllInputs, setViewAllInputs] = useState(inputConfig.length > 0);
  const [inputParams, setInputParams] = useState<{ variable_name?: string }>({});
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [editID, setEditID] = useState<string>("");
  const [loading, setLoading] = useState(false); 
  const [variableNameError, setVariableNameError] = useState<string>("Must be at least 1 character long");

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
      default:
        return null;
    }
  };

  const handleAddClick = async () => {
    if (!workflowId) {
      console.error("workflow_id is missing");
      return;
    }
    setLoading(true);
    try {
      const response = await instance.post(
        `${API_URL}/workflow/api/v1/${workflowId}/inputconfig/`,
        { type: inputType, ...inputParams }
      );
      const newInputConfigs = response.data.data.input_configs;
      setInputConfigs(newInputConfigs); // Replace existing inputs with new ones
      setInputParams({}); // Clear inputParams after adding
      setViewAllInputs(true);
    } catch (error) {
      console.error("Error adding input:", error);
      toast.error("Error adding input");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteInput = async (inputId: string) => {
    if (!workflowId) {
      console.error("workflow_id is missing");
      return;
    }
    setLoading(true);
    try {
      const updatedInputs = inputConfig.filter(input => input._id !== inputId);
      setInputConfigs(updatedInputs);
      await instance.delete(
        `${API_URL}/workflow/api/v1/${workflowId}/inputconfig/${inputId}`
      );
    } catch (error) {
      console.error("Error deleting input:", error);
      toast.error("Error deleting input");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async (inputId: string) => {
    const inputToUpdate = inputConfig.find(input => input._id === inputId);
    if (!inputToUpdate) {
      console.error(`Input with id ${inputId} not found.`);
      return;
    }
    setEditID(inputId);
    setInputParams(inputToUpdate);
  };

  const updateInput = async () => {
    if (!workflowId || !editID) return;
    setLoading(true);
    try {
      const updatedInputs = inputConfig.map(input =>
        input._id === editID ? { ...input, ...inputParams } : input
      );
      setInputConfigs(updatedInputs);
      const payload = updatedInputs.find(input => input._id === editID);
      await instance.put(
        `${API_URL}/workflow/api/v1/${workflowId}/inputconfig/${editID}`,
        payload
      );
      setEditID("");
      toast.success("Input updated successfully");
    } catch (error) {
      console.error("Error updating input:", error);
      toast.error("Error updating input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <DotsLoader /> 
        </div>
      ) : !viewAllInputs || editID ? (
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
                      setViewAllInputs(true);
                      setEditID("");
                      setInputParams({});
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
                <div className="flex items-center gap-2">
                  <div
                    className="h-7 w-7 flex items-center justify-center bg-white rounded-md"
                    title={input.type}
                  >
                    {input.type === "Short text" && <ShortText />}
                    {input.type === "Long text" && <LongText />}
                    {input.type === "Yes/No" && <SwitchIcon />}
                    {input.type === "Number" && <NumberHashtag />}
                  </div>
                  <span className="font-medium">{input.variable_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="text-[#FF9F00]"
                    onClick={() => handleEditClick(input._id)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="text-[#CF0000]"
                    onClick={() => handleDeleteInput(input._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setAddNewInput(false)}
                className="py-3 px-6 bg-primary-green rounded-xl text-white mt-6 hover:bg-primary-green/90 transition-all duration-300"
              >
                Add new
              </button>
              <button
                onClick={() => setViewAllInputs(false)}
                className="py-3 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6"
              >
                Cancel
              </button>
            </div>
          </div>
        </Motion>
      )}
    </div>
  );
}
