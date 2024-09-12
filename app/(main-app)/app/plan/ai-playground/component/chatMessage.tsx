
import React, { useLayoutEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DotsLoader from "@/components/DotLoader";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import { Message } from "../interface/playground";

interface ChatMessagesProps {
  conversation: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ conversation }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message's start position (prompt or response)
  const scrollToStart = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight; // Ensure the scroll goes to the top of the latest message
    }
  };

  useLayoutEffect(() => {
    scrollToStart();
  }, [conversation]);

  const currentUser = getCurrentUser();

  return (
    <div ref={chatContainerRef} className="flex-1 h-full overflow-y-auto">
      {conversation.map((chat, index) => (
        <div key={index} className={`${index === conversation.length - 1 ? "mb-6" : ""}`}>
          <div
            className={`mt-4 flex ${chat.role === "user" ? "flex-row-reverse" : ""} justify-start items-start gap-4`}
          >
            {chat.role === "user" ? (
              <Avatar className="w-11 h-11 rounded-xl">
                <AvatarImage src={currentUser?.profile_img} />
                <AvatarFallback>{currentUser?.email?.slice(0, 1)}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-9 min-w-11 h-11 mt-2 rounded-xl relative">
                <Image src="/logo/growstack-mini.png" alt="growstack_ai_chat" fill />
              </div>
            )}
            <div
              className={`max-w-5xl ${
                chat.role === "user" ? "bg-primary-green text-white" : "bg-[#F1F1F1] text-primary-black"
              } py-3 px-5 rounded-xl text-[14.5px] leading-relaxed min-h-11 flex justify-center items-center text-justify`}
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
       
    </div>
  );
};

export default ChatMessages; 