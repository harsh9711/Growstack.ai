
import React, { useLayoutEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DotsLoader from "@/components/DotLoader";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import { Message } from "../interface/playground";
import { CopyIcon, Regenerate, VerticalLineIcon } from "@/components/svgs";

interface ChatMessagesProps {
  conversation: Message[];
  onRegenerateClick: (chatMessage: string) => void
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ conversation, onRegenerateClick }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(null);
  const handleCopy = (content: any, index: any) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    });
  };

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
      {conversation.map((chat, index) => {

        const previousUserMessage =
          conversation
            .slice(0, index)
            .reverse()
            .find((prevChat) => prevChat.role === "user")?.content;

        return (
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
                className={`max-w-5xl ${chat.role === "user" ? "bg-primary-green text-white break-words whitespace-pre-wrap" : "bg-[#F1F1F1] text-primary-black"
                  } py-3 px-5 rounded-xl text-[14.5px] leading-relaxed min-h-11 flex justify-center items-center text-justify`}
              >
                {chat.loading ? (
                  <DotsLoader />
                ) : chat.role === "user" ? (
                  chat.content
                ) : (
                  <div className="relative">
                    <ReactMarkdown
                      className="prose"
                      key={chat.content}
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {chat.content}
                    </ReactMarkdown>
                    <div className="flex justify-between">
                      <div></div>
                      <div></div>
                      <div className="flex">
                        {copied === index && (
                          <span className="text-green-600">Copied!</span>
                        )}
                        <button
                          onClick={() => handleCopy(chat.content, index)}
                          className="p-2 bg-gray-0 rounded"
                        >
                          <CopyIcon />
                        </button>
                        <VerticalLineIcon className="mt-2.5" />
                        {chat.role !== "user" && previousUserMessage && (
                          <button
                            onClick={() => onRegenerateClick(previousUserMessage)}
                            className="flex items-center rounded"
                          >
                            <div className="rounded-full p-1">
                              <Regenerate className="w-6 h-6 mt-1 bg-gray-0" />
                            </div>
                            <span>Regenerate</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}

    </div>
  );
};

export default ChatMessages; 