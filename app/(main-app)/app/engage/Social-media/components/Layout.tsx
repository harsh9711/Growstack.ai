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
import { BsPlus, BsThreeDotsVertical } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

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

  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [MenuRotated, setMenuRotated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [MenuOpen, setMenuOpen] = useState(false);
  const [isArrowRotated, setIsArrowRotated] = useState(false);
  const [showNewSidebar, setShowNewSidebar] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(sidebarData[0]);

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
    if (searchQuery.trim() === "") {
      setFilteredData(sidebarData[0]);
    } else {
      setFilteredData(
        sidebarData[0].filter((project: any) =>
          project?.author?.toLowerCase().includes(searchQuery)
        )
      );
    }
  }, [searchQuery]);

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
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    setIsArrowRotated(!isArrowRotated);
  };
  const handleMessage = (itemId: {
    title: string;
    time: string;
    author: string;
    message: string;
    imageUrl: string;
  }) => {
    console.log("good");
    setIsOpened(!isOpened);
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

  const selectedOptionLabel = options.find(
    (option) => option.value === selectedOption
  )?.label;
  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex-1 max-h-[780px] flex  mt-10 shadow-lg rounded-3xl text-ellipsis">
      <aside
        className={clsx(
          "w-full max-w-[350px] relative border bg-white   flex flex-col",
          showRightSidebar ? "" : "rounded-l-3xl"
        )}
      >
        <div className="flex flex-row justify-between px-6 pt-6 pb-2">
          <div className="relative max-w-40 flex flex-row gap-8 font-normal text-ellipsis">
            {/* <button
              onClick={() => handleButtonClick(0)}
              className={`transition-all text-[14px] duration-300 ${activeIndex === 0 ? "text-green-800 font-semibold" : ""
                }`}
            >
              All
            </button> */}
            <button
              onClick={() => handleButtonClick(1)}
              className={`transition-all text-[16px] duration-300 ${
                activeIndex === 1 ? "text-green-800 font-semibold" : ""
              }`}
            >
              Comments
            </button>
            <button
              onClick={() => handleButtonClick(2)}
              className={`transition-all duration-300 text-[16px] ${
                activeIndex === 2 ? "text-green-800 font-semibold" : ""
              }`}
            >
              Messages
            </button>

            <div
              className={`absolute -bottom-3 h-1 bg-green-800 transition-all duration-300  ${
                activeIndex === 1 ? "-left-0" : "left-[72%]"
              }`}
              style={{
                // transform: `translateX(${activeIndex * 100}%)`,
                width: "60%",
              }}
            />
          </div>

          <div className="relative">
            <div className="flex flex-row gap-4">
              <button
                className="shadow-lg transition-all duration-300"
                onClick={toggleMenu}
              ></button>
              <button
                className="shadow-lg transition-all duration-300"
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
              <div className="absolute z-20 mt-2 top-full right-0 w-80 bg-white border-[0.5px] border-gray-200 rounded-2xl shadow-lg">
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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="relative p-5 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
          {filteredData?.map((item, idx) => (
            <SidebarItem
              key={idx}
              title={item.title}
              time={item.time}
              author={item.author}
              message={item.message}
              imageUrl={item.imageUrl}
              onClick={() => handleMessage(item)} // Using 'item.title' as an example
            />
          ))}
        </div>
        {/* <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 rounde" /> */}
      </aside>
      {isOpened && (
        <main
          className="flex-1 w-full flex flex-col bg-gray-100 p-4 border"
          style={{ ...hideScrollbarStyles, ...hideScrollbarWebkit }}
        >
          <div className="flex flex-row gap-4 items-center">
            {" "}
            <Image src="/facebook.png" alt="facebook" width={50} height={50} />
            <h2 className="font-semibold text-[18px]">Post comments</h2>
          </div>
          <div className="border-[0.1px] border-gray-200 my-4 w-[1400px] -translate-x-4"></div>
          <div
            className="flex-1 p-4"
            style={{ ...hideScrollbarStyles, ...hideScrollbarWebkit }}
          >
            <div className="flex flex-row justify-between">
              {" "}
              <ChatMessage
                message={
                  <>
                    Lorem ipsum dolor sit amet consectetur. Non mattis tempor in
                    sed ante venenatis ornare. Ultrices at bibendum at vitae ac
                    diam habitasse. Ac cras Https://www.link.com. Imperdiet non
                    potenti fermentum vitae sit id cras porta urna. Dignissim
                    sit enim vitae elit semper pellentesque massa nulla. Nullam
                    congue magna.
                    <Image
                      src="/pic.png"
                      alt="pic"
                      width={60}
                      height={80}
                      className="rounded-xl border mt-2"
                    />
                  </>
                }
                imageUrl={"/contact2.png"}
                title={"Growstack-AI"}
                time={"Facebook Post"}
              />
              <div className="flex flex-row items-center relative -translate-y-24">
                <h2 className="text-[12px] font-light mr-2  ">
                  2023-03-06 , 11:00 PM
                </h2>
                {show && (
                  <button className="items-center flex flex-row px-4 p-2 bg-white text-white gap-2 translate-y-8 rounded-xl group">
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.66732 5.82812H5.50065C4.58018 5.82812 3.83398 6.57432 3.83398 7.49479V14.9948C3.83398 15.9153 4.58018 16.6615 5.50065 16.6615H13.0007C13.9211 16.6615 14.6673 15.9153 14.6673 14.9948V10.8281"
                        stroke="#14171B"
                        strokeWidth="1.45833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.83398 11.6615L17.1673 3.32812"
                        stroke="#14171B"
                        strokeWidth="1.45833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 3.32812H17.1667V7.49479"
                        stroke="#14171B"
                        strokeWidth="1.45833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2 className="text-black  transform transition-transform  duration-200 ease-in-out group-hover:scale-110 ">
                      Open on network
                    </h2>
                  </button>
                )}
                <BsThreeDotsVertical
                  className="text-xl "
                  onClick={handleDotsClick2}
                />
              </div>
            </div>{" "}
            <div className="flex flex-row justify-between">
              {" "}
              <ChatMessage
                message="omg, this is amazing"
                imageUrl={"/contact2.png"}
                title={"Vale Ferreira"}
                time={""}
              />
              <div className="flex flex-row items-center relative">
                <h2 className="text-[12px] font-light mr-2">
                  2023-03-06 , 11:00 PM
                </h2>
                {show2 && (
                  <button className="items-center flex flex-row px-4 p-2 bg-white text-white gap-2 translate-y-8 rounded-xl group">
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.66732 5.82812H5.50065C4.58018 5.82812 3.83398 6.57432 3.83398 7.49479V14.9948C3.83398 15.9153 4.58018 16.6615 5.50065 16.6615H13.0007C13.9211 16.6615 14.6673 15.9153 14.6673 14.9948V10.8281"
                        stroke="#14171B"
                        strokeWidth="1.45833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.83398 11.6615L17.1673 3.32812"
                        stroke="#14171B"
                        strokeWidth="1.45833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 3.32812H17.1667V7.49479"
                        stroke="#14171B"
                        strokeWidth="1.45833"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2 className="text-black  transform transition-transform  duration-200 ease-in-out group-hover:scale-110 ">
                      Open on network
                    </h2>
                  </button>
                )}
                <BsThreeDotsVertical
                  className="text-xl "
                  onClick={handleDotsClick3}
                />
              </div>{" "}
            </div>{" "}
            <div className="flex flex-col items-start translate-x-14">
              <p className="py-2 px-4 bg-white max-w-[600px] rounded-lg text-sm">
                perfect! ✅{" "}
              </p>
            </div>
            <div className="flex flex-col items-start mt-4 translate-x-14">
              <p className="py-2 px-4 bg-white max-w-[600px] rounded-lg text-sm">
                Wow, this is really epic{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-col items-start -translate-y-0 translate-x-16  border-l-4 border-green-900 w-[500px] rounded-xl shadow-green-900">
              <p className="py-2 px-4 bg-white max-w-[600px] rounded-lg text-sm">
                <span className="flex flex-row gap-2 item-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 17V11C10 10.4477 10.4477 10 11 10H17V3C17 1.89543 16.1046 1 15 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17H10"
                      stroke="#034737"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Hey, Rosa! Can you make sure to include a link to our
                  tutorial? Thanks!
                </span>
                <label className="flex p-2 items-center rounded-md flex-row justify-between">
                  <span className="flex flex-row">
                    <Image
                      src="/contact.png"
                      alt="contact"
                      width="20"
                      height={10}
                    />
                    <span className="ml-2 text-black text-md">
                      Leslie Alexander
                    </span>
                  </span>
                </label>
              </p>
            </div>
            {showDelete && (
              <button
                className=" h-[50px] items-center flex flex-row px-4 bg-white text-white gap-2 rounded-xl  translate-y-2 translate-x-48 group "
                onClick={() => alert("Delete action triggered")}
              >
                <MdDelete className="text-red-500 text-2xl transform transition-transform duration-200 ease-in-out group-hover:scale-110" />
                <h2 className="text-black transform transition-transform duration-200 ease-in-out group-hover:scale-110">
                  {" "}
                  Delete
                </h2>
              </button>
            )}
            <BsThreeDotsVertical
              className="-translate-x-[20px] -translate-y-4 text-xl cursor-pointer"
              onClick={handleDotsClick}
            />
          </div>
          <div className="mt-8"></div>
          <ChatInput />
        </main>
      )}
      {!isOpened && (
        <main className="w-full  bg-white">
          <div className="flex items-center bg-white  h-full text-[16px] justify-center font-bold text-gray-700">
            Select a conversation to see details{" "}
          </div>
        </main>
      )}
      {isOpened && activeIndex === 1 ? (
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
                  Post comments
                </h2>
              </div>
              <div className="flex flex-row justify-between ">
                <span>
                  <h2 className="text-[13px]">Started</h2>
                  <h2 className="text-[13px] font-medium">Mar 24, 2024</h2>
                </span>
                <span>
                  <h2 className="text-[13px]">Last update</h2>
                  <h2 className="text-[13px] font-medium">Mar 31, 2024</h2>
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
                <h2 className="text-[18px] font-medium">Post</h2>
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
                    <h2 className="text-[14px] font-semibold">GrowStack AI</h2>{" "}
                    <h2 className="font-extralight text-[10px]">
                      2023-03-06 , 11:00 PM
                    </h2>
                  </span>
                  <p className="text-[12px] font-light">Facebook post</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-between bg-[#F8F8F8] p-4 rounded-xl mb-4">
                <h2 className="font-light text-[10px] text-black text-ellipsis">
                  Lorem ipsum dolor sit amet consectetur. Non mattis tempor in
                  sed ante venenatis ornare. Ultrices at bibendum at vitae ac
                  diam habitasse. Ac cras Https://www.link.com. Imperdiet non
                  potenti fermentum vitae sit id cras porta urna. Dignissim sit
                  enim vitae elit semper pellentesque massa nulla. Nullam congue
                  magna.
                </h2>
                <Image
                  src="/pic.png"
                  alt="pic"
                  width={60}
                  height={80}
                  className="rounded-xl"
                />
              </div>

              <button className="text-white text-ellipsis hover:font-medium bg-primary-green shadow-lg hover:bg-primary-green/90 w-32 justify-center flex gap-2 items-center h-10 font-light rounded-xl transition-all duration-300 text-sm">
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
          {/* <div className="flex flex-row items-center gap-4  px-6">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="6.00065"
              cy="4.66667"
              r="2.66667"
              stroke="#034737"
              stroke-width="1.16667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 14V12.6667C2 11.1939 3.19391 10 4.66667 10H7.33333C8.80609 10 10 11.1939 10 12.6667V14"
              stroke="#034737"
              stroke-width="1.16667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.666 2.08594C11.846 2.38805 12.6712 3.45126 12.6712 4.66927C12.6712 5.88728 11.846 6.95049 10.666 7.2526"
              stroke="#034737"
              stroke-width="1.16667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 14.0016V12.6682C13.993 11.4579 13.1719 10.4041 12 10.1016"
              stroke="#034737"
              stroke-width="1.16667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h2 className="text-[16px] font-medium"> Assignees</h2>
        </div> */}
          <div className="relative">
            {/* <div className="px-6 py-2 cursor-pointer" onClick={toggleFilterMenu}>
            <Image src="/circlec.png" alt="cicle" width={50} height={50} />
          </div> */}

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
                    <button className=" right-0 ">
                      <svg
                        width="24"
                        height="34"
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0205 12.0527L21.92 21.9522"
                          stroke="#4B465C"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.0205 12.0527L21.92 21.9522"
                          stroke="white"
                          stroke-opacity="0.2"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.0205 21.9473L21.92 12.0478"
                          stroke="#4B465C"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.0205 21.9473L21.92 12.0478"
                          stroke="white"
                          stroke-opacity="0.2"
                          stroke-width="1.75"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {/* Example checkboxes */}
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
