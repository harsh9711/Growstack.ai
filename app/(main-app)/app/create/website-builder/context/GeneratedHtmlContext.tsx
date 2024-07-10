"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from "react";

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
      setGeneratedHtmlState(storedHtml);
    }
  }, []);

  const setGeneratedHtml = (html: string | null) => {
    if (html) {
      localStorage.setItem("generatedHtml", html);
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
