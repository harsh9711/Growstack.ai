"use client";

import clsx from "clsx";
import { BsStarFill } from "react-icons/bs";
import { Plus, Search, StarIcon } from "lucide-react";
import Image from "next/image";
import { Fragment, useState, useEffect, useCallback } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";
import ContentLoader from "react-content-loader";
import { debounce } from "@/lib/utils";
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

export default function AiAppTemplatesPage() {
  const [selectedTag, setSelectedTag] = useState(tags[0].name);
  const [appTemplates, setAppTemplates] = useState<Assistant[]>([]);
  const [allAssistantsData, setAllAppTemplates] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const validateImageUrl = (url: string) => {
    const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;
    return imageRegex.test(url);
  }

  const fetchAppTemplates = async (tag : string) => {
    try {
      setLoading(true);
      let apiUrl = `${API_URL}/ai/api/v1/chat-template?category=${tag}`;
      if (tag === "My Assistants") {
        apiUrl = `${API_URL}/ai/api/v1/chat-template?category=MyAssistants`;
      }

      const response = await instance.get(apiUrl);

      const data = response.data.data;
      if (data) {
        const formattedAssistants = data.map((assistant: any) => ({
          _id: assistant._id,
          "ASSISTANT NAME": assistant["ASSISTANT NAME"],
          "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
          icon: assistant["icon"],
          category: assistant["category"],
          favorite: assistant["favorite"],
        }));
        setAppTemplates(formattedAssistants);
        setAllAppTemplates(formattedAssistants);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (method: string, templateId: string) => {
    try {
      const response = await instance.put(
        API_URL + `/ai/api/v1/chat-template/fav-apps/${templateId}`,
        { type: method }
      );
      toast.success(response.data.message);

      setAppTemplates((prevAssistants) =>
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

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newSearchTerm = e.target.value.toLowerCase();
  //   setSearchTerm(newSearchTerm);

  //   // If the search term is empty, reset the careers to the initial list
  //   if (newSearchTerm.trim() === "") {
  //     setAssistants(allAssistantsData);
  //   } else {
  //     // Otherwise, filter the careers based on the search term
  //     setAssistants(
  //       assistants.filter((assistant: any) =>
  //         assistant["ASSISTANT NAME"].toLowerCase().includes(newSearchTerm)
  //       )
  //     );
  //   }
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const fetchSearchResults = async (query: string) => {
    try {
      setLoading(true);
      let apiUrl = `${API_URL}/ai/api/v1/chat-template?searchQuery=${query.toLowerCase()}`;
      const response = await instance.get(apiUrl);

      const data = response.data.data;
      if (data) {
        const formattedAssistants = data.map((assistant: any) => ({
          _id: assistant._id,
          "ASSISTANT NAME": assistant["ASSISTANT NAME"],
          "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
          icon: assistant["icon"],
          category: assistant["category"],
          favorite: assistant["favorite"],
        }));
        setAppTemplates(formattedAssistants);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchData = (query: string,tag : string) => {
    if (query) {
      fetchSearchResults(query);
    } else {
      fetchAppTemplates(tag);
    }
  };

  const debouncedHandleSearchData = useCallback(debounce(handleSearchData, 500), []);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedHandleSearchData(query, selectedTag);
  };
  
  const clearSearchHandle = () => {
    setSearchQuery("");
  };
  const tagStore = (tag:any) => {
    localStorage.setItem("tagName",tag)
  };

  useEffect(() => {
    const tagname= localStorage.getItem("tagName")
    if(tagname){
    fetchAppTemplates(tagname);
    setSelectedTag(tagname)
    }else{
      fetchAppTemplates(selectedTag);
    }
  }, [selectedTag]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setAppTemplates(allAssistantsData);
    } else {
      setAppTemplates(
        allAssistantsData.filter((assistant: any) =>
          assistant["ASSISTANT NAME"].toLowerCase().includes(searchQuery)
        )
      );
    }
  }, [searchQuery]);

  return (
    <Fragment>
      <main className=''>
        <div className='flex justify-between items-center mt-8'>
          <div className='space-y-2 w-full'>
            <h1 className='text-2xl font-semibold'>AI templates</h1>
            <p className='flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]'>
              What do you need to write ?
            </p>
          </div>
          <div className='w-full flex justify-end gap-2'>
            <div className='bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md'>
              <Search className='text-gray-500' size={20} />
              <input
                type='search'
                className='outline-none h-[40px] w-full'
                placeholder='Search'
                value={searchQuery}
                onChange={handleChangeSearch}
              />
            </div>

            <Link href='/app/plan/ai-templates/create-template'>
              <button className='bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2'>
                <Plus size={20} />
                Create AI template
              </button>
            </Link>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 mt-10'>
          {tags.map((tag, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedTag(tag.name);
                tagStore(tag.name)
                clearSearchHandle();
              }}
              className={clsx(
                "py-3.5 px-6 rounded-lg cursor-pointer flex items-center gap-2 transition duration-300",
                selectedTag === tag.name && searchQuery.length < 1
                  ? "bg-primary-green text-white"
                  : "bg-[#E9E9E9] text-primary-green"
              )}
            >
              <Image src={tag.icon} alt='' width={20} height={20} />
              <span className='whitespace-nowrap'>{tag.name}</span>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-3 gap-5 mt-9'>
          {loading ? (
            Array(15)
              .fill(null)
              .map((_, index) => <AiAppSkeletonLoader key={index} />)
          ) : appTemplates.length < 1 ? (
            <div>No assistants found</div>
          ) : (
            appTemplates.map((appTemplate) => (
              <div key={appTemplate._id}>
                <div className='flex items-center min-h-[130px] justify-between gap-5 bg-white border border-[#EEF0F4] rounded-2xl p-6 shadow-xl shadow-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer'>
                  <Link
                    href={`/app/plan/ai-templates/${appTemplate._id}`}
                    className='flex gap-4 items-start flex-grow overflow-hidden'
                  >
                    {validateImageUrl(appTemplate.icon) ? (
                      
                      <div className="flex items-center justify-center w-16 h-16">
                        <img src={appTemplate.icon} alt="icon" style={{width:"64px",height:"64px",minWidth:"64px",minHeight:"64px"}} className="rounded-lg object-contain w-full h-full"></img>
                      </div>
                    ) : (
                        <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        dangerouslySetInnerHTML={{ __html: appTemplate.icon }}
                        className='w-[64px] h-[64px] flex-shrink-0'
                      />
                    )}
                    <div className='space-y-2 overflow-hidden flex-grow'>
                      <h1 className='text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>
                        {appTemplate["ASSISTANT NAME"]}
                      </h1>
                      <p
                        className='text-primary-black text-opacity-70 text-[14px] line-clamp-2 leading-relaxed overflow-hidden text-ellipsis'
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {appTemplate["ASSISTANT DESCRIPTION"]}
                      </p>
                    </div>
                  </Link>
                  <div className='cursor-pointer w-full max-w-fit transition duration-300 hover:scale-125 flex justify-center items-center'>
                    {appTemplate.favorite ? (
                      <BsStarFill
                        size={24}
                        className='text-yellow-300'
                        onClick={() =>
                          handleFavorite("remove", appTemplate._id)
                        }
                      />
                    ) : (
                      <StarIcon
                        className='text-[#ADADAD]'
                        onClick={() => handleFavorite("add", appTemplate._id)}
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

const AiAppSkeletonLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width='100%'
      height='80px'
      viewBox='0 0 600 80'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      className='w-full'
    >
      <rect x='0' y='0' rx='10' ry='10' width='70' height='70' />
      <rect x='90' y='10' rx='8' ry='8' width='350' height='15' />
      <rect x='90' y='35' rx='8' ry='8' width='420' height='15' />
    </ContentLoader>
  );
};
