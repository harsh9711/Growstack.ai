"use client";

import "@/styles/button.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { navLinks } from "./constants/nav";
import Logo from "./shared/Logo";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  onClose: () => void;
  isOpen?: boolean;
}
export default function MobileSidebar({ onClose, isOpen }: Props) {
  const mainRef = useRef<HTMLElement | null>(null);
  const handleClickOutside = (event: any) => {
    if (mainRef.current && !mainRef.current.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const pathname = usePathname();
  return (
    <nav
      ref={mainRef}
      className={`${
        isOpen ? "w-[300px]" : "w-0"
      } overflow-hidden bg-white fixed right-0 top-0 bottom-0 h-screen shadow-2xl z-[9999999] transition-[width] duration-500`}>
      <div className="pl-8 flex flex-col justify-between pt-6 pb-10 px-4 h-full">
        <div className="flex items-center justify-between w-full">
          <Logo />
          <div className="w-10 grid place-content-center ml-6">
            <div
              className="flex flex-col items-end justify-center rounded-md transition duration-100 p-2 space-y-[7px] cursor-pointer  group"
              onClick={onClose}>
              <span
                className={`w-5 relative h-[2px] bg-[#8E93A4] block transition rounded-full duration-300 ${
                  isOpen && "rotate-[135deg] translate-y-[9px] w-5"
                }`}></span>
              <span
                className={`w-4 relative h-[2px] bg-[#8E93A4] transition  rounded-full duration-100 opacity-100 ${isOpen && "!opacity-0 invisible"} `}></span>
              <span
                className={`w-5 relative h-[2px] bg-[#8E93A4] rounded-full transition duration-300 ${
                  isOpen && "-rotate-[135deg] -translate-y-[9px] w-5"
                }`}></span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {navLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              <div className={`flex flex-col gap-[10px] max-w-fit cursor-pointer relative ${pathname === link.href && "text-primary-green"}`}>
                <h1 className="whitespace-nowrap">{link.label}</h1>
                <div
                  className={`w-full h-1 rounded-full bg-primary-green absolute mt-7 transition duration-300 ${
                    pathname === link.href ? "visible" : "invisible"
                  }`}
                />
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-x-4 items-center w-full">
          <Link href="/auth/login" className="py-3 px-8 rounded-xl hover:bg-primary-green sheen flex justify-center items-center whitespace-nowrap">
            SIgn in
          </Link>
          <Link href="/auth/register" className="sheen bg-primary-green text-white py-3.5 px-9 rounded-xl flex gap-2 items-center justify-center whitespace-nowrap">
            Sign up
            <MdArrowOutward size={22} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
