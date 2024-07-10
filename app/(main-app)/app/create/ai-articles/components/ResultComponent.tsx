import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../../../../../../styles/markdown.css";
import DotsLoader from "@/components/DotLoader";

interface ResultComponentProps {
  articleData: string;
  images: Array<{ revised_prompt: string; url: string }>;
  setImages: React.Dispatch<React.SetStateAction<Array<{ revised_prompt: string; url: string }>>>;
}

const ResultComponent: React.FC<ResultComponentProps> = ({ articleData, images, setImages }) => {
  // Function to format Markdown headings, italic, and bold using regex
  const formatMarkdown = (content: string) => {
    // Regex patterns for headings and formatting
    const headingRegex = /^(#+)\s+(.*)$/gm; // Matches headings from # to ######
    const italicRegex = /_(.*?)_/g; // Matches italic text within underscores
    const boldRegex = /\*\*(.*?)\*\*/g; // Matches bold text within double asterisks

    // Replace headings with corresponding HTML tags
    content = content.replace(headingRegex, (_, hashes, text) => {
      const level = hashes.length;
      return `<h${level}>${text}</h${level}>`;
    });

    // Replace italic text with corresponding HTML tags
    content = content.replace(italicRegex, (_, text) => `<em>${text}</em>`);

    // Replace bold text with corresponding HTML tags
    content = content.replace(boldRegex, (_, text) => `<strong>${text}</strong>`);

    return content;
  };

  // Apply formatting to articleData if it exists
  const formattedData = articleData ? formatMarkdown(articleData) : "";
  console.log(articleData)
  return (
    <div className="mt-10">
      <div className="!bg-white shadow-box max-w-2xl mx-auto flex flex-col justify-center items-center p-12 space-y-6">
        <Image src="/logo/growstack-mini.svg" alt="Growstack logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">Successfully generated</h1>
        <p className="text-primary-black text-opacity-50 text-base !mt-4">You can edit your article in articleDatauments once it is generated.</p>
        <div className="w-full max-w-[150px] mx-auto">
          <button onClick={() => window.location.reload()} className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl">
            Create New
          </button>
        </div>
      </div>
      <section className="max-w-6xl mx-auto">
        <div className="bg-primary-green rounded-2xl py-6 px-8 flex items-center gap-4 mt-6">
          <h2 className="text-lg font-semibold text-white">Final Article</h2>
        </div>
        <div className="border !bg-white shadow-box p-10 mt-5 leading-relaxed space-y-3">
          {!articleData ? (
            <div className="flex flex-col items-center justify-center gap-3">
              Your article is being generated
              <DotsLoader />
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center gap-2">
                {images.map((image, index) => (
                  <img src={image.url} key={index} alt="" width={300} height={300} className="rounded-2xl cursor-pointer" />
                ))}
              </div>
              {/* Render formatted Markdown */}
              <div dangerouslySetInnerHTML={{ __html: formattedData }} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResultComponent;
