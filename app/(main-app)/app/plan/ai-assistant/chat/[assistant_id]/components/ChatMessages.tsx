import React, { useEffect, useRef } from "react";
import { Assistant, Chat, Conversation } from "../../../components/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../../../../../../../../styles/markdown.css";

interface ChatMessagesProps {
  conversation: Conversation;
  assistant: Assistant;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ conversation, assistant }) => {
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
    <div className="flex-1 flex flex-col justify-end h-full space-y-4 pb-4">
      {conversation.chats.length < 1 ? (
        <div className="mt-4 flex justify-start items-start gap-4">
          <img src={assistant.avatar} alt="Assistant" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
          <div className="max-w-5xl bg-[#F1F1F1] text-primary-black py-3 px-5 rounded-xl text-[15px] leading-[1.8]">
            <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
              {assistant.welcome_message}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        conversation.chats.map((chat: Chat) => (
          <div key={chat._id} className="p-4 flex-1 h-full">
            <div className="mt-4 flex flex-row-reverse justify-start items-start gap-4">
              <img src="/dummy/person-0.png" alt="User" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
              <div className="max-w-5xl bg-primary-green min-h-[45px] text-white py-3 px-5 rounded-xl text-[14.5px] leading-relaxed">{chat.prompt}</div>
            </div>
            <div className="mt-4 flex justify-start items-start gap-4">
              <img src={assistant.avatar} alt="Assistant" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
              <div className="max-w-5xl bg-[#F1F1F1] min-h-[45px] text-primary-black py-3 px-5 rounded-xl text-[15px] leading-[1.8]">
                <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                  {chat.response}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
