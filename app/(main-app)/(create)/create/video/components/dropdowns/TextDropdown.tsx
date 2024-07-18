import { TextIcon } from "@/components/svgs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import Image from "next/image";
import { avatars } from "../../constants/avatars";

export default function TextDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col gap-2 text-[15px] items-center text-white/90 justify-center py-2 w-[70px] hover:bg-[#fff]/20 rounded-md cursor-pointer transition-all duration-300">
          <TextIcon size={25} className="text-white/80" />
          Text
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] relative right-10 text-[15px] py-5 px-8 rounded-2xl shadow-2xl shadow-gray-200 space-y-4">
        <h1 className="text-xl font-semibold">Add text</h1>
        <div className="bg-[#F5F5F5] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
          <Search className="text-gray-500" size={20} />
          <input type="search" className="bg-transparent outline-none h-[40px] w-full" placeholder="Search text" />
        </div>
        <div className="space-y-3 max-h-[500px] overflow-y-auto hidden-scrollbar">
          <h1 className="text-3xl cursor-pointer">Title</h1>
          <h1 className="text-xl cursor-pointer">Subtitle</h1>
          <p className="text-lg cursor-pointer">Paragraph</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
