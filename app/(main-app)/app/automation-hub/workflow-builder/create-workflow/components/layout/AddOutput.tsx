"use client";

import {
  AudioIcon,
  ImageIcon,
  LongText,
  ShortText,
  VideoIcon,
} from "@/components/svgs";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import VideoOutputSection from "./sections/output/VideoOutputSection";
import MarkdownOutputSection from "./sections/output/MarkdownOutputSection";
import AudioOutputSection from "./sections/output/AudioOutputSection";
import PlainTextOutputSection from "./sections/output/PlainTextOutputSection";
import ImageOutputSection from "./sections/output/ImageOutputSection";
import Motion from "@/components/Motion";
import ProvidersDrawer from "../ProvidersDrawer";
import { ArrowRight, Edit, Plus, Trash2 } from "lucide-react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";

interface AddoutputProps {
  setAddNewOutput: (params: boolean) => void;
  outputConfigs: any[];
  setOutputConfigs: (params: any) => void;
  actions: any;
  inputConfigs: any;
}

type OutputParams = {
  display_name?: string;
  value?: string;
  json_key?: string;
};

export default function Addoutput({
  actions,
  inputConfigs,
  setAddNewOutput,
  outputConfigs,
  setOutputConfigs,
}: AddoutputProps) {
  const [outputType, setOutputType] = useState("Plain text");
  const [viewAllOutPuts, setViewAllOutputs] = useState(
    outputConfigs.length !== 0
  );
  const [outputParams, setOutputParams] = useState<OutputParams>({});
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [editID, setEditID] = useState("");
  const [jsonKeyError, setJsonKeyError] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("workflow_id");
    if (id) {
      setWorkflowId(id);
    }
  }, []);

  const outputTypes = [
    {
      icon: <ShortText />,
      name: "Plain text",
    },
    {
      icon: <LongText />,
      name: "Mark down",
    },
    {
      icon: <ImageIcon />,
      name: "Image",
    },
    {
      icon: <AudioIcon />,
      name: "Audio",
    },
    {
      icon: <VideoIcon />,
      name: "Video",
    },
  ];

  const renderOutputSection = () => {
    switch (outputType) {
      case "Plain text":
        return (
          <PlainTextOutputSection
            onParamsChange={setOutputParams}
            outputParams={outputParams}
            actions={actions}
            inputConfigs={inputConfigs}
            jsonKeyError={jsonKeyError}
            setJsonKeyError={setJsonKeyError}
          />
        );
      case "Mark down":
        return (
          <MarkdownOutputSection
            onParamsChange={setOutputParams}
            outputParams={outputParams}
            actions={actions}
            inputConfigs={inputConfigs}
            jsonKeyError={jsonKeyError}
            setJsonKeyError={setJsonKeyError}
          />
        );
      case "Image":
        return (
          <ImageOutputSection
            onParamsChange={setOutputParams}
            outputParams={outputParams}
            actions={actions}
            inputConfigs={inputConfigs}
            jsonKeyError={jsonKeyError}
            setJsonKeyError={setJsonKeyError}
          />
        );
      case "Audio":
        return (
          <AudioOutputSection
            onParamsChange={setOutputParams}
            outputParams={outputParams}
            actions={actions}
            inputConfigs={inputConfigs}
            jsonKeyError={jsonKeyError}
            setJsonKeyError={setJsonKeyError}
          />
        );
      case "Video":
        return (
          <VideoOutputSection
            onParamsChange={setOutputParams}
            outputParams={outputParams}
            actions={actions}
            inputConfigs={inputConfigs}
            jsonKeyError={jsonKeyError}
            setJsonKeyError={setJsonKeyError}
          />
        );
    }
  };

  const handleAddClick = async () => {
    try {
      if (!workflowId) {
        console.error("workflow_id is missing");
        return;
      }
      const response = await instance.post(
        `${API_URL}/workflow/api/v1/${workflowId}/outputconfig/`,
        { type: outputType, ...outputParams }
      );
      const newOutputConfigs = response.data.data.output_configs;

      setOutputConfigs([...newOutputConfigs]);
      setOutputParams({});
      setViewAllOutputs(true);
      toast.success("Output added successfully");
    } catch (error) {
      console.error("Error adding output:", error);
    }
  };

  const updateOutput = async () => {
    try {
      const updatedOutputs = outputConfigs.map(output =>
        output._id === editID ? { ...output, ...outputParams } : output
      );
      setOutputConfigs(updatedOutputs);
      const payload = updatedOutputs.find(output => output._id === editID);
      const response = await instance.put(
        `${API_URL}/workflow/api/v1/${workflowId}/outputconfig/${editID}`,
        {
          "output_configs.$.type": payload?.type,
          "output_configs.$.display_name": payload?.display_name,
          "output_configs.$.value": payload?.value,
          "output_configs.$.json_key": payload?.json_key,
        }
      );
      setEditID("");
      toast.success("Output updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error updating output");
    }
  };

  const handleDeleteOutput = async (outputId: string) => {
    try {
      if (!workflowId) {
        console.error("workflow_id is missing");
        return;
      }
      const updatedOutputs = outputConfigs.filter(
        output => output._id !== outputId
      );
      setOutputConfigs(updatedOutputs);
      await instance.delete(
        `${API_URL}/workflow/api/v1/${workflowId}/outputconfig/${outputId}`
      );
      toast.success("Output deleted successfully");
    } catch (error) {
      console.error("Error deleting output:", error);
    }
  };
  const handleEditClick = async (outputId: string) => {
    try {
      const outputToUpdate = outputConfigs.find(
        output => output._id === outputId
      );
      if (!outputToUpdate) {
        console.error(`Output with id ${outputId} not found.`);
        return;
      }
      setEditID(outputId);
      setOutputParams(outputToUpdate);
    } catch (error) {
      console.error("Error updating output:", error);
    }
  };

  return !viewAllOutPuts || editID ? (
    <div className="space-y-4 mt-5">
      <h1 className="text-lg font-semibold">Output type</h1>
      <div className="grid grid-cols-3 gap-3 !mb-6">
        {outputTypes.map((output, index) => (
          <div
            onClick={() => setOutputType(output.name)}
            key={index}
            className={clsx(
              "flex flex-col items-center justify-center gap-3 border border-[#F5F5F5] p-4 rounded-lg text-sm cursor-pointer hover:bg-primary-light-gray/40 transition-all duration-300",
              output.name === outputType &&
                "bg-[#0347371c] border border-primary-green hover:bg-[#0347371d]"
            )}
          >
            {React.cloneElement(output.icon, { className: "mx-auto" })}
            {output.name}
          </div>
        ))}
      </div>
      {renderOutputSection()}

      <div className="flex justify-end gap-4">
        <button
          className="py-3 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6"
          onClick={
            outputConfigs.length
              ? () => {
                  setViewAllOutputs(true), setEditID("");
                }
              : () => setAddNewOutput(false)
          }
        >
          Cancel
        </button>
        <button
          onClick={editID ? updateOutput : handleAddClick}
          className={`py-3 px-6 bg-primary-green rounded-xl text-white mt-6 hover:bg-primary-green/90 transition-all duration-300 ${
            jsonKeyError && "opacity-50"
          }`}
          disabled={!!jsonKeyError}
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
          Output type ({outputConfigs.length})
        </h1>
        {outputConfigs.map((output, index) => (
          <div
            key={index}
            className="bg-[#F5F5F5] h-14 w-full rounded-xl flex items-center justify-between px-4"
          >
            <span>{output?.display_name}</span>
            <div className="flex gap-3 items-center text-gray-400">
              <Edit
                className="cursor-pointer"
                size={20}
                onClick={() => handleEditClick(output._id)}
              />
              <Trash2
                className="cursor-pointer"
                size={20}
                onClick={() => handleDeleteOutput(output._id)}
              />
            </div>
          </div>
        ))}
        <div className="flex gap-3">
          <button
            onClick={() => setViewAllOutputs(false)}
            className="w-full text-center border border-[#E8E8E8] text-primary-green hover:bg-primary-green/10 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2"
          >
            <Plus />
            Add Output
          </button>
          {/* <ProvidersDrawer
            trigger={
              <button className="w-full text-center bg-primary-green text-white hover:bg-primary-green/90 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2">
                <ArrowRight size={20} />
                Continue
              </button>
            }
          /> */}
        </div>
      </div>
    </Motion>
  );
}
