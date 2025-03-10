import Motion from "@/components/Motion";
import { OutputIcon2 } from "@/components/svgs";
import { ClipboardCopy, Plus, Send, X } from "lucide-react";
import { useState } from "react";
import AddOutput from "./layout/AddOutput";
import { Fragment } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";

interface PublishModalProps {
  show: boolean;
  onHide: (params: boolean) => void;
  workflowId: string;
}

function PublishModal({ show, onHide, workflowId }: PublishModalProps) {
  return (
    <div
      className={`z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ${show ? "block" : "hidden"}`}
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
            <p className="opacity-80 text-sm ">
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
                    disabled
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
            <button className="mt-2 bg-primary-green text-white sheen transition duration-500 px-6 py-4 h-12 rounded-xl flex items-center gap-2">
              <Link
                href={`/app/automation-hub/workflow-builder/workflows/user-work-flow?workflow_id=${workflowId}`}
              >
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

interface OutputSectionProps {
  outputConfigs: any[];
  setOutputConfigs: (params: any) => void;
  actions: any;
  inputConfigs: any;
  workflowId: any;
}
export default function OutputSection({
  actions,
  inputConfigs,
  outputConfigs,
  setOutputConfigs,
  workflowId,
}: OutputSectionProps) {
  const [addNewOutput, setAddNewOutput] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const handlePublishWorkFlow = async () => {
    try {
      await instance.put(`${API_URL}/workflow/api/v1/${workflowId}`, {
        status: "Published",
      });
      toast.success("Workflow published successfully");
      setShowPublishModal(true);
    } catch (error) {
      toast.error("Failed to publish workflow");
      console.log(error);
    }
  };

  return (
    <>
      <Motion
        transition={{ duration: 0.5 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="flex items-center gap-4 border-b border-[#bbbbbb6b] border-dashed pb-8">
          <div className="bg-primary-green p-4 rounded-lg">
            <OutputIcon2 className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-medium">Output</h2>
            <span className="text-primary-black text-opacity-50 text-sm">
              Configure and test the output data
            </span>
          </div>
        </div>
        {addNewOutput || outputConfigs.length ? (
          <AddOutput
            setAddNewOutput={setAddNewOutput}
            outputConfigs={outputConfigs}
            setOutputConfigs={setOutputConfigs}
            actions={actions}
            inputConfigs={inputConfigs}
          />
        ) : (
          <Fragment>
            <div className="mt-8 space-y-3">
              <p className="text-primary-neutral text-xl font-semibold">
                Get started by adding outputs or steps
              </p>
              <p className="text-primary-black text-opacity-70 leading-relaxed text-sm">
                Outputs will be generated by the workflow and made available to
                the user after execution.
              </p>
              <div className="space-y-5 !mt-8">
                <button
                  onClick={() => setAddNewOutput(true)}
                  className="w-full text-center bg-primary-green text-white hover:bg-primary-green/90 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Output
                </button>
                <span className="text-center block">Or</span>
                <button
                  className="w-full text-center border border-[#E8E8E8] text-primary-green hover:bg-primary-green/10 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2"
                  onClick={handlePublishWorkFlow}
                >
                  <Send size={20} />
                  Publish
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </Motion>
      <PublishModal
        show={showPublishModal}
        onHide={() => setShowPublishModal(false)}
        workflowId={workflowId}
      />
    </>
  );
}
