import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import DotsLoader from "@/components/DotLoader";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { BookText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import Image from "next/image";
interface ChatMessageProps {
  conversation: Message[];
  icon: string;
}

type Message = {
  user_message: string;
  response: string;
  loading: boolean;
  images?: string[];
  files?: { file_type: string; file_id: string; file_name: string }[];
};

const ChatMessage: React.FC<ChatMessageProps> = ({ conversation, icon }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const formatToMarkdown = (text: string) => {
    let formattedText = text.replace(/(-\s|\d+\.\s)/g, "\n$1");

    formattedText = formattedText.replace(/(\n- |\n\d+\.\s)/g, "\n\n$1");

    formattedText = formattedText.trim();

    return formattedText;
  };

  const currentUser = getCurrentUser();

  return (
    <div className="overflow-y-auto max-h-[calc(100vh-370px)]">
      {conversation.map((chat, index) => (
        <div key={index} className="p-4">
          <div className="flex flex-row-reverse justify-start items-start">
            <div className="space-y-3">
              <div className="flex space-x-2">
                {chat.images &&
                  chat.images.map((url, index) => (
                    <div key={index}>
                      <Image src={url} alt="uploadedImage" width={400} height={400} className="rounded-xl" />
                    </div>
                  ))}
                {chat.files && (
                  <div className="flex flex-col gap-2 overflow-x-auto pb-1.5 pt-[7px]">
                    {chat.files.length > 0 && (
                      <div className="flex flex-col gap-2 flex-wrap">
                        {chat.files.map((file, index) => (
                          <div key={index} className="flex items-center bg-green-100 p-2 rounded-md">
                            <BookText size={24} />
                            <span className="text-sm truncate ml-2 mr-2">{file.file_name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className={`flex flex-row-reverse gap-4`}>
                <Avatar className="w-11 h-11 rounded-xl">
                  <AvatarImage src={currentUser?.profile_img} />
                  <AvatarFallback>{currentUser?.email?.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className={`max-w-5xl bg-primary-green text-white py-3 px-5 rounded-xl text-[14.5px] leading-relaxed`}>{chat.user_message}</div>
              </div>
            </div>
          </div>
          <div className={`mt-4 flex justify-start items-start gap-4`}>
            <img src={icon} alt="User" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
            <div className={`max-w-5xl bg-white text-primary-black py-3 px-5 rounded-xl text-[14.5px] leading-relaxed min-h-12 flex items-center`}>
              {chat.loading ? (
                <DotsLoader />
              ) : (
                <ReactMarkdown className="prose" key={chat.response} remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>
                  {formatToMarkdown(chat.response)}
                </ReactMarkdown>
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessage;
