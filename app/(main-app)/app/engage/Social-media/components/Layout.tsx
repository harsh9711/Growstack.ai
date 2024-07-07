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
import ChatMessage from "./ChatMessage";
import clsx from "clsx";
import axios from "axios";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import { CiFilter } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import ChatInput from "./ChatInput";

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
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };
  return (
    <div className="flex-1 h-full flex gap-4 mt-10">
      <aside className="w-full max-w-[380px] relative border bg-white rounded-3xl flex flex-col">
        <div className="flex flex-row justify-between px-6 pt-6 pb-2">
          <div className="relative max-w-40 flex flex-row gap-6 font-normal">
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
              className={`absolute -bottom-3 h-1 bg-green-800 transition-all duration-300 ${
                activeIndex === 2 ? '-left-28' : activeIndex === 1 ? '-left-1' : '-left-2'
              }`}              style={{
                transform: `translateX(${activeIndex * 100}%)`,
                width: activeIndex === 2 ? '65%' : '25%',
              }}
            />
          </div>

<div className="flex flex-row gap-1">
          <button
            className=" transition-all duration-300">
        <svg width="42" height="32" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="22" height="22" rx="5" fill="#034737"/>
<rect x="5.16797" y="5.66406" width="4" height="4" rx="0.666667" stroke="white" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="11.832" y="5.66406" width="4" height="4" rx="0.666667" stroke="white" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="5.16797" y="12.3359" width="4" height="4" rx="0.666667" stroke="white" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.832 13.7448C11.5099 13.7448 11.2487 14.006 11.2487 14.3281C11.2487 14.6503 11.5099 14.9115 11.832 14.9115V13.7448ZM15.832 14.9115C16.1542 14.9115 16.4154 14.6503 16.4154 14.3281C16.4154 14.006 16.1542 13.7448 15.832 13.7448V14.9115ZM14.4154 12.3281C14.4154 12.006 14.1542 11.7448 13.832 11.7448C13.5099 11.7448 13.2487 12.006 13.2487 12.3281H14.4154ZM13.2487 16.3281C13.2487 16.6503 13.5099 16.9115 13.832 16.9115C14.1542 16.9115 14.4154 16.6503 14.4154 16.3281H13.2487ZM11.832 14.9115H15.832V13.7448H11.832V14.9115ZM13.2487 12.3281V16.3281H14.4154V12.3281H13.2487Z" fill="white"/>
</svg>

          </button>
            <button
            className=" transition-all duration-300">
<svg width="42" height="32" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="22" height="22" rx="5" fill="#034737"/>
<path d="M11.866 14.5C11.4811 15.1667 10.5189 15.1667 10.134 14.5L7.5359 10C7.151 9.33333 7.63212 8.5 8.40192 8.5L13.5981 8.5C14.3679 8.5 14.849 9.33333 14.4641 10L11.866 14.5Z" fill="white"/>
</svg>
          </button>
       </div>
        </div>
        <div className="border-y   py-4 px-6">
        <SearchBar/>
        </div>
 <div className="relative p-5 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
        
            <SidebarItem _id={""} title={""} onRename={function (_id: string, newTitle: string): void {
            throw new Error("Function not implemented.");
          } } onDelete={function (_id: string): void {
            throw new Error("Function not implemented.");
          } } onSelect={function (): void {
            throw new Error("Function not implemented.");
          } } setSidebarItems={function (value: React.SetStateAction<any[]>): void {
            throw new Error("Function not implemented.");
          } }/>
                
        </div>
        <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 rounded-b-3xl" />
      </aside>
      <main className="flex-1 w-full flex flex-col bg-white p-4 rounded-3xl border">
        <div className="flex-1 p-4 overflow-y-auto">
        
        </div>
        {showNewChatInput && <ChatInput  onSend={handleSend} selectedModel={selectedModel} fetchConversations={function (): void {
          throw new Error("Function not implemented.");
        } } selectedConversation={null} selectedOption={""} />}
      </main>
    </div>
  );
};

export default Layout;

