import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import clsx from "clsx";
import { ArrowLeft, ChevronDown, Redo2, Undo2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { SlScreenDesktop, SlScreenSmartphone, SlScreenTablet } from "react-icons/sl";

export default function Header({ handleViewScreenChange, iframeWidth }: { handleViewScreenChange: (value: string) => void; iframeWidth: string }) {
  const router = useRouter();

  return (
    <header className="bg-primary-green flex items-center justify-between px-4 pt-2 pb-3 rounded-b-xl text-white text-[15px]">
      <Link href="/app">
        <button className="hover:bg-[#fff]/20 p-2 rounded-lg flex items-center gap-2 transition-all duration-300">
          <ArrowLeft size={20} />
          Dashboard
        </button>
      </Link>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-[#fff]/20 h-10 px-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-[15px]">
              Design
              <ChevronDown size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] relative right-10 text-[15px]">
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">New</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Clear</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">New from template</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Upload template</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Save</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Exit</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-[#fff]/20 h-10 px-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-[15px]">
              Change template
              <ChevronDown size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] relative right-10 text-[15px]">
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Blank</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Pricing table</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Listing & tables</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Forms building</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">1-2-1 column layout</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">1-2 column layout</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">1-3-1 column layout</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">1-3-2 column layout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-[#fff]/20 h-10 px-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-[15px]">
              Preview
              <ChevronDown size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] relative right-10 text-[15px]">
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Desktop</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Mobile</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-[#fff]/20 h-10 px-2 rounded-lg flex items-center gap-2 transition-all duration-300 text-[15px]">
              Mode design
              <ChevronDown size={20} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px] relative right-10 text-[15px]">
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Design</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-3 px-4 py-2 rounded">Source</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={clsx(
                  "h-10 w-10 rounded-lg flex gap-2 items-center justify-center transition-all duration-300",
                  iframeWidth === "100%" && "bg-white text-primary-green"
                )}
                onClick={() => handleViewScreenChange("desktop")}>
                <SlScreenDesktop size={22} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p>View in desktop</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={clsx(
                  "h-10 w-10 rounded-lg flex gap-2 items-center justify-center transition-all duration-300",
                  iframeWidth === "768px" && "bg-white text-primary-green"
                )}
                onClick={() => handleViewScreenChange("tablet")}>
                <SlScreenTablet size={22} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p>View in tablet</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={clsx(
                  "h-10 w-10 rounded-lg flex gap-2 items-center justify-center transition-all duration-300",
                  iframeWidth === "375px" && "bg-white text-primary-green"
                )}
                onClick={() => handleViewScreenChange("mobile")}>
                <SlScreenSmartphone size={22} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p>View in mobile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={clsx(
                  "h-10 w-10 rounded-lg flex gap-2 items-center justify-center transition-all duration-300",
                  iframeWidth === "675px" && "bg-white text-primary-green"
                )}
                onClick={() => handleViewScreenChange("portrait")}>
                <SlScreenSmartphone size={22} className="rotate-90" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-white">
              <p>View in mobile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-4">
          <button className="p-2 rounded-lg transition-all duration-300 opacity-50">
            <Undo2 size={20} />
          </button>
          <button className="p-2 rounded-lg transition-all duration-300">
            <Redo2 size={20} />
          </button>
        </div>
        <div className="h-6 w-[2px] bg-white/30 rounded-full mr-4" />
        <button className="rounded-lg transition-all duration-300 flex items-center gap-2 text-sm">
          <HiOutlineQuestionMarkCircle /> Help
        </button>

        <button className="ml-2 bg-[#fff]/20 hover:bg-white text-white hover:text-primary-green h-10 px-4 flex justify-center items-center rounded-lg transition-all duration-300">
          Save
        </button>
        <button className="bg-[#fff]/20 hover:bg-white text-white hover:text-primary-green h-10 px-4 flex justify-center items-center rounded-lg transition-all duration-300">
          Save & close
        </button>
        <button className="bg-[#fff]/20 hover:bg-white text-white hover:text-primary-green h-10 px-4 flex justify-center items-center rounded-lg transition-all duration-300">
          Export
        </button>
        <button onClick={() => router.back()} className="bg-[#FF0000] h-9 w-9 grid place-content-center text-white rounded">
          <X size={20} />
        </button>
      </div>
    </header>
  );
}
