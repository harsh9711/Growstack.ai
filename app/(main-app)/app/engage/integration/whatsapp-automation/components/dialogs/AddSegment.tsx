import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";

export default function AddSegment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit">
          <Plus size={20} />
          Add new Segments
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[584px]">
        <DialogHeader>
          <DialogTitle>Add new Segments</DialogTitle>
        </DialogHeader>
        <div className="border-t border-primary-black/10 space-y-6 pt-6 text-[15px]">
          <div className="space-y-2">
            <label className="font-medium">
              Segments <span className="text-[#F00]">*</span>
            </label>
            <Input type="text" placeholder="Segments" />
          </div>
          <div className="flex items-center gap-2 font-medium">
            Status
            <Switch />
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit">Submit</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
