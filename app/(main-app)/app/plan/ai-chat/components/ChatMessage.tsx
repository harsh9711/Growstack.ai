import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import DotsLoader from "@/components/DotLoader";
import remarkGfm from 'remark-gfm'; 
import remarkBreaks from 'remark-breaks'; 
import rehypeRaw from 'rehype-raw'; 
interface ChatMessagesProps {
  conversation: Message[];
  selectedConversation: string | null;
}

type Message = {
  content: string;
  role: string;
  loading: boolean;
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ conversation, selectedConversation }) => {
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
      {conversation.map((chat, index) => (
        <div key={index} className="p-4">
          <div
            className={`mt-4 flex ${
              chat.role === "user" ? "flex-row-reverse" : ""
            } justify-start items-start gap-4`}
          >
            <img
              src="/dummy/person-0.png"
              alt="User"
              width={100}
              height={100}
              className="w-[45px] h-[45px] object-cover rounded-xl"
            />
            <div
              className={`max-w-5xl ${
                chat.role === "user"
                  ? "bg-primary-green text-white"
                  : "bg-[#F1F1F1] text-primary-black"
              } py-3 px-5 rounded-xl text-[14.5px] leading-relaxed`}
            >
              {chat.loading ? (
                <DotsLoader />
              ) : chat.role === "user" ? (
                chat.content
              ) : (
                <ReactMarkdown
                  className="prose"
                  key={chat.content}
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {chat.content}
                </ReactMarkdown>
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
