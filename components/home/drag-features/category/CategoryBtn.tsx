"use client";
import { cn } from "@/lib/utils";

interface CategoryProps {
   id: number;
   title: string;
   path: string;
   isActive?: boolean;
   onClick: (id: number) => void;
}

export default function CategoryBtn (props: CategoryProps) {
   const { title, path, isActive, onClick, id } = props;
   return (
      <button type="button" onClick={() => onClick(id)} className={cn("group flex-1 inline-flex items-center justify-center space-x-2 px-4 md:px-5 py-2 md:py-3 border border-[#F1F1F1] hover:border-primary-green hover:text-primary-green rounded-[61px] text-black transition-all", isActive && "text-white bg-primary-green border-primary-green hover:text-white")}>
         <span className={cn("relative inline-flex items-center justify-center size-6 rounded-full border border-current before:inline-block before:size-3 before:rounded-full before:bg-primary-green before:opacity-0", isActive && "before:opacity-100 bg-current")}></span>
         <span>{title}</span>
      </button>
   )
}
