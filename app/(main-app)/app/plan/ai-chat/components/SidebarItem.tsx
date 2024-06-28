import { EditIcon, MessageIcon2 } from "@/components/svgs";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import React from "react";

interface SidebarItemProps {
  title: string;
  selected?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, selected = false }) => {
  return (
    <div className={clsx("flex gap-4 w-full", !selected && "pr-4" )}>
      <div
        className={clsx(
          "p-4 hover:bg-gray-100 cursor-pointer rounded-full flex gap-2 items-center group w-full",
          selected && "text-primary-green bg-[#0347370F]"
        )}>
        <MessageIcon2 className={clsx("group-hover:text-primary-green", selected && "text-primary-green")} />
        <span className={clsx("flex-1 whitespace-nowrap overflow-hidden text-ellipsis", selected && "max-w-48")}>{title}</span>
      </div>
      <div className={clsx("bg-[#0347370F] py-4 px-5 rounded-l-3xl hidden items-center gap-3.5 w-full max-w-fit ", selected && "!flex")}>
        <Trash2 size={18} className="cursor-pointer" />
        <EditIcon className="cursor-pointer h-4 w-4" />
      </div>
    </div>
  );
};

export default SidebarItem;
