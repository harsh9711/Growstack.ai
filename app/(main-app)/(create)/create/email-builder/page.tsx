"use client";

import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import Header from "./components/Header";
import NewEmailDialog from "./components/NewEmailDialog";
import Sidebar from "./components/Sidebar";

export default function EmailBuilder() {
  const [iframeWidth, setIframeWidth] = useState("100%");
  const [selectedTab, setSelectedTab] = useState("Widgets");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleViewScreenChange = (view: string) => {
    switch (view) {
      case "desktop":
        setIframeWidth("100%");
        break;
      case "tablet":
        setIframeWidth("768px");
        break;
      case "mobile":
        setIframeWidth("375px");
        break;
      case "portrait":
        setIframeWidth("675px");
        break;
      default:
        setIframeWidth("100%");
        break;
    }
  };

  return (
    <div className="flex-1 h-screen flex flex-col">
      <Header handleViewScreenChange={handleViewScreenChange} iframeWidth={iframeWidth} />
      <div className="flex-1 flex gap-3">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="w-full bg-[#F8F6FF] p-5">
          {loading && (
            <Motion transition={{ duration: 1 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <div className="flex gap-3 items-center py-4 px-6 w-full rounded-lg mt-2 bg-gray-200 text-gray-700 max-w-5xl mx-auto">
                <Spinner /> <p className="ml-2">Generating email...</p>
              </div>
            </Motion>
          )}
          {generatedHtml ? (
            <iframe srcDoc={generatedHtml} className="w-full h-full" style={{ width: iframeWidth, height: "calc(100vh - 100px)", margin: "0 auto" }} />
          ) : null}
        </div>
      </div>
      <NewEmailDialog generateHtml={generatedHtml} setGeneratedHtml={setGeneratedHtml} setLoading={setLoading} />
    </div>
  );
}
