import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";

export default function BulkDialog() {
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
          <h2>Paste items separated by new line.</h2>
          <textarea className="h-[200px] bg-[#F2F2F2] rounded-2xl w-full resize-none p-4"></textarea>
        </div>
        <div className="flex gap-3">
          <DialogClose className="w-full">
            <button className="w-full py-3.5 px-4 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf0000ab]/10 rounded-xl mt-6">Cancel</button>
          </DialogClose>
          <button className="w-full py-3.5 px-4 bg-primary-green sheen rounded-xl text-white mt-6">Add</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
