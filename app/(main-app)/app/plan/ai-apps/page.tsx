"use client";

import clsx from "clsx";
import { Plus, Search, StarIcon } from "lucide-react";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/lib/api";
import Link from "next/link";

interface Assistant {
  _id: string;
  "ASSISTANT NAME": string;
  "ASSISTANT DESCRIPTION": string;
  icon: string;
  category: string;
}

export default function MarketingPage() {
  const [selectedTag, setSelectedTag] = useState(tags[0].name);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, setIsPending] = useState(false);

  const fetchAssistants = async () => {
    setIsPending(true);
    try {
      let apiUrl = `${API_URL}/ai/api/v1/chat-template?category=${selectedTag}`;
      console.log("selectedtag", selectedTag);
      if (selectedTag === "Others") {
        apiUrl = `${API_URL}/ai/api/v1/chat-template/user?page=1&limit=20&search=${searchQuery}`;
        console.log(apiUrl);
      }

      console.log("API URL:", apiUrl);

      const response = await axios.get(apiUrl);

      console.log("API Response:", response.data);

      if ( response.data.data) {
        const formattedAssistants = response.data.data.map(
          (assistant: any) => ({
            _id: assistant._id,
            "ASSISTANT NAME": assistant["ASSISTANT NAME"],
            "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
            icon: assistant["icon"],
            category: assistant["category"],
          })
        );
        setAssistants(formattedAssistants);
      }
      // else if (response.data.data.data!=undefined) {
      //   console.log(response.data.data.data)
      //   const formattedAssistants = response.data.data.data.map(
      //     (assistant: any) => ({
      //       _id: assistant._id,
      //       "ASSISTANT NAME": assistant["ASSISTANT NAME"],
      //       "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
      //       icon: assistant["icon"],
      //       category: assistant["category"],
      //     })
      //   );
      //   setAssistants(formattedAssistants);
      // }
     else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setIsPending(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, [selectedTag, searchQuery]);

  
  

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI apps</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              AI marketing and sales assistant
            </p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search for articles and contents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* <Link href="/app/plan/ai-apps/create-assistant">
              <button className="text-primary-green font-medium border-primary-green border sheen transition duration-500 px-4 py-4 rounded-xl flex items-center gap-2">
                <Plus size={20} />
                Upload file
                <svg className="ml-2" width="20" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.5 11.25L9 6.75L13.5 11.25" stroke="#034737" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              </button>
            </Link> */}
            <Link href="/app/plan/ai-apps/create-assistant">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
                <Plus size={20} />
                Create your own assistant
              </button>
            </Link>
          </div>
        </div>
        <div className="flex gap-2 mt-10">
          {tags.map((tag, index) => (
            <div
              key={index}
              onClick={() => setSelectedTag(tag.name)}
              className={clsx(
                "py-3.5 px-6 rounded-lg cursor-pointer flex items-center gap-2 transition duration-300",
                selectedTag === tag.name
                  ? "bg-primary-green text-white"
                  : "bg-[#E9E9E9] text-primary-green"
              )}
            >
              <Image src={tag.icon} alt="" width={20} height={20} />
              <span>{tag.name}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5 mt-9 items-center justify-center">
          {loading ? (
        <div className="flex flex-col items-center justify-center translate-x-[500px] mx-auto w-full ">
        {/* <p className="text-center mb-4">Loading...</p> */}
        <Image src="/loader2.gif" alt="loader" width={650} height={650}  className="item-center justify-center mx-auto" />
      </div>
      
          ) : assistants.length < 1 ? (
            <div>No assistants found</div>
          ) : (
            assistants.map((assistant, index) => (
              <Link
                href={`/app/plan/ai-apps/${assistant._id}`}
                key={assistant._id}
              >
                <div className="flex items-center justify-between gap-5 bg-white border border-[#EEF0F4] rounded-2xl p-6 shadow-xl shadow-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer">
                  <div className="flex gap-4 items-start">
                  <div dangerouslySetInnerHTML={{ __html: assistant.icon }} className="w-[64px] h-[64px]" />

                    <div className="space-y-2 max-h-[80px]">
                      <h1 className="text-lg font-semibold">
                        {assistant["ASSISTANT NAME"]}
                      </h1>
                      <p
                        className="text-primary-black text-opacity-70 text-[14px] leading-relaxed overflow-hidden text-ellipsis"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {assistant["ASSISTANT DESCRIPTION"]}
                      </p>
                    </div>
                  </div>
                  <div className="cursor-pointer w-full max-w-fit hover:bg-gray-50 p-1 rounded transition">
                    <StarIcon className="text-[#ADADAD]" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </Fragment>
  );
}

const tags = [
  {
    icon: "/icons/articles.svg",
    name: "Articles and contents",
  },
  {
    icon: "/icons/blogposts.svg",
    name: "Blogs posts",
  },
  {
    icon: "/icons/shoppingcart.svg",
    name: "Ecommerce",
  },
  {
    icon: "/icons/emails.svg",
    name: "Emails",
  },
  {
    icon: "/icons/frameworks.svg",
    name: "Frameworks",
  },
  {
    icon: "/icons/marketing.svg",
    name: "Marketing",
  },
  {
    icon: "/icons/social-media.svg",
    name: "Social media",
  },
  {
    icon: "/icons/websites.svg",
    name: "Websites",
  },
  // {
  //   icon: "/icons/all.svg",
  //   name: "Others",
  // },
];
