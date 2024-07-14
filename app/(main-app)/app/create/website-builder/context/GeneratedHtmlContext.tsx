"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Base64 } from "js-base64";

interface GeneratedHtmlContextType {
  generatedHtml: string | null;
  setGeneratedHtml: (html: string | null) => void;
}

const GeneratedHtmlContext = createContext<GeneratedHtmlContextType | undefined>(undefined);

export const GeneratedHtmlProvider = ({ children }: { children: ReactNode }) => {
  const [generatedHtml, setGeneratedHtmlState] = useState<string | null>(null);

  useEffect(() => {
    const storedHtml = localStorage.getItem("generatedHtml");
    if (storedHtml) {
      const decodedHtml = Base64.decode(storedHtml);
      setGeneratedHtmlState(decodedHtml);
    }
  }, []);

  const setGeneratedHtml = (html: string | null) => {
    if (html) {
      const encodedHtml = Base64.encode(html);
      localStorage.setItem("generatedHtml", encodedHtml);
    } else {
      localStorage.removeItem("generatedHtml");
    }
    setGeneratedHtmlState(html);
  };

  return <GeneratedHtmlContext.Provider value={{ generatedHtml, setGeneratedHtml }}>{children}</GeneratedHtmlContext.Provider>;
};

export const useGeneratedHtml = () => {
  const context = useContext(GeneratedHtmlContext);
  if (!context) {
    throw new Error("useGeneratedHtml must be used within a GeneratedHtmlProvider");
  }
  return context;
};
