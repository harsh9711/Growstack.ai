import { aiModelOptions } from "@/app/(main-app)/app/create/ai-articles/constants/options";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import clsx from "clsx";
import { Download, Settings, Share2, UserCircle } from "lucide-react";
import { useState } from "react";
import { Assistant } from "../../../components/types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IProps {
  assistant: Assistant;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}
export default function Topbar({ assistant, isSidebarOpen, setIsSidebarOpen }: IProps) {
  const [selectedAiModel, setSelectedAiModel] = useState(aiModelOptions[0].value);
  return (
    <div className="border-b px-10 py-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          {/* <Image src={assistant.avatar} alt="" width={50} height={50} className="rounded-xl object-cover shadow-xl" /> */}
          <img src={assistant.avatar} alt="" width={50} height={50} className="rounded-xl object-cover shadow-xl" />
          <div>
            <h2 className="text-xl font-semibold">{assistant.name}</h2>
            <p className="flex items-center gap-2 text-primary-black text-opacity-70">
              <span className="h-2 w-2 rounded-full bg-[#68D391]"></span>Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-primary-green/10 h-11 w-11 grid place-content-center rounded-lg cursor-pointer">
            <Share2 />
          </div>
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-primary-green/10 hover:text-white hover:bg-primary-green transition-all duration-300 h-11 w-11 grid place-content-center rounded-lg cursor-pointer">
            <UserCircle />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-primary-green/10 hover:text-white hover:bg-primary-green transition-all duration-300 h-11 w-11 grid place-content-center rounded-lg cursor-pointer">
                <Settings />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Download size={18}/>
                Download chat (.txt)
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Download size={18}/>
                Download chat (.pdf)
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Download size={18}/>
                Download chat (.docx)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={selectedAiModel} onValueChange={setSelectedAiModel}>
            <SelectTrigger className="min-w-[200px] h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {aiModelOptions.map(({ icon, label, value }) => (
                  <SelectItem key={value} value={value}>
                    <div className={clsx("flex items-center gap-2", selectedAiModel === value && "font-medium")}>
                      <span className="min-w-fit">{icon}</span>
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
