// components/Editor.tsx
import "@/styles/editor.css";
import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  content: string; // Current content of the editor
  onChange: (content: string) => void; // Callback function to handle content change
}

const Editor = ({ content, onChange }: EditorProps) => {
  const [value, setValue] = useState("");

  // Update local state when content prop changes (for initial and external updates)
  useEffect(() => {
    setValue(content);
  }, [content]);

  // Memoize modules and formats to optimize performance
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

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  // Handle change in editor content and propagate to parent component
  const handleChange = (content: string) => {
    setValue(content); // Update local state
    onChange(content); // Propagate change to parent component
  };

  return (
    <div className="flex-1 h-full rounded-lg">
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className="h-[calc(100%-40px)]" // Example of using TailwindCSS for styling
      />
    </div>
  );
};

export default Editor;
