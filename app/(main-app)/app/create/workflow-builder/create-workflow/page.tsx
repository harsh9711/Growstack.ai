"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Code, Copy, Database, HelpCircle, History, Play, Send, X, ClipboardCopy } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import WorkFlowBuilderComponent from "./components/WorkFlowBuilderComponent";
import { useSearchParams } from "next/navigation";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import { Input } from "@/components/ui/input";

interface PublishModalProps {
  show: boolean;
  onHide: (params: boolean) => void;
  workflowId: string;
  loading: boolean;
  onRunDashboard: () => void; // New callback for running in the dashboard
}

function PublishModal({ show, onHide, workflowId, loading, onRunDashboard }: PublishModalProps) {
  return (
    <div className={`z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ${show ? "block" : "hidden"}`}>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="flex-1 h-full w-full flex justify-center items-center mt-10 mb-20">
          <div className="w-full max-w-3xl bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10 relative">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold leading-none tracking-tight border-[#EDEFF0] pb-4">Workflow Published</h1>
              <div className="text-2xl cursor-pointer" onClick={() => onHide(false)}>
                <X />
              </div>
            </div>
            <p className="opacity-80 text-sm">Your workflow version has been published. You can now run it from the dashboard or integrate the API.</p>
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
                    }}>
                    <ClipboardCopy size={25} />
                  </div>
                </div>
              </div>
            </div>
            <button
              className={`mt-2 bg-primary-green text-white sheen transition duration-500 px-6 py-4 h-12 rounded-xl flex items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
              onClick={onRunDashboard} // Trigger the dashboard navigation
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 1116 0A8 8 0 014 12zm0 0a8 8 0 0016 0" />
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
    setIsLoading(true); // Set loading state to true
    setTimeout(() => {
      // Simulate loading state for demonstration
      window.location.href = `/app/create/workflow-builder/workflows/user-work-flow?workflow_id=${workflowId}`;
    }, 500); // Adjust timeout as needed
  };

  return (
    <Fragment>
      <main className="flex-1 flex flex-col h-full w-full">
        <div className="mt-8 flex justify-between items-center">
          <div className="flex gap-3">
            <Link href="/app/create/workflow-builder/workflows" className="-mt-[5px]">
              <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 p-1 rounded-lg font-medium items-center transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path
                    d="M11.8687 15.6313C12.2104 15.973 12.2104 16.527 11.8687 16.8687C11.527 17.2104 10.973 17.2104 10.6313 16.8687L11.8687 15.6313ZM6.25 11.25L5.63128 11.8687C5.46719 11.7046 5.375 11.4821 5.375 11.25C5.375 11.0179 5.46719 10.7954 5.63128 10.6313L6.25 11.25ZM10.6313 5.63128C10.973 5.28957 11.527 5.28957 11.8687 5.63128C12.2104 5.97299 12.2104 6.52701 11.8687 6.86872L10.6313 5.63128ZM6.25 12.125C5.76675 12.125 5.375 11.7332 5.375 11.25C5.375 10.7667 5.76675 10.375 6.25 10.375L6.25 12.125ZM18.75 22.125C18.2667 22.125 17.875 21.7332 17.875 21.25C17.875 20.7667 18.2667 20.375 18.75 20.375L18.75 22.125ZM10.6313 16.8687L5.63128 11.8687L6.86872 10.6313L11.8687 15.6313L10.6313 16.8687ZM5.63128 10.6313L10.6313 5.63128L11.8687 6.86872L6.86872 11.8687L5.63128 10.6313ZM6.25 10.375L20 10.375L20 12.125L6.25 12.125L6.25 10.375ZM20 10.375C23.2447 10.375 25.875 13.0053 25.875 16.25C25.875 16.5586 25.8664 16.8677 25.849 17.1756L27.4687 18.7954C27.6987 19.0254 27.6987 19.4375 27.4687 19.6875C27.2387 19.9375 26.8266 19.9375 26.5966 19.6875L24.4967 17.6768C24.2918 17.3805 24.1416 17.0738 24.0625 16.75C24.0401 16.6848 24.025 16.6211 24.0169 16.5563C23.9141 16.7275 23.7588 16.8525 23.5775 16.9125C23.2583 16.9977 22.9899 17.0746 22.7246 17.1303C22.3111 17.2668 21.9265 17.4492 21.5923 17.6812C21.2584 17.9121 20.9667 18.1967 20.75 18.5L20.75 20.375L6.25 20.375L6.25 18.5C6.25001 18.2905 6.26543 18.0828 6.29164 17.8751L4.59309 16.3546C4.4445 16.2057 4.375 16.0171 4.375 15.8125C4.375 15.5561 4.50763 15.3125 4.75 15.3125C4.99086 15.3125 5.21048 15.3893 5.37382 15.5261L6.25 16.1187L10.6313 12.125C10.8277 11.9225 11.1057 11.7258 11.3738 11.5687L15.6313 15.6313L16.8687 16.8687L18.75 18.75L18.75 22.125L22.125 22.125L22.125 21.25L18.75 21.25L18.75 20.375L20 20.375L20 18.5L20.75 18.5L21.1187 18.1313L22.125 19.1187L22.125 21.25C22.125 21.7332 21.7332 22.125 21.25 22.125L18.75 22.125Z"
                    fill="#000000"
                  />
                </svg>
                <div className="text-sm font-semibold">Back to Workflows</div>
              </button>
            </Link>
          </div>
          <div className="flex gap-4">
          <button
              onClick={handlePublishWorkFlow}
              className={`bg-primary-green text-white px-6 py-2 rounded-lg flex items-center gap-2 transition duration-300 ${
                isPublishing ? "opacity-70 cursor-not-allowed" : ""
              }`}>
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
