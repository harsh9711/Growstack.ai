import React from "react";

interface ChatMessageProps {
  message: string;
  isUser?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser = false }) => {
  return <div className={`my-2 p-3 ${isUser ? "bg-blue-100 self-end" : "bg-gray-100 self-start"} rounded-lg max-w-md`}>{message}</div>;
};

export default ChatMessage;
