import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";

interface BulkDialogProps {
  onBulkAdd: (terms: string[]) => void;
}

export default function BulkDialog({ onBulkAdd }: BulkDialogProps) {
  const [bulkInput, setBulkInput] = useState("");

  const handleAdd = () => {
    if (bulkInput.trim() === "") return;
    const terms = bulkInput
      .split(",")
      .map(term => term.trim())
      .filter(Boolean);

    onBulkAdd(terms);
    setBulkInput("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-white h-12 px-8 rounded-xl border border-white flex items-center gap-3 font-medium">
          <Edit size={20} />
          Bulk edit
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[584px]">
        <DialogHeader>
          <DialogTitle>Bulk edit</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <h2>Paste items separated by commas:</h2>
          <textarea
            className="h-[200px] bg-[#F2F2F2] rounded-2xl w-full resize-none p-4"
            value={bulkInput}
            onChange={e => setBulkInput(e.target.value)}
          ></textarea>
        </div>
        <div className="flex gap-3">
          <DialogClose className="w-full">
            <button className="w-full py-3.5 px-4 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6">
              Cancel
            </button>
          </DialogClose>
          <DialogClose className="w-full">
            <button
              className="w-full py-3.5 px-4 bg-primary-green sheen rounded-xl text-white mt-6"
              onClick={handleAdd}
            >
              Add
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
