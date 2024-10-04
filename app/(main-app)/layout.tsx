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
  const hasRefreshed = localStorage.getItem("hasRefreshed");

  // useRef to track the previous pathname
  const previousPathnameRef = useRef<string | null>(null);

  const shouldHideNavbar = () => {
    return (
      pathname.startsWith("/create") ||
      pathname.includes("/app/create/email-builder/design")
    );
  };

  useEffect(() => {
    const fullPath = `${window.location.origin}${pathname}`;
    localStorage.setItem("currentPathname", fullPath);
    if (previousPathnameRef.current) {
      const previousFullPath = `${window.location.origin}${previousPathnameRef.current}`;
      localStorage.setItem("previousPathname", previousFullPath);
    }
    if (hasRefreshed !== "true") {
      localStorage.setItem("hasRefreshed", "true");
      window.location.reload();
    }
  }, [pathname]);

  return (
    <AuthProvider>
      <IntercomProvider>
        {hasRefreshed !== "true" ? (
          <></>
        ) : (
          <main
            className={clsx(
              "pt-4 pb-12 bg-[#FBFBFB] text-[#14171B] min-h-screen text-[15px] flex flex-col hidden-scrollbar",
              shouldHideNavbar() && "!p-0"
            )}
          >
            {!shouldHideNavbar() && <Navbar />}
            <PageTransition
              classNames={clsx(
                "w-full max-w-[90%] mx-auto flex-1 flex flex-col h-full mt-[70px]",
                shouldHideNavbar() && "!max-w-none !mt-0"
              )}
            >
              {children}
            </PageTransition>
          </main>
        )}
      </IntercomProvider>
    </AuthProvider>
  );
}
