
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsChevronDown, BsPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
// import FilterSheet from "./FilterSheet";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { FilterIcon,  Search } from "lucide-react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface FilterItem {
  id: number;
  title: string;
  description: string;
}
const items: FilterItem[] = [
  {
    id: 1,
    title: "Content rewriter",
    description: "Rewrite content to be more engaging and descriptive."
  },
  {
    id: 2,
    title: "Customer testimonials",
    description: "Write personalized customer testimonials for your product."
  },
  {
    id: 3,
    title: "Explain a concept to my three year old",
    description: "How to explain a concept easily to your three year old."
  },
  {
    id: 4,
    title: "Review request email",
    description: "Write request email requesting service/product/feedback."
  },
  {
    id: 5,
    title: "Review responder",
    description: "Save your time in responding to your customer reviews."
  },
  {
    id: 6,
    title: "Content rewriter",
    description: "Rewrite content to be more engaging and descriptive."
  },
  {
    id: 7,
    title: "Content rewriter",
    description: "Rewrite content to be more engaging and descriptive."
  },
  {
    id: 8,
    title: "Content rewriter",
    description: "Rewrite content to be more engaging and descriptive."
  },{
    id: 9,
    title: "Content rewriter",
    description: "Rewrite content to be more engaging and descriptive."
  },
  // Add other items as needed
];

const ChatInput= () => {
  const [input, setInput] = useState("");
  const [showFilterSheet, setShowFilterSheet] = useState(false);  
   const [isOpen2, setIsOpen2] = useState(false);
   const toggleSheet = () => {
    setIsOpen2(!isOpen2);
    setShowFilterSheet(true)
  };  
   const FilterSheet = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState<FilterItem[]>(items);
  
   
    const handleCloseSheet = useCallback((event: MouseEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('.sheet-content')) {
        setIsOpen2(false);
      }
    }, []);
  
    useEffect(() => {
      if (isOpen2) {
        document.addEventListener('click', handleCloseSheet);
      } else {
        document.removeEventListener('click', handleCloseSheet);
      }
  
      return () => {
        document.removeEventListener('click', handleCloseSheet);
      };
    }, [isOpen2, handleCloseSheet]);
  
    useEffect(() => {
      setFilteredItems(
        items.filter(item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [searchTerm]);
  
  
    return (
      <>
        <button
          className="border opacity-0 border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black"
          onClick={toggleSheet}
        >
          <FilterIcon size={20} />
        </button>
        {isOpen2 && (
          <Sheet open={isOpen2} >
            <SheetContent className="rounded-l-[40px] sheet-content">
              <SheetHeader className="flex flex-row justify-between w-full items-center">
                <SheetTitle className="-translate-y-4 text-[20px]">AI templates</SheetTitle>  <button
              className="absolute top-4 z-[20] translate-x-[430px] text-red-500"
              onClick={() => setIsOpen2(false)}
            >
              &#x2715; {/* Close icon (X) */}
            </button>
              </SheetHeader>
              <div className="border-[0.5px] border-gray-100 mt-6 mb-6 w-[1600px] -translate-x-10"></div>

              <div className="bg-[#F2F2F2] border border-[#EBEBEB] px-4 py-1 rounded-xl flex items-center justify-between w-full max-w-md mt-5">
      <div className="flex items-center gap-x-2">
        <Search className="text-gray-500" size={25} />
        <input
          type="search"
          className="bg-[#F2F2F2] outline-none h-[40px] w-full"
          placeholder="Search AI assistant"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-x-2">
        <svg width="1" height="25" viewBox="0 0 1 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.5" y1="0" x2="0.5" y2="25" stroke="#C6C6C6" />
        </svg>
        <h2 className="text-[12px]">Customer support</h2>
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 7.60938L10 12.6094L15 7.60937" stroke="#14171B" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  <div className="border-[0.5px] border-gray-100 mt-6 mb-6"></div>
              <div className=" space-y-4">
                {filteredItems.map(item => (
                    <div key={item.id} className="cursor-pointer bg-[#F2F2F2] py-4 px-6 flex justify-between items-center rounded-2xl">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="42" height="42" rx="10" fill="white"/>
                    </svg>
                    <span className="flex flex-col w-full ml-4">
                      <h1 className="font-semibold text-ellipsis text-[14px] w-full ">{item.title}</h1>
                      <p className="text-[12px] w-full ">{item.description}</p>
                    </span>
                  </div>
                ))}
              </div>
             
            </SheetContent>
          </Sheet>
        )}
      </>
    );
  };
  const handleOpenFilterSheet = () => {
    setShowFilterSheet(true);
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isFilterAssistantOpen, setIsFilterAssistantOpen] = useState(false);

  const [isAddingNewSnippet, setIsAddingNewSnippet] = useState(false);
  const [isAddingNewSnippet2, setIsAddingNewSnippet2] = useState(false);

  const filterMenuRef = useRef<HTMLDivElement>(null);  
  const filterMenuRef2= useRef<HTMLDivElement>(null);

  const [selectedType, setSelectedType] = useState('message'); 
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleAddNewClick = () => {
    setIsAddingNewSnippet(true);
  };

  const handleCrossClick = () => {
    setIsFilterMenuOpen(false);
  };
  const handleCrossClick2 = () => {
    setIsAddingNewSnippet2(false);
  };
  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };
  const toggleFilterAssistant = () => {
    setIsFilterAssistantOpen(!isFilterAssistantOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCancelClick = () => {
    setIsAddingNewSnippet(false);
  };


  return (
    <div className="shadow-lg rounded-full">
      <div className="flex bg-white  p-2 border gap-2 rounded-t-xl items-end">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={1}
        className="w-full flex-1 p-2 bg-transparent resize-none overflow-hidden min-h-11 max-h-[300px]"
        placeholder="Write a note..."
      />
   
      
      
    </div>
       <div className='border bg-white flex flex-row p-4 rounded-b-xl justify-between'>
   <div className="flex flex-row gap-4 items-center"> 
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 13.9965C10.6583 14.6684 11.5594 15.047 12.5 15.047C13.4406 15.047 14.3417 14.6684 15 13.9965L19 9.99647C20.3807 8.61576 20.3807 6.37718 19 4.99647C17.6193 3.61576 15.3807 3.61576 14 4.99647L13.5 5.49647" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.0004 10.0036C13.3421 9.33175 12.441 8.95312 11.5004 8.95312C10.5597 8.95312 9.65869 9.33175 9.00038 10.0036L5.00038 14.0036C3.61967 15.3843 3.61967 17.6229 5.00038 19.0036C6.38109 20.3843 8.61967 20.3843 10.0004 19.0036L10.5004 18.5036" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<div className="relative">
      <div className="px-6 py-2 cursor-pointer" onClick={toggleFilterMenu}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 6H18C19.1046 6 20 6.89543 20 8V18C20 19.1046 19.1046 20 18 20H6" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="6" cy="18" r="2" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 18V6C8 4.89543 7.10457 4 6 4C4.89543 4 4 4.89543 4 6V18" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>      </div>

{isFilterMenuOpen && (
        <div
          ref={filterMenuRef}
          className="absolute z-20 mt-2 -top-72 -right-60 w-[300px] bg-white border border-gray-300 rounded-2xl shadow-lg"
        >
          <div className="p-4">
            {!isAddingNewSnippet ? (
              <>
                <div className="flex items-center w-full bg-gray-100 border border-gray-300 px-2 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-green-800">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow bg-gray-100 text-sm focus:outline-none"
                  />
                  <button className="p-2 flex" onClick={handleCrossClick}>
                    <RxCross1 className="" />
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md flex-row justify-between">
                    <span className="flex flex-row">
                      <span className="ml-2 text-black text-md">Newsletter</span>
                    </span>
                  </label>
                  <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md flex-row justify-between">
                    <span className="flex flex-row">
                      <span className="ml-2 text-black text-md">Intro message</span>
                    </span>
                  </label>
                  <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md flex-row justify-between">
                    <span className="flex flex-row">
                      <span className="ml-2 text-black text-md">Outro</span>
                    </span>
                  </label>
                  <div className="items-center justify-center pt-2">
                    <button
                      className="text-white bg-primary-green hover:bg-primary-green/90 w-full justify-center flex gap-2 items-center h-10 font-medium rounded-xl transition-all duration-300 text-sm"
                      onClick={handleAddNewClick}
                    >
                      <BsPlus className="text-2xl" />
                      Add new snippet
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
               <label className="block text-black text-md w-full font-medium mb-2">Title <span className="text-red-500"> *</span></label>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full bg-gray-100 border border-gray-300 p-2 rounded-lg mb-2 focus:outline-none"
                />
              
                <label className="block text-black text-md font-medium mb-2">Topic <span className="text-red-500"> *</span></label>
                <textarea
                  placeholder="Enter your snippet here..."
                  className="w-full bg-gray-100 border h-[91px] border-gray-300 p-2 rounded-lg mb-2 focus:outline-none text-start"
                />
                <div className="flex w-full justify-end gap-2 ">
                  <button
                    className="text-black w-full  bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white w-full  bg-primary-green hover:bg-primary-green/90 px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                    onClick={handleCrossClick}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="9" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.00086 10H9.01086" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.0009 10H15.0109" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 15C10.1583 15.6719 11.0594 16.0505 12 16.0505C12.9406 16.0505 13.8417 15.6719 14.5 15" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<svg width="1" height="24" viewBox="0 0 1 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.5" y1="2.18556e-08" x2="0.499999" y2="24" stroke="#E6E6E6"/>
</svg>
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1158 10.284C10.5398 9.708 9.59977 9.708 9.02377 10.284C8.44777 10.86 8.44777 11.8 9.02377 12.376L18.2158 21.568C18.5038 21.856 18.8798 22 19.2598 22C19.6398 22 20.0198 21.856 20.3078 21.568C20.8838 20.992 20.8838 20.052 20.3078 19.476L11.1158 10.284ZM9.58777 10.848C9.71977 10.716 9.89577 10.648 10.0678 10.648C10.2438 10.648 10.4158 10.716 10.5478 10.848L12.8438 13.144L11.8838 14.104L9.58777 11.808C9.32377 11.544 9.32377 11.116 9.58777 10.848ZM19.7398 21C19.4758 21.264 19.0438 21.264 18.7798 21L12.4518 14.672L13.4118 13.712L19.7398 20.04C20.0078 20.304 20.0078 20.736 19.7398 21ZM8.92777 6.96C9.62377 6.96 10.5158 7.852 10.5158 8.548C10.5158 8.768 10.6958 8.948 10.9158 8.948C11.1358 8.948 11.3158 8.768 11.3158 8.548C11.3158 7.852 12.2078 6.96 12.9038 6.96C13.1238 6.96 13.3038 6.78 13.3038 6.56C13.3038 6.34 13.1238 6.16 12.9038 6.16C12.2078 6.16 11.3158 5.268 11.3158 4.572C11.3158 4.352 11.1358 4.172 10.9158 4.172C10.6958 4.172 10.5158 4.352 10.5158 4.572C10.5158 5.268 9.62377 6.16 8.92777 6.16C8.70777 6.16 8.52777 6.34 8.52777 6.56C8.52777 6.78 8.70377 6.96 8.92777 6.96ZM10.9158 5.748C11.1278 6.064 11.4118 6.348 11.7278 6.56C11.4118 6.772 11.1278 7.056 10.9158 7.372C10.7038 7.056 10.4198 6.772 10.1038 6.56C10.4198 6.348 10.6998 6.064 10.9158 5.748ZM6.04777 12.104C6.04777 11.408 6.93977 10.516 7.63577 10.516C7.85577 10.516 8.03577 10.336 8.03577 10.116C8.03577 9.896 7.85577 9.716 7.63577 9.716C6.93977 9.716 6.04777 8.824 6.04777 8.128C6.04777 7.908 5.86777 7.728 5.64777 7.728C5.42777 7.728 5.24777 7.908 5.24777 8.128C5.24777 8.824 4.35577 9.716 3.65977 9.716C3.43977 9.716 3.25977 9.896 3.25977 10.116C3.25977 10.336 3.43977 10.516 3.65977 10.516C4.35577 10.516 5.24777 11.408 5.24777 12.104C5.24777 12.324 5.42777 12.504 5.64777 12.504C5.86777 12.504 6.04777 12.324 6.04777 12.104ZM4.83577 10.116C5.15177 9.904 5.43577 9.62 5.64777 9.304C5.85977 9.62 6.14377 9.904 6.45977 10.116C6.14377 10.328 5.85977 10.612 5.64777 10.928C5.43577 10.612 5.15177 10.328 4.83577 10.116ZM8.20377 3.988C7.50777 3.988 6.61577 3.096 6.61577 2.4C6.61577 2.18 6.43577 2 6.21577 2C5.99577 2 5.81577 2.18 5.81577 2.4C5.81577 3.096 4.92377 3.988 4.22777 3.988C4.00777 3.988 3.82777 4.168 3.82777 4.388C3.82777 4.608 4.00777 4.788 4.22777 4.788C4.92377 4.788 5.81577 5.68 5.81577 6.376C5.81577 6.596 5.99577 6.776 6.21577 6.776C6.43577 6.776 6.61577 6.596 6.61577 6.376C6.61577 5.68 7.50777 4.788 8.20377 4.788C8.42377 4.788 8.60377 4.608 8.60377 4.388C8.60377 4.168 8.42377 3.988 8.20377 3.988ZM6.21577 5.2C6.00377 4.884 5.71977 4.6 5.40377 4.388C5.71977 4.176 6.00377 3.892 6.21577 3.576C6.42777 3.892 6.71177 4.176 7.02777 4.388C6.71177 4.6 6.42777 4.884 6.21577 5.2Z" fill="#034737"/>
</svg>
<div className="relative">
      <div className="px-6 py-2 cursor-pointer" onClick={toggleFilterAssistant}>
        <h2>AI assistant</h2>
      </div>

      {isFilterAssistantOpen && (
        <div
          ref={filterMenuRef2}
          className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
          onClick={() => setIsFilterAssistantOpen(false)}
        >
          <div className="max-w-[443px] bg-white border border-gray-300 rounded-2xl shadow-lg">
            <div className="p-4">
              <div className="flex items-center w-full bg-gray-100 border border-gray-300 px-2 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-green-800">
                <input
                  type="text"
                  placeholder="Search AI assistant"
                  className="flex-grow bg-gray-100 text-xl focus:outline-none"
                />
                <button className="p-4 flex" onClick={handleCrossClick2}>
                  <RxCross1 className="" />
                </button>
              </div>
              <div className="border border-gray-300 my-4"></div>

              <div className="mt-4 space-y-2">
                <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md flex-row justify-between" onClick={(e) => e.stopPropagation()}>
                  <span className="flex flex-col">
                    <span className="ml-2 text-black text-[16px] font-semibold">Summarize</span>
                    <span className="ml-2 text-[#14171B] text-[14px] font-light">Summarize the conversation.</span>
                  </span>
                </label>
                <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md flex-row justify-between" onClick={(e) => e.stopPropagation()}>
                  <span className="flex flex-col">
                    <span className="ml-2 text-black text-[16px] font-semibold">Rewrite</span>
                    <span className="ml-2 text-[#14171B] text-[14px] font-light">Rephrase the content.</span>
                  </span>
                </label>
                <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md flex-row justify-between" onClick={(e) => e.stopPropagation()}>
                  <span className="flex flex-col">
                    <span className="ml-2 text-black text-[16px] font-semibold">Expand</span>
                    <span className="ml-2 text-[#14171B] text-[14px] font-light">Expand your content into a longer sentence.</span>
                  </span>
                </label>
                <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md flex-row justify-between" onClick={(e) => e.stopPropagation()}>
                  <span className="flex flex-col">
                    <span className="ml-2 text-black text-[16px] font-semibold">Make more friendly</span>
                    <span className="ml-2 text-[#14171B] text-[14px] font-light">Rewrite the content to be more informal & friendly.</span>
                  </span>
                </label>
                <label className="flex bg-[#FAFBFC] p-2 items-center rounded-md flex-row justify-between"  onClick={toggleSheet}>
                  <span className="flex flex-col">
                    <span className="ml-2 text-black text-[16px] font-semibold">Use AI templates / document</span>
                    <span className="ml-2 text-[#14171B] text-[14px] font-light">Browse AI texts templates and your documents.</span>
               
                  </span>
                </label>
              </div>

            </div>
          </div>
        </div>
      )}
    

    </div>

<svg width="1" height="24" viewBox="0 0 1 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.5" y1="2.18556e-08" x2="0.499999" y2="24" stroke="#E6E6E6"/>
</svg>
<div className="relative">
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className="w-28 p-2 rounded-lg  flex justify-between items-center cursor-pointer"
        >
          {selectedType === 'message' ? 'Message' : 'Note'}
          <BsChevronDown className={`h-4 w-4 ml-2 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <div className="absolute mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
            <option
              value="message"
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:font-medium hover:text-green-900"
            >
              Message
            </option>
            <option
              value="note"
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:font-medium hover:text-green-900"
            >
              Note
            </option>
          </div>
        )}
      </div>
    </div>
    {showFilterSheet && <FilterSheet/>}
</div> 
 </div></div>
  );
};




export default ChatInput;
