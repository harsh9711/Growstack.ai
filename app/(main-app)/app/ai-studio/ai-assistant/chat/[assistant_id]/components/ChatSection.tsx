import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { Assistant, Chat, Conversation } from "../../../components/types";

interface ChatSectionProps {
  conversation: Conversation | any;
  assistant: Assistant;
  selectedLanguage: string;
  selectedAiModel: string;
  setMessagesData: any;
  newChat: boolean;
  setNewChat: (value: boolean) => void;
  convId: string;
  setMessages:(value: any) => void;
  messages:any
  setConvId: (value: string) => void;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  conversation,
  assistant,
  selectedLanguage,
  selectedAiModel,
  setMessagesData,
  newChat,
  setNewChat,
  convId,
  messages,
  setConvId,
  setMessages
}) => {
  // const [messages, setMessages] = useState<Chat[]>([]);

  useEffect(() => {
    if (conversation) {
    setMessages(conversation.chats);
    }
  }, [conversation]);

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
      chats: undefined,
    };
    setMessages((prevMessages: any) => [...prevMessages, newMessage]);
  };

  const updateMessage = (prompt: string, response: string) => {
    setMessages((prevMessages: any) => {
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
          newChat={newChat}
          setNewChat={setNewChat}
          convId={convId}

        />
      </div>
    </div>
  );
};

export default ChatSection;
