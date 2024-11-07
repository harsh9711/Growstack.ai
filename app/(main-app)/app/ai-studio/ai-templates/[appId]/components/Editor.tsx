// components/Editor.tsx
import "@/styles/editor.css";
import dynamic from "next/dynamic";
import { useMemo, useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { marked } from "marked";
import Spinner from "@/components/Spinner";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  isLoading: boolean;
  streaming: boolean;
}

const Editor = ({ content, onChange, isLoading, streaming }: EditorProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const convertMarkdownToHtml = async (markdown: string) => {
      const html = await marked(markdown);
      setValue(html);
    };

    convertMarkdownToHtml(content);
  }, [content]);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
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
    <div className="flex-1 h-full rounded-lg relative"> {/* Add relative positioning */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex justify-center items-center bg-white bg-opacity-50"> {/* Loader overlay */}
          <Spinner color="black" size={100} />
        </div>
      )}
      <ReactQuill
        value={value}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        readOnly={streaming}
        className="h-[calc(100%-40px)]"
      />
    </div>
  );
};

export default Editor;
