import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser = false }) => {
  return <div className={`my-2 p-3 flex ${isUser ? "bg-blue-100 ml-auto " : "bg-gray-100 self-start"} rounded-lg max-w-md`}>
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
    </div>
  </div>;
};

export default ChatMessage;
