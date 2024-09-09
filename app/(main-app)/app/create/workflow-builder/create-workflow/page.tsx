"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Code,
  Copy,
  Database,
  HelpCircle,
  History,
  Play,
  Send,
  X,
  ClipboardCopy,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import WorkFlowBuilderComponent from "./components/WorkFlowBuilderComponent";
import { useSearchParams } from "next/navigation";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { IoReturnUpBack } from "react-icons/io5";

interface PublishModalProps {
  show: boolean;
  onHide: (params: boolean) => void;
  workflowId: string;
  loading: boolean;
  onRunDashboard: () => void; // New callback for running in the dashboard
}

function PublishModal({
  show,
  onHide,
  workflowId,
  loading,
  onRunDashboard,
}: PublishModalProps) {
  return (
    <div
      className={`z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="flex-1 h-full w-full flex justify-center items-center mt-10 mb-20">
          <div className="w-full max-w-3xl bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10 relative">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold leading-none tracking-tight border-[#EDEFF0] pb-4">
                Workflow Published
              </h1>
              <div
                className="text-2xl cursor-pointer"
                onClick={() => onHide(false)}
              >
                <X />
              </div>
            </div>
            <p className="opacity-80 text-sm">
              Your workflow version has been published. You can now run it from
              the dashboard or integrate the API.
            </p>
            <div className="mt-4 flex flex-col gap-5">
              <div className="space-y-2">
                <div className="">Workflow ID</div>
                <div className="flex items-center">
                  <Input
                    value={workflowId}
                    className="flex-1 h-10 rounded-md border text-black dark:text-white cursor-not-allowed"
                    type="text"
                    disabled={true}
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(workflowId);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <ClipboardCopy size={25} />
                  </div>
                </div>
              </div>
            </div>
            <button
              className={`mt-2 bg-primary-green text-white sheen transition duration-500 px-6 py-4 h-12 rounded-xl flex items-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
              onClick={onRunDashboard} // Trigger the dashboard navigation
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 12a8 8 0 1116 0A8 8 0 014 12zm0 0a8 8 0 0016 0"
                    />
                  </svg>
                  Loading...
                </div>
              ) : (
                "Run in dashboard"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateWorkflowPage() {
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [workflowId, setWorkflowId] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading when navigating to dashboard
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("workflow_id");
    if (id) {
      setWorkflowId(id);
    }
  }, [searchParams]);

  const handlePublishWorkFlow = async () => {
    setIsPublishing(true);
    try {
      await instance.put(`${API_URL}/workflow/api/v1/${workflowId}`, {
        status: "Published",
      });
      toast.success("Workflow published successfully");
      setShowPublishModal(true);
    } catch (error) {
      toast.error("Failed to publish workflow");
      console.log(error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRunDashboard = () => {
    setIsLoading(true); 
    setTimeout(() => {
      window.location.href = `/app/create/workflow-builder/workflows/user-work-flow?workflow_id=${workflowId}`;
    }, 500);
  };

  return (
    <Fragment>
      <main className="flex-1 flex flex-col h-full w-full">
        <div className="mt-8 flex justify-between items-center">
          <div className="flex gap-3">
            <Link
              href="/app/create/workflow-builder/workflows"
              className="-mt-[5px]"
            >
              <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 p-1 rounded-lg font-medium items-center transition-all duration-300">
                <IoReturnUpBack className="text-3xl" />

                <div className="text-sm font-semibold">Back to Workflows</div>
              </button>
            </Link>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handlePublishWorkFlow}
              className={`bg-primary-green text-white px-6 py-2 rounded-lg flex items-center gap-2 transition duration-300 ${
                isPublishing ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isPublishing && <Send className="icon-flight" size={20} />}
              Publish
            </button>
          </div>
        </div>
        <WorkFlowBuilderComponent />
        <PublishModal
          show={showPublishModal}
          onHide={setShowPublishModal}
          workflowId={workflowId}
          loading={isLoading} // Pass loading state to PublishModal
          onRunDashboard={handleRunDashboard} // Pass callback for running in dashboard
        />
      </main>
    </Fragment>
  );
}
