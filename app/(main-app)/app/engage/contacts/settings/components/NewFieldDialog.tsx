import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function NewFieldDialog() {
  const [isNext, setIsNext] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedOption, setChoosingOption] = useState("");
  const [others, setOthers] = useState<string[]>([]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="border border-primary-green whitespace-nowrap px-4 py-2.5 sheen bg-primary-green text-white transition-all duration-300 rounded-lg flex gap-2">
          Add field <Plus size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[1260px]">
        <DialogHeader>
          <DialogTitle className="text-center">New custom field</DialogTitle>
        </DialogHeader>
        {!isNext ? (
          <div className="flex gap-6">
            <div className="w-full">
              <div className="space-y-2 mt-4">
                <p className="font-medium">Text input</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedInput("Single line")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedInput === "Single line" && "bg-primary-green text-white"
                    )}>
                    Single line
                  </button>
                  <button
                    onClick={() => setSelectedInput("Multi line")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedInput === "Multi line" && "bg-primary-green text-white"
                    )}>
                    Multi line
                  </button>
                  <button
                    onClick={() => setSelectedInput("Text box list")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedInput === "Text box list" && "bg-primary-green text-white"
                    )}>
                    Text box list
                  </button>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <p className="font-medium">Values</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedValue("Number")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedValue === "Number" && "bg-primary-green text-white"
                    )}>
                    Number
                  </button>
                  <button
                    onClick={() => setSelectedValue("Phone")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedValue === "Phone" && "bg-primary-green text-white"
                    )}>
                    Phone
                  </button>
                  <button
                    onClick={() => setSelectedValue("Monetary")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedValue === "Monetary" && "bg-primary-green text-white"
                    )}>
                    Monetary
                  </button>
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <p className="font-medium">Choosing options</p>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setChoosingOption("Dropdown (Single)")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedOption === "Dropdown (Single)" && "bg-primary-green text-white"
                    )}>
                    Dropdown (Single)
                  </button>
                  <button
                    onClick={() => setChoosingOption("Dropdown multiple")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedOption === "Dropdown multiple" && "bg-primary-green text-white"
                    )}>
                    Dropdown multiple
                  </button>
                  <button
                    onClick={() => setChoosingOption("Radio select")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedOption === "Radio select" && "bg-primary-green text-white"
                    )}>
                    Radio select
                  </button>
                  <button
                    onClick={() => setChoosingOption("Checkbox")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedOption === "Checkbox" && "bg-primary-green text-white"
                    )}>
                    Checkbox
                  </button>
                  <button
                    onClick={() => setChoosingOption("Date picker")}
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      selectedOption === "Date picker" && "bg-primary-green text-white"
                    )}>
                    Date picker
                  </button>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <p className="font-medium">Others</p>
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      setOthers((prev) => {
                        if (prev.includes("Field upload")) {
                          return prev.filter((item) => item !== "Field upload");
                        } else {
                          return [...prev, "Field upload"];
                        }
                      })
                    }
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      others.includes("Field upload") && "bg-primary-green text-white"
                    )}>
                    Field upload
                  </button>
                  <button
                    onClick={() =>
                      setOthers((prev) => {
                        if (prev.includes("Signature")) {
                          return prev.filter((item) => item !== "Signature");
                        } else {
                          return [...prev, "Signature"];
                        }
                      })
                    }
                    className={clsx(
                      "border border-[#E4E4E4] w-full h-12 text-sm rounded-xl grid place-content-center transition-all duration-300",
                      others.includes("Signature") && "bg-primary-green text-white"
                    )}>
                    Signature
                  </button>
                </div>
              </div>
            </div>
            <div className="w-0.5 h-full bg-[#E4E4E4]" />
            <div className="w-full flex flex-col">
              <div className="flex-1">
                <h1 className="font-medium">Preview</h1>
              </div>
              <div className="flex justify-end">
                <button
                  disabled={!selectedInput}
                  onClick={() => setIsNext(true)}
                  className="border border-primary-green whitespace-nowrap px-10 py-2.5 sheen bg-primary-green text-white transition-all duration-300 rounded-lg">
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-semibold">Field selected</h1>
            <div className="bg-primary-green h-12 w-1/2 rounded-xl text-white flex justify-center items-center">{selectedInput}</div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="space-y-2">
                <label htmlFor="" className="font-medium">
                  Name
                </label>
                <Input type="text" placeholder="Type address" className="text-[15px]" />
              </div>
              <div className="space-y-2">
                <label htmlFor="" className="font-medium">
                  Object
                </label>
                <Select>
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent defaultValue={"daily"}>
                    <SelectGroup>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="" className="font-medium">
                  Group
                </label>
                <Select>
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent defaultValue={"daily"}>
                    <SelectGroup>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="" className="font-medium">
                  Placeholder
                </label>
                <Input type="text" placeholder="Field placeholder" className="text-[15px]" />
              </div>
              <div className="space-y-2">
                <label htmlFor="" className="font-medium">
                  Prefill (For forms & surveys)
                </label>
                <Input type="text" placeholder="Prefill value" className="text-[15px]" />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsNext(false)}
                className="h-12 py-3 px-3 w-full max-w-[180px] bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6">
                Cancel
              </button>
              <button className="h-12 py-3 px-3 w-full max-w-[180px] bg-primary-green sheen rounded-xl text-white mt-6">Save</button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
