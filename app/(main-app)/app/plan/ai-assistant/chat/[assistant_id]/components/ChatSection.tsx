import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatOptions from "./ChatOptions";
import ChatMessages from "./ChatMessages";
import { Assistant, Chat, Conversation } from "../../../components/types";
import { translateText } from "./utils/translate";

interface ChatSectionProps {
  conversation: Conversation;
  assistant: Assistant;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  conversation,
  assistant,
}) => {
  const [messages, setMessages] = useState<Chat[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  useEffect(() => {
    setMessages(conversation.chats);
  }, [conversation.chats]);

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
      const messageIndex = prevMessages.findIndex(
        (msg) => msg.prompt === prompt
      );
      if (messageIndex !== -1) {
        const updatedMessages = [...prevMessages];
        updatedMessages[messageIndex].response = response;
        return updatedMessages;
      }
      return prevMessages;
    });
  };

  const switchLanguage = async (language: string) => {
    setSelectedLanguage(language);
    const translatedMessages = await translateText(messages, language);
    setMessages(translatedMessages);
  };

  return (
    <div className="flex-1 h-full flex flex-col px-8 pb-8">
      <div className="flex-1 flex flex-col h-full max-h-[55vh] overflow-y-auto">
        <ChatMessages
          conversation={{ ...conversation, chats: messages }}
          assistant={assistant}
        />
      </div>
      <div className="space-y-4">
        <ChatOptions
          switchLanguage={switchLanguage}
          selectedLanguage={selectedLanguage}
        />
        <ChatInput
          assistant_id={assistant.id}
          addMessage={addMessage}
          updateMessage={updateMessage}
        />
      </div>
    </div>
  );
};

export default ChatSection;
