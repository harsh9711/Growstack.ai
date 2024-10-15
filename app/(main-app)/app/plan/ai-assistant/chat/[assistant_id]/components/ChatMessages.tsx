import React, { useEffect, useRef, useState } from "react";
import { Assistant, Chat, Conversation } from "../../../components/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DotsLoader from "@/components/DotLoader";
import Image from "next/image";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clipboard, Check } from "lucide-react";

interface ChatMessagesProps {
  conversation: Conversation;
  assistant: Assistant;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ conversation, assistant }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.chats]);

  const CodeBlock = ({ value, language }: { value: string; language: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div className="relative">
        <pre className="m-0 overflow-x-auto">
          <code className={`language-${language}`}>{value}</code>
        </pre>
        <button 
          className="absolute top-2 right-2 p-1 rounded-md shadow-sm" 
          onClick={handleCopy}
        >
          {copied ? <Check size={20} className="text-green-500" /> : <Clipboard size={20} />}
        </button>
      </div>
    );
  };

  const components = {
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <CodeBlock value={String(children).replace(/\n$/, '')} language={match[1]} />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <>
      <div className="mt-4 flex justify-start items-start gap-4">
        <img src={assistant.avatar} alt="Assistant" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
        <div className="max-w-5xl bg-[#F1F1F1] text-primary-black py-3 px-5 rounded-xl text-[15px] leading-[1.8]">
          <ReactMarkdown
            className="prose"
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {assistant.welcome_message}
          </ReactMarkdown>
        </div>
      </div>
      {conversation.chats.length > 0 &&
        conversation.chats.map((chat: Chat) => {
          return (
            <div key={chat._id} className="p-4">
              <div className="mt-4 flex flex-row-reverse justify-start items-start gap-4">
                <Avatar className="w-11 h-11 rounded-xl">
                  <AvatarImage src={currentUser?.profile_img} />
                  <AvatarFallback>{currentUser?.email?.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="max-w-5xl bg-primary-green text-white py-3 px-5 rounded-xl text-[14.5px] leading-relaxed">{chat.prompt}</div>
              </div>
              <div className="mt-4 flex justify-start items-start gap-4">
                <Image src={assistant.avatar} alt="Assistant" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
                <div className="max-w-5xl min-h-11 bg-[#F1F1F1] text-primary-black py-4 px-5 rounded-xl text-[15px] leading-[1.8] flex flex-col items-center justify-center text-justify">
                  {chat.response ? (
                    <ReactMarkdown
                      key={chat._id}
                      className="prose"
                      remarkPlugins={[remarkGfm]}
                      components={components}
                    >
                      {chat.response}
                    </ReactMarkdown>
                  ) : (
                    <DotsLoader />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatMessages;
