import React from "react";
import Navbar from "./components/Navbar";
import "@/styles/button.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-4 bg-[#FBFBFB] text-[#14171B] min-h-screen text-[15px]">
      <Navbar />
      <div className="max-w-[85%] mx-auto">{children}</div>
    </div>
  );
}
