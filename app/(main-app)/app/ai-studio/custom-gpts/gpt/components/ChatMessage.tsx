import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import DotsLoader from "@/components/DotLoader";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { BookText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import Image from "next/image";
import { FaLongArrowAltDown } from "react-icons/fa";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(true);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setIsBottom(scrollTop + clientHeight >= scrollHeight - 10); // Adjust threshold for precision
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom on new messages
  }, [conversation]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const formatToMarkdown = (text: string) => {
    let formattedText = text.replace(/(-\s|\d+\.\s)/g, "\n$1");
    formattedText = formattedText.replace(/(\n- |\n\d+\.\s)/g, "\n\n$1");
    return formattedText.trim();
  };

  const currentUser = getCurrentUser();

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        className="overflow-y-auto max-h-[calc(100vh-370px)] overflow-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
      >
        {conversation.map((chat, index) => (
          <div key={index} className="p-4">
            <div className="flex flex-row-reverse justify-start items-start">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  {chat.images &&
                    chat.images.map((url, index) => (
                      <div key={index}>
                        <Image
                          src={url}
                          alt="uploadedImage"
                          width={400}
                          height={400}
                          className="rounded-xl"
                        />
                      </div>
                    ))}
                  {chat.files && (
                    <div className="flex flex-col gap-2 overflow-x-auto pb-1.5 pt-[7px]">
                      {chat.files.length > 0 && (
                        <div className="flex flex-col gap-2 flex-wrap">
                          {chat.files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-green-100 p-2 rounded-md"
                            >
                              <BookText size={24} />
                              <span className="text-sm truncate ml-2 mr-2">
                                {file.file_name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-row-reverse gap-4">
                  <Avatar className="w-11 h-11 rounded-xl">
                    <AvatarImage src={currentUser?.profile_img} />
                    <AvatarFallback>
                      {currentUser?.email?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-5xl bg-primary-green text-white py-3 px-5 rounded-xl text-[14.5px] leading-relaxed">
                    {chat.user_message}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-start items-start gap-4">
              <img
                src={icon}
                alt="User"
                width={100}
                height={100}
                className="w-[45px] h-[45px] object-cover rounded-xl"
              />
              <div className="max-w-5xl bg-white text-primary-black py-3 px-5 rounded-xl text-[14.5px] leading-relaxed min-h-12 flex items-center">
                {chat.loading ? (
                  <DotsLoader />
                ) : (
                  <ReactMarkdown
                    className="prose"
                    key={chat.response}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeRaw]}
                  >
                    {formatToMarkdown(chat.response)}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {!isBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-green text-white p-3 rounded-full hover:bg-primary-dark-green transition duration-300 ease-in-out"
        >
          <FaLongArrowAltDown size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatMessage;
