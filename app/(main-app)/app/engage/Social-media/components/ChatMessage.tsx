import React from "react";

interface ChatMessageProps {
  message: any;
  imageUrl: string;
  title: string;
  time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, imageUrl, title, time }) => {
  return (
    <div className="my-4">
      <div className="flex items-start gap-4">
        <img
          src={imageUrl && !imageUrl.includes("ton.twitter.com")?imageUrl:"/logo/growstack-mini.png"}
          onError={(e) => (e.currentTarget.src = "/logo/growstack-mini.png")}
          alt="contact"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-md font-semibold">{title}</h2>
          <p className="text-xs font-light text-gray-500">{time}</p>
        </div>
      </div>

      <div className="ml-auto max-w-xs lg:max-w-md mt-1">
        <div className="py-2 px-4 bg-white rounded-lg text-sm shadow-md inline-block break-words">
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
