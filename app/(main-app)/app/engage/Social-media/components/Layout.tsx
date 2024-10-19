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
import { IoIosArrowDown, IoIosArrowUp, IoMdSend } from "react-icons/io";
import { AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
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
  msOverflowStyle: "none",
  scrollbarWidth: "none",
};

const hideScrollbarWebkit: React.CSSProperties = {
  scrollbarWidth: "none",
  WebkitOverflowScrolling: "touch",
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
        <button className="p-2 translate-x-6">
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
  const [messages, setMessages] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [historyData, setHistoryData] = useState<any>([]);
  const [commentData, setCommentData] = useState<any>([]);

  const handleSendMessage = async (message: string) => {
    console.log(
      "selectedMessage.message[0].recipientId",
      selectedMessage.recipientId
    );
    setMessages(message);
    let file;
    if (uploadedFile) {
      const formData = new FormData();
      formData.append("document", uploadedFile);
      try {
        const response: any = await instance.post(
          API_URL + "/users/api/v1/file/upload",
          formData
        );

        const payload = {
          recipientId: selectedMessage.recipientId
            ? selectedMessage.recipientId
            : "",
          message: message,
          mediaUrls: [response.data.data.fileUrl],
        };
        sendMessage(payload);
        console.log("response", response.data.data.fileUrl);
        file = response.data.data.fileUrl;
        setUploadedFile(null);
        setMessages("");
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
        console.error(error);
      } finally {
      }
    } else {
      const payload = {
        recipientId: selectedMessage.recipientId,
        message: message,
        mediaUrls: [],
      };
      sendMessage(payload);
      setUploadedFile(null);
      setMessages("");
    }

    const payloaddata = {
      senderId: selectedMessage.message[0].recipientId
        ? selectedMessage.message[0].recipientId
        : "",
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
    setIsOpened(true);
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/comments/${item.id}`
      );
      setSelectedPost(item);
      const tempData = response?.data?.data?.[selectedPost?.platform];
      setCommentData(response?.data?.data);
      setSelectedPostComments(tempData);
    } catch (error) {
      console.log("Error fetching table data:", error);
      toast.error("Error fetching table data");
    }
  };

  const handleGetComments = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/posts/history`
      );
      if (response?.data?.data?.history?.length > 0) {
        const result: any = [];
        setHistoryData(response?.data?.data?.history);
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
    } catch (error) {}
  };
  const sendMessage = async (payload: {}) => {
    try {
      const response: any = await instance.post(
        API_URL +
          `/users/api/v1/social-media/profile/messages?platform=${selectedMessage.title}`,
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
  const [activeIndex, setActiveIndex] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);
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
    } catch (error) {}
  };

  const handleDeleteComment = async (eachComment: any) => {
    try {
      const response = await instance.delete(
        `${API_URL}/users/api/v1/social-media/comments/${eachComment.commentId}?platform=${eachComment.platform}`
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
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEditMessage, setSelectedEditMessage] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleEditMessage = (index: number, comment: any) => {
    setSelectedEditMessage(comment?.comment);
    setSelectedIndex(index);
    setIsModalOpen(true); // Open the modal to edit the comment
  };
  const handleSendUpdate = async (editComment: any) => {
    try {
      const payload = {
        comment: selectedEditMessage,
        platforms: [editComment.platform],
        mediaUrls: [],
      };
      const response = await instance.put(
        `/users/api/v1/social-media/comments/${editComment?.commentId}`,
        payload
      );
      if (response.data?.data?.status === "success") {
        toast.success("Comment edited successfully");
        setChatInput("");
        handleGetComments();
      }

      if (selectedIndex !== null && selectedEditMessage.trim()) {
        const updatedComments = [...selectedPostComments];
        updatedComments[selectedIndex] = {
          ...updatedComments[selectedIndex],
          comment: selectedEditMessage,
        };
        setSelectedPostComments(updatedComments);
        setIsModalOpen(false);
        setVisibleMenuIndex(null);
      } else {
        console.error("Failed to update the comment.");
      }
    } catch (error) {
      console.error("Error updating the comment:", error);
    }
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
  const handleDeleteMessage = (index: number) => {
    const updatedMessages = selectedMessage.message.filter(
      (_: any, msgIndex: number) => msgIndex !== index
    );
    setSelectedMessage({ ...selectedMessage, message: updatedMessages });
    setVisibleMenuIndex(null); // Close the menu after delete
  };

  const toggleMenu = (index: number) => {
    setVisibleMenuIndex(prevIndex => (prevIndex === index ? null : index));
  };
  const sidebarData: any = [];
  const [filteredData, setFilteredData] = useState(sidebarData);
  const [selectedPost, setSelectedPost] = useState<any>({});

  const [selectedPostComments, setSelectedPostComments] = useState<any>([]);
  const [chatInput, setChatInput] = useState("");
  return (
    <div
      style={{
        maxHeight: "calc(100vh - 170px)",
        minHeight: "calc(100vh - 150px)",
        overflow: "hidden",
      }}
      className="flex mt-8 shadow-lg rounded-3xl text-ellipsis "
    >
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
            <button
              onClick={() => handleButtonClick(2)}
              className={`transition-all text-[16px] duration-300 w-1/2 ${
                activeIndex === 2 ? "text-green-800 font-semibold" : ""
              }`}
            >
              Comments
            </button>

            <div
              className={`absolute -bottom-3 h-1 bg-green-800 transition-all duration-300  ${
                activeIndex === 1 ? "-left-0" : "left-[52%]"
              }`}
              style={{
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
                onClick={() => onClickSidebarItem(item)}
              />
            ))}
          <>
            {" "}
            {activeIndex === 2 && !filteredData && (
              <>Comments: Channel not available.</>
            )}
          </>
        </div>
        <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 rounde" />
      </aside>
      {activeIndex === 1 && isOpened && selectedMessage && (
        <main
          className="flex-1 w-full flex flex-col bg-gray-100 p-4 border rounded-r-3xl"
          style={{
            height: "calc(100vh - 150px)",
            ...hideScrollbarStyles,
            ...hideScrollbarWebkit,
          }}
        >
          <div className="flex flex-row gap-4 items-center">
            <Image
              src="/logo/growstack-mini.png"
              alt="facebook"
              width={50}
              height={50}
            />
            <h2 className="font-semibold text-[18px]">
              {selectedMessage.title}
            </h2>
          </div>

          <div className="border-[0.1px] border-gray-200 my-4 w-[1400px] -translate-x-4"></div>
          <div
            className="flex-1 p-4"
            style={{
              height: "calc(100vh - 140px)",
              ...hideScrollbarStyles,
              ...hideScrollbarWebkit,
            }}
          >
            <div className="flex flex-col gap-4">
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
                    <div
                      key={index}
                      className="flex flex-row gap-4 items-start"
                    >
                      <ChatMessage
                        message={
                          <>
                            {msg.message}
                            {msg.attachments &&
                              msg.attachments.length > 0 &&
                              msg.attachments.map(
                                (attachment: any, attIndex: any) => (
                                  <div key={attIndex}>
                                    {attachment.type === "image" ? (
                                      <>
                                        {attachment.url && (
                                          <>{attachment.url}</>
                                        )}

                                        <Image
                                          src={
                                            attachment.url &&
                                            !attachment.url.includes(
                                              "ton.twitter.com"
                                            )
                                              ? attachment.url
                                              : "/logo/growstack-mini.png"
                                          }
                                          alt={`attachment-${attIndex}`}
                                          width={100}
                                          height={300}
                                          className="rounded-xl border mt-2"
                                          onError={e => {
                                            e.currentTarget.src =
                                              "/logo/growstack-mini.png";
                                          }}
                                        />
                                      </>
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
                      <div className="relative mt-2">
                        <button
                          className="p-2 rounded-full hover:bg-gray-200"
                          onClick={() => toggleMenu(index as number)}
                        >
                          &#x22EE;
                        </button>

                        {visibleMenuIndex === index && (
                          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10"></div>
                        )}
                      </div>
                    </div>
                  )
                )
              ) : (
                <p>No messages available</p>
              )}
            </div>
          </div>
          <div className="mt-5">
            <ChatInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
            />
          </div>
        </main>
      )}
      {!selectedMessage && activeIndex === 1 && (
        <main className="w-full  bg-white">
          <div className="flex items-center bg-white  h-full text-[16px] justify-center font-bold text-gray-700">
            Select a conversation to see details{" "}
          </div>
        </main>
      )}

      {activeIndex === 2 && (
        <main
          className="flex-1 w-full flex flex-col bg-gray-100 p-4 border"
          style={{ ...hideScrollbarStyles, ...hideScrollbarWebkit }}
        >
          <div className="flex flex-row gap-4 items-center">
            {" "}
            <Image src="/facebook.png" alt="facebook" width={50} height={50} />
            <h2 className="font-semibold text-[18px]">
              {selectedPost?.platform} Comments
            </h2>
          </div>
          <div className="border-[0.1px] border-gray-200 my-4 w-[1400px] -translate-x-4"></div>
          <div
            className="flex-1 p-4"
            style={{ ...hideScrollbarStyles, ...hideScrollbarWebkit }}
          >
            {activeIndex === 2 && selectedPostComments?.length < 1 && (
              <>No Comments available</>
            )}

            {selectedPostComments?.map(
              (eachComment: any, index: React.Key | null | undefined) => (
                <div
                  className="flex flex-row justify-between"
                  key={eachComment.id}
                >
                  <ChatMessage
                    message={<>{eachComment?.comment}</>}
                    imageUrl="/contact.png"
                    title={eachComment?.name}
                    time={`${eachComment?.platform} Post`}
                  />
                  <div className="relative mt-2">
                    <button
                      className="p-2 rounded-full hover:bg-gray-200"
                      onClick={() => toggleMenu(index as number)}
                    >
                      &#x22EE;
                    </button>

                    {visibleMenuIndex === index && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                          onClick={() =>
                            handleEditMessage(index as number, eachComment)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                          onClick={() => handleDeleteComment(eachComment)}
                        >
                          Delete
                        </button>
                      </div>
                    )}

                    {isModalOpen && selectedIndex === index && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                          className="relative bg-white p-6 rounded-lg shadow-lg"
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsModalOpen(false)}
                          >
                            <AiOutlineClose size={24} />
                          </button>
                          <h2 className="text-xl mb-4">Edit Comment</h2>
                          <div className="relative">
                            <textarea
                              value={selectedEditMessage}
                              onChange={e =>
                                setSelectedEditMessage(e.target.value)
                              }
                              className="w-full p-1 border border-gray-300 rounded-md pr-16 resize-none overflow-hidden" // Remove resize handle and hide overflow
                              style={{ height: "auto" }}
                            />
                            <button
                              className={`absolute right-2 bottom-2 p-2 ${
                                selectedEditMessage
                                  ? "text-blue-500"
                                  : "text-gray-400 cursor-not-allowed"
                              }`}
                              onClick={() => handleSendUpdate(eachComment)}
                              disabled={!selectedEditMessage}
                            >
                              <IoMdSend size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <CommentChatInput
            chatInput={chatInput}
            handleChatInputCallback={handleChatInputCallback}
            handlePostComment={handlePostComment}
          />
        </main>
      )}

      {activeIndex === 2 ? (
        <aside
          className={clsx(
            "w-full max-w-[350px] relative border bg-white rounded-r-3xl  flex flex-col"
          )}
        >
          <div className="flex flex-col justify-between px-6 pt-6 pb-2">
            <div
              className="relative w-full flex flex-row justify-between font-normal items-center cursor-pointer"
              onClick={toggleSubMenu}
            >
              <div className="flex flex-row gap-2 items-center text-ellipsis">
                <CiCircleInfo className="text-2xl" />
                <h2 className="text-[18px] font-medium">
                  Conversation details
                </h2>
              </div>
              {isOpen ? (
                <IoIosArrowUp className="text-xl" />
              ) : (
                <IoIosArrowDown className="text-xl" />
              )}
            </div>
            <div
              className={`dropdown-content ${
                isOpen ? "dropdown-open" : "dropdown-closed"
              }`}
            >
              <div className="border-[0.5px] border-gray-200 mt-4"></div>

              <div className="flex flex-row items-center mt-4 mb-4">
                <AiOutlineMessage className="text-lg" />
                <h2 className="text-[16px] font-medium items-center ml-2 text-ellipsis">
                  {" "}
                  {selectedPost?.platform} comments
                </h2>
              </div>
              <div className="flex flex-row justify-between ">
                <span>
                  <h2 className="text-[13px]">Started</h2>
                  <h2 className="text-[13px] font-medium">
                    {formatDate(historyData[0]?.created)}
                  </h2>
                </span>
                <span>
                  <h2 className="text-[13px]">Last update</h2>
                  <h2 className="text-[13px] font-medium">
                    {formatDate(commentData?.lastUpdated)}
                  </h2>
                </span>
              </div>
            </div>
          </div>
          <div className="border-[0.5px] border-gray-200 my-4"></div>

          <div className="flex flex-col justify-between px-6 pb-2">
            <div
              className="relative w-full flex flex-row justify-between font-normal items-center cursor-pointer"
              onClick={toggleSubMenu2}
            >
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src="/f.png"
                  alt="facebook"
                  width={25}
                  height={25}
                  className="text-2xl"
                />
                <h2 className="text-[18px] font-medium">
                  {selectedPost?.platform} Post
                </h2>
              </div>
              {isOpen2 ? (
                <IoIosArrowUp className="text-xl" />
              ) : (
                <IoIosArrowDown className="text-xl" />
              )}
            </div>

            <div
              className={`dropdown-content2 ${
                isOpen2 ? "dropdown-open" : "dropdown-closed"
              }`}
            >
              <div className="border-[0.5px] border-gray-200 my-4"></div>

              <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-col">
                  <span className="flex flex-row items-center w-full justify-between gap-x-24">
                    <h2 className="text-[14px] font-semibold">
                      {selectedPost?.title}
                    </h2>{" "}
                    <h2 className="font-extralight text-[10px]">
                      {selectedPost?.time}
                    </h2>
                  </span>
                  <p className="text-[12px] font-light">
                    {selectedPost?.platform} post
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-between bg-[#F8F8F8] p-4 rounded-xl mb-4">
                <h2 className="font-light text-[10px] text-black text-ellipsis">
                  {selectedPost?.message}
                </h2>
              </div>

              <button
                className="text-white text-ellipsis hover:font-medium bg-primary-green shadow-lg hover:bg-primary-green/90 w-32 justify-center flex gap-2 items-center h-10 font-light rounded-xl transition-all duration-300 text-sm"
                onClick={() => {
                  window.open(selectedPost?.postUrl, "_blank");
                }}
              >
                <svg
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.66732 5.82812H5.50065C4.58018 5.82812 3.83398 6.57432 3.83398 7.49479V14.9948C3.83398 15.9153 4.58018 16.6615 5.50065 16.6615H13.0007C13.9211 16.6615 14.6673 15.9153 14.6673 14.9948V10.8281"
                    stroke="white"
                    strokeWidth="1.45833"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.83398 11.6615L17.1673 3.32812"
                    stroke="white"
                    strokeWidth="1.45833"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 3.32812H17.1667V7.49479"
                    stroke="white"
                    strokeWidth="1.45833"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Open post
              </button>
            </div>
          </div>
          <div className="border-[0.5px] border-gray-200 my-4"></div>
          <div className="relative">
            {isFilterMenuOpen && (
              <div
                ref={filterMenuRef}
                className="absolute z-20 mt-2 -top-80 right-40 MAX-W-[300px] bg-white border-[0.5px] border-gray-200 rounded-2xl shadow-lg"
              >
                <div className="p-4">
                  <div className="flex items-center w-full bg-gray-100   border-[0.5px] border-gray-200  px-2 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-green-800">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="flex-grow  bg-gray-100 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="mt-2 space-y-2">
                    <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md  flex-row justify-between">
                      <span className="flex flex-row">
                        <Image
                          src="/contact.png"
                          alt="contact"
                          width="20"
                          height={10}
                        />
                        <span className="ml-2 text-black text-md ">
                          Carlos Jairo
                        </span>
                      </span>
                    </label>
                    <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md  flex-row justify-between">
                      <span className="flex flex-row">
                        <Image
                          src="/contact.png"
                          alt="contact"
                          width="20"
                          height={10}
                        />
                        <span className="ml-2 text-black text-md ">
                          Leslie Alexander
                        </span>
                      </span>
                    </label>
                    <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md  flex-row justify-between">
                      <span className="flex flex-row">
                        <Image
                          src="/contact.png"
                          alt="contact"
                          width="20"
                          height={10}
                        />
                        <span className="ml-2 text-black text-md ">
                          Kathryn Murphy
                        </span>
                      </span>
                    </label>
                    <label className="flex bg-[#FAFBFC] p-2 items-center  rounded-md flex-row justify-between">
                      <span className="flex flex-row">
                        <Image
                          src="/contact.png"
                          alt="contact"
                          width="20"
                          height={10}
                        />
                        <span className="ml-2 text-black text-md ">
                          Marvin McKinney
                        </span>
                      </span>
                    </label>
                    <label className="flex bg-[#FAFBFC] items-center  rounded-md flex-row p-2 stify-between">
                      <span className="flex flex-row w-full justify-between">
                        <span className="flex flex-row">
                          {" "}
                          <Image
                            src="/contact.png"
                            alt="contact"
                            width="20"
                            height={10}
                          />
                          <h2 className="ml-2 text-black text-md ">
                            Guy Hawkins
                          </h2>
                        </span>
                        <span className=" bg-[#03473729] rounded-md">
                          <h2 className="p-1 text-[10px]">Assign user</h2>
                        </span>
                      </span>
                    </label>
                    <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md  flex-row justify-between">
                      <span className="flex flex-row">
                        <Image
                          src="/contact.png"
                          alt="contact"
                          width="20"
                          height={10}
                        />
                        <span className="ml-2 text-black text-md ">
                          Jenny Wilson
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      ) : null}
    </div>
  );
};

export default Layout;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}-${month}-${year}`;
};
