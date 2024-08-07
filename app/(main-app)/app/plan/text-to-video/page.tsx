"use client";
import instance from "@/config/axios.config";
import { MoreHorizontal, Search } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import CreateVideoDialog from "./components/CreateVideoDialog";
import VideoTemplateCard from "./components/VideoTemplateCard";
import Link from "next/link";
import { Template } from "./components/types";
import toast from "react-hot-toast";
import TemplateLoader from "./components/TemplateLoader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import "@/styles/editor.css";

const outputType = [
  { label: "Download", value: "download" },
  { label: "Download Subtitles", value: "download_subtitles" },
  { label: "Remove", value: "remove" },
];

export default function TextToVideoPage() {
  const [templates, setTemplates] = useState<Template[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/ai/api/v1/video/templates`;
        const response = await instance.get<{
          data: { templates: Template[] };
        }>(url);
        setTemplates(response.data.data.templates);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
        setTemplates([]);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <main>
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Text to video</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              My videos
            </p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search template"
              />
            </div>
            {/* <Link href="/app/plan/text-to-video/my-videos">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2">My videos</button>
            </Link> */}
            <CreateVideoDialog templates={templates} />
          </div>
        </div>
        <div>
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
        <div className="grid grid-cols-4 gap-5 mt-80">
          <div className="text-center text-gray-500 text-2xl font-semibold col-span-4">
            No Videos Available
          </div>
        </div>
      </main>
    </Fragment>
  );
}

const VideoCard = () => {
  return (
    <div className="flex justify-between items-center h-[104px] border border-[#EBEBEB] mt-[20px] px-[20px] transition duration-300 hover:border-primary-green">
      <div className="flex gap-4 items-center">
        <div className="w-[64px] h-[64px]">
          <img
            className="object-cover w-full h-full rounded-2xl"
            src="/dummy/person-0.png"
            alt="video"
          />
        </div>
        <p className="text-[16px] font-medium">Lorem ipsum dolor</p>
      </div>
      <div>
        <button className="bg-[#EBEBEB] px-[22px] py-[6px] text-[14px] rounded-[30px]">
          Draft
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-[42px] h-[42px] bg-primary-green rounded-md flex justify-center items-center">
          <span className="text-white text-[16px] font-semibold">J</span>
        </div>
        <p className="text-[16px] font-medium">Jhon Doe</p>
      </div>
      <div>
        <span className="text-[#151B23] text-[16px] font-normal">
          Edited about 21 hours ago
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-primary-green text-white px-[15px] py-[5px] rounded-md">
          Edit
        </button>
        <div className="remove-caret change-bg">
          <Select>
            <SelectTrigger className="p-1 bg-white border-0 h-10 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal size={20} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {outputType.map(({ label, value }) => (
                  <SelectItem value={value} key={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
