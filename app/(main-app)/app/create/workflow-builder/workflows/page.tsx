"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { API_URL } from "@/lib/api";
import axios from "axios";
import { Copy, Edit, MoreVertical, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { Fragment, useState,useEffect } from "react";
import { formatUpdatedAt } from "./utils";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

interface EditModalProps {
  show: boolean;
  onHide: (params:boolean) => void;
}

// function EditModal({show,onHide }: EditModalProps) {
//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Modal heading</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleClose}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }


type Workflow = {
  id: number; 
  [key: string]: any;
};

export default function Workflows() {
  const [workFlows, setWorkFlows] = useState<Workflow[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const getAllWorkFlows =async () =>{
    try {
      const response = await axios.get(`${API_URL}/workflow/api/v1`);
      setWorkFlows(response.data.data);
    } catch (error) {
      console.log('Error fetching workflows:', error);
    } 
  }

  const deleteWorkFlow = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/workflow/api/v1/${id}`);
      getAllWorkFlows();
    } catch (error) {
      console.log('Error deleting workflow:', error)
    }
  }

  useEffect(() => {
    getAllWorkFlows();
  },[])

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Workflows</h1>
          </div>
          <Link href="/app/create/workflow-builder/create-workflow" className="min-w-fit">
            <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2 whitespace-nowrap">
              <Plus size={20} />
              Create workflow
            </button>
          </Link>
        </div>
        <div className="flex gap-5 mt-5 flex-wrap">
          {
            workFlows.map((workflow) => (
              <div key={workflow._id} className="w-full p-7 bg-white rounded-3xl border border-[#E8E8E8] flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-xl font-semibold">{workflow.name}</h1>
                  <p className="text-sm">
                    Last edited <span className="font-medium text-primary-green">about {formatUpdatedAt(workflow.updatedAt)}</span>
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-2 hover:bg-gray-100 h-10 w-10 rounded-full">
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                      <div className="flex gap-3">
                          <Edit size={20} />
                          <h2>Edit</h2>
                        </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                      <div className="flex gap-3" onClick={() => deleteWorkFlow(workflow.workflow_id)}>
                        <Trash2 size={20} />
                        <h2>Delete</h2>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                      <div className="flex gap-3">
                        <Copy size={20} />
                        <h2>Duplicate</h2>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          }
        </div>
      </main>
      {/* <EditModal show={showEditModal} onHide={()=>setShowEditModal(false)}/> */}
    </Fragment>
  );
}
