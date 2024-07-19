"use client";

import React from "react";
import Navbar from "./app/components/Navbar";
import "@/styles/button.css";
import PageTransition from "@/providers/PageTransition";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const shouldHideNavbar = () => {
    return pathname.startsWith("/create") || pathname.includes("/app/create/email-builder/design");
  };

  return (
    <main className={clsx("pt-4 pb-12 bg-[#FBFBFB] text-[#14171B] min-h-screen text-[15px] flex flex-col", shouldHideNavbar() && "!p-0")}>
      {!shouldHideNavbar() && <Navbar />}
      <PageTransition classNames={clsx("w-full max-w-[85%] mx-auto flex-1 flex flex-col h-full mt-[70px]", shouldHideNavbar() && "!max-w-none")}>
        {children}
      </PageTransition>
    </main>
  );
}
