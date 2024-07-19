"use client";
import axios from "@/config/axios.config";
import { Search } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import CreateVideoDialog from "./components/CreateVideoDialog";
import VideoTemplateCard from "./components/VideoTemplateCard";
import Link from "next/link";
import { Template } from "./components/types";
import toast from "react-hot-toast";
import TemplateLoader from "./components/TemplateLoader";

export default function TextToVideoPage() {
  const [templates, setTemplates] = useState<Template[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/ai/api/v1/video/templates`;
        const response = await axios.get<{ data: { templates: Template[] } }>(url);
        console.log("Response data:", response.data.data.templates);
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
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">My videos</p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input type="search" className="outline-none h-[40px] w-full" placeholder="Search template" />
            </div>
            {/* <Link href="/app/plan/text-to-video/my-videos">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2">My videos</button>
            </Link> */}
            <CreateVideoDialog templates={templates} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-80">
        
            <div className="text-center text-gray-500 text-2xl font-semibold col-span-4">No Videos Available</div>
        
        </div>
      </main>
    </Fragment>
  );
}
