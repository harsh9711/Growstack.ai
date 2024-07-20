import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // import styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor: React.FC = () => {
  const [value, setValue] = useState("");

  const handleChange = (content: string) => {
    setValue(content);
  };

  return (
    <div>
      <ReactQuill value={value} onChange={handleChange} />
    </div>
  );
};

export default TextEditor;
