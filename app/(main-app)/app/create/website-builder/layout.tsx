import React from "react";
import { GeneratedHtmlProvider } from "./context/GeneratedHtmlContext";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <GeneratedHtmlProvider>
      {children}
    </GeneratedHtmlProvider>
  );
}
