"use client";

import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import clsx from "clsx";
import Image from "next/image";
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import ChatInput from "./ChatInput";
import { CiSettings } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import MessageList from "./SidebarAccount";
import { formatRelativeDate, timeDiffFromNow } from "@/utils/dateformate";
import moment from "moment";
import { MdOutlineDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import CommentChatInput from "./commentChartInput";
interface SidebarItem {
  _id: string;
  title: string;
  createdDate: string;
  updatedDate?: string;
  selected: boolean;
  onRename: (_id: string, newTitle: string) => void;
  onSelect: () => void;
}

const hideScrollbarStyles: React.CSSProperties = {
  overflowY: "auto",
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
};

const hideScrollbarWebkit: React.CSSProperties = {
  scrollbarWidth: "none", // Firefox
  WebkitOverflowScrolling: "touch", // Optional for touch devices
};

const SearchBar = ({ searchQuery, setSearchQuery }: any) => {
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterMenuRef.current &&
      !filterMenuRef.current.contains(event.target as Node)
    ) {
      setIsFilterMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="relative flex items-center  max-w-[293px] max-h-[48px] shadow-lg rounded-2xl">
      <div className="flex items-center bg-gray-100 border-[0.5px] border-gray-200 px-10 rounded-2xl overflow-hidden focus-within:ring-1 focus-within:ring-green-800">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="bg-gray-100 text-sm focus:outline-none -translate-x-6"
        />
        <button onClick={toggleFilterMenu} className="p-2 translate-x-6">
          {isFilterMenuOpen ? (
            <FaFilter className="w-6 h-6 text-green-800" />
          ) : (
            <CiFilter className="w-8 h-6 text-green-800" />
          )}
        </button>
      </div>

      {isFilterMenuOpen && (
        <div
          ref={filterMenuRef}
          className="absolute z-20 mt-2 top-14 right-0 w-72 bg-white border-[0.5px] border-gray-200 rounded-2xl shadow-lg"
        >
          <div className="p-4">
            <div className="flex flex-row justify-between">
              <h3 className="text-lg font-medium">Filter</h3>
              <h3 className="text-lg font-normal flex flex-row gap-1">
                <BiReset className="my-1" />
                Reset
              </h3>
            </div>

            <div className="mt-2 space-y-2">
              <label className="flex items-center flex-row justify-between">
                <span>
                  <input
                    type="checkbox"
                    className="bg-green-800 form-checkbox"
                  />
                  <span className="ml-2">Carlos Jairo</span>
                </span>
                <Image
                  src="/contact.png"
                  alt="contact"
                  width="20"
                  height={10}
                />
              </label>
              <label className="flex items-center flex-row justify-between">
                <span>
                  {" "}
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Carlos Jairo</span>
                </span>
                <Image
                  src="/contact.png"
                  alt="contact"
                  width="20"
                  height={10}
                />
              </label>
              <label className="flex items-center flex-row justify-between">
                <span>
                  {" "}
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">Carlos Jairo</span>
                </span>
                <Image
                  src="/contact.png"
                  alt="contact"
                  width="20"
                  height={10}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Layout = () => {
  const options = [
    {
      label: "All accounts",
      value: "allaccounts",
      icon: <CiSettings className="text-xl translate-x-40 opacity-0" />,
    },
    {
      label: "GrowStack social",
      value: "growStacksocial",
      icon: <CiSettings className="text-xl translate-x-48" />,
    },
    {
      label: "GrowStack video",
      value: "growStackvideo",
      icon: <CiSettings className="text-xl translate-x-48" />,
    },
    {
      label: "Nike",
      value: "nike",
      icon: <CiSettings className="text-xl translate-x-48" />,
    },
  ];
  const [messages, setMessages] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleSendMessage = async (message: string) => {
    setMessages(message);
    let file;

    if (uploadedFile) {
      // selectedMessage.message.push(payloaddata);
      const formData = new FormData();
      formData.append("document", uploadedFile);
      try {
        const response: any = await instance.post(
          API_URL + "/users/api/v1/file/upload",
          formData
        );

        const payload = {
          recipientId: "1788791796136361984",
          message: message,
          mediaUrls: [response.data.data.fileUrl],
        };
        sendMessage(payload);
        console.log("response", response.data.data.fileUrl);
        file = response.data.data.fileUrl;
        setUploadedFile(null);
        setMessages("");
        // toast.success(response.data.message);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
        console.error(error);
      } finally {
        // setIsPending(false);
      }
    } else {
      console.log("selectedMessage", selectedMessage);
      const payload = {
        recipientId: "1788791796136361984",
        message: message,
        mediaUrls: [],
      };
      sendMessage(payload);
      setUploadedFile(null);
      setMessages("");
    }

    const payloaddata = {
      senderId: "1788791796136361984", //selectedMessage.message[0].senderId,
      attachments: file ? [{ type: "image", url: file }] : [],
      created: {},
      conversationId: selectedMessage.message[0].conversationId,
      recipientId: selectedMessage.message[0].recipientId,
      id: "1831577242255671718",
      message: message ? message : "",
      action: "sent",
      senderDetails: {
        name: selectedMessage.message[0].senderDetails.name,
        username: selectedMessage.message[0].senderDetails.username,
      },
    };
    setSelectedMessage((prevSelectedMessage: any) => ({
      ...prevSelectedMessage,
      message: [...prevSelectedMessage.message, payloaddata],
    }));

    // alert(message)
  };

  const onClickSidebarItem = async (item: any) => {
    setSelectedPostComments([]);
    setIsOpened(true);
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/comments/${item.id}`
      );
      setSelectedPost(item);
      let tempData = response?.data?.data?.[selectedPost?.platform];
      setSelectedPostComments(tempData);
    } catch (error) {
      console.log("Error fetching table data:", error);
      toast.error("Error fetching table data");
    }
  };

  const handleGetComments = async () => {
    try {
      let response = await instance.get(
        `${API_URL}/users/api/v1/social-media/posts/history`
      );
      if (response?.data?.data?.history?.length > 0) {
        let result: any = [];
        response?.data?.data?.history?.forEach((ele: any) => {
          ele?.platforms?.forEach((platform: any) => {
            result.push({
              id: ele?.id,
              title: ele?.primary?.profiles?.[platform]?.displayName,
              time: timeDiffFromNow(ele?.created),
              author: "",
              message: ele?.post,
              imageUrl:
                ele?.primary?.profiles?.[platform]?.default_profile_image ||
                "/contact.png",
              postUrl: ele?.postIds?.[0]?.postUrl || "",
              platform: platform,
            });
          });
        });
        setFilteredData(result);
      }
    } catch (error) {
      console.log("Error fetching table data:", error);
      toast.error("Error fetching table data");
    }
  };
  const sendMessage = async (payload: {}) => {
    try {
      const response: any = await instance.post(
        API_URL +
          "/users/api/v1/social-media/profile/messages?platform=twitter",
        payload
      );
      toast.success(response.data.message);
      return response;
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error(error);
    } finally {
      // setIsPending(false);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    console.log("File uploaded:", file);
  };
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [MenuRotated, setMenuRotated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [MenuOpen, setMenuOpen] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const [showNewSidebar, setShowNewSidebar] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDotsClick = () => {
    setShowDelete(!showDelete);
  };
  const handleDotsClick2 = () => {
    setShow(!show);
  };

  const handleDotsClick3 = () => {
    setShow2(!show2);
  };
  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterMenuRef.current &&
      !filterMenuRef.current.contains(event.target as Node)
    ) {
      setIsFilterMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleSubMenu2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleGetMessages = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/profile/messages`
      );
      // setTableData(response.data.data.history);
    } catch (error) {
      console.log("Error fetching table data:", error);
      toast.error("Error fetching table data");
    }
  };

  const handleDeleteComment = async (eachComment: any) => {
    try {
      const response = await instance.delete(
        `${API_URL}/users/api/v1/social-media/comments/${eachComment.id}`
      );
      if (response.data?.data?.status === "success") {
        toast.success("Comment Deleted successfully");
        setChatInput("");
        handleGetComments();
      }
    } catch (error) {
      console.log("Error Deleting the Comment:", error);
      toast.error("Error Deleting the Comment");
    }
  };
  useEffect(() => {
    handleGetMessages();
    handleGetComments();
  }, []);

  const [selectedMessage, setSelectedMessage] = useState<any>();
  const handleChatInputCallback = (e: any) => {
    setChatInput(e.target.value);
    // handlePostComment(e.target.value)
  };

  const handlePostComment = async (value: string) => {
    try {
      const payload: any = {
        comment: value,
        platforms: [selectedPost?.platform],
        mediaUrls: [],
      };
      const response = await instance.post(
        `${API_URL}/users/api/v1/social-media/comments/${selectedPost.id}`,
        payload
      );
      if (response.data?.data?.status === "success") {
        toast.success("Comment posted successfully");
        setChatInput("");
        handleGetComments();
      }
    } catch (error) {
      console.log("Error Posting the Comment:", error);
      toast.error("Error Posting the Comment");
    }
  };
  const handleSelectMessage = (message: {
    title: string;
    time: string;
    author: string;
    message: any;
    imageUrl: string;
  }) => {
    console.log("Selected message:", message);
    setSelectedMessage(message);
  };

  const sidebarData: any = [];
  const [filteredData, setFilteredData] = useState(sidebarData);
  const [selectedPost, setSelectedPost] = useState<any>({});

  const [selectedPostComments, setSelectedPostComments] = useState<any>([]);
  const [chatInput, setChatInput] = useState("");
  return (
    <div className="flex-1 max-h-[730px] flex  mt-10 shadow-lg rounded-3xl text-ellipsis">
      <aside
        className={clsx(
          "w-full max-w-[350px] relative border bg-white   flex flex-col",
          showRightSidebar ? "" : "rounded-l-3xl"
        )}
      >
        <div className="flex w-full flex-row justify-between px-6 pt-6 pb-2">
          <div className="relative w-full flex flex-row gap-8 font-normal text-ellipsis">
            <button
              onClick={() => handleButtonClick(1)}
              className={`transition-all duration-300 text-[16px] w-1/2 ${
                activeIndex === 1 ? "text-green-800 font-semibold" : ""
              }`}
            >
              Messages
            </button>
            {/* <button
              onClick={() => handleButtonClick(2)}
              className={`transition-all text-[16px] duration-300 w-1/2 ${
                activeIndex === 2 ? "text-green-800 font-semibold" : ""
              }`}
            >
              Comments
            </button> */}

            <div
              className={`absolute -bottom-3 h-1 bg-green-800 transition-all duration-300  ${
                activeIndex === 1 ? "-left-0" : "left-[52%]"
              }`}
              style={{
                // transform: `translateX(${activeIndex * 100}%)`,
                width: "50%",
              }}
            />
          </div>
        </div>
        <div className="border-y   py-4 px-6">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="relative p-5 flex-1 overflow-y-auto max-h-[calc(100vh - 172px)]">
          {activeIndex === 1 && (
            <MessageList onSelectMessage={handleSelectMessage} />
          )}
          {activeIndex === 2 &&
            filteredData?.map((item: any, idx: number) => (
              <SidebarItem
                key={idx}
                title={item.title}
                time={item.time}
                author={item.author}
                message={item.message}
                imageUrl={item.imageUrl}
                onClick={() => onClickSidebarItem(item)} // Using 'item.title' as an example
              />
            ))}
        </div>
        {/* <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 rounde" /> */}
      </aside>
      {activeIndex === 1 && isOpened && selectedMessage && (
        <main
          className="flex-1 w-full flex flex-col bg-gray-100 p-4 border rounded-r-3xl"
          style={{
            height: "calc(100vh - 172px)",
            ...hideScrollbarStyles,
            ...hideScrollbarWebkit,
          }}
        >
          {/* Message Header */}
          <div className="flex flex-row gap-4 items-center">
            <Image src="/logo/growstack-mini.png" alt="facebook" width={50} height={50} />
            <h2 className="font-semibold text-[18px]">
              {selectedMessage.title}
            </h2>
          </div>

          <div className="border-[0.1px] border-gray-200 my-4 w-[1400px] -translate-x-4"></div>
          <div
            className="flex-1 p-4"
            style={{
              height: "calc(100vh - 150px)",
              ...hideScrollbarStyles,
              ...hideScrollbarWebkit,
            }}
          >
            <div className="flex flex-col gap-4">
              {/* Check if there are messages */}
              {Array.isArray(selectedMessage.message) &&
              selectedMessage.message.length > 0 ? (
                selectedMessage.message.map(
                  (
                    msg: {
                      message: any;
                      attachments: any[];
                      senderDetails: { profileImage: any; name: any };
                      created: string;
                    },
                    index: React.Key | null | undefined
                  ) => (
                    <div key={index} className="flex flex-row gap-4">
                      <ChatMessage
                        message={
                          <>
                            {msg.message}
                            {msg.attachments &&
                              msg.attachments.length > 0 &&
                              msg.attachments.map(
                                (attachment: any, attIndex: any) => (
                                  // src={attachment.url?attachment.url:"/logo/growstack-mini.png"}
                                  <div key={attIndex}>
                                    {attachment.type === "image" ? (
                                      <>
                                  {attachment.url && (<>{attachment.url}</>)}

                                  <Image
                                  src={(attachment.url && !attachment.url.includes("ton.twitter.com"))? attachment.url : "/logo/growstack-mini.png"}
                                  alt={`attachment-${attIndex}`}
                                  width={100}
                                  height={300}
                                  className="rounded-xl border mt-2"
                                  onError={(e) => {
                                    e.currentTarget.src = "/logo/growstack-mini.png";
                                  }}
                                /></>
                                    ) : (
                                      <a
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        View Attachment
                                      </a>
                                    )}
                                  </div>
                                )
                              )}
                          </>
                        }
                        imageUrl={
                          msg.senderDetails?.profileImage ||
                          "/logo/growstack-mini.png"
                        }
                        title={msg.senderDetails?.name || "Unknown"}
                        time={formatRelativeDate(msg.created)}
                      />
                      {/* <div className="flex flex-row items-center relative ml-3">
                <BsThreeDotsVertical
                  className="text-xl"
                  onClick={handleDotsClick}
                />
              </div> */}
                    </div>
                  )
                )
              ) : (
                <p>No messages available</p>
              )}
            </div>
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
          />
        </main>
      )}
      
    </div>
  );
};

export default Layout;
