"use client"
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import VideoTemplateCard from "./components/VideoTemplateCard";
import { API_URL } from "@/lib/api";
import { Search, Link } from "lucide-react";
import CreateVideoDialog from "./components/CreateVideoDialog";

interface Template {
  id: string;
  image_url: string;
  title: string;
}

export default function TextToVideoPage() {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_URL}/ai/api/v1/video/templates`;
        console.log("Fetching data from:", url); // Log the constructed URL for debugging
        const response = await axios.get<{ data: { templates: Template[] } }>(url);
        console.log("Response data:", response.data.data.templates); // Log the response data
        setTemplates(response.data.data.templates);
      } catch (error) {
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
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Featured template</p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input type="search" className="outline-none h-[40px] w-full" placeholder="Search template" />
            </div>
            <Link href="/app/plan/text-to-video/my-videos">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">My videos</button>
            </Link>
            <CreateVideoDialog />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-8">
          {templates.map((template) => (
            <VideoTemplateCard key={template.id} image_url={template.image_url} name={template.title} />
          ))}
        </div>
      </main>
    </Fragment>
  );
}
