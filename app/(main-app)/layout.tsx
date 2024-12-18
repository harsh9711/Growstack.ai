"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "./app/components/Navbar";
import "@/styles/button.css";
import "@/styles/markdown.css";
import PageTransition from "@/providers/PageTransition";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import AuthProvider from "@/providers/AuthProvider";
import IntercomProvider from "@/providers/IntercomProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // useRef to track the previous pathname
  const previousPathnameRef = useRef<string | null>(null);

  const shouldHideNavbar = () => {
    return pathname.startsWith("/create");
  };

  const fullWidthContainer = ["/app/workflow"];
  useEffect(() => {
    const fullPath = `${window.location.origin}${pathname}`;
    localStorage.setItem("currentPathname", fullPath);
    if (previousPathnameRef.current) {
      const previousFullPath = `${window.location.origin}${previousPathnameRef.current}`;
      localStorage.setItem("previousPathname", previousFullPath);
    }
  }, [pathname]);

  return (
    <AuthProvider>
      <IntercomProvider>
        <main
          className={clsx(
            "pt-4 pb-12 bg-[#FBFBFB] text-[#14171B] min-h-screen text-[15px] flex flex-col hidden-scrollbar",
            shouldHideNavbar() && "!p-0"
          )}
        >
          {!shouldHideNavbar() && <Navbar />}
          <PageTransition
            classNames={clsx(
              "w-full mx-auto flex-1 flex flex-col h-full mt-[70px]",
              shouldHideNavbar() && "!max-w-none !mt-0",
              fullWidthContainer?.some(path => pathname.startsWith(path))
                ? "!max-w-[100%]"
                : "max-w-[90%]"
            )}
          >
            {children}
          </PageTransition>
        </main>
      </IntercomProvider>
    </AuthProvider>
  );
}
