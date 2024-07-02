import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ResultComponentProps {
  articleData: string;
}

const ResultComponent: React.FC<ResultComponentProps> = ({ articleData }) => {
  const formatText = (text: string) => {
    const lines = text.split("\n");

    const header1Regex = /^# (.*)$/;
    const header2Regex = /^## (.*)$/;
    const header3Regex = /^### (.*)$/;
    const codeBlockRegex = /```(.*?)```/gs;

    const formattedElements: JSX.Element[] = [];

    let inCodeBlock = false;
    let codeBlockContent: string[] = [];

    lines.forEach((line, index) => {
      if (codeBlockRegex.test(line)) {
        inCodeBlock = !inCodeBlock;

        if (inCodeBlock) {
          codeBlockContent.push(line.replace(/```/g, ""));
        } else {
          codeBlockContent.push(line.replace(/```/g, ""));
          formattedElements.push(
            <pre key={index} className="bg-gray-100 p-4 rounded mb-4">
              <code>{codeBlockContent.join("\n")}</code>
            </pre>
          );
          codeBlockContent = [];
        }
      } else if (inCodeBlock) {
        codeBlockContent.push(line);
      } else if (header1Regex.test(line)) {
        const match = header1Regex.exec(line);
        if (match)
          formattedElements.push(
            <h1 key={index} className="text-2xl font-bold mb-4">
              {match[1]}
            </h1>
          );
      } else if (header2Regex.test(line)) {
        const match = header2Regex.exec(line);
        if (match)
          formattedElements.push(
            <h2 key={index} className="text-xl font-semibold mb-4">
              {match[1]}
            </h2>
          );
      } else if (header3Regex.test(line)) {
        const match = header3Regex.exec(line);
        if (match)
          formattedElements.push(
            <h3 key={index} className="text-lg font-semibold mb-4">
              {match[1]}
            </h3>
          );
      } else if (line.trim()) {
        formattedElements.push(
          <p key={index} className="mb-4">
            {line}
          </p>
        );
      }
    });

    return formattedElements;
  };

  return (
    <div className="mt-10">
      <div className="!bg-white shadow-box max-w-2xl mx-auto flex flex-col justify-center items-center p-12 space-y-6">
        <Image src="/logo/growstack-mini.svg" alt="Growstack logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">Successfully generated</h1>
        <p className="text-primary-black text-opacity-50 text-base !mt-4">You can edit your article in documents once it is generated.</p>
        <Link href="/app/create/ai-articles" className="w-full max-w-[150px] mx-auto">
          <button className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl">Create New</button>
        </Link>
      </div>
      <section className="max-w-6xl mx-auto">
        <div className="bg-primary-green rounded-2xl py-6 px-8 flex items-center gap-4 mt-6">
          <h2 className="text-lg font-semibold text-white">Final Article</h2>
        </div>
        <div className="border !bg-white shadow-box p-10 mt-5 leading-relaxed">{formatText(articleData)}</div>
      </section>
    </div>
  );
};

export default ResultComponent;
