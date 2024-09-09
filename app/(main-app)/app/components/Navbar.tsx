"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import navLinks from "./constants/nav";
import { ProfileButton } from "./ProfileButton";
import { useRouter } from "next-nprogress-bar";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const isLinkActive = (link: NavLink): boolean => {
    if (link.href && pathname === link.href) {
      return true;
    }
    if (link.href && pathname.startsWith(link.href) && link.href !== "/app") {
      return true;
    }
    if (link.sublinks) {
      return link.sublinks.some((sublink) => checkSublinkActive(sublink));
    }
    return false;
  };

  const checkSublinkActive = (sublink: Sublink): boolean => {
    if (sublink.href && pathname.startsWith(sublink.href)) {
      return true;
    }
    if (sublink.subItems) {
      return sublink.subItems.some((subItem) => checkSublinkActive(subItem));
    }
    return false;
  };

  const renderDropdownItems = (items: Sublink[]) => {
    if (!items) return;
    return items.map((item, index) => {
      const hasSubItems = item.subItems && item.subItems.length > 0;

      return hasSubItems ? (
        <DropdownMenu key={index}>
          <DropdownMenuTrigger asChild>
            <div className="min-w-[300px] flex justify-between gap-8 items-center cursor-pointer px-3 py-2 outline-none hover:bg-accent hover:text-accent-foreground rounded-lg my-1">
              <div className="flex gap-3 items-center text-sm">
                {React.cloneElement(item.icon)}
                <h2>{item.name}</h2>
              </div>
              <ChevronRight className="text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-28">{renderDropdownItems(item.subItems!)}</DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={item.href!} key={index}>
          <DropdownMenuItem
            inset
            className={clsx(
              "min-w-[300px] flex justify-between gap-8 items-center my-1",
              pathname === item.href && "bg-primary-green hover:!bg-primary-green"
            )}>
            <div className="flex gap-3">
              {React.cloneElement(item.icon, {
                className: clsx(pathname === item.href && "text-white"),
              })}
              <h2 className={clsx(pathname === item.href && "text-white")}>{item.name}</h2>
            </div>
            {item.href && <ChevronRight className={clsx("text-gray-500", pathname === item.href && "text-white")} />}
          </DropdownMenuItem>
        </Link>
      );
    });
  };

  return (
    <header className="bg-white shadow-2xl shadow-primary-green/10 py-4 px-10 rounded-[24px] w-full max-w-[90%] mx-auto fixed top-0 left-1/2 transform -translate-x-1/2 z-[5]" style={{marginTop: "15px",zoom:"0.8"}}>
      <nav className="flex justify-between items-center gap-5">
        <div className="border-r border-[#DEDEDE] pr-10" style={{cursor: "pointer"}} onClick={() => {
          router.push("/app");
        }}>
          <Image src="/logo/growstack.png" alt="" width={150} height={40} draggable={false} className="select-none max-h-14" priority />
        </div>
        <div className="flex gap-3">
          {navLinks.map((link, index) => (
            <DropdownMenu key={index}>
              {!link.sublinks && link.href ? (
                <Link href={link.href}>
                  <NavLinkBtn link={link} isActive={isLinkActive(link)} />
                </Link>
              ) : (
                <DropdownMenuTrigger>
                  <NavLinkBtn link={link} isActive={isLinkActive(link)} />
                </DropdownMenuTrigger>
              )}

              {link.sublinks && <DropdownMenuContent>{renderDropdownItems(link.sublinks)}</DropdownMenuContent>}
            </DropdownMenu>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {/* <div className="bg-[#F4F4F4] p-3.5 max-w-3xl mx-auto flex items-center gap-4 rounded-xl">
            <Search className="text-[#14171BB8]" />
            <input
              type="text"
              placeholder="Search"
              className="w-full flex items-center bg-transparent text-[#14171BB8] placeholder:text-[#14171BB8]"
            />
          </div> */}
          {/* <button className="cursor-pointer bg-[#F4F4F4] py-3 px-3 rounded-xl">
            <IoIosNotificationsOutline size={26} />
          </button> */}
          <ProfileButton />
        </div>
      </nav>
    </header>
  );
}

const NavLinkBtn = ({ link, isActive }: { link: NavLink; isActive?: boolean }) => {
  return (
    <div
      className={clsx(
        "flex justify-center items-center p-[9px] pr-6 rounded-2xl gap-4 text-[15px] transition-all duration-200",
        isActive ? "bg-primary-green text-white !hover:bg-primary-green hover:bg-opacity-90" : "hover:bg-[#F1F1F1]"
      )}>
      <div className="bg-[#FAFAFB] p-2.5 rounded-lg">
        {React.cloneElement(link.icon, {
          className: clsx(isActive && "text-primary-green"),
        })}
      </div>
      <h2 className="whitespace-nowrap">{link.title}</h2>
    </div>
  );
};
