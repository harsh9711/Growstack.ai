// components/Editor.tsx
import "@/styles/editor.css";
import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { HiOutlineRefresh } from "react-icons/hi"; // Import a loading icon from React Icons

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Editor = ({ content, onChange }: EditorProps) => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [showEditor, setShowEditor] = useState(false); // Add state to control editor visibility

  useEffect(() => {
    setValue(content);
    setIsLoading(false); // Mark loading as false once content is set
  }, [content]);

  useEffect(() => {
    // Show editor when generated content is available
    if (content && content.trim() !== "") {
      setShowEditor(true);
    }
  }, [content]);

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

  const handleChange = (content: string) => {
    setValue(content);
    onChange(content);
  };

  return (
    <div className="flex flex-col h-full rounded-lg relative">
      {isLoading && (
        <div className="flex items-center justify-center bg-white opacity-50 absolute top-0 left-0 w-full h-full z-10">
          <span>Loading Content...</span>
          <HiOutlineRefresh className="ml-4 animate-spin h-8 w-8 text-gray-500" /> {/* Loading icon */}
        </div>
      )}
      {showEditor && (
        <div className={`flex-1 ${isLoading ? "hidden" : ""}`}>
          <ReactQuill
            value={value}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            className="h-full"
          />
        </div>
      )}
    </div>
  );
};

export default Editor;
