import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Info, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TbReportMoney } from "react-icons/tb";

export function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <Image src="/dummy/person-0.png" alt="" width={100} height={100} className="w-[50px] h-[50px] object-cover rounded-xl" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] relative right-10 text-[15px]">
        <div className="p-4 flex items-center gap-3">
          <Image src="/dummy/person-0.png" alt="" width={100} height={100} className="w-[50px] h-[50px] object-cover rounded-full" />
          <div>
            <h1 className="text-xl font-semibold">John Doe</h1>
            <p className="text-primary-black text-opacity-50">Admin</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/account/profile">
            <DropdownMenuItem className="flex gap-3 px-4">
              <User size={22} />
              My profile
            </DropdownMenuItem>
          </Link>
          <Link href="/account/saved-documents">
            <DropdownMenuItem className="flex gap-3 px-4">
              <Settings size={22} />
              Saved documents
            </DropdownMenuItem>
          </Link>
          <Link href="/account/billings/settings">
            <DropdownMenuItem className="flex gap-3 px-4">
              <TbReportMoney size={22} />
              Billings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href="#">
          <DropdownMenuItem className="flex gap-3 px-4">
            <Info size={22} />
            FAQ
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <button className="relative flex select-none items-center rounded-lg h-12 p-4 outline-none w-full gap-3 text-[#D9000B] hover:bg-[#D9000B]/10 cursor-pointer">
          <LogOut size={20} />
          Sign out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
