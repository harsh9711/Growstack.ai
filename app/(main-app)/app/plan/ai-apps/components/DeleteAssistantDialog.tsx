import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function DeleteAssistantDialog({
  id,
  handleDelete,
  fetchAssistants,
}: {
  id: string;
  handleDelete: (id: string, fetchAssistants: () => Promise<void>) => void;
  fetchAssistants: () => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
          <Trash2 size={15} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[520px]">
        <DialogTitle>Are you sure you want to delete this assistant</DialogTitle>
        <div className="flex justify-center gap-x-3 mt-4">
          <DialogClose>
            <button className="border text-primary-black px-8 py-3 rounded-xl flex items-center gap-2">Cancel</button>
          </DialogClose>
          <button
            onClick={() => handleDelete(id, fetchAssistants)}
            className="bg-rose-600 text-white sheen transition duration-500 px-8 py-3 rounded-xl flex items-center gap-2">
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
