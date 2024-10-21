import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FiltersDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit">
          Filters
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[584px]">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <div className="border-t border-primary-black/10 space-y-6 pt-6 text-[15px]">
          <div className="space-y-2">
            <label className="font-medium">
              Group <span className="text-[#F00]">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full border-none px-4">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>{" "}
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit">
              Submit
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
