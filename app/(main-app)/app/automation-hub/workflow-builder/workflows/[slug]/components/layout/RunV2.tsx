"use client";

import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import instance, {
  automation,
  CustomAxiosInstance,
} from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import clsx from "clsx";
import { Clock, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import FileUpload from "./FileUploadV2";
import { Switch } from "@/components/ui/switch";
import { WorkflowInputFieldType } from "@/types/enums";
import { Checkbox } from "@/components/ui/checkbox";
import ApprovalsAccordion from "./ApprovalAccordion";
import OutputDetails from "./OutputDetails";
import RunSummary from "./RunSummary";
import WorkFlowHeader from "@/components/workFlowHeader/WorkFlowHeader";
import TimeLineTable from "@/components/timeLineTabel/TimeLineTabel";
import axios from "axios";
import WorkflowSchedulerModal from "../WorkflowSchedulerModal";
import { isPending } from "@reduxjs/toolkit";

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
interface OutputDetailsData {
  status?: string;
  outputDetails?: Array<{
    nodeMasterId: string;
    value: any;
    title: string;
  }>;
}

interface Props {
  workflowId: string;
  executionId?: string;
  timeline?: boolean;
}

const Run: React.FC<any> = ({
  workflowId,
  executionId: initialExecutionId,
  timeline,
}) => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl2, setFileUrl2] = useState<string>("");
  const [isScheduleModalOpen, setIsSchedulerModalOpen] = useState(false);

  const [outputDetailsData, setOutputDetailsData] = useState<OutputDetailsData>(
    {}
  );
  const [workFlowData, setWorkFlowData] = useState<any>({
    name: "",
    input_configs: [],
    status: "",
    workflow_id: "",
    description: "",
  });
  const [isHovered, setIsHovered] = useState<any>(null);
  const [approvalsData, setApprovalsData] = useState<any>({});
  const [approveOutputDataId, setApproveOutputDataId] = useState("");
  const [IsInputParameterOpen, setIsInputParameterOpen] = useState(true);
  const [executionId, setExecutionId] = useState(initialExecutionId || "");
  const [runSummaryData, setRunSummaryData] = useState<any>([]);
  const [workflowStatsData, setWorkflowStatsData] = useState<any>([]);
  const [isStoppedInternal, setIsStoppedInternal] = useState<any>(false);

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
      const response = await instance.get(`${automation}/workflow/${id}`);
      const apiData = response.data;

      // Filter and map `nodes` to `input_configs`
      const inputConfigs = apiData?.nodes
        .filter((node: any) => {
          const type = node?.nodeMasterId?.inputType;
          const formType = node?.nodeMasterId?.type;
          return (
            type === "text" ||
            type === "textarea" ||
            type === "checkbox" ||
            type === "switch" ||
            type === "number" ||
            type === "file" ||
            formType === "form"
          );
        })
        .flatMap((node: any) => {
          if (node?.type !== "form") {
            // Handle non-form nodes
            const parameters = node?.parameters || {};
            return {
              display_name: parameters?.inputLabel || "Untitled Field",
              description: parameters?.description || "",
              placeholder: parameters?.placeholder || "",
              default_value:
                parameters?.variableName === "boolean"
                  ? false
                  : parameters.defaultValue || "",
              variableName: parameters?.variableName || "",
              type: node?.nodeMasterId?.inputType,
              list_values: parameters?.options || [],
              required: parameters?.required,
              file_type: parameters?.fileType,
            };
          } else {
            // Handle form nodes with subNodes
            return (
              node?.subNodes?.map((data: any) => {
                let inputType = "";
                const getName = node?.nodeMasterId?.subNodes?.find(
                  (subNode: any) => subNode?.nodeMasterId === data?.nodeMasterId
                )?.name;
                if (getName === "Short Text") inputType = "text";
                else if (getName === "Long Text") inputType = "textarea";
                else if (getName === "Boolean") inputType = "switch";
                else if (getName === "Number") inputType = "number";
                else if (getName === "File Upload") inputType = "file";
                else if (getName === "CheckList") inputType = "checkbox";
                else inputType = "text";

                const formParameters = data.parameters || {};
                return {
                  display_name: formParameters?.inputLabel || "Untitled Field",
                  description: formParameters?.description || "",
                  placeholder: formParameters?.placeholder || "",
                  default_value:
                    formParameters?.variableName === "boolean"
                      ? false
                      : formParameters?.defaultValue || "",
                  variableName: formParameters?.variableName || "",
                  type: inputType,
                  list_values: formParameters?.options || [],
                  required: formParameters?.required,
                  file_type: formParameters?.fileType,
                };
              }) || []
            );
          }
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
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleRunWorkFlow = useCallback(async () => {
    const updatedWorkflowData = workFlowData?.input_configs?.map(
      (data: any) => ({
        variableName: data?.variableName,
        variableValue:
          data?.type === "checkbox"
            ? data?.selected_values
            : data?.default_value,
      })
    );
    setIsLoading(true);
    try {
      // const response = await axios.post(
      //   `http://localhost:5000/workflow/${workflowId}/run`,
      //   updatedWorkflowData
      // );
      const response = await instance.post(
        `${automation}/workflow/${workflowId}/run`,
        updatedWorkflowData
      );
      // const response = await instance.post(
      //   `/workflow/${workflowId}/run`,
      //   updatedWorkflowData
      // );
      getWorkflowStats();
      setExecutionId(response?.data?.executionId);
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error generating website:", error);
    } finally {
      setIsLoading(false);
    }
  }, [workFlowData]);

  const pollingWorkflowExec = useCallback(async () => {
    try {
      // const getWorkFlowExecData = await axios.get(
      //   `http://localhost:5000/workflow/${workflowId}/status/${executionId}`
      // );
      const getWorkFlowExecData = await instance.get(
        `${automation}/workflow/${workflowId}/status/${executionId}`
      );

      // const getWorkFlowExecData = await instance.get(
      //   `/workflow/${workflowId}/status/${executionId}`
      // );
      setRunSummaryData(getWorkFlowExecData?.data);
      const status = getWorkFlowExecData?.data?.status;
      const outputDetails = getWorkFlowExecData?.data?.nodeExecutions?.flatMap(
        (nodeExecution: any) => {
          if (nodeExecution?.nodeId?.type !== "form") {
            const nodeId = nodeExecution?.nodeId;
            const variableName = nodeExecution?.parameters?.variableName;
            const nodeMasterId = nodeId?._id;
            const nodeExecutionId = nodeExecution?._id;
            const value =
              getWorkFlowExecData?.data?.variables[variableName] || "";
            const approvalStatus = nodeExecution?.approvalStatus;
            const approvalRequired =
              nodeExecution?.parameters?.approvalRequired;
            const status = nodeExecution?.status;
            const nodeType = nodeExecution?.nodeId?.type;
            const socialMediaContent = nodeExecution?.socialMediaContent;

            return {
              nodeMasterId: nodeMasterId,
              value: value,
              title: variableName,
              approvalStatus: approvalStatus,
              approvalRequired: approvalRequired,
              nodeExecutionId: nodeExecutionId,
              status: status,
              nodeType: nodeType,
              socialMediaContent: socialMediaContent,
            };
          } else {
            // Handle form type nodes by mapping over the subNodes and returning results
            return nodeExecution?.subNodes?.map((data: any) => {
              const nodeId = nodeExecution?.nodeId;
              const nodeMasterId = nodeId?._id;
              const nodeExecutionId = nodeExecution?._id;
              const variableName = data?.parameters?.variableName;
              const value =
                getWorkFlowExecData?.data?.variables[variableName] || "";
              const approvalStatus = nodeExecution?.approvalStatus;
              const approvalRequired =
                nodeExecution?.parameters?.approvalRequired;
              const status = nodeExecution?.status;
              const nodeType = nodeExecution?.nodeId?.type;
              const socialMediaContent = nodeExecution?.socialMediaContent;

              return {
                nodeMasterId: nodeMasterId,
                value: value,
                title: variableName,
                approvalStatus: approvalStatus,
                approvalRequired: approvalRequired,
                nodeExecutionId: nodeExecutionId,
                status: status,
                nodeType: nodeType,
                socialMediaContent: socialMediaContent,
              };
            });
          }
        }
      );

      const approvals = getWorkFlowExecData?.data?.nodeExecutions?.map(
        (item: any) => {
          const name = item?.nodeId?.name;
          const description = item?.nodeId?.description;
          const approvalRequired = item?.parameters?.approvalRequired;
          const approvalStatus = item?.approvalStatus;
          return {
            name: name,
            description: description,
            approvalRequired: approvalRequired,
            approvalStatus: approvalStatus,
          };
        }
      );
      setOutputDetailsData({
        status: status,
        outputDetails: outputDetails,
      });
      setApprovalsData({
        status: status,
        approvalDetails: approvals,
      });
      if (status === "completed" || status === "failed") {
        return true;
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error fetching workflow execution data", error);
    }
    return false;
  }, [executionId, workflowId, approveOutputDataId, approvalsData]);
  useEffect(() => {
    if (executionId?.length > 0) {
      let interval: NodeJS.Timeout;

      const startPolling = async () => {
        interval = setInterval(async () => {
          try {
            const shouldStop = await pollingWorkflowExec();
            if (shouldStop) {
              setIsStoppedInternal(true);
              clearInterval(interval);
              getWorkflowStats();
            }
          } catch (error) {
            setIsStoppedInternal(true);
            console.error("Error during polling:", error);
            clearInterval(interval); // Clear on error as well, if needed.
            getWorkflowStats();
          }
        }, 5000);
        if (isStoppedInternal) {
          setIsStoppedInternal(false);
          clearInterval(interval); // Clear on error as well, if needed.
          getWorkflowStats();
        }
      };

      startPolling();

      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [pollingWorkflowExec, executionId]);

  const handleFileUploaded = useCallback(
    (fileUrl: string, idx: number) => {
      setWorkFlowData((prevWorkFlowData: any) => {
        const updatedInputs = [...prevWorkFlowData.input_configs];
        updatedInputs[idx].default_value = fileUrl;
        return { ...prevWorkFlowData, input_configs: updatedInputs };
      });
    },
    [workFlowData]
  );

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

  const getWorkflowStats = async () => {
    try {
      // const response = await CustomAxiosInstance().get(
      //   `/workflow/${workflowId}/stats`
      // );
      const response = await instance.get(
        `${automation}/workflow/${workflowId}/stats`
      );
      setWorkflowStatsData(response?.data);
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error fetching workflow stats data", error);
    }
  };

  useEffect(() => {
    getWorkflowStats();
  }, [workflowId]);

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

  useEffect(() => {
    if (initialExecutionId) {
      setExecutionId(initialExecutionId);
    }
  }, [initialExecutionId]);

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

  const isWorkflowDisabled = (inputConfigs: any[]) => {
    return inputConfigs.some((config: any) => {
      if (config.required) {
        if (config.type === "checkbox") {
          return !config.selected_values || config.selected_values.length === 0;
        } else {
          return !config.default_value || config.default_value.length === 0;
        }
      }
      return false;
    });
  };

  return (
    <div className="px-8 pb-8">
      <div>
        <WorkFlowHeader
          workFlowData={workFlowData}
          workflowStatsData={workflowStatsData}
        />
        <Motion
          transition={{ duration: 0.5 }}
          variants={{ visible: { opacity: 1 } }}
        >
          <div className="flex h-screen mt-5 gap-6">
            <div className="w-2/5">
              <div
                className={`border-l-4 border-[#F1B917] rounded-2xl w-full flex flex-col gap-6 p-4  max-h-[380px] overflow-y-scroll transition-all bg-white shadow-md duration-500 ease-in-out custom-scrollbar`}
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
                  className={`${
                    IsInputParameterOpen ? "block" : "hidden"
                  } transition-opacity`}
                >
                  {workFlowData?.input_configs &&
                    workFlowData?.input_configs?.length > 0 &&
                    workFlowData?.input_configs?.map(
                      (input: any, idx: number) => {
                        const matchingOutput =
                          outputDetailsData?.outputDetails?.find(
                            (output: any) => output.title === input.variableName
                          );
                        return (
                          <div key={idx} className="relative group">
                            <div className="flex items-center mb-4 mt-4 gap-2">
                              <h2 className="font-medium">
                                {input?.display_name}
                              </h2>
                              {input?.required && (
                                <span className="text-red-500">*</span>
                              )}
                              {input?.description?.length > 0 && (
                                <div className="relative" key={idx}>
                                  {/* Info icon */}
                                  <div
                                    className="inline-block cursor-pointer"
                                    onMouseEnter={() => setIsHovered(idx)}
                                    onMouseLeave={() => setIsHovered(null)}
                                  >
                                    <Info className="hover:opacity-100" />
                                  </div>
                                  {/* Description box */}
                                  {isHovered === idx && (
                                    <div
                                      key={idx}
                                      className="absolute left-0 top-full mt-2 w-max p-2 text-sm text-white bg-gray-800 rounded-md shadow-md z-10"
                                    >
                                      {input?.description}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                            {input?.type !== "form" &&
                              matchingOutput?.value &&
                              timeline && (
                                <div className="bg-gray-100 p-4 rounded-lg w-full">
                                  {typeof matchingOutput?.value ===
                                    "string" && <p>{matchingOutput.value}</p>}
                                  {typeof matchingOutput?.value ===
                                    "boolean" && (
                                    <p>
                                      {matchingOutput.value ? "True" : "False"}
                                    </p>
                                  )}
                                  {typeof matchingOutput?.value ===
                                    "number" && <p>{matchingOutput.value}</p>}
                                  {Array.isArray(matchingOutput?.value) &&
                                    matchingOutput.value.length > 0 && (
                                      <ul>
                                        {matchingOutput.value.map(
                                          (item, index) => (
                                            <li key={index}>{item}</li>
                                          )
                                        )}
                                      </ul>
                                    )}
                                  {!Array.isArray(matchingOutput?.value) &&
                                    typeof matchingOutput?.value ===
                                      "object" && (
                                      <pre>
                                        {JSON.stringify(
                                          matchingOutput.value,
                                          null,
                                          2
                                        )}
                                      </pre>
                                    )}
                                </div>
                              )}

                            {!timeline &&
                              (() => {
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
                                        onFileUploaded={(fileUrl: any) =>
                                          handleFileUploaded(fileUrl, idx)
                                        }
                                        acceptedFileTypes={
                                          input.file_type || "*/*"
                                        }
                                      />
                                    );
                                  case "checkbox":
                                    return (
                                      <div className="flex gap-4">
                                        {input?.list_values &&
                                          input?.list_values?.length > 0 &&
                                          input?.list_values?.map(
                                            (option: string) => (
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
                                                    handleCheckListInput(
                                                      option,
                                                      idx
                                                    )
                                                  }
                                                />
                                                <span className="text-sm capitalize font-medium text-gray-700">
                                                  {option}
                                                </span>
                                              </label>
                                            )
                                          )}
                                      </div>
                                    );
                                  default:
                                    return (
                                      <>
                                        {input?.type === "textarea" ? (
                                          <textarea
                                            placeholder={input?.placeholder}
                                            className="resize-none border p-3 h-[120px] w-full border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/60 transition"
                                            value={input?.default_value}
                                            onChange={e =>
                                              handleChangeInput(
                                                e.target.value,
                                                idx
                                              )
                                            }
                                            required={input?.required}
                                          />
                                        ) : (
                                          <input
                                            type={
                                              input?.type === "number"
                                                ? "number"
                                                : "text"
                                            }
                                            placeholder={input?.placeholder}
                                            className="w-full p-4 h-[46px] border border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/60 transition"
                                            value={input?.default_value}
                                            onChange={e =>
                                              handleChangeInput(
                                                e.target.value,
                                                idx
                                              )
                                            }
                                            required={input?.required}
                                          />
                                        )}
                                      </>
                                    );
                                }
                              })()}
                          </div>
                        );
                      }
                    )}
                  {!timeline && (
                    <div className="flex justify-center mt-12 w-full gap-2">
                      <button
                        className={clsx(
                          "bg-primary-light-shade-green flex flex-row items-center justify-center rounded-lg p-4 h-[46px] gap-3 text-white"
                        )}
                        disabled={isWorkflowDisabled(
                          workFlowData?.input_configs
                        )}
                        onClick={handleRunWorkFlow}
                      >
                        {isLoading && <Spinner />}
                        <h2 className="text-white">Instant Run</h2>
                      </button>
                      <button
                        className={clsx(
                          "bg-transparent border-2 border-green-200 flex flex-row items-center justify-center rounded-lg p-4 h-[46px] gap-3 "
                        )}
                        onClick={() => setIsSchedulerModalOpen(true)}
                        disabled={isWorkflowDisabled(
                          workFlowData?.input_configs
                        )}
                      >
                        <Clock size={20} color="#2DA771" />
                        <h2 className="text-primary-light-shade-green">
                          Schedule Workflow
                        </h2>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {approvalsData?.approvalDetails &&
                approvalsData?.approvalDetails?.length > 0 && (
                  <ApprovalsAccordion approvalsData={approvalsData} />
                )}
            </div>
            <div className="w-3/5">
              {executionId?.length > 0 ? (
                <OutputDetails
                  outputDetailsData={outputDetailsData}
                  executionId={executionId}
                  onPollingWithNewId={(newExeId: string) =>
                    setExecutionId(newExeId)
                  }
                  setApproveOutputDataId={setApproveOutputDataId}
                  workflowId={workflowId}
                />
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
                runSummaryData && runSummaryData.id ? (
                  <RunSummary runSummaryData={runSummaryData} />
                ) : (
                  <div className="flex-1 flex flex-col gap-5 justify-center items-center min-h-[30vh]">
                    <Spinner color="black" size={50} /> Loading...
                  </div>
                )
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
      <WorkflowSchedulerModal
        show={isScheduleModalOpen}
        setShow={() => {
          setIsSchedulerModalOpen(false);
        }}
        workFlowData={workFlowData}
        setWorkFlowData={setWorkFlowData}
        timeLineTable="false"
      />
    </div>
  );
};

export default Run;
