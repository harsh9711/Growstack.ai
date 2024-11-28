import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import DotsLoader from "@/components/DotLoader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { CopyIcon, Regenerate, VerticalLineIcon } from "@/components/svgs";
import { Clipboard, Check } from "lucide-react";

interface ChatMessagesProps {
  conversation: Message[];
  selectedConversation: string | null;
  imageUrl: string | null;
  onButtonClick: (chatMessage: string) => void;
}

type Message = {
  content: string;
  role: string;
  loading: boolean;
  imageUrl: string | null;
  filename: string | null;
};

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  conversation,
  selectedConversation,
  onButtonClick,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [conversation]);

  const handleCopy = (content: any, index: any) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [conversation]);

  const currentUser = getCurrentUser();

  const extractFileUrl = (content: string) => {
    const fileUrlRegex =
      /!\[.*?\]\((https?:\/\/.*\.(?:doc|docx|txt|xls|xlsx|csv|pdf))\)/gi;
    const matchedUrls = content.match(fileUrlRegex);
    if (matchedUrls) {
      const urlRegex = /\((https?:\/\/.*\.(?:doc|docx|txt|xls|xlsx|csv|pdf))\)/;
      const urlMatch = matchedUrls[0].match(urlRegex);
      return urlMatch ? urlMatch[1] : null;
    }
    return null;
  };

  const getFileName = (fileUrl: string) => {
    return fileUrl.split("/").pop() || "Unknown file";
  };

  const extractImageUrl = (content: string) => {
    const markdownImageRegex =
      /!\[.*?\]\((https?:\/\/.*\.(?:png|jpg|jpeg|gif))\)/gi;
    const matchedUrls = content.match(markdownImageRegex);
    if (matchedUrls) {
      const urlRegex = /\((https?:\/\/.*\.(?:png|jpg|jpeg|gif))\)/;
      const urlMatch = matchedUrls[0].match(urlRegex);
      return urlMatch ? urlMatch[1] : null;
    }
    return null;
  };

  const removeUrlMarkdown = (
    content: string,
    image_tempurl: string | null,
    file_tempurl: string | null
  ) => {
    if (image_tempurl || file_tempurl) {
      const markdownImageRegex =
        /!\[.*?\]\(https?:\/\/.*\.(?:png|jpg|jpeg|gif|doc|docx|txt|xls|xlsx|csv|pdf)\)/gi;
      return content.replace(markdownImageRegex, "").trim();
    }
    return content;
  };

  const CodeBlock = ({
    value,
    language,
  }: {
    value: string;
    language: string;
  }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div className="relative">
        <pre className="m-0 overflow-x-auto">
          <code className={`language-${language}`}>{value}</code>
        </pre>
        <button
          className="absolute top-2 right-2 p-1 rounded-md shadow-sm"
          onClick={handleCopy}
        >
          {copied ? (
            <Check size={20} className="text-green-500" />
          ) : (
            <Clipboard size={20} />
          )}
        </button>
      </div>
    );
  };

  const components = {
    code({ inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <CodeBlock
          value={String(children).replace(/\n$/, "")}
          language={match[1]}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);
  return (
    <>
      <div className="messages-container flex-1 w-full flex flex-col h-full overflow-y-auto">
        {conversation.map((chat, index) => {
          let image_tempurl: string | null = "";
          let file_tempurl: string | null = "";
          if (chat.role === "user") {
            image_tempurl = chat.imageUrl || extractImageUrl(chat.content);
            file_tempurl = extractFileUrl(chat.content);
          }
          chat.imageUrl = image_tempurl;
          chat.filename = file_tempurl
            ? getFileName(file_tempurl)
            : chat.filename || "";
          const textContent = removeUrlMarkdown(
            chat.content,
            image_tempurl,
            file_tempurl
          );

          const previousUserMessage = conversation
            .slice(0, index)
            .reverse()
            .find(prevChat => prevChat.role === "user")?.content;
          return (
            <div key={index} className="p-4">
              <div
                className={`mt-4 flex ${
                  chat.role === "user" ? "flex-row-reverse" : ""
                } justify-start items-start gap-4`}
              >
                {chat.role === "user" ? (
                  <Avatar className="w-11 h-11 rounded-xl">
                    <AvatarImage src={currentUser?.profile_img} />
                    <AvatarFallback>
                      {currentUser?.email?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-11 h-11 rounded-xl relative min-w-11">
                    <Image
                      src="/logo/growstack-mini1.png"
                      alt="growstack_ai_chat"
                      fill
                    />
                  </div>
                )}
                {chat.role === "user" ? (
                  <div className="flex flex-col items-end">
                    {chat.imageUrl && (
                      <div className="image-container mb-2">
                        <img
                          src={chat.imageUrl}
                          alt="chat image"
                          className="max-w-full h-auto"
                        />
                      </div>
                    )}
                    {chat.filename && (
                      <div className="flex flex-row gap-1 aligin-center justify-start m-4">
                        <svg
                          width="25px"
                          height="25px"
                          viewBox="0 0 24 24"
                          fill="#355E3B"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13H10ZM8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16H8ZM8.5 9C7.94772 9 7.5 9.44772 7.5 10C7.5 10.5523 7.94772 11 8.5 11V9ZM9.5 11C10.0523 11 10.5 10.5523 10.5 10C10.5 9.44772 10.0523 9 9.5 9V11ZM8.5 6C7.94772 6 7.5 6.44772 7.5 7C7.5 7.55228 7.94772 8 8.5 8V6ZM9.5 8C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6V8ZM17.908 20.782L17.454 19.891L17.454 19.891L17.908 20.782ZM18.782 19.908L19.673 20.362L18.782 19.908ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM8 13V16H10V13H8ZM8.5 11H9.5V9H8.5V11ZM8.5 8H9.5V6H8.5V8ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H15.8V20H8.2V22ZM20 17.8V9H18V17.8H20ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM15.8 22C16.3436 22 16.8114 22.0008 17.195 21.9694C17.5904 21.9371 17.9836 21.8658 18.362 21.673L17.454 19.891C17.4045 19.9162 17.3038 19.9539 17.0322 19.9761C16.7488 19.9992 16.3766 20 15.8 20V22ZM18 17.8C18 18.3766 17.9992 18.7488 17.9761 19.0322C17.9539 19.3038 17.9162 19.4045 17.891 19.454L19.673 20.362C19.8658 19.9836 19.9371 19.5904 19.9694 19.195C20.0008 18.8114 20 18.3436 20 17.8H18ZM18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362L17.891 19.454C17.7951 19.6422 17.6422 19.7951 17.454 19.891L18.362 21.673ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698Z" />
                        </svg>
                        <p className="font-semibold">{chat.filename}</p>
                      </div>
                    )}
                    {textContent && (
                      <div className="text-container max-w-5xl bg-[#2DA771] text-white whitespace-pre-wrap py-3 px-5 rounded-xl text-[14.5px] leading-relaxed min-h-11 flex justify-center text-justify">
                        {textContent}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className={`max-w-5xl ${
                      chat.role === "user"
                        ? "bg-[#2DA771] text-white whitespace-pre-wrap"
                        : "bg-[#F1F1F1] text-primary-black"
                    } py-3 px-5 rounded-xl text-[14.5px] leading-relaxed min-h-11 flex justify-center text-justify`}
                  >
                    {chat.loading ? (
                      <DotsLoader />
                    ) : (
                      <div className="relative">
                        {chat.imageUrl && chat.role !== "user" && (
                          <div className="image-container mb-2">
                            <img
                              src={chat.imageUrl}
                              alt="chat image"
                              className="max-w-full h-auto"
                            />
                          </div>
                        )}
                        <ReactMarkdown
                          className="prose"
                          key={chat.content}
                          remarkPlugins={[remarkGfm, remarkBreaks]}
                          rehypePlugins={[rehypeRaw]}
                          components={components}
                        >
                          {textContent}
                        </ReactMarkdown>
                        <div className="flex justify-between">
                          <div></div>
                          <div></div>
                          <div className="flex">
                            {copied === index && (
                              <span className="text-green-600">Copied!</span>
                            )}
                            <button
                              onClick={() => handleCopy(chat.content, index)}
                              className="p-2 bg-gray-0 rounded"
                            >
                              <CopyIcon />
                            </button>
                            <VerticalLineIcon className="mt-2.5" />
                            {/* Display the Regenerate button only for non-user content */}
                            {chat.role !== "user" && previousUserMessage && (
                              <button
                                onClick={() =>
                                  onButtonClick(previousUserMessage)
                                }
                                className="flex items-center rounded"
                              >
                                <div className="rounded-full p-1">
                                  <Regenerate className="w-6 h-6 mt-1 bg-gray-0" />
                                </div>
                                <span>Regenerate</span>
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="mt-5" ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatMessages;
