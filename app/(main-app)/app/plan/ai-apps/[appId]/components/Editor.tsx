"use client";

// components/Editor.tsx
import "@/styles/editor.css";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Editor = () => {
  const [value, setValue] = useState("");

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
        ["clean"],
      ],
    }),
    []
  );

  const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video"];

  return (
    <div className="flex-1 h-full rounded-lg">
      <ReactQuill value={value} onChange={setValue} modules={modules} formats={formats} className="h-[calc(100%-40px)]" />
    </div>
  );
};

export default Editor;
