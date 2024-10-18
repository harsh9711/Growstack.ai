import { MediaIcon } from "@/components/svgs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function MediaDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col gap-2 text-[15px] items-center text-white/90 justify-center py-2 w-[70px] hover:bg-[#fff]/20 rounded-md cursor-pointer transition-all duration-300">
          <MediaIcon size={25} className="text-white/80" />
          Media
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] relative right-10 h-[500px] text-[15px] py-5 px-8 rounded-2xl shadow-2xl shadow-gray-200 space-y-4">
        <h1 className="text-xl font-semibold">Add media</h1>
        <div className="flex flex-col justify-center items-center mb-40">
          <Image
            src="/gifs/empty-box.gif"
            alt=""
            width={200}
            height={200}
            unoptimized
          />
          <h1 className="text-2xl text-center font-semibold">
            There's nothing here.
          </h1>
          <p className="max-w-xl leading-loose text-center mt-3">
            This feature is under active development
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
