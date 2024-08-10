import DotsLoader from "@/components/DotLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
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

  const currentUser = getCurrentUser();

  return (
    <>
      {conversation.map((chat, index) => (
        <div key={index} className="p-4">
          <div className={`mt-4 flex ${chat.role === "user" ? "flex-row-reverse" : ""} justify-start items-start gap-4`}>
            {chat.role === "user" ? (
              <Avatar className="w-11 h-11 rounded-xl">
                <AvatarImage src={currentUser?.profile_img} />
                <AvatarFallback>{currentUser?.email?.slice(0, 1)}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-11 h-11 mt-2 rounded-xl relative">
                <Image src="/logo/growstack-mini.png" alt="growstack_ai_chat" fill />
              </div>
            )}
            <div
              className={`max-w-5xl ${
                chat.role === "user" ? "bg-primary-green text-white" : "bg-[#F1F1F1] text-primary-black"
              } py-3 px-5 rounded-xl text-[14.5px] leading-relaxed min-h-11 flex justify-center`}>
              {chat.loading ? (
                <DotsLoader />
              ) : chat.role === "user" ? (
                chat.content
              ) : (
                <ReactMarkdown className="prose" key={chat.content} remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
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
