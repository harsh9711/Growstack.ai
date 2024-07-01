import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatOptions from "./ChatOptions";
import ChatMessages from "./ChatMessages";
import { Assistant, Chat, Conversation } from "../../../components/types";

interface ChatSectionProps {
  conversation: Conversation;
  assistant: Assistant;
}

const ChatSection: React.FC<ChatSectionProps> = ({ conversation, assistant }) => {
  const [messages, setMessages] = useState<Chat[]>(conversation.chats);

  const addMessage = (prompt: string, response: string) => {
    const newMessage: Chat = {
      prompt,
      response,
      _id: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className="flex-1 h-full flex flex-col p-8">
      <div className="flex-1 h-full max-h-[53.3vh] overflow-y-auto">
        <ChatMessages conversation={{ ...conversation, chats: messages }} assistant={assistant} />
      </div>
      <div className="space-y-4">
        <ChatOptions />
        <ChatInput assistant_id={conversation.assistant_id} addMessage={addMessage} />
      </div>
    </div>
  );
};

export default ChatSection;
