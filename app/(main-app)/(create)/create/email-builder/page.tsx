"use client";

import { useState, useRef, useEffect } from "react";
import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import Header from "./components/Header";
import NewEmailDialog from "./components/NewEmailDialog";
import Sidebar from "./components/Sidebar";

export default function EmailBuilder() {
  const [iframeWidth, setIframeWidth] = useState("100%");
  const [selectedTab, setSelectedTab] = useState("Widgets");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    handleEdit(true);
  }, [generatedHtml]);

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

  const handleEdit = (enable: boolean) => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.querySelectorAll<HTMLElement>("*").forEach((element) => {
          element.contentEditable = enable ? "true" : "false";
          if (enable) {
            element.addEventListener("mouseover", handleMouseOver);
            element.addEventListener("mouseout", handleMouseOut);
            element.addEventListener("focus", handleFocus);
            element.addEventListener("blur", handleBlur);
          } else {
            element.removeEventListener("mouseover", handleMouseOver);
            element.removeEventListener("mouseout", handleMouseOut);
            element.removeEventListener("focus", handleFocus);
            element.removeEventListener("blur", handleBlur);
          }
        });
      }
    }
  };

  const handleSave = () => {};

  const handleExport = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        const element = document.createElement("a");
        const file = new Blob([iframeDocument.documentElement.innerHTML], { type: "text/html" });
        element.href = URL.createObjectURL(file);
        element.download = "index.html";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }
  };

  const handleMouseOver = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    element.style.outline = "2px dashed blue";
  };

  const handleMouseOut = (event: MouseEvent) => {
    const element = event.target as HTMLElement;
    element.style.outline = "none";
  };

  const handleFocus = (event: FocusEvent) => {
    const element = event.target as HTMLElement;
    element.style.border = "2px solid blue";
  };

  const handleBlur = (event: FocusEvent) => {
    const element = event.target as HTMLElement;
    element.style.border = "none";
  };

  const handleUpdate = () => {
    if (selectedElement) {
      selectedElement.innerHTML = editedContent;
      setSelectedElement(null);
      setEditedContent("");
      if (iframeRef.current) {
        const iframeDocument = iframeRef.current.contentDocument;
        if (iframeDocument) {
          setGeneratedHtml(iframeDocument.documentElement.innerHTML);
        }
      }
    }
  };

  return (
    <div className="flex-1 h-screen flex flex-col">
      <Header handleViewScreenChange={handleViewScreenChange} iframeWidth={iframeWidth} handleExport={handleExport} />
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
          {generatedHtml && (
            <iframe
              ref={iframeRef}
              srcDoc={generatedHtml}
              className="w-full h-full"
              style={{ width: iframeWidth, height: "calc(100vh - 100px)", margin: "0 auto" }}
            />
          )}
        </div>
      </div>
      <NewEmailDialog generateHtml={generatedHtml} setGeneratedHtml={setGeneratedHtml} setLoading={setLoading} />
      <div className="flex gap-4 p-4 bg-white shadow-lg rounded-lg mt-4">
        {selectedElement && (
          <div className="flex gap-4 items-center">
            <textarea className="border rounded p-2 w-96" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleUpdate}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
