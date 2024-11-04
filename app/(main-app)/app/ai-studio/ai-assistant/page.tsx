"use client";
import { useState, useEffect, Fragment } from "react";
import AssistantCard from "./components/AssistantCard";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { Assistant } from "./components/types";
import toast from "react-hot-toast";
import ContentLoader from "react-content-loader";
import Image from "next/image";
import clsx from "clsx";
import { Search } from "lucide-react";

const groups = [
  {
    icon: "/icons/marketing.svg",
    name: "Marketing",
  },
  {
    icon: "/icons/academicsvg.svg",
    name: "Education",
  },
  {
    icon: "/icons/shoppingcart.svg",
    name: "Regular Use",
  },
  {
    icon: "/icons/analyticsAI.svg",
    name: "Analytics",
  },
  {
    icon: "/icons/research-strategy.svg",
    name: "Research & Strategy",
  },
  {
    icon: "/icons/sales.svg",
    name: "Sales",
  },
  {
    icon: "/icons/Customer.svg",
    name: "Customer",
  },
  {
    icon: "/icons/Finance.svg",
    name: "Finance",
  },
  {
    icon: "/icons/fun.svg",
    name: "Fun",
  },
  {
    icon: "/icons/tech.svg",
    name: "Tech",
  },
];

export default function AiAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(groups[0].name);
  const [searchQuery, setSearchQuery] = useState("");
  const [allAssistants, setAllAssistants] = useState<Assistant[]>([]);
  const [categoryAssistants, setCategoryAssistants] = useState<Assistant[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `/ai/api/v1/assistant?category=${selectedGroup}`
        );

        const full_response = await instance.get(`/ai/api/v1/assistant`);

        setAssistants(response.data.data);
        setCategoryAssistants(response.data.data);
        setAllAssistants(full_response.data.data);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedGroup]);
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filteredAssistants = allAssistants.filter(
        assistant =>
          assistant.name.toLowerCase().includes(query.toLowerCase()) ||
          assistant.role.toLowerCase().includes(query.toLowerCase())
      );

      setAssistants(filteredAssistants);
    } else {
      setAssistants(allAssistants);
    }
  };

  const clearSearchHandle = () => {
    setSearchQuery("");
    setSelectedGroup("");
    setAssistants(allAssistants);
  };

  const groupStore = (group: any) => {
    localStorage.setItem("groupName", group);
  };

  useEffect(() => {
    if (searchQuery?.length === 0) {
      setAssistants(categoryAssistants || []);
    }
  }, [searchQuery]);

  return (
    <Fragment>
      <main className="flex-1 h-full flex flex-col">
        {/* <div className="flex justify-between items-center mt-8"> */}
        <div className="flex flex-col lg:flex-row lg:justify-end mt-8">
          <div className="space-y-2 w-full">
            {/* <h1 className="text-2xl font-semibold">AI assistant</h1> */}
            <h1 className="lg:text-2xl md:text-xl font-semibold">AI assistant</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Chat with our AI team
            </p>
          </div>
          {/* <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md"> */}
          <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md mt-4 lg:mt-0 lg">
            <Search className="text-gray-500" size={20} />
            <input
              type="search"
              className="outline-none h-[40px] w-full"
              placeholder="Search"
              value={searchQuery}
              onChange={handleChangeSearch}
            />
          </div>
        </div>
        {/* <div className="flex flex-wrap gap-2 mt-10"> */}
        <div className="flex flex-row overflow-x-auto lg:flex-wrap gap-2 mt-10">
          {groups.map((group, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedGroup(group.name);
                groupStore(group.name);
              }}
              className={clsx(
                "py-3.5 px-6 rounded-lg cursor-pointer flex items-center justify-center gap-2 transition duration-300",
                searchQuery === "" && selectedGroup === group.name
                  ? "bg-primary-green text-white"
                  : "bg-[#E9E9E9] text-primary-green"
              )}
            >
              <Image src={group.icon} alt="" width={20} height={20} />
              <span className="whitespace-nowrap">{group.name}</span>
            </div>
          ))}
        </div>
        {loading ? (
          // <div className="grid grid-cols-6 gap-6 mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-6">
            {Array(15)
              .fill(null)
              .map((_, index) => (
                <AiAssistantSkeletonLoader key={index} />
              ))}
          </div>
        ) : assistants.length < 1 ? (
          <div className="flex flex-col items-center justify-center mt-20 space-y-3">
            <h1 className="text-xl font-semibold">Oops!</h1>
            {/* <h2>
              No assistants with the selected category{" "}
              <span className="font-semibold">"{selectedGroup}"</span> found
            </h2> */}
            <h2>No assistants found</h2>
            <button
              onClick={clearSearchHandle}
              className="text-white bg-primary-green h-12 w-40 rounded-xl !mt-7 sheen transition-all duration-300"
            >
              Explore all
            </button>
          </div>
        ) : (
          // <div className="grid grid-cols-6 gap-3 mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-6">
            {assistants.map((assistant, index) => (
              <AssistantCard {...assistant} key={index} />
            ))}
          </div>
        )}
      </main>
    </Fragment>
  );
}

const AiAssistantSkeletonLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={3}
      width="100%"
      height="260px"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full"
    >
      <rect x="0" y="0" rx="10" ry="10" width="100%" height="200" />
      <rect x="0" y="210" rx="8" ry="8" width="100%" height="50" />
    </ContentLoader>
  );
};
