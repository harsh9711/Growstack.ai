"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import Logo from "./shared/Logo";
import { navLinks } from "./constants/nav";
import "@/styles/button.css";
import { MdArrowOutward } from "react-icons/md";

export default function Navbar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <header className="absolute top-0 w-full px-4 py-4 z-[5]">
      <div className="max-w-[1560px] mx-auto">
        <nav className="w-full flex items-center justify-between">
          <Logo />
          <div className="w-10 grid place-content-center ml-6 xl:hidden">
            <div
              className="flex flex-col items-end justify-center rounded-md transition duration-100 p-2 space-y-[7px] cursor-pointer group"
              onClick={() => setIsExpanded(true)}>
              <span
                className={`w-5 relative h-[2px] bg-[#8E93A4] block transition rounded-full duration-300 ${
                  isExpanded && "rotate-[135deg] translate-y-[9px] w-5"
                }`}></span>
              <span
                className={`w-4 relative h-[2px] bg-[#8E93A4] transition  rounded-full duration-100 opacity-100 ${
                  isExpanded && "opacity-0 invisible"
                } `}></span>
              <span
                className={`w-5 relative h-[2px] bg-[#8E93A4] rounded-full transition duration-300 ${
                  isExpanded && "-rotate-[135deg] -translate-y-[9px] w-5"
                }`}></span>
            </div>
          </div>
          <div className="hidden xl:flex items-center gap-x-12">
            <div className="">
              <ul className="text-[#636369] flex gap-x-10">
                {navLinks.map((link, index) => (
                  <Link href={link.href} key={index}>
                    <div
                      className={`flex flex-col gap-[10px] items-center justify-center cursor-pointer relative ${
                        pathname === link.href && "text-primary-green"
                      }`}>
                      <h1 className="whitespace-nowrap">{link.label}</h1>
                      <div
                        className={`w-full h-1 rounded-full bg-primary-green absolute mt-10 transition duration-300 ${
                          pathname === link.href ? "visible" : "invisible"
                        }`}
                      />
                    </div>
                  </Link>
                ))}
              </ul>
            </div>
            <div className="flex gap-x-4 items-center">
              <div className="bg-[#C9C9C9] h-8 w-[1px]" />
              <Link href="/auth/login">
                <button className="py-3 px-8 rounded-xl hover:bg flex justify-center items-center">SIgn in</button>
              </Link>
              <Link href="/auth/signup">
                <button className="sheen bg-primary-green text-white py-3.5 px-9 rounded-xl flex gap-2 items-center justify-center">
                  Sign up
                  <MdArrowOutward size={22} />
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <MobileSidebar onClose={() => setIsExpanded(false)} isOpen={isExpanded} />
    </header>
  );
}
