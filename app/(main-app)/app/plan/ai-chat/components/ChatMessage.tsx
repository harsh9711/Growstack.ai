import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DotsLoader from "@/components/DotLoader";

interface ChatMessagesProps {
  conversation: Chat[];
}

interface Chat{
  prompt: string;
  response: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ conversation }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <>
      {
        conversation.map((chat: Chat,index) => (
          <div key={index} className="p-4">
            <div className="mt-4 flex flex-row-reverse justify-start items-start gap-4">
              <img src="/dummy/person-0.png" alt="User" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
              <div className="max-w-5xl bg-primary-green text-white py-3 px-5 rounded-xl text-[14.5px] leading-relaxed">{chat.prompt}</div>
            </div>
            <div className="mt-4 flex justify-start items-start gap-4">
              <div className="max-w-5xl min-h-11 bg-[#F1F1F1] text-primary-black py-4 px-5 rounded-xl text-[15px] leading-[1.8] flex flex-col items-center justify-center">
                {chat.response ? (
                  <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                    {chat.response}
                  </ReactMarkdown>
                ) : (
                  <DotsLoader />
                )}
              </div>
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatMessages;
