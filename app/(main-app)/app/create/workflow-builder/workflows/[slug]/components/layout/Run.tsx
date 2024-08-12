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
import { useRouter } from "next/navigation";
import SchedulerModal from "../SchedulerModal";

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
  const router = useRouter();
  const [workFlowResults, setWorkFlowResults] = useState<WorkFlowResults>({
    outputs: [],
    status: true,
    failed_step: -1,
    temp_outputs: [],
    workflow_runner_id: "",
  });
  
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
    } finally {
      setLoading(false);
    }
  };

  const handleGetProfile = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/social-media/profile`);
      if (response.data.data.activeSocialAccounts.length > 0) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.log("Error fetching social profile:", error);
      return null;
    }
  };

  const handleRunWorkFlow = async () => {
    setIsWorkFlowFetched(false);

    if (workFlowData.social_media_requirement) {
      const profileData = await handleGetProfile();
      if (!profileData || profileData.activeSocialAccounts.length === 0) {
        toast.error("Connect a social profile to your account to use this workflow");
        return router.push("/app/publish/scheduler/quick-posting");
      }
    }

    try {
      const payload = {
        actions_with_runs: workFlowData.actions.map((action) => ({ action: action._id })),
        inputs: workFlowData.input_configs.map((input) => ({
          variable_name: input.variable_name,
          variable_value: input.default_value,
        })),
        outputs: workFlowData.output_configs.map((output) => ({
          variable_name: output.display_name,
          variable_value: output.value,
          variable_type: output.type,
        })),
      };
      const response = await instance.post(`${API_URL}/workflow/api/v1/${workflowId}/runner`, payload);
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

  const handleResumeWorkflow = async (choice: boolean) => {
    setWorkFlowResuming(true);
    try {
      const response = await instance.get(`${API_URL}/workflow/api/v1/wrun/resume/${workFlowResults.workflow_runner_id}?ctaAction=${choice}`);
      setWorkFlowResults(response.data.data);
    } catch (error: any) {
      console.error("Error resuming workflow:", error);
      toast.error(error.response?.data?.error || "Error resuming workflow");
    } finally {
      setWorkFlowResuming(false);
    }
  };

  useEffect(() => {
    if (workflowId) {
      fetchWorkflowData(workflowId);
    }
  }, [workflowId]);

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
      <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        <div className="mt-6 w-full bg-white p-10 space-y-6 rounded-3xl flex flex-col">
          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-2xl font-semibold text-left">Run workflow</h1>
            <p className="text-[#14171B]/80">Fill in the input to kick off your workflow.</p>
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
                <div className="font-light mt-3 mb-2 text-[14px]">{input.description}</div>
                <input
                  type="text"
                  placeholder={input.placeholder}
                  className="w-full p-4 h-[46px] border border-gray-100 bg-[#F9F9F9] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green/60 transition"
                  value={input.default_value}
                  onChange={(e) => handleChangeInput(e.target.value, idx)}
                />
              </div>
            ))}
            <button
              disabled={!isWorkFlowFetched || isSchedulerModalOpen}
              className={clsx(
                "bg-[#03473729] flex flex-row items-center justify-center rounded-lg p-4 h-[46px] gap-3 text-primary-green",
                !isWorkFlowFetched && "text-opacity-70 cursor-not-allowed"
              )}
              onClick={handleRunWorkFlow}>
              {!isWorkFlowFetched ? <Spinner color="#034737" /> : <FaPlay />}
              <h2 className="text-[#14171B]">Run Workflow</h2>
            </button>
            {workFlowData.social_media_requirement && (
              <div className="w-full space-y-5">
                <p className="text-center text-gray-400">Or</p>
                <button
                  className={clsx("w-full bg-[#03473729] flex flex-row items-center justify-center rounded-lg p-4 h-[46px] gap-3 text-primary-green")}
                  onClick={() => setIsSchedulerModalOpen(true)}>
                  <Clock size={20} />
                  <h2 className="text-[#14171B]">Schedule a workflow run time.</h2>
                </button>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="flex flex-col gap-7 !mt-10">
            <div className="flex flex-col gap-2 items-start">
              <h1 className="text-2xl font-semibold text-left">Results</h1>
              <p className="text-[#14171B]/80">Your output will appear below.</p>
            </div>
            {!workFlowResults.outputs.length &&
              workFlowData.output_configs.map((output, idx) => (
                <div key={idx} className="border rounded-2xl flex flex-col gap-4 p-5 bg-white">
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
              workFlowResults.outputs.map((output, idx) => (
                <>{workFlowResults.status && workFlowResults.failed_step <= idx + 1 && <OutputCard key={idx} index={idx} output={output} />}</>
              ))}
            {workFlowResults.paused &&
              workFlowResults.temp_outputs.map((output, idx) => (
                <>{workFlowResults.status && workFlowResults.failed_step <= idx + 1 && <OutputCard key={idx} index={idx} output={output} />}</>
              ))}

            {workFlowResults.paused && (
              <div>
                <h2 className="text-[17px] font-medium text-center text-gray-400">Please review this response</h2>
                <div className="flex flex-row gap-4 items-center justify-center mt-4">
                  <button
                    className="h-12 w-[200px] bg-primary-green text-white px-4 py-2 rounded-xl flex justify-center items-center"
                    onClick={() => handleResumeWorkflow(true)}>
                    {workFlowResuming ? <Spinner /> : "Satisfied & Continue"}
                  </button>
                  <button className="h-12 w-[150px] bg-red-500 text-white px-4 py-2 rounded-xl flex justify-center items-center" onClick={handleRunWorkFlow}>
                    {!isWorkFlowFetched ? <Spinner /> : "Regenerate"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Motion>
      <SchedulerModal show={isSchedulerModalOpen} setShow={setIsSchedulerModalOpen} workFlowData={workFlowData} setWorkFlowData={setWorkFlowData} />
    </>
  );
};

export default Run;
