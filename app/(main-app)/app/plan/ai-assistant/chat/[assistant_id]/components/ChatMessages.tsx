import React, { useEffect, useRef } from "react";
import { Assistant, Chat, Conversation } from "../../../components/types";

interface ChatMessagesProps {
  conversation: Conversation;
  assistant: Assistant;
}

const formatResponse = (response: string): string => {
  if (!response) return ""; // Handle undefined or null response

  // Convert newlines to <br>
  let formattedResponse = response.replace(/\n/g, "<br>");

  // Convert **bold** to <strong>
  formattedResponse = formattedResponse.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert *italic* to <em>
  formattedResponse = formattedResponse.replace(/\*(.*?)\*/g, "<em>$1</em>");

  return formattedResponse;
};

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
    <div className="space-y-4 pb-4">
      {conversation.chats.map((chat: Chat) => (
        <div key={chat._id} className="p-4">
          <div className="mt-4 flex flex-row-reverse justify-start items-start gap-4">
            <img src="/dummy/person-0.png" alt="User" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
            <div className="max-w-5xl bg-primary-green text-white py-3 px-5 rounded-xl text-[14.5px] leading-relaxed">{chat.prompt}</div>
          </div>
          <div className="mt-4 flex justify-start items-start gap-4">
            <img src={assistant.avatar} alt="Assistant" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
            <div
              className="max-w-5xl bg-[#F1F1F1] text-primary-black py-3 px-5 rounded-xl text-[15px] leading-[1.8]"
              dangerouslySetInnerHTML={{ __html: formatResponse(chat.response) }}
            />
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
