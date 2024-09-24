"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { Edit, History, MoreVertical, Plus, Trash2, WorkflowIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlay } from "react-icons/fa6";
import { formatUpdatedAt } from "./utils";
import EditModal from "./components/EditModal";
import Spinner from "@/components/Spinner";
import { WorkflowsIcon, WorkflowsIcon2 } from "@/components/svgs";
import { PlanUsage } from "@/types/common";
import GlobalModal from "@/components/modal/global.modal";
import Lock from "@/components/svgs/lock";

type Workflow = {
  [key: string]: string;
};

export default function Workflows() {
  const [workFlows, setWorkFlows] = useState<Workflow[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const router = useRouter();
  const [editWorkFlow, setEditWorkFlow] = useState<Workflow>({});
  const [loading, setLoading] = useState(false);
  const [isPlanUsageLoading, setIsPlanUsageLoading] = useState(false);
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState<boolean>(false);
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);

  const [isCreateWorkflowReqPending, setIsCreateWorkflowReqPending] = useState(false);
  const [clickedBtnIdx, setClickedBtnIdx] = useState<number | null>(null);
  const createWorkflow = async () => {
    setIsCreateWorkflowReqPending(true);
    const canCreateWorkflow = await fetchPlanUsage();
    if (!canCreateWorkflow) {
      setIsCreateWorkflowReqPending(false);
      return;
    }
    try {
      const response = await instance.post(`${API_URL}/workflow/api/v1`);
      const newWorkflowId = response.data.data.workflow_id;
      setWorkflowId(newWorkflowId);
      router.push(`/app/create/workflow-builder/create-workflow?workflow_id=${newWorkflowId}`);
    } catch (error) {
      console.error("Error creating workflow:", error);
      toast.error("Error creating workflow");
    } finally {
      setIsCreateWorkflowReqPending(false);
    }
  };

  const runWorkflow = async (workflowId:string) => {
    const canCreateWorkflow = await fetchPlanUsage();
    if (!canCreateWorkflow) {
      return;
    }
    router.push(`/app/create/workflow-builder/workflows/user-work-flow?workflow_id=${workflowId}`);

  }
  
  const fetchPlanUsage = async () => {
    setIsPlanUsageLoading(true);
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data.data;
      setPlanUsage(data);
      if (data.usage.ai_worfklow_credits <= 0) {
        setIsAddOnModalOpen(true);
        return false; 
      }else{
        return true;
      }
  
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
      return false;
    } finally {
      setIsPlanUsageLoading(false);
    }
  };
  


  const getAllWorkFlows = async () => {
    try {
      const response = await instance.get(`${API_URL}/workflow/api/v1`);
      setWorkFlows(response.data.data);
    } catch (error) {
      console.log("Error fetching workflows:", error);
      toast.error("Error fetching workflows");
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkFlow = async (id: string) => {
    try {
      await instance.delete(`${API_URL}/workflow/api/v1/${id}`);
      toast.success("Workflow deleted successfully");
      getAllWorkFlows();
    } catch (error) {
      toast.error("Error deleting workflow");
      console.log("Error deleting workflow:", error);
    }
  };
  const [isEditRequestPending, setIsEditRequestPending] = useState(false);
  const handleEditWorkFlow = async () => {
    setIsEditRequestPending(true);
    try {
      if (!editWorkFlow.name) {
        toast.error("please provide a name");
      }
      await instance.put(`${API_URL}/workflow/api/v1/${editWorkFlow.workflow_id}`, { name: editWorkFlow.name });
      toast.success("Workflow edited successfully");
      setShowEditModal(false);
      getAllWorkFlows();
    } catch (error) {
      toast.error("Something went wrong editing workflow");
      console.log(error);
    } finally {
      setIsEditRequestPending(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllWorkFlows();
  }, []);

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("workflow_id");
    if (id) {
      setWorkflowId(id);
    }
  }, [searchParams]);

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Workflows</h1>
          </div>
          <button
            disabled={isCreateWorkflowReqPending}
            className="w-full max-w-fit bg-primary-green text-white sheen transition duration-500 px-5 h-12 rounded-xl flex items-center gap-2 whitespace-nowrap"
            onClick={() => {
              setClickedBtnIdx(0);
              createWorkflow();
            }}>
            {isCreateWorkflowReqPending && clickedBtnIdx === 0 ? <Spinner /> : <Plus size={20} />}
            Create workflow
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {loading ? (
            <div className="flex-1 flex flex-col gap-5 justify-center items-center min-h-[30vh] col-span-2">
              <Spinner color="black" size={80} />
              Loading...
            </div>
          ) : workFlows.length < 1 ? (
            <div className="mt-4 flex flex-col justify-center items-center space-y-4 py-8 mx-auto col-span-2">
              <h2 className="text-lg text-center font-semibold">You have Custom Workflows Created yet</h2>
              <p className="max-w-4xl text-center text-gray-500">
                Explore and manage your personalized workflows effortlessly. With custom workflows already created, you can streamline tasks, automate
                processes, and enhance productivity tailored to your specific needs.
              </p>
              <div className="flex space-x-3 items-center">
                <Link href="/app/create/workflow-builder/">
                  <button className="w-full max-w-fit bg-primary-green text-white sheen transition duration-500 px-5 h-14 rounded-xl flex items-center gap-2 whitespace-nowrap">
                    <WorkflowsIcon size={20}/>
                    <WorkflowsIcon2 size={20}/>
                    Explore prebuilt workflows
                  </button>
                </Link>
                <button
                  disabled={isCreateWorkflowReqPending}
                  className="w-full max-w-fit bg-primary-green text-white sheen transition duration-500 px-5 h-14 rounded-xl flex items-center gap-2 whitespace-nowrap"
                  onClick={() => {
                    setClickedBtnIdx(1);
                    createWorkflow();
                  }}>
                  {isCreateWorkflowReqPending && clickedBtnIdx === 1 ? <Spinner /> : <Plus size={20} />}
                  Create your own workflow
                </button>
              </div>
            </div>
          ) : (
            workFlows.map((workflow) => (
              <div key={workflow._id} className="w-full p-7 bg-white rounded-3xl border border-[#E8E8E8] flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-xl font-semibold">{workflow.name}</h1>
                  <p className="text-sm">
                    Last edited <span className="font-medium text-primary-green">about {formatUpdatedAt(workflow.updatedAt)}</span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                    <button key={workflow._id} onClick={() => runWorkflow(workflow.workflow_id)} className="flex items-center gap-3 rounded-xl h-12 bg-primary-green sheen px-6 text-white text-[14px]">
                      <FaPlay size={12} />
                      Run workflow
                    </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="px-2 hover:bg-gray-100 h-10 w-10 rounded-full">
                        <MoreVertical size={20} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        inset
                        className="min-w-[200px] flex justify-between gap-8 items-center my-1"
                        onClick={() => {
                          setShowEditModal(true);
                          setEditWorkFlow(workflow);
                        }}>
                        <div className="flex gap-3">
                          <Edit size={20} />
                          <h2>Edit</h2>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        inset
                        className="min-w-[200px] flex justify-between gap-8 items-center my-1"
                        onClick={() => deleteWorkFlow(workflow.workflow_id)}>
                        <div className="flex gap-3">
                          <Trash2 size={20} />
                          <h2>Delete</h2>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        inset
                        className="min-w-[200px] flex justify-between gap-8 items-center my-1"
                        onClick={() => router.push(`/app/create/workflow-builder/workflows/user-work-flow?workflow_id=${workflow.workflow_id}&tab=1`)}>
                        <div className="flex gap-3">
                          <History size={20} />
                          <h2>View History</h2>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <GlobalModal showCloseButton={false} open={isAddOnModalOpen} setOpen={() => { setIsAddOnModalOpen(false) }}>
        <div className="flex flex-col items-center justify-center px-6 pt-4 pb-8 gap-6 space-x-6">
          <Lock />
          <h3 className="text-center text-[28px] font-semibold">You don’t have enough credit.</h3>
          <p className="text-center text-gray-700 text-sm md:text-base px-4">
            You don’t have enough credits in your wallet to use this feature. It is an add-on, and requires additional credit to access. Please add credits to continue.
          </p>
          <div className="flex items-center justify-between gap-3">
            <button
              className="text-red-500 border border-red-500 bg-transparent text-nowrap py-2 px-6 rounded-md transition duration-300"
              onClick={() => setIsAddOnModalOpen(false)}
            >
              Cancel
            </button>
            <Link
              className="bg-primary-green text-white text-nowrap py-2 px-6 rounded-md transition duration-300 hover:bg-green-600"
              href="/account/billings/settings">
              Add Credit
            </Link>
          </div>
        </div>
      </GlobalModal>

      <EditModal
        show={showEditModal}
        onHide={setShowEditModal}
        isEditRequestPending={isEditRequestPending}
        editWorkFlow={editWorkFlow}
        setEditWorkFlow={setEditWorkFlow}
        onSave={handleEditWorkFlow}
      />
    </Fragment>
  );
}
