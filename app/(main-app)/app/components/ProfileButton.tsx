"use client";
import React from "react";
import { DocumentIcon, PresentationAnalyticsIcon } from "@/components/svgs";
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
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Wave from "@/components/svgs/wave";
import { persistor } from "@/lib/store";
import { ALL_ROUTES } from "@/utils/constant";

export function ProfileButton() {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    persistor.purge();
    deleteCookie("token");
    router.push("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-xl">
          <AvatarImage src={currentUser?.profile_img} />
          <AvatarFallback className="rounded-xl">
            {currentUser?.email?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] relative right-10 text-[15px]">
        <div className="p-4 flex items-center gap-3">
          <Avatar>
            <AvatarImage src={currentUser?.profile_img} />
            <AvatarFallback>{currentUser?.email?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-semibold capitalize truncate">
              {currentUser?.name ?? currentUser?.name ?? "Growstack User"}
            </h1>
            <p className="text-primary-grey text-sm truncate">
              {currentUser?.email}
            </p>
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
          <Link href={ALL_ROUTES.BRAND_VOICE}>
            <DropdownMenuItem className="flex gap-3 px-4">
              <Wave color="black" />
              Brand voice
            </DropdownMenuItem>
          </Link>
          <Link href={ALL_ROUTES.SOCIAL_MEDIA_POSTING}>
            <DropdownMenuItem className="flex gap-3 px-4">
              <PresentationAnalyticsIcon />
              Connect to social media profiles
            </DropdownMenuItem>
          </Link>

          <Link href="/account/saved-documents">
            <DropdownMenuItem className="flex gap-3 px-4">
              <DocumentIcon />
              Saved documents
            </DropdownMenuItem>
          </Link>

          <Link href="/account/billings/settings">
            <DropdownMenuItem className="flex gap-3 px-4">
              <Image src="/billing.svg" width={25} height={25} alt="width" />
              Billing
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <button
          onClick={handleLogout}
          className="relative flex select-none items-center rounded-lg h-12 p-4 outline-none w-full gap-3 text-[#D9000B] hover:bg-[#D9000B]/10 cursor-pointer"
        >
          <LogOut size={20} />
          Sign out
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
