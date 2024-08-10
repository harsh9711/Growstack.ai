import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronRight, Edit, MoreVertical, Trash2 } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({
  created_on,
  preview_image,
  title,
}: {
  preview_image: string;
  title: string;
  created_on: { date: string; time: string };
}) {
  return (
    <div className="border border-[#E8E8E8] p-6 rounded-3xl bg-white space-y-6">
      <Image src={preview_image} alt="" width={400} height={400} className="rounded-xl min-h-[200px] w-full object-cover max-h-[200px]" />
      <div className="flex items-start">
        <div className="w-full">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className="text-primary-black text-opacity-70 text-sm flex items-center gap-2 !mt-2">
            {created_on.date} {created_on.time}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-2 hover:bg-gray-100 h-10 w-10 rounded-full">
              <MoreVertical size={20}/>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
              <div className="flex gap-3">
                <Edit size={20}/>
                <h2>Edit</h2>
              </div>
              <ChevronRight size={20}/>
            </DropdownMenuItem>
            <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
              <div className="flex gap-3">
                <Trash2 size={20}/>
                <h2>Delete</h2>
              </div>
              <ChevronRight size={20}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
