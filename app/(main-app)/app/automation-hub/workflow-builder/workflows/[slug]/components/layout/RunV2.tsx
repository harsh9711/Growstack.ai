"use client";

import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import clsx from "clsx";
import { Clock, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import FileUpload from "../FileUpload";
import { Switch } from "@/components/ui/switch";
import { WorkflowInputFieldType } from "@/types/enums";
import { Checkbox } from "@/components/ui/checkbox";
import ApprovalsAccordion from "./ApprovalAccordion";
import OutputDetails from "./OutputDetails";
import RunSummary from "./RunSummary";
import WorkFlowHeader from "@/components/workFlowHeader/WorkFlowHeader";
import TimeLineTable from "@/components/timeLineTabel/TimeLineTabel";
import axios from "axios";

type TempOutput = {
  variable_name: string;
  variable_type: string;
  variable_value: string;
  _id: string;
};

type WorkFlowResults = {
  outputs: any[];
  status: boolean;
  failed_step: number;
  paused?: boolean;
  temp_outputs: TempOutput[];
  workflow_runner_id: string;
};

interface Props {
  workflowId: string;
}

const Run: React.FC<Props> = ({ workflowId }) => {
  const [loading, setLoading] = useState(true);
  const [fileUrl2, setFileUrl2] = useState<string>("");
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [workFlowData, setWorkFlowData] = useState<any>({
    name: "",
    input_configs: [],
    status: "",
    workflow_id: "",
    description: "",
  });
  const [IsInputParameterOpen, setIsInputParameterOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [executionId, setExecutionId] = useState("");
  const [runSummaryData, setRunSummaryData] = useState<any>([]);

  useEffect(() => {
    if (workflowId) {
      fetchWorkflowData(workflowId)
        .then(data => {
          //   if (tab && preFilled && runnerId) {
          //     fetchRunnerData(runnerId);
          //   }
        })
        .finally(() => setLoading(false));
    }
  }, [workflowId]);

  const fetchWorkflowData = async (id: string) => {
    setLoading(true);
    try {
      // const response = await axios.get(`http://localhost:5000/workflow/${id}`);
      const response = await instance.get(`/workflows/${id}`);
      const apiData = response.data;

      // Filter and map `nodes` to `input_configs`
      const inputConfigs = apiData.nodes
        .filter((node: any) => {
          const type = node?.nodeMasterId?.inputType;
          return (
            type === "text" ||
            type === "textarea" ||
            type === "checkbox" ||
            type === "switch" ||
            type === "number" ||
            type === "file"
          );
        })
        .map((node: any) => {
          const parameters = node.parameters || {};
          console.log(parameters, "checking the parameter of runv2");

          return {
            display_name: parameters.inputLabel || "Untitled Field",
            description: parameters?.description || "",
            placeholder: parameters?.placeholder || "",
            default_value: parameters.defaultValue || "",
            variableName: parameters.variableName || "",
            type: node?.nodeMasterId?.inputType,
            list_values: parameters?.options || [],
            // list_values: parameters?.options?.map((opt: any) => opt.label) || [],

            // list_values: (() => {
            //   const values =
            //     parameters?.options?.map((opt: any) => opt.label) || [];
            //   console.log("checking the options value:", values);
            //   return values;
            // })(),
          };
        });

      setWorkFlowData({
        name: apiData.name,
        input_configs: inputConfigs,
        status: apiData.status,
        workflow_id: apiData._id,
        description: apiData.description,
      });
    } catch (error: any) {
      console.error("Error fetching workflow data:", error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleRunWorkFlow = useCallback(async () => {
    const updatedWorkflowData = workFlowData.input_configs.map((data: any) => ({
      variableName: data.variableName,
      variableValue: data.default_value,
    }));
    console.log(updatedWorkflowData, "updatedWorkflowData");
    try {
      // const response = await axios.post(
      //   `http://localhost:5000/workflow/${workflowId}/run`,
      //   updatedWorkflowData
      // );
      const response = await instance.post(
        `/workflows/${workflowId}/run`,
        updatedWorkflowData
      );
      setExecutionId(response?.data?.executionId);
    } catch (error) {
      // To:Do Handle error
    }
  }, [workFlowData]);

  const pollingWorkflowExec = useCallback(async () => {
    try {
      // const getWorkFlowExecData = await axios.get(
      //   `http://localhost:5000/workflow/${workflowId}/status/${executionId}`
      // );
      const getWorkFlowExecData = await instance.get(
        `/workflows/${workflowId}/status/${executionId}`
      );

      setRunSummaryData(getWorkFlowExecData?.data);

      const status = getWorkFlowExecData?.data?.status;
      if (status === "completed" || status === "awaiting-approval") {
        return true;
      }
    } catch (error) {
      console.error("Error fetching workflow execution data", error);
    }
    return false;
  }, [executionId, workflowId]);

  useEffect(() => {
    if (executionId?.length > 0) {
      const interval = setInterval(async () => {
        const shouldStop = await pollingWorkflowExec();
        if (shouldStop) {
          clearInterval(interval);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [pollingWorkflowExec, executionId]);

  const handleFileUploaded = (fileUrl: string, idx: number) => {
    setFileUrl2(fileUrl);
    const updatedInputs = [...workFlowData.input_configs];
    updatedInputs[idx].default_value = fileUrl;
    setWorkFlowData({ ...workFlowData, input_configs: updatedInputs });
  };

  const handleChangeInput = (value: string, idx: number) => {
    const updatedInputs = [...workFlowData.input_configs];
    updatedInputs[idx].default_value = value;
    setWorkFlowData({ ...workFlowData, input_configs: updatedInputs });
  };

  const handleBooleanInput = (value: boolean, idx: number) => {
    const updatedInputs = [...workFlowData.input_configs];
    updatedInputs[idx].default_value = value;
    setWorkFlowData({ ...workFlowData, input_configs: updatedInputs });
  };

  const handleCheckListInput = (value: string, idx: number) => {
    const updatedInputs = [...workFlowData.input_configs];
    const selected_values = updatedInputs[idx]?.selected_values;
    if (selected_values?.includes(value)) {
      updatedInputs[idx].selected_values = selected_values.filter(
        (item: string) => item !== value
      );
    } else {
      if (selected_values === undefined) {
        updatedInputs[idx].selected_values = [value];
      } else {
        updatedInputs[idx].selected_values = [...selected_values, value];
      }
    }
    setWorkFlowData({ ...workFlowData, input_configs: updatedInputs });
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col gap-5 justify-center items-center min-h-[30vh]">
        <Spinner color="black" size={50} />
        Loading...
      </div>
    );
  }

  const toggleAccordion = () => {
    setIsInputParameterOpen(!IsInputParameterOpen);
  };

  return (
    <div className="px-8 pb-8">
      <div>
        <WorkFlowHeader workFlowData={workFlowData} />
        <Motion
          transition={{ duration: 0.5 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <div className="flex h-screen mt-5 gap-6">
            <div className="w-2/5">
              <div
                className={`border-l-4 border-[#F1B917] rounded-2xl w-[50%] flex flex-col gap-6 p-4 ${
                  IsInputParameterOpen ? "max-h-screen" : "max-h-[80px]"
                } overflow-hidden transition-all w-full bg-white rounded-lg shadow-md duration-500 ease-in-out`}
              >
                <div className="flex flex-row justify-between items-center gap-2">
                  <h2 className="font-semibold text-lg">Input Parameters</h2>
                  <div className="cursor-pointer">
                    {IsInputParameterOpen ? (
                      <ChevronDown size={18} onClick={toggleAccordion} />
                    ) : (
                      <ChevronUp size={18} onClick={toggleAccordion} />
                    )}
                  </div>
                </div>
                <div
                  className={`${IsInputParameterOpen ? "block" : "hidden"} transition-opacity`}
                >
                  {workFlowData?.input_configs?.map(
                    (input: any, idx: number) => (
                      <div key={idx} className="relative group">
                        <div className="flex items-center mb-4 mt-4 gap-2">
                          <h2 className="font-medium">{input.display_name}</h2>
                          {input?.description?.length > 0 && (
                            <div className="relative">
                              <Info className="cursor-pointer" />
                              <div className="absolute left-0 top-full mt-2 w-max p-2 text-sm text-white bg-gray-800 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                {input.description}
                              </div>
                            </div>
                          )}
                        </div>
                        {(() => {
                          switch (input?.type) {
                            case "switch":
                              return (
                                <Switch
                                  checked={input.default_value}
                                  onCheckedChange={checked =>
                                    handleBooleanInput(checked, idx)
                                  }
                                />
                              );
                            case "file":
                              return (
                                <FileUpload
                                  onFileUploaded={fileUrl =>
                                    handleFileUploaded(fileUrl, idx)
                                  }
                                  acceptedFileTypes={input.file_type || "*/*"}
                                />
                              );
                            case "checkbox":
                              return (
                                <div className="flex gap-4">
                                  {input.list_values.map((option: string) => (
                                    <label
                                      key={option}
                                      className="flex items-center space-x-1.5"
                                    >
                                      <Checkbox
                                        checked={
                                          input?.selected_values?.includes(
                                            option
                                          ) || false
                                        }
                                        onCheckedChange={() =>
                                          handleCheckListInput(option, idx)
                                        }
                                      />
                                      <span className="text-sm capitalize font-medium text-gray-700">
                                        {option}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              );
                            default:
                              return (
                                <input
                                  type={
                                    input.type === "number"
                                      ? "number"
                                      : input.type === "textarea"
                                        ? "textarea"
                                        : "text"
                                  }
                                  placeholder={input.placeholder}
                                  className="w-full p-4 h-[46px] border border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/60 transition"
                                  value={input.default_value}
                                  onChange={e =>
                                    handleChangeInput(e.target.value, idx)
                                  }
                                />
                              );
                          }
                        })()}
                      </div>
                    )
                  )}
                  <div className="flex justify-center mt-12 w-full gap-2">
                    <button
                      // disabled={!isWorkFlowFetched || isSchedulerModalOpen}
                      className={clsx(
                        "bg-primary-light-shade-green flex flex-row items-center justify-center rounded-lg p-4 h-[46px] gap-3 text-white"
                      )}
                      onClick={handleRunWorkFlow}
                    >
                      <h2 className="text-white">Instant Run</h2>
                    </button>
                    {workFlowData?.social_media_requirement && (
                      <button
                        className={clsx(
                          "bg-transparent border-2 border-green-200 flex flex-row items-center justify-center rounded-lg p-4 h-[46px] gap-3 "
                        )}
                        // onClick={() => setIsSchedulerModalOpen(true)}
                      >
                        <Clock size={20} color="#2DA771" />
                        <h2 className="text-primary-light-shade-green">
                          Schedule Workflow
                        </h2>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <ApprovalsAccordion />
            </div>
            <div className="w-3/5">
              {executionId?.length > 0 ? (
                <OutputDetails runSummaryData={runSummaryData} />
              ) : (
                <div className="w-full border-l-4 border-[#FB8491] bg-white rounded-lg shadow-md space-y-6 p-6 mt-5">
                  {/* Header Section */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg text-primary-black">
                      No output details found for this workflow
                    </h2>
                    <p className="text-sm text-gray-700">
                      Please run the workflow or check the status of the
                      previous run.
                    </p>
                  </div>
                </div>
              )}
              {executionId?.length > 0 ? (
                <RunSummary runSummaryData={runSummaryData} />
              ) : (
                <div className="w-full border-l-4 border-[#B785FF] bg-white rounded-lg shadow-md space-y-6 p-6 mt-5">
                  {/* Header Section */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg text-primary-black">
                      No execution found for this workflow
                    </h2>
                    <p className="text-sm text-gray-700">
                      Please run the workflow or check the status of the
                      previous run.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Motion>
      </div>

      {/* Need for Scheduling workflow */}
      {/* <SchedulerModal
        show={isSchedulerModalOpen}
        setShow={setIsSchedulerModalOpen}
        workFlowData={workFlowData}
        setWorkFlowData={setWorkFlowData}
      /> */}
    </div>
  );
};

export default Run;
