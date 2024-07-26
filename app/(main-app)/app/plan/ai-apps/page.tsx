"use client";

import clsx from "clsx";
import { BsStarFill } from "react-icons/bs";
import { Plus, Search, StarIcon } from "lucide-react";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

interface Assistant {
  _id: string;
  "ASSISTANT NAME": string;
  "ASSISTANT DESCRIPTION": string;
  icon: string;
  category: string;
  favorite: boolean;
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
  {
    icon: "/icons/my-documents-folder.svg",
    name: "My Assistants",
  },
];

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
      if (selectedTag === "My Assistants") {
        apiUrl = `${API_URL}/ai/api/v1/chat-template/user?page=1&limit=20&search=${searchQuery}`;
      }

      const response = await instance.get(apiUrl);
      const data =
        selectedTag === "My Assistants"
          ? response.data.data.data
          : response.data.data;

      if (data) {
        const formattedAssistants = data.map((assistant: any) => ({
          _id: assistant._id,
          "ASSISTANT NAME": assistant["ASSISTANT NAME"],
          "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
          icon: assistant["icon"],
          category: assistant["category"],
          favorite: assistant["favorite"],
        }));
        setAssistants(formattedAssistants);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setIsPending(false);
      setLoading(false);
    }
  };

  const handleFavourite = async (method: string, templateId: string) => {
    try {
      const response = await instance.put(
        API_URL + `/ai/api/v1/chat-template/fav-apps/${templateId}`,
        { type: method }
      );
      toast.success(response.data.message);

      setAssistants((prevAssistants) =>
        prevAssistants.map((assistant) =>
          assistant._id === templateId
            ? { ...assistant, favorite: method === "add" }
            : assistant
        )
      );
    } catch (error: any) {
      console.error("Error:", error);
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
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

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
        <div className="grid grid-cols-3 gap-5 mt-9">
          {loading ? (
            <p>Loading...</p>
          ) : assistants.length < 1 ? (
            <div>No assistants found</div>
          ) : (
            assistants.map((assistant) => (
              <div key={assistant._id}>
                <div className="flex items-center justify-between gap-5 bg-white border border-[#EEF0F4] rounded-2xl p-6 shadow-xl shadow-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer">
                  <Link
                    href={`/app/plan/ai-apps/${assistant._id}`}
                    className="flex gap-4 items-start flex-grow overflow-hidden"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: assistant.icon }}
                      className="w-[64px] h-[64px] flex-shrink-0"
                    />
                    <div className="space-y-2 overflow-hidden flex-grow">
                      <h1 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
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
                  </Link>
                  <div className="cursor-pointer w-full max-w-fit hover:bg-gray-50 p-1 rounded transition">
                    {assistant.favorite ? (
                      <BsStarFill
                        size={24}
                        className="text-yellow-300"
                        onClick={() => handleFavourite("remove", assistant._id)}
                      />
                    ) : (
                      <StarIcon
                        className="text-[#ADADAD]"
                        onClick={() => handleFavourite("add", assistant._id)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </Fragment>
  );
}
