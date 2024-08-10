import { Metadata } from "next";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import React from "react";

export const metadata: Metadata = {
  title: "GrowStack | The All-in-One Platform for AI Marketing Tools",
  description:
    "GrowStack has introduced the first All-in-One platform of AI marketing tools. GrowStack helps your marketing team plan, create, publish, engage, and analyze all their tasks on their integrated AI tools for marketing.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
