import React from "react";
import Navbar from "./app/components/Navbar";
import "@/styles/button.css";
import PageTransition from "@/providers/PageTransition";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-4 pb-12 bg-[#FBFBFB] text-[#14171B] min-h-screen text-[15px] flex flex-col">
      <Navbar />
      <PageTransition classNames="w-full max-w-[85%] mx-auto flex-1 flex flex-col">{children}</PageTransition>
    </main>
  );
}
