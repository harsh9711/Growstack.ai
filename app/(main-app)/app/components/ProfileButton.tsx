"use client";
import React, { useEffect, useState } from "react";
import { BrandVoiceIcon } from "@/components/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import { logout } from "@/lib/features/auth/auth.slice";
import { Info, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { TbReportMoney } from "react-icons/tb";
import { useDispatch } from "react-redux";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";

export function ProfileButton() {
  const dispatch = useDispatch();
  // const currentUser = getCurrentUser();
  const [currentUser, setCurrentUser] = useState<any>({});

  const handleGetProfileData = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1`);
      const userData = response?.data?.data;
      setCurrentUser(userData);
    } catch (error) {
      console.log("Error fetching workflows:", error);
      toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    handleGetProfileData();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-xl">
          <AvatarImage src="" />
          <AvatarFallback className="rounded-xl">
            {currentUser?.email?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] relative right-10 text-[15px]">
        <div className="p-4 flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{currentUser?.email?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">{currentUser?.name}</h1>
            <p className="text-primary-grey text-sm">{currentUser?.email}</p>
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
          <Link href="/account/brand-voice">
            <DropdownMenuItem className="flex gap-3 px-4">
              <BrandVoiceIcon size={22} />
              Brand voice
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
            Help
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <button
          onClick={() => dispatch(logout())}
          className="relative flex select-none items-center rounded-lg h-12 p-4 outline-none w-full gap-3 text-[#D9000B] hover:bg-[#D9000B]/10 cursor-pointer"
        >
          <LogOut size={20} />
          Sign out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
