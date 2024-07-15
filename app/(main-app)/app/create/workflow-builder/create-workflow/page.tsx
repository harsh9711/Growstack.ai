"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Code, Copy, Database, HelpCircle, History, Play, Send, X, ClipboardCopy, Zap } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import WorkFlowBuilderComponent from "./components/WorkFlowBuilderComponent";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import { Input } from "@/components/ui/input";

interface PublishModalProps {
  show: boolean;
  onHide: (params: boolean) => void;
  workflowId:string
}

function PublishModal({ show, onHide, workflowId }: PublishModalProps) {
  return (
    <div className={`z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="flex-1 h-full w-full flex justify-center items-center mt-10 mb-20">
          <div className="w-full max-w-3xl bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10 relative">
            <div className="flex justify-between">
            <h1 className="text-xl font-semibold leading-none tracking-tight border-[#EDEFF0] pb-4">Workflow Published</h1>
              <div className="text-2xl cursor-pointer" onClick={() => onHide(false)}>
                <X/>
              </div>
            </div>
            <p className="opacity-80 text-sm ">Your workflow version has been published. You can now run it from the dashboard or integrate the API.</p>
            <div className="mt-4 flex flex-col gap-5">
              <div className="space-y-2">
                <div className="">Workflow ID</div>
                <div className="flex items-center">
                  <Input value={workflowId} className="flex-1 h-10 rounded-md border text-black dark:text-white cursor-not-allowed" type="text" disabled={true} />
                  <div className="cursor-pointer" onClick={() => navigator.clipboard.writeText(workflowId)}>
                  <ClipboardCopy size={25}/>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-2 bg-primary-green text-white sheen transition duration-500 px-6 py-4 h-12 rounded-xl flex items-center gap-2">
              <Link href={`/app/create/workflow-builder/template/user-work-flow?workflow_id=${workflowId}`}>
                Run in dashboard 
                {/* <Zap size={20} /> */}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function CreateWorkflowPage() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [workflowId, setWorkflowId] = useState("");
  const tabs = ["Editor", "Versions", "Settings"];
  const searchParams = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("workflow_id");
    if (id) {
      setWorkflowId(id);
    }
  }, [searchParams]);

  const handlePublishWorkFlow = async () => {
    try {
      await axios.put(`${API_URL}/workflow/api/v1/${workflowId}`, { status: "Published" });
      toast.success("Workflow published successfully");
      setShowPublishModal(true)
    } catch (error) {
      toast.error("Failed to publish workflow");
      console.log(error)
    }
  }

  return (
    <Fragment>
      <main className="flex-1 flex flex-col h-full w-full">
        <div className="mt-8 flex justify-between items-center">
          <div className="flex gap-3">
            <Link href="/app/create/workflow-builder/workflows" className="-mt-[5px]">
              <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 p-1 rounded-lg font-medium items-center transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <path
                    d="M11.8687 15.6313C12.2104 15.973 12.2104 16.527 11.8687 16.8687C11.527 17.2104 10.973 17.2104 10.6313 16.8687L11.8687 15.6313ZM6.25 11.25L5.63128 11.8687C5.46719 11.7046 5.375 11.4821 5.375 11.25C5.375 11.0179 5.46719 10.7954 5.63128 10.6313L6.25 11.25ZM10.6313 5.63128C10.973 5.28957 11.527 5.28957 11.8687 5.63128C12.2104 5.97299 12.2104 6.52701 11.8687 6.86872L10.6313 5.63128ZM6.25 12.125C5.76675 12.125 5.375 11.7332 5.375 11.25C5.375 10.7667 5.76675 10.375 6.25 10.375L6.25 12.125ZM18.75 22.125C18.2667 22.125 17.875 21.7332 17.875 21.25C17.875 20.7667 18.2667 20.375 18.75 20.375L18.75 22.125ZM10.6313 16.8687L5.63128 11.8687L6.86872 10.6313L11.8687 15.6313L10.6313 16.8687ZM5.63128 10.6313L10.6313 5.63128L11.8687 6.86872L6.86872 11.8687L5.63128 10.6313ZM6.25 10.375L20 10.375L20 12.125L6.25 12.125L6.25 10.375ZM20 10.375C23.2447 10.375 25.875 13.0053 25.875 16.25L24.125 16.25C24.125 13.9718 22.2782 12.125 20 12.125L20 10.375ZM25.875 16.25C25.875 19.4947 23.2447 22.125 20 22.125L20 20.375C22.2782 20.375 24.125 18.5282 24.125 16.25L25.875 16.25ZM20 22.125L18.75 22.125L18.75 20.375L20 20.375L20 22.125Z"
                    fill="#212833"
                  />
                </svg>
              </button>
            </Link>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">New workflow</h1>
              <p className="text-primary-black text-opacity-50 flex items-center gap-6 text-sm">
                {workflowId}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="cursor-pointer text-primary-green" onClick={() => navigator.clipboard.writeText("wkf_VzfU33gpxzoNGU")}>
                        <Copy size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-1.5 hover:bg-primary-light-gray rounded-lg flex items-center gap-1.5 text-sm transition-all duration-300">
              Help
              <HelpCircle size={18} />
            </button>
            <button className="border border-[#E8E8E8] bg-white h-12 w-full min-w-[52px] max-w-[52px] rounded-xl grid place-content-center shadow-md shadow-gray-100">
              <History size={22} />
            </button>
            <button className="border border-[#E8E8E8] bg-white h-12 w-full min-w-[52px] max-w-[52px] rounded-xl grid place-content-center shadow-md shadow-gray-100">
              <Code size={20} />
            </button>
            <button className="border border-[#E8E8E8] bg-white h-12 w-full min-w-[52px] max-w-[52px] rounded-xl grid place-content-center shadow-md shadow-gray-100">
              <Database size={20} />
            </button>
            {/* <div className="h-[52px] w-full min-w-[300px] bg-[#F4F4F4] px-3 py-2 rounded-xl">
              <div className="w-full flex relative">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full h-[37px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                      selectedTabIndex === index ? "!text-primary-black" : "!text-primary-grey"
                    }`}
                    onClick={() => {
                      const totalTabs = tabs.length;
                      const percentage = (index / totalTabs) * 100;
                      setSelectedTabIndex(index);
                      setTabUnderlineLeft(percentage);
                    }}>
                    {tab}
                  </div>
                ))}
                <div
                  className="absolute bottom-0 h-[37px] bg-white custom-transition rounded-lg"
                  style={{ left: `calc(${tabUnderlineLeft}%)`, width: `${100 / tabs.length}%` }}></div>
              </div>
            </div> */}
            {/* <button className="border border-[#E8E8E8] sheen transition duration-500 px-6 py-4 h-12 w-full rounded-xl flex items-center gap-2">
              <Play size={20} />
              Preview
            </button> */}
            <button className="bg-primary-green text-white sheen transition duration-500 px-6 py-4 h-12 w-full rounded-xl flex items-center gap-2"
              onClick={handlePublishWorkFlow}>
              <Send size={20} />
              Publish
            </button>
          </div>
        </div>
        <WorkFlowBuilderComponent />
        <PublishModal show={showPublishModal} onHide={() => setShowPublishModal(false)} workflowId={workflowId} />
      </main>
    </Fragment>
  );
}
