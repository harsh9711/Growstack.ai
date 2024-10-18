"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Spinner from "@/public/svgs/spinner";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

type Workflow = {
  [key: string]: string;
};

interface EditModalProps {
  show: boolean;
  onHide: (value: boolean) => void;
  editWorkFlow: Workflow;
  setEditWorkFlow: (params: Workflow) => void;
  isEditRequestPending: boolean;
  onSave: () => void;
}

function EditModal({ show, onHide, editWorkFlow, setEditWorkFlow, onSave, isEditRequestPending }: EditModalProps) {
  const router = useRouter();
  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit workflow</DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-5">
          <div className="space-y-2">
            <label className="font-medium">Workflow name</label>
            <Input
              className="border-2"
              type="text"
              placeholder="Type your workflow name"
              value={editWorkFlow.name}
              onChange={(e) => setEditWorkFlow({ ...editWorkFlow, name: e.target.value })}
            />
          </div>
          <div className="flex ">
            <button
              className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
              onClick={() => {
                router.push(`/app/automation-hub/workflow-builder/create-workflow?workflow_id=${editWorkFlow.workflow_id}`);
              }}>
              Edit Workflow Steps
            </button>
            <div className="flex justify-end gap-4 w-full">
              <button
                className="py-3.5 h-14 w-full max-w-[140px] px-6 bg-white border text-primary-green border-primary-green rounded-xl mt-6"
                onClick={() => onHide(false)}>
                Cancel
              </button>
              <button
                disabled={isEditRequestPending}
                className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
                onClick={onSave}>
                {isEditRequestPending && <Spinner />}
                Save
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;
