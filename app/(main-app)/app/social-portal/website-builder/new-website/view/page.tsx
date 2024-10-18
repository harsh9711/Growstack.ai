"use client";

"use client";

import { Eye, Rocket } from "lucide-react";
import { useGeneratedHtml } from "../../context/GeneratedHtmlContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { WwwIcon } from "@/components/svgs";
import { SlScreenDesktop, SlScreenTablet, SlScreenSmartphone } from "react-icons/sl";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import clsx from "clsx";

export default function ViewGeneratedWebsite() {
  const { generatedHtml } = useGeneratedHtml();
  const router = useRouter();
  const [iframeWidth, setIframeWidth] = useState("100%");
  const [editingMode, setEditingMode] = useState(false); // State to track editing mode
  const iframeRef = useRef<HTMLIFrameElement>(null);


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
      default:
        setIframeWidth("100%");
        break;
    }
  };

  const handleEdit = () => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.querySelectorAll<HTMLElement>("*").forEach((element) => {
          element.contentEditable = editingMode ? "false" : "true"; // Toggle content editable
          if (editingMode) {
            element.style.outline = "none"; // Remove outline on edit disable
          } else {
            element.addEventListener("mouseover", handleMouseOver);
            element.addEventListener("mouseout", handleMouseOut);
            element.addEventListener("focus", handleFocus);
            element.addEventListener("blur", handleBlur);
          }
        });
      }
    }
    setEditingMode(!editingMode); // Toggle editing mode state
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

  return (
    <main className="flex-1 h-full w-full flex flex-col mt-10">
      <div className="bg-white py-3 px-5 flex justify-between items-center rounded-xl translate-y-1 shadow shadow-gray-100">
        <div className="flex items-center gap-x-1.5 w-full max-w-fit">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className="w-3 h-3 rounded-full bg-[#EAB308]" />
          <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Switch checked={editingMode} onClick={handleEdit} />
            Construction Mode
          </div>
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={clsx(
                      "border h-10 w-10 rounded-lg flex gap-2 items-center justify-center",
                      iframeWidth === "100%" && "border-[3px] border-blue-400"
                    )}
                    onClick={() => handleViewScreenChange("desktop")}>
                    <SlScreenDesktop size={22} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>View in desktop</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={clsx(
                      "border h-10 w-10 rounded-lg flex gap-2 items-center justify-center",
                      iframeWidth === "768px" && "border-[3px] border-blue-400"
                    )}
                    onClick={() => handleViewScreenChange("tablet")}>
                    <SlScreenTablet size={22} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>View in tablet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={clsx(
                      "border h-10 w-10 rounded-lg flex gap-2 items-center justify-center",
                      iframeWidth === "375px" && "border-[3px] border-blue-400"
                    )}
                    onClick={() => handleViewScreenChange("mobile")}>
                    <SlScreenSmartphone size={22} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>View in mobile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <button className="border h-10 w-10 rounded-lg flex gap-2 items-center justify-center">
              <WwwIcon />
            </button>
            <button className="border h-10 py-2 px-4 rounded-lg flex gap-2 items-center justify-center">
              <Rocket size={20} />
              Publish
            </button>
            <button className="border h-10 py-2 px-4 rounded-lg flex gap-2 items-center justify-center">
              <Eye size={20} />
              Preview
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        {generatedHtml ? (
          <iframe
            ref={iframeRef}
            srcDoc={generatedHtml}
            className="w-full h-full pt-3 bg-white"
            style={{ width: iframeWidth, height: "calc(100vh - 100px)", margin: "0 auto" }} // Adjust width and center the iframe
          />
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </main>
  );
}
