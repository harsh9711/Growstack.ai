import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatOptions from "./ChatOptions";
import ChatMessages from "./ChatMessages";
import { Assistant, Chat, Conversation } from "../../../components/types";
import { languageOptions } from "@/app/(main-app)/app/create/ai-articles/constants/options";

interface ChatSectionProps {
  conversation: Conversation;
  assistant: Assistant;
  selectedLanguage: string;
  selectedAiModel: string;
  setMessagesData : any
}

const ChatSection: React.FC<ChatSectionProps> = ({
  conversation,
  assistant,
  selectedLanguage,
  selectedAiModel,
  setMessagesData
}) => {
  const [messages, setMessages] = useState<Chat[]>([]);

  useEffect(() => {
    setMessages(conversation.chats);
  }, [conversation.chats]);

  useEffect(() => {
    setMessagesData(messages);
  }, [messages]);

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

  const updateMessage = (prompt: string, response: string) => {
    setMessages((prevMessages) => {
      const messageIndex = prevMessages.length - 1;
      const updatedMessages = [...prevMessages];
      updatedMessages[messageIndex].response = response;
      return updatedMessages;
    });
  };


  return (
    <div className="flex-1 h-full flex flex-col px-8 pb-8">
      <div className="flex-1 flex flex-col h-full max-h-[68vh] overflow-y-auto">
        <ChatMessages
          conversation={{ ...conversation, chats: messages }}
          assistant={assistant}
        />
      </div>
      <div className="space-y-4">
        {/* <ChatOptions
          switchLanguage={switchLanguage}
          selectedLanguage={selectedLanguage}
        /> */}
        <ChatInput
          selectedModel={selectedAiModel}
          assistant_id={assistant.id}
          addMessage={addMessage}
          updateMessage={updateMessage}
          selectedLanguage={selectedLanguage}
        />
      </div>
    </div>
  );
};

export default ChatSection;
