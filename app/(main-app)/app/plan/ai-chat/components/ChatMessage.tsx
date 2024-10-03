import React, { useEffect, useLayoutEffect, useRef } from "react";
import DotsLoader from "@/components/DotLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import Image from "next/image";
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

const ChatMessages: React.FC<ChatMessagesProps> = ({
  conversation,
  selectedConversation,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [conversation]);

  const currentUser = getCurrentUser();
  return (
    <>
      <div className="messages-container flex-1 w-full flex flex-col overflow-y-auto">
        {conversation.map((chat, index) => (
          <div key={index} className="p-4">
            <div
              className={`mt-4 flex ${chat.role === "user" ? "flex-row-reverse" : ""
                } justify-start items-start gap-4`}
            >
              {chat.role === "user" ? (
                <Avatar className="w-11 h-11 rounded-xl">
                  <AvatarImage src={currentUser?.profile_img} />
                  <AvatarFallback>{currentUser?.email?.slice(0, 1)}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-11 h-11 rounded-xl relative min-w-11">
                  <Image
                    src="/logo/growstack-mini.png"
                    alt="growstack_ai_chat"
                    fill
                  />
                </div>
              )}
              <div
                className={`max-w-5xl ${chat.role === "user"
                  ? "bg-primary-green text-white whitespace-pre-wrap"
                  : "bg-[#F1F1F1] text-primary-black"
                  } py-3 px-5 rounded-xl text-[14.5px] leading-relaxed min-h-11 flex justify-center text-justify`}
              >
                {chat.loading ? (
                  <DotsLoader />
                ) : chat.role === "user" ? (
                  <>{chat.content}</>
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
      </div>
    </>
  );
};

export default ChatMessages;
