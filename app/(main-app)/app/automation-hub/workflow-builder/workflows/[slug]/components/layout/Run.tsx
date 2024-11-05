"use client";

import DotsLoader from "@/components/DotLoader";
import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import clsx from "clsx";
import { Clock, Edit } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlay } from "react-icons/fa6";
import OutputCard from "../OutputCard";
import { useRouter, useSearchParams } from "next/navigation";
import SchedulerModal from "../SchedulerModal";
import FileUpload from "../FileUpload";
import { BrandVoice } from "@/types/common";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Ellipse from "@/components/svgs/ellipse";
import Wave from "@/components/svgs/wave";
import Link from "next/link";
import { ALL_ROUTES } from "@/utils/constant";
import ExternalLink from "@/components/svgs/externalLink";
import { Switch } from "@/components/ui/switch";
import { WorkflowInputFieldType } from "@/types/enums";
import { Checkbox } from "@/components/ui/checkbox";
import { WorkFlowData } from "../types";

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
  onTabChange: any;
}

const Run: React.FC<Props> = ({ workflowId, onTabChange }) => {
  const [loading, setLoading] = useState(true);
  const [fileUrl2, setFileUrl2] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedBrandVoice, setSelectedBrandVoice] = useState<string>("");
  const [brandVoices, setBrandVoices] = useState<BrandVoice[]>([]);
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [workFlowResults, setWorkFlowResults] = useState<WorkFlowResults>({
    outputs: [],
    status: true,
    failed_step: -1,
    temp_outputs: [],
    workflow_runner_id: "",
  });
  const handleSomeAction = (RunnerId: any) => {
    if (onTabChange) {
      onTabChange(RunnerId);
    }
  };
  const [workFlowData, setWorkFlowData] = useState<WorkFlowData>({
    name: "",
    actions: [],
    input_configs: [],
    output_configs: [],
    social_media_requirement: false,
    status: "",
    workflow_id: "",
  });

  const [isWorkFlowFetched, setIsWorkFlowFetched] = useState(true);
  const [workFlowResuming, setWorkFlowResuming] = useState(false);
  const [isSchedulerModalOpen, setIsSchedulerModalOpen] = useState(false);

  const fetchWorkflowData = async (id: string) => {
    setLoading(true);
    try {
      const response = await instance.get(`${API_URL}/workflow/api/v1/${id}`);
      setWorkFlowData(response.data.data);
    } catch (error: any) {
      console.error("Error fetching workflow data:", error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    }
  };

  const fetchBrandVoice = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/brand-voice/all`
      );
      const data = response.data.data;
      setBrandVoices(data);
    } catch (error) {
      console.error("Error fetching brand voices", error);
    }
  };

  useEffect(() => {
    fetchBrandVoice();
  }, []);

  const handleGetProfile = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/profile`
      );
      if (response.data.data.activeSocialAccounts.length > 0) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  };
  const handleFileUploaded = (fileUrl: string, idx: number) => {
    setFileUrl2(fileUrl);
    const updatedInputs = [...workFlowData.input_configs];
    updatedInputs[idx].default_value = fileUrl;
    setWorkFlowData({ ...workFlowData, input_configs: updatedInputs });
  };

  const handleRunWorkFlow = async () => {
    setIsWorkFlowFetched(false);
    if (workFlowData.social_media_requirement) {
      const profileData = await handleGetProfile();
      if (!profileData || profileData.activeSocialAccounts.length === 0) {
        toast.error(
          "Connect a social profile to your account to use this workflow"
        );
        return router.push("/app/publish/scheduler/quick-posting/profiles");
      }
    }

    try {
      const payload = {
        actions_with_runs: workFlowData.actions.map(action => ({
          action: action._id,
        })),
        inputs: workFlowData.input_configs.map(input => ({
          variable_name: input.variable_name,
          variable_value:
            input.type === WorkflowInputFieldType.CHECKLIST
              ? input?.selected_values || []
              : input.default_value || fileUrl2,
        })),
        outputs: workFlowData.output_configs.map(output => ({
          variable_name: output.display_name,
          variable_value: output.value,
          variable_type: output.type,
        })),
      };
      const response = await instance.post(
        `${API_URL}/workflow/api/v1/${workflowId}/runner`,
        payload
      );
      handleSomeAction(response.data.data.workflow_runner_id);

      setWorkFlowResults(response.data.data);
    } catch (error) {
      console.error("Error running workflow:", error);
      toast.error("Error running workflow");
    } finally {
      setIsWorkFlowFetched(true);
    }
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

  const handleResumeWorkflow = async (choice: boolean) => {
    setWorkFlowResuming(true);
    try {
      const response = await instance.get(
        `${API_URL}/workflow/api/v1/wrun/resume/${workFlowResults.workflow_runner_id}?ctaAction=${choice}`
      );
      setWorkFlowResults(response.data.data);
    } catch (error: any) {
      console.error("Error resuming workflow:", error);
      toast.error(error.response?.data?.error || "Error resuming workflow");
    } finally {
      setWorkFlowResuming(false);
    }
  };
  const fetchRunnerData = async (runnerId: string) => {
    try {
      const response = await instance.get(
        `${API_URL}/workflow/api/v1/runner/${runnerId}`
      );
      const runnerData = response.data.data;

      setWorkFlowData(prevData => {
        const updatedInputConfigs = prevData.input_configs.map(config => {
          const matchedInput = runnerData.inputs.find(
            (input: any) => input.variable_name === config.variable_name
          );
          return matchedInput
            ? { ...config, default_value: matchedInput.variable_value }
            : config;
        });

        return {
          ...prevData,
          input_configs: updatedInputConfigs,
        };
      });

      setWorkFlowResults(runnerData);
    } catch (error) {
      console.error("Error fetching runner data:", error);
    } finally {
      const params = new URLSearchParams(window.location.search);
      params.delete("tab");
      params.delete("pre_filled");
      params.delete("runner_id");

      router.replace(`?${params.toString()}`, undefined);
    }
  };

  useEffect(() => {
    if (brandVoices?.length > 0) {
      const defaultBrandVoice = brandVoices.find(voice => voice.is_default);
      if (defaultBrandVoice) {
        setSelectedBrandVoice(defaultBrandVoice._id);
      }
    }
  }, [brandVoices]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    const preFilled = searchParams.get("pre_filled");
    const runnerId = searchParams.get("runner_id");

    if (workflowId) {
      fetchWorkflowData(workflowId)
        .then(() => {
          if (tab && preFilled && runnerId) {
            fetchRunnerData(runnerId);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [workflowId]);

  const handleBrandVoiceSelection = (value: string) => {
    setSelectedBrandVoice(value);
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col gap-5 justify-center items-center min-h-[30vh]">
        <Spinner color="black" size={50} />
        Loading...
      </div>
    );
  }

  return (
    <>
      <Motion
        transition={{ duration: 0.5 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="mt-6 w-full bg-white p-10 space-y-6 rounded-3xl flex flex-col">
          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-2xl font-semibold text-left">Run workflow</h1>
            <p className="text-[#14171B]/80">
              Fill in the input to kick off your workflow.
            </p>
          </div>
          <div className="border rounded-2xl flex flex-col gap-6 p-6">
            <div className="flex flex-row items-center gap-2">
              <div className="bg-primary-green p-2.5 rounded-[10px] text-white">
                <Edit size={18} />
              </div>
              <h2 className="font-medium text-lg">Input</h2>
            </div>
            {workFlowData.input_configs.map((input, idx) => (
              <div key={idx}>
                <h2 className="font-medium">{input.display_name}</h2>
                <div className="font-light mt-3 mb-2 text-[14px]">
                  {input.description}
                </div>
                {input?.brand_voice ? (
                  <Select
                    value={selectedBrandVoice}
                    onValueChange={value => {
                      const selectedBrandVoice = brandVoices.find(
                        voice => voice._id === value
                      )?.brand_voice;
                      console.log(value, selectedBrandVoice);
                      if (selectedBrandVoice) {
                        handleChangeInput(selectedBrandVoice, idx);
                        handleBrandVoiceSelection(value);
                      } else {
                        handleChangeInput("", idx);
                      }
                    }}
                  >
                    <SelectTrigger className="h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
                      <div className="flex items-center gap-2">
                        <span className="min-w-fit">
                          <Wave />
                        </span>
                        {selectedBrandVoice
                          ? brandVoices.find(
                              voice => voice._id === selectedBrandVoice
                            )?.brand_name
                          : "Brand Voice"}
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <div className="flex w-full border-b border-[#EBEBEB] p-2 items-center gap-2">
                          <span className="min-w-fit">
                            <Wave color="#034737" />
                          </span>
                          <p className="text-sm">Brand Voice</p>
                          <Link
                            href={ALL_ROUTES.BRAND_VOICE}
                            className="min-w-fit text-right"
                          >
                            <ExternalLink width={22} height={22} />
                          </Link>
                        </div>
                        {brandVoices.map(voice => (
                          <SelectItem
                            className="relative ite"
                            key={voice._id}
                            value={voice._id}
                            showIndicator={false}
                          >
                            <span className="absolute left-2 top-3 flex  items-center justify-center">
                              <Ellipse
                                isFilled={selectedBrandVoice === voice._id}
                              />
                            </span>

                            <div
                              className={clsx(
                                "flex items-center line-clamp-1 gap-2",
                                selectedBrandVoice === voice._id &&
                                  "text-primary-green font-medium"
                              )}
                            >
                              {voice.brand_name}
                            </div>
                          </SelectItem>
                        ))}
                        <div
                          onClick={() => {
                            setSelectedBrandVoice("");
                            handleChangeInput("", idx);
                          }}
                          className="flex w-full cursor-pointer  border-t border-[#EBEBEB] p-2 items-center gap-2"
                        >
                          <Ellipse isFilled={!!!selectedBrandVoice} />
                          <p className="text-sm">No brand voice</p>
                        </div>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  (() => {
                    switch (input.type) {
                      case WorkflowInputFieldType.BOOLEAN:
                        return (
                          <Switch
                            checked={input.default_value}
                            onCheckedChange={checked =>
                              handleBooleanInput(checked, idx)
                            }
                          />
                        );
                      case WorkflowInputFieldType.FILE_UPLOAD:
                        return (
                          <FileUpload
                            onFileUploaded={fileUrl =>
                              handleFileUploaded(fileUrl, idx)
                            }
                            acceptedFileTypes={input.file_type || "*/*"}
                          />
                        );
                      case WorkflowInputFieldType.CHECKLIST:
                        return (
                          <div className="flex gap-4">
                            {input.list_values.map((option: string) => (
                              <label
                                key={option}
                                className="flex items-center space-x-1.5"
                              >
                                <Checkbox
                                  checked={
                                    input?.selected_values?.includes(option) ||
                                    false
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
                            type="text"
                            placeholder={input.placeholder}
                            className="w-full p-4 h-[46px] border border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/60 transition"
                            value={input.default_value}
                            onChange={e =>
                              handleChangeInput(e.target.value, idx)
                            }
                          />
                        );
                    }
                  })()
                )}
              </div>
            ))}

            <button
              disabled={!isWorkFlowFetched || isSchedulerModalOpen}
              className={clsx(
                "bg-[#03473729] flex flex-row items-center justify-center rounded-lg p-4 h-[46px] gap-3 text-primary-green",
                !isWorkFlowFetched && "text-opacity-70 cursor-not-allowed"
              )}
              onClick={handleRunWorkFlow}
            >
              {!isWorkFlowFetched ? <Spinner color="#034737" /> : <FaPlay />}
              <h2 className="text-[#14171B]">Run Workflow</h2>
            </button>
            {workFlowData.social_media_requirement && (
              <div className="w-full space-y-5">
                <p className="text-center text-gray-400">Or</p>
                <button
                  className={clsx(
                    "w-full bg-[#03473729] flex flex-row items-center justify-center rounded-lg p-4 h-[46px] gap-3 text-primary-green"
                  )}
                  onClick={() => setIsSchedulerModalOpen(true)}
                >
                  <Clock size={20} />
                  <h2 className="text-[#14171B]">Schedule Workflow</h2>
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-2xl font-semibold text-left">Results</h1>
              <p className="text-[#14171B]/80">
                Your output will appear below.
              </p>
            </div>
            {!workFlowResults?.outputs?.length &&
              workFlowData.output_configs.map((output, idx) => (
                <div
                  key={idx}
                  className="border rounded-2xl flex flex-col gap-4 p-5 bg-white"
                >
                  <div className="flex flex-row items-center gap-4">
                    <Image src="/leaf.png" alt="go" width={45} height={45} />
                    <h2 className="font-medium text-[17px]">
                      {idx + 1}. {output.display_name}
                    </h2>
                    {!isWorkFlowFetched && <DotsLoader />}
                  </div>
                </div>
              ))}
            {!workFlowResults.paused &&
              workFlowResults?.outputs?.map((output, idx) => (
                <>
                  {workFlowResults.status &&
                    workFlowResults.failed_step <= idx + 1 && (
                      <OutputCard key={idx} index={idx} output={output} />
                    )}
                </>
              ))}
            {workFlowResults.paused &&
              workFlowResults.temp_outputs.map((output, idx) => (
                <>
                  {workFlowResults.status &&
                    workFlowResults.failed_step <= idx + 1 && (
                      <OutputCard key={idx} index={idx} output={output} />
                    )}
                </>
              ))}

            {workFlowResults.paused && (
              <div>
                <h2 className="text-[17px] font-medium text-center text-gray-400">
                  Please review this response
                </h2>
                <div className="flex flex-row gap-4 items-center justify-center mt-4">
                  <button
                    className="h-12 w-[200px] bg-primary-green text-white px-4 py-2 rounded-xl flex justify-center items-center"
                    onClick={() => handleResumeWorkflow(true)}
                  >
                    {workFlowResuming ? <Spinner /> : "Satisfied & Continue"}
                  </button>
                  <button
                    className="h-12 w-[150px] bg-red-500 text-white px-4 py-2 rounded-xl flex justify-center items-center"
                    onClick={handleRunWorkFlow}
                  >
                    {!isWorkFlowFetched ? <Spinner /> : "Regenerate"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Motion>
      <SchedulerModal
        show={isSchedulerModalOpen}
        setShow={setIsSchedulerModalOpen}
        workFlowData={workFlowData}
        setWorkFlowData={setWorkFlowData}
      />
    </>
  );
};

export default Run;
