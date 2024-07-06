"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import SidebarItem from "./SidebarItem";
import clsx from "clsx";
import axios from "axios";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";

interface SidebarItem {
  _id: string;
  title: string;
  createdDate: string;
  updatedDate?: string;
  selected:boolean;
  onRename: (_id: string, newTitle: string) => void;
  onSelect: () => void;

}

const groupByDate = (items: SidebarItem[]) => {
  const grouped: { [date: string]: SidebarItem[] } = {};

  items.forEach(item => {
    const date = item.updatedDate ? item.updatedDate?.split('T')[0] : item.createdDate?.split('T')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return grouped;
};
const SearchBar= () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    
   <div className="relative flex items-center  rounded-2xl">
      <div className="flex items-center w-full bg-gray-100   border border-gray-300 py-2 px-2 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-green-800">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="flex-grow p-2 bg-gray-100 text-xl  focus:outline-none"
        />
        <button
          onClick={toggleFilterMenu}
          className="p-2 focus:outline-none"
        >
  {isFilterMenuOpen ? (
            <FaFilter className="w-6 h-6 text-green-800" />
          ) : (
            <CiFilter className="w-8 h-6 text-green-800" />
          )}
           </button>
      </div>

   
      {isFilterMenuOpen && (
        <div className="absolute z-[20] mt-2  top-14 right-0 w-80 bg-white border border-gray-300 rounded-2xl shadow-lg">
          <div className="p-4">
            <div className="flex flex-row justify-between"><h3 className="text-lg font-medium">Filter</h3>
            <h3 className="text-lg font-normal flex flex-row gap-1"><Image src="/refresh.png" alt="refresh" width={20} height={5}/>Reset</h3></div>

            <div className="mt-2 space-y-2">
              {/* Add filter options here */}
              <label className="flex items-center flex-row justify-between">
               <span> <input type="checkbox" className="bg-green-800 form-checkbox" />
                <span className="ml-2">Carlos Jairo</span></span>
                <Image src="/contact.png" alt="contact" width="20" height={10}/>
              </label>
              <label className="flex items-center flex-row justify-between">
               <span> <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Carlos Jairo</span></span>
                <Image src="/contact.png" alt="contact" width="20" height={10}/>
              </label>
                <label className="flex items-center flex-row justify-between">
               <span> <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Carlos Jairo</span></span>
                <Image src="/contact.png" alt="contact" width="20" height={10}/>
              </label>
            </div>
            <button
              onClick={toggleFilterMenu}
              className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const Layout: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [showNewChatInput, setShowNewChatInput] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-3.5-turbo");
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

 

   const fetchMessages = async (_id: string) => {
    try {
      const response = await axios.get(`${API_URL}/ai/api/v1/conversation/${_id}`);
      console.log("Fetch Messages API Response:", response.data.data.chats[0].thread[0].user_prompt);
            console.log("Fetch Messages API Response:", response.data.data.chats[0].thread[0].response);
      const chatData = response.data.data.chats[0].thread;

       const messages = chatData.flatMap((thread: any) => [
        `User: ${thread.user_prompt}`,
        `Assistant: ${thread.response}`,
      ]);
      setMessages(messages);
      setSelectedConversation(_id); 

      const firstFewWords = chatData[0].user_prompt.split(' ').slice(0, 5).join(' ');
      setSidebarItems(prevItems =>
        prevItems.map(item =>
          item._id === _id ? { ...item, title: firstFewWords } : item
        )
      );
    setShowNewChatInput(true);

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
    useEffect(() => {
    console.log("useEffect executed");
    const fetchData = async () => {
      try {
        console.log("Fetching data from API...");
        const response = await axios.get(`${API_URL}/ai/api/v1/conversation/`);
        console.log("API Response:", response.data.data[0]);
        const items = response.data.data.map((item: any) => ({
          _id: item._id,
          title: item.title,
          selected: item.selected,
          createdDate: item.createdAt,
          updatedDate: item.updatedAt,
        }));
        setSidebarItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
    const handleRename = async (_id: string, newTitle: string) => {
    try {
    const response = await axios.put(`${API_URL}/ai/api/v1/conversation/${_id}`, { title: newTitle });
    console.log(response)
      setSidebarItems(prevItems =>
        prevItems.map(item =>
          item._id === _id ? { ...item, title: newTitle, updatedDate: new Date().toISOString() } : item
        )
      );
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };

  const handleSend = (message: string) => {
    setMessages(prevMessages => [...prevMessages, `${message}`]);
  };
  const groupedSidebarItems = groupByDate(sidebarItems);


 const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };
  return (
    <div className="flex-1 h-full flex gap-4 mt-10">
      <aside className="w-full max-w-[380px] relative border bg-white rounded-3xl flex flex-col">
        <div className="flex flex-row justify-between px-6 pt-6 pb-2">
 <div className="relative max-w-40 flex flex-row gap-6 font-normal ">
      <button
        onClick={() => handleButtonClick(0)}
        className={`transition-all text-lg duration-300 ${activeIndex === 0 ? 'text-green-800' : ''}`}
      >
        All
      </button>
      <button
        onClick={() => handleButtonClick(1)}
        className={`transition-all text-lg duration-300 ${activeIndex === 1 ? 'text-green-800' : ''}`}
      >
        My
      </button>
      <button
        onClick={() => handleButtonClick(2)}
        className={`transition-all duration-300 text-lg ${activeIndex === 2 ? 'text-green-800' : ''}`}
      >
        Unassigned
      </button>
      <div
        className="absolute -bottom-3 left-0 text-lg  right-0 h-1 bg-green-800 transition-all duration-300"
        style={{ transform: `translateX(${activeIndex * 100}%) `, width: '20%' }}
      />
    </div>

<div className="flex flex-row gap-4">
          <button
            className=" transition-all duration-300">
           <Image src="/engagemenu.png" alt="engage" width={30} height={20} />
          </button>
            <button
            className=" transition-all duration-300">
           <Image src="/engagearrow.png" alt="engage" width={30} height={20} />
          </button>
       </div>
        </div>
        <div className="border-y   py-4 px-6">
        <SearchBar/>
        </div>
 <div className="relative p-5 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
          {Object.entries(groupedSidebarItems).map(([date, items]) => (
            <div key={date}>
              {/* <h3 className="text-lg font-semibold">{date}</h3> */}
              {items.map((item) => (
            <SidebarItem
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  onSelect={() => fetchMessages(item._id)}
                  onRename={handleRename} setSidebarItems={function (value: React.SetStateAction<any[]>): void {
                    throw new Error("Function not implemented.");
                  } }                
                />
              ))}
            </div>
          ))}
        </div>
        <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 rounded-b-3xl" />
      </aside>
      <main className="flex-1 w-full flex flex-col bg-white p-4 rounded-3xl border">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, idx) => (
            <ChatMessage key={idx} message={message} isUser={idx % 2 === 0} />
          ))}
        </div>
        {showNewChatInput && <ChatInput  onSend={handleSend} selectedModel={selectedModel} />}
      </main>
    </div>
  );
};

export default Layout;
