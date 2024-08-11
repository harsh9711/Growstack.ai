import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import remarkGfm from "remark-gfm";

type OutputCardProps = {
  index: number;
  output: Output;
};

type Output = {
  variable_name: string;
  variable_value: string;
};

const OutputCard = ({ index, output }: OutputCardProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(output.variable_value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  return (
    <div className="border rounded-2xl flex flex-col gap-4 p-6 bg-white">
      <div className="flex flex-row items-center gap-4">
        <Image src="/leaf.png" alt="go" width={45} height={45} />
        <h2 className="font-medium text-lg">
          {index + 1}. {output.variable_name}
        </h2>
        <button className="bg-primary-green ml-auto text-white px-4 py-2 rounded-lg" onClick={handleCopy}>
          {!copied ? "Copy" : "Copied!"}
        </button>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg break-words whitespace-pre-line max-h-[500px] overflow-y-auto hidden-scrollbar">
        <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
          {output.variable_value}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default OutputCard;
