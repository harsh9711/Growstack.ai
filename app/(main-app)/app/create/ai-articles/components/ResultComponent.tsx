import React from "react";
import Image from "next/image";

export default function ResultComponent({ articleData }: { articleData: string }) {
  const formatText = (text: string) => {
    const sections = text.split(/\n\n+/);

    const formattedSections = sections.map((section, index) => {
      if (section.trim().startsWith("**") && section.trim().endsWith("**")) {
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {section.trim().replace(/^\*\*|\*\*$/g, "")}
          </h3>
        );
      } else {
        return (
          <p key={index} className="mb-4">
            {section}
          </p>
        );
      }
    });

    return formattedSections;
  };

  return (
    <div className="mt-10">
      <div className="!bg-white shadow-box max-w-2xl mx-auto flex flex-col justify-center items-center p-12 space-y-6">
        <Image src="/logo/growstack-mini.svg" alt="" width={40} height={40} />
        <h1 className="text-xl font-semibold">Successfully generated</h1>
        <p className="text-primary-black text-opacity-50 text-base !mt-4">You can edit your article in documents once it is generated.</p>
        <button className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl max-w-[150px]">Create New</button>
      </div>
      <section className="max-w-6xl mx-auto">
        <div className="bg-primary-green rounded-2xl py-6 px-8 flex items-center gap-4 mt-6">
          <h2 className="text-lg font-semibold text-white">Final Article</h2>
        </div>
        <div className="border !bg-white shadow-box p-10 mt-5 leading-relaxed">{formatText(articleData)}</div>
      </section>
    </div>
  );
}
