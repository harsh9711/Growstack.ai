import React from "react";
import Navbar from "./components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-4 bg-[#FBFBFB]">
      <Navbar />
      {children}
    </div>
  );
}
