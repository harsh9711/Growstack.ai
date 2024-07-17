import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Search, UserCircle } from "lucide-react";
import React from "react";
import { avatars } from "../../constants/avatars";
import Image from "next/image";
import { ShapesIcon } from "@/components/svgs";

export default function ShapesDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col gap-2 text-[15px] items-center text-white/90 justify-center py-2 w-[70px] hover:bg-[#fff]/20 rounded-md cursor-pointer transition-all duration-300">
          <ShapesIcon size={25} className="text-white/80" />
          Shape
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] relative right-10 text-[15px] py-5 px-8 rounded-2xl shadow-2xl shadow-gray-200 space-y-4">
        <h1 className="text-xl font-semibold">Add shape</h1>
        <div className="grid grid-cols-4 gap-4 overflow-y-auto hidden-scrollbar">
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-1.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-2.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-3.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-4.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-5.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-6.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-7.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-8.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-9.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-10.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-11.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-12.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-13.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-14.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-15.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-16.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-17.svg" alt="" width={50} height={50} />
          </div>
          <div className="rounded-lg border p-3 flex justify-center items-center h-[90px] cursor-pointer hover:bg-gray-100 transition-all duration-300">
            <Image src="/assets/shapes/shape-18.svg" alt="" width={50} height={50} />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
