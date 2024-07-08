"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import clsx from "clsx";
import Image from "next/image";
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import ChatInput from "./ChatInput";
import { CiSettings } from "react-icons/ci";
import SidebarAccount from "./SidebarAccount";
import { BsPlus } from "react-icons/bs";

interface SidebarItem {
  _id: string;
  title: string;
  createdDate: string;
  updatedDate?: string;
  selected: boolean;
  onRename: (_id: string, newTitle: string) => void;
  onSelect: () => void;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null); 


  const handleClickOutside = (event: MouseEvent) => {
    if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
      setIsFilterMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="relative flex items-center  rounded-2xl">
      <div className="flex items-center w-full bg-gray-100   border border-gray-300 py-1 px-2 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-green-800">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="flex-grow p-2 bg-gray-100 text-xl  focus:outline-none"
        />
        <button onClick={toggleFilterMenu} className="p-2 focus:outline-none">
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
        className="absolute z-20 mt-2 top-14 right-0 w-80 bg-white border border-gray-300 rounded-2xl shadow-lg"
      >
          <div className="p-4">
            <div className="flex flex-row justify-between">
              <h3 className="text-lg font-medium">Filter</h3>
              <h3 className="text-lg font-normal flex flex-row gap-1">
                <Image src="/refresh.png" alt="refresh" width={20} height={2} />
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

const Layout= () => {
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
  const sidebarData = [
    [
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Vale Ferreira",
        message: "How can I connect my accounts",
        imageUrl: "/contact2.png",
      },
      {
        title: "GrowStack AI",
        time: "30m",
        author: "Laila Fernanda",
        message: "How can I connect my accounts",
        imageUrl: "/contact3.png",
      },
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Jenny Wilson",
        message: "How can I connect my accounts",
        imageUrl: "/contact2.png",
      },
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Esther Howard",
        message: "How can I connect my accounts",
        imageUrl: "/contact2.png",
      },
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Jane Cooper",
        message: "How can I connect my accounts",
        imageUrl: "/contact3.png",
      },
    ],
    [
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Jenny Wilson",
        message: "How can I connect my accounts",
        imageUrl: "/contact2.png",
      },
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Esther Howard",
        message: "How can I connect my accounts",
        imageUrl: "/contact2.png",
      },
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Jane Cooper",
        message: "How can I connect my accounts",
        imageUrl: "/contact3.png",
      },
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Esther Howard",
        message: "How can I connect my accounts",
        imageUrl: "/contact2.png",
      },
    ],
    [
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Esther Howard",
        message: "How can I connect my accounts",
        imageUrl: "/contact2.png",
      },
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Jane Cooper",
        message: "How can I connect my accounts",
        imageUrl: "/contact3.png",
      },
      {
        title: "GrowStack AI",
        time: "12m",
        author: "Jenny Wilson",
        message: "How can I connect my accounts",
        imageUrl: "/contact2.png",
      },
    ],
  ];
  const [messages, setMessages] = useState<string[]>([]);
  const [showNewChatInput, setShowNewChatInput] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-3.5-turbo");
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [MenuRotated, setMenuRotated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [MenuOpen, setMenuOpen] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const [showNewSidebar, setShowNewSidebar] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsArrowRotated(!isArrowRotated);
  };
  const toggleMenu = () => {
    setShowRightSidebar(!showRightSidebar);
    setMenuOpen(!MenuOpen);
    setMenuRotated(!MenuRotated);
    setShowNewSidebar((prev) => !prev);
  };
  const handleApplyFilters = () => {
    console.log("Filters applied");
    setIsFilterOpen(false);
  };

  const handleCancelFilters = () => {
    console.log("Filters canceled");
    setIsFilterOpen(false);
  };

  const handleSend = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, `${message}`]);
  };

  const selectedOptionLabel = options.find(
    (option) => option.value === selectedOption
  )?.label;
  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  // const handleMouseEnter = (index: number) => {
  //   setHoverIndex(index);
  // };

  // const handleMouseLeave = () => {
  //   setHoverIndex(null);
  // };

  return (
    <div className="flex-1 max-h-[700px] flex  mt-10">
      {showRightSidebar && (
        <aside className="w-full max-w-[380px] relative border bg-white rounded-l-3xl flex flex-col">
          <div className="flex flex-row gap-6  py-4 px-6">
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger className="w-[300px] h-12  text-black bg-gray-100 border-0 rounded-xl flex items-center justify-between px-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2.66675"
                    y="2.66406"
                    width="4"
                    height="4"
                    rx="0.666667"
                    stroke="#034737"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="9.33325"
                    y="2.66406"
                    width="4"
                    height="4"
                    rx="0.666667"
                    stroke="#034737"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="2.66675"
                    y="9.33594"
                    width="4"
                    height="4"
                    rx="0.666667"
                    stroke="#034737"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.33325 10.7448C9.01109 10.7448 8.74992 11.006 8.74992 11.3281C8.74992 11.6503 9.01109 11.9115 9.33325 11.9115V10.7448ZM13.3333 11.9115C13.6554 11.9115 13.9166 11.6503 13.9166 11.3281C13.9166 11.006 13.6554 10.7448 13.3333 10.7448V11.9115ZM11.9166 9.32812C11.9166 9.00596 11.6554 8.74479 11.3333 8.74479C11.0111 8.74479 10.7499 9.00596 10.7499 9.32812H11.9166ZM10.7499 13.3281C10.7499 13.6503 11.0111 13.9115 11.3333 13.9115C11.6554 13.9115 11.9166 13.6503 11.9166 13.3281H10.7499ZM9.33325 11.9115H13.3333V10.7448H9.33325V11.9115ZM10.7499 9.32812V13.3281H11.9166V9.32812H10.7499Z"
                    fill="#034737"
                  />
                </svg>
                <SelectValue placeholder="Select an option">
                  {selectedOptionLabel && (
                    <div className="flex items-center gap-2">
                      <span className="min-w-fit">
                        {
                          options.find(
                            (option) => option.value === selectedOption
                          )?.icon
                        }
                      </span>
                      {selectedOptionLabel}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map(({ icon, label, value }) => (
                    <SelectItem key={value} value={value}>
                      <div
                        className={clsx(
                          "flex items-center gap-2",
                          selectedOption === value && "text-black font-medium"
                        )}
                      >
                        <span className="min-w-fit">{icon}</span>
                        {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>{" "}
            <button
              className="transition-all duration-300"
              onClick={toggleMenu}
            >
              <svg
                width="42"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="22" height="22" rx="5" fill="#034737" />
                <path
                  d="M6.64645 10.6464C6.45118 10.8417 6.45118 11.1583 6.64645 11.3536L9.82843 14.5355C10.0237 14.7308 10.3403 14.7308 10.5355 14.5355C10.7308 14.3403 10.7308 14.0237 10.5355 13.8284L7.70711 11L10.5355 8.17157C10.7308 7.97631 10.7308 7.65973 10.5355 7.46447C10.3403 7.2692 10.0237 7.2692 9.82843 7.46447L6.64645 10.6464ZM15 10.5L7 10.5L7 11.5L15 11.5L15 10.5Z"
                  fill="white"
                />
              </svg>
            </button>{" "}
          </div>
          <div className="relative p-5 flex-1  ">
            <SidebarAccount
              title={"GrowStack AI"}
              author={"Twitter profile"}
              imageUrl={"/facebook.png"}
            />
            <SidebarAccount
              title={"GrowStack AI"}
              author={"Twitter profile"}
              imageUrl={"/twitter.png"}
            />
            <SidebarAccount
              title={"GrowStack AI"}
              author={"Twitter profile"}
              imageUrl={"/insta.png"}
            />
            <SidebarAccount
              title={"GrowStack AI"}
              author={"Twitter profile"}
              imageUrl={"/facebook.png"}
            />
          </div>
          <div className="items-center justify-center  translate-x-24 -translate-y-14 ">
            <button className="text-white bg-primary-green hover:bg-primary-green/90 w-44 justify-center flex gap-2 items-center h-12 font-medium rounded-xl transition-all duration-300 text-sm">
              <BsPlus className="text-2xl" />
              Add Account
            </button>
          </div>
          {/* <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 " /> */}
        </aside>
      )}
      <aside
        className={clsx(
          "w-full max-w-[380px] relative border bg-white  flex flex-col",
          showRightSidebar ? "" : "rounded-l-3xl"
        )}
      >
        <div className="flex flex-row justify-between px-6 pt-6 pb-2">
          <div className="relative max-w-40 flex flex-row gap-8 font-normal">
            <button
              onClick={() => handleButtonClick(0)}
              className={`transition-all text-[16px] duration-300 ${
                activeIndex === 0 ? "text-green-800" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleButtonClick(1)}
              className={`transition-all text-[16px] duration-300 ${
                activeIndex === 1 ? "text-green-800" : ""
              }`}
            >
              My
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className={`transition-all duration-300 text-[16px] ${
                activeIndex === 2 ? "text-green-800" : ""
              }`}
            >
              Unassigned
            </button>
            <div
              className={`absolute -bottom-3 h-1 bg-green-800 transition-all duration-300 ${
                activeIndex === 2
                  ? "-left-[110px]"
                  : activeIndex === 1
                  ? "-left-0"
                  : "-left-2"
              }`}
              style={{
                transform: `translateX(${activeIndex * 100}%)`,
                width: activeIndex === 2 ? "65%" : "25%",
              }}
            />
          </div>

          <div className="relative">
            <div className="flex flex-row gap-4">
              <button
                className="transition-all duration-300"
                onClick={toggleMenu}
              >
                <svg
                  className={clsx(
                    "w-6 h-6 transition-transform",
                    MenuRotated ? "rotate-180" : ""
                  )}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="22" height="22" rx="5" fill="#034737" />
                  <rect
                    x="5.16797"
                    y="5.66406"
                    width="4"
                    height="4"
                    rx="0.666667"
                    stroke="white"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="11.832"
                    y="5.66406"
                    width="4"
                    height="4"
                    rx="0.666667"
                    stroke="white"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <rect
                    x="5.16797"
                    y="12.3359"
                    width="4"
                    height="4"
                    rx="0.666667"
                    stroke="white"
                    stroke-width="1.16667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.832 13.7448C11.5099 13.7448 11.2487 14.006 11.2487 14.3281C11.2487 14.6503 11.5099 14.9115 11.832 14.9115V13.7448ZM15.832 14.9115C16.1542 14.9115 16.4154 14.6503 16.4154 14.3281C16.4154 14.006 16.1542 13.7448 15.832 13.7448V14.9115ZM14.4154 12.3281C14.4154 12.006 14.1542 11.7448 13.832 11.7448C13.5099 11.7448 13.2487 12.006 13.2487 12.3281H14.4154ZM13.2487 16.3281C13.2487 16.6503 13.5099 16.9115 13.832 16.9115C14.1542 16.9115 14.4154 16.6503 14.4154 16.3281H13.2487ZM11.832 14.9115H15.832V13.7448H11.832V14.9115ZM13.2487 12.3281V16.3281H14.4154V12.3281H13.2487Z"
                    fill="white"
                  />
                </svg>
              </button>
              <button
                className="transition-all duration-300"
                onClick={toggleFilter}
              >
                <svg
                  className={clsx(
                    "w-6 h-6 transition-transform",
                    isArrowRotated ? "rotate-180" : ""
                  )}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="22" height="22" rx="5" fill="#034737" />
                  <path
                    d="M11.866 14.5C11.4811 15.1667 10.5189 15.1667 10.134 14.5L7.5359 10C7.151 9.33333 7.63212 8.5 8.40192 8.5L13.5981 8.5C14.3679 8.5 14.849 9.33333 14.4641 10L11.866 14.5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            {isFilterOpen && (
              <div className="absolute z-20 mt-2 top-full right-0 w-80 bg-white border border-gray-300 rounded-2xl shadow-lg">
                <div className="p-4">
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center flex-row justify-between">
                      <span>
                        {" "}
                        <input
                          type="checkbox"
                          className="bg-green-800 form-checkbox"
                        />
                        <span className="ml-2 font-medium">All types</span>
                      </span>
                      <div className="bg-[#0347371A]/10 p-2 rounded-xl">
                        <h2 className="text-green-950 leading-3">204</h2>
                      </div>
                    </label>
                    <label className="flex items-center flex-row justify-between">
                      <span>
                        {" "}
                        <input
                          type="checkbox"
                          className="bg-green-800 form-checkbox"
                        />
                        <span className="ml-2 font-medium">
                          Facebook comments
                        </span>
                      </span>
                      <div className="bg-[#0347371A]/10 p-2 rounded-xl">
                        <h2 className="text-green-950 leading-3">63</h2>
                      </div>
                    </label>
                    <label className="flex items-center flex-row justify-between">
                      <span>
                        {" "}
                        <input
                          type="checkbox"
                          className="bg-green-800 form-checkbox"
                        />
                        <span className="ml-2 font-medium">
                          Facebook messages
                        </span>
                      </span>
                      <div className="bg-[#0347371A]/10 p-2 rounded-xl">
                        <h2 className="text-green-950 leading-3">39</h2>
                      </div>
                    </label>{" "}
                    <label className="flex items-center flex-row justify-between">
                      <span>
                        {" "}
                        <input
                          type="checkbox"
                          className="bg-green-800 form-checkbox"
                        />
                        <span className="ml-2 font-medium">
                          Facebook mentions
                        </span>
                      </span>
                      <div className="bg-[#0347371A]/10 p-2 rounded-xl">
                        <h2 className="text-green-950 leading-3">3</h2>
                      </div>
                    </label>{" "}
                    <label className="flex items-center flex-row justify-between">
                      <span>
                        {" "}
                        <input
                          type="checkbox"
                          className="bg-green-800 form-checkbox"
                        />
                        <span className="ml-2 font-medium">
                          Instagram comments
                        </span>
                      </span>
                      <div className="bg-[#0347371A]/10 p-2 rounded-xl">
                        <h2 className="text-green-950 leading-3">6</h2>
                      </div>
                    </label>
                    <label className="flex items-center flex-row justify-between">
                      <span>
                        {" "}
                        <input
                          type="checkbox"
                          className="bg-green-800 form-checkbox"
                        />
                        <span className="ml-2 font-medium">
                          Instagram messages
                        </span>
                      </span>
                      <div className="bg-[#0347371A]/10 p-2 rounded-xl">
                        <h2 className="text-green-950 leading-3">53</h2>
                      </div>
                    </label>
                    <label className="flex items-center flex-row justify-between">
                      <span>
                        {" "}
                        <input
                          type="checkbox"
                          className="bg-green-800 form-checkbox"
                        />
                        <span className="ml-2 font-medium">
                          Instagram mentions
                        </span>
                      </span>
                      <div className="bg-[#0347371A]/10 p-2 rounded-xl">
                        <h2 className="text-green-950 leading-3">53</h2>
                      </div>
                    </label>
                    <label className="flex items-center flex-row justify-between">
                      <span>
                        {" "}
                        <input
                          type="checkbox"
                          className="bg-green-800 form-checkbox"
                        />
                        <span className="ml-2 font-medium">
                          LinkedIn comments
                        </span>
                      </span>
                      <div className="bg-[#0347371A]/10 p-2 rounded-xl">
                        <h2 className="text-green-950 leading-3">22</h2>
                      </div>
                    </label>
                  </div>
                  <div className="flex justify-end mt-4 space-x-4">
                    <button
                      onClick={handleCancelFilters}
                      className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleApplyFilters}
                      className=" w-full py-2 bg-green-900 text-white rounded-md hover:bg-green-800 focus:outline-none "
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="border-y   py-4 px-6">
          <SearchBar />
        </div>
        <div className="relative p-5 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
          {sidebarData[activeIndex].map((item, idx) => (
            <SidebarItem
              key={idx}
              title={item.title}
              time={item.time}
              author={item.author}
              message={item.message}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
        <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 " />
      </aside>

      <main className="flex-1 w-full flex flex-col bg-white p-4 border">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, idx) => (
            <ChatMessage key={idx} message={message} isUser={idx % 2 === 0} />
          ))}
        </div>
        {showNewChatInput && (
          <ChatInput
            onSend={handleSend}
            selectedModel={selectedModel}
            fetchConversations={function (): void {
              throw new Error("Function not implemented.");
            }}
            selectedConversation={null}
            selectedOption={""}
          />
        )}
      </main>
    </div>
  );
};

export default Layout;
