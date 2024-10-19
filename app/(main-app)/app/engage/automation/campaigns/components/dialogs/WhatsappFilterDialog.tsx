import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterIcon } from "lucide-react";

export default function FilterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 bg-primary-green text-white min-w-[50px] h-12 rounded-xl hover:bg-opacity-90 max-w-fit">
          <FilterIcon size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[584px]">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <div className="border-t border-primary-black/10 space-y-6 pt-6 text-[15px]">
          <div className="space-y-2">
            <label className="font-medium">Name </label>
            <Input type="text" placeholder="Name" />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Date </label>
            <Input type="date" placeholder="-" />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Contacts list </label>
            <Select>
              <SelectTrigger className="w-full border-none px-4">
                <SelectValue placeholder="Contacts list" />
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
          <div className="space-y-2">
            <label className="font-medium">Segments </label>
            <Select>
              <SelectTrigger className="w-full border-none px-4">
                <SelectValue placeholder="Segments" />
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
          <div className="space-y-2">
            <label className="font-medium">Template </label>
            <Select>
              <SelectTrigger className="w-full border-none px-4">
                <SelectValue placeholder="Select Template" />
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
