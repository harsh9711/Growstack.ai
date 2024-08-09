import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, FilterIcon, Search } from "lucide-react";

export default function FilterSheet() {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <button className="border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black">
          <FilterIcon size={20} />
        </button>
      </SheetTrigger>
      <SheetContent className="rounded-l-[40px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Apply filters to leads it.</SheetDescription>
        </SheetHeader>
        <div className="bg-[#F2F2F2] border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md mt-5">
          <Search className="text-gray-500" size={20} />
          <input type="search" className="bg-[#F2F2F2] outline-none h-[40px] w-full" placeholder="Search" />
        </div>

        <div className="mt-8 space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <h1 className="text-xl font-semibold">Most used</h1>
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Business name</h1>
            <ChevronRight size={20} />
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Company name</h1>
            <ChevronRight size={20} />
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Email</h1>
            <ChevronRight size={20} />
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>First name</h1>
            <ChevronRight size={20} />
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Last name</h1>
            <ChevronRight size={20} />
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Tag</h1>
            <ChevronRight size={20} />
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Wildcard name</h1>
            <ChevronRight size={20} />
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <div className="border-b border-gray-200 pb-3">
            <h1 className="text-xl font-semibold">Contact information</h1>
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Address</h1>
            <ChevronRight size={20} />
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Assigned</h1>
            <ChevronRight size={20} />
          </div>
          <div className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
            <h1>Birthday</h1>
            <ChevronRight size={20} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
