"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import { Copy, Edit, MoreVertical, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import React, { Fragment, useState, useEffect } from "react";
import { formatUpdatedAt } from "./utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaPlay } from "react-icons/fa6";

interface EditModalProps {
  show: boolean;
  onHide: (params: boolean) => void;
  editWorkFlow: Workflow;
  setEditWorkFlow: (params: Workflow) => void;
  onSave: () => void;
}

function EditModal({
  show,
  onHide,
  editWorkFlow,
  setEditWorkFlow,
  onSave,
}: EditModalProps) {
  const router = useRouter();
  return (
    <div
      className={`z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ${
        show ? "block" : "hidden"
      }`}
    >
      {/* Semi-transparent backdrop */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>

      {/* Modal content */}
      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="flex-1 h-full w-full flex justify-center items-center mt-10 mb-20">
          <div className="w-full max-w-3xl bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10 relative">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold leading-none tracking-tight border-[#EDEFF0] pb-4">
                Edit Workflow
              </h1>
              <div
                className="text-2xl cursor-pointer"
                onClick={() => onHide(false)}
              >
                <X />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-5">
              <div className="space-y-2">
                <label className="font-medium">Workflow name</label>
                <Input
                  className="border-2"
                  type="text"
                  placeholder="Type your workflow name"
                  value={editWorkFlow.name}
                  onChange={(e) =>
                    setEditWorkFlow({ ...editWorkFlow, name: e.target.value })
                  }
                />
              </div>
              <div className="flex ">
                <button
                  className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
                  onClick={() => {
                    router.push(
                      `/app/create/workflow-builder/create-workflow?workflow_id=${editWorkFlow.workflow_id}`
                    );
                  }}
                >
                  Edit Workflow Steps
                </button>
                <div className="flex justify-end gap-4 w-full">
                  <button
                    className="py-3.5 h-14 w-full max-w-[140px] px-6 bg-white border text-primary-green border-primary-green rounded-xl mt-6"
                    onClick={() => onHide(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
                    onClick={onSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Workflow = {
  [key: string]: string;
};

export default function Workflows() {
  const [workFlows, setWorkFlows] = useState<Workflow[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [workflowId, setWorkflowId] = useState(null);
  const router = useRouter();
  const [editWorkFlow, setEditWorkFlow] = useState<Workflow>({});
  const createWorkflow = async () => {
    try {
      const response = await instance.post(`${API_URL}/workflow/api/v1`);
      const newWorkflowId = response.data.data.workflow_id;
      setWorkflowId(newWorkflowId);
      router.push(
        `/app/create/workflow-builder/create-workflow?workflow_id=${newWorkflowId}`
      );
    } catch (error) {
      console.error("Error creating workflow:", error);
      toast.error("Error creating workflow");
    }
  };

  const getAllWorkFlows = async () => {
    try {
      const response = await instance.get(`${API_URL}/workflow/api/v1`);
      setWorkFlows(response.data.data);
    } catch (error) {
      console.log("Error fetching workflows:", error);
      toast.error("Error fetching workflows");
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

  const handleEditWorkFlow = async () => {
    try {
      await instance.put(
        `${API_URL}/workflow/api/v1/${editWorkFlow.workflow_id}`,
        { name: editWorkFlow.name }
      );
      toast.success("Workflow edited successfully");
      setShowEditModal(false);
      getAllWorkFlows();
    } catch (error) {
      toast.error("Error editing workflow");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllWorkFlows();
  }, []);

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Workflows</h1>
          </div>
          <Link
            href="/app/create/workflow-builder/create-workflow"
            className="min-w-fit"
          >
            <button
              className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2 whitespace-nowrap"
              onClick={createWorkflow}
            >
              <Plus size={20} />
              Create workflow
            </button>
          </Link>
        </div>
        <div className="flex gap-5 mt-5 flex-wrap">
          {workFlows.map((workflow) => (
            <div
              key={workflow._id}
              className="w-full p-7 bg-white rounded-3xl border border-[#E8E8E8] flex items-center justify-between"
            >
              <div className="space-y-2">
                <h1 className="text-xl font-semibold">{workflow.name}</h1>
                <p className="text-sm">
                  Last edited{" "}
                  <span className="font-medium text-primary-green">
                    about {formatUpdatedAt(workflow.updatedAt)}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  key={workflow._id}
                  href={`/app/create/workflow-builder/workflows/user-work-flow?workflow_id=${workflow.workflow_id}`}
                >
                  <button className="flex items-center gap-3 rounded-xl h-12 bg-primary-green sheen px-6 text-white text-[14px]">
                    <FaPlay size={12} />
                    Run workflow
                  </button>
                </Link>
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
                      }}
                    >
                      <div className="flex gap-3">
                        <Edit size={20} />
                        <h2>Edit</h2>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      inset
                      className="min-w-[200px] flex justify-between gap-8 items-center my-1"
                      onClick={() => deleteWorkFlow(workflow.workflow_id)}
                    >
                      <div className="flex gap-3">
                        <Trash2 size={20} />
                        <h2>Delete</h2>
                      </div>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                      <div className="flex gap-3">
                        <Copy size={20} />
                        <h2>Duplicate</h2>
                      </div>
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </main>
      <EditModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        editWorkFlow={editWorkFlow}
        setEditWorkFlow={setEditWorkFlow}
        onSave={handleEditWorkFlow}
      />
    </Fragment>
  );
}
