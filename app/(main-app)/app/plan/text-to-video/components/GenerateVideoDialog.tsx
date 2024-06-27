import { GenerateAi } from "@/components/svgs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { ai_video_templates } from "./data/templates";
import VideoTemplate from "./VideoTemplates";
import { API_URL } from "@/lib/api";
import axios from "axios";
import { useState, useEffect } from "react";
interface Template {
  id: string;
  image_url: string;
  title: string;
}
const TooltipContentComponent = () => (
  <div className="w-[460px] p-8 font-normal text-base space-y-8">
    <div className="space-y-5">
      <h1 className="text-primary-green text-xl font-semibold">Tips for generating video with AI</h1>
      <div className="bg-primary-green p-5 text-white rounded-lg leading-normal text-[15px]">
        Your prompt is processed through a third- party service by OpenAI
      </div>
    </div>
    <div className="space-y-5">
      <h1 className="text-primary-black text-xl font-semibold">Get a good draft ready</h1>
      <p className="text-primary-neutral/60 text-[15px]">
        We recommend you watch this 1-minute video on how to use the video assistant to achieve a good first draft.
      </p>
      <Image src="/videos/dummy-video.png" alt="" width={500} height={400} />
    </div>
    <button className="border border-[#C3C3C3] py-3.5 w-full rounded-xl !mt-14 font-semibold text-primary-neutral">Learn More</button>
  </div>
);

const TooltipComponent = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">
        <div>
          <HiOutlineQuestionMarkCircle />
        </div>
      </TooltipTrigger>
      <TooltipContent className="border-gradient-blue-to-gray-to-b rounded-[22px] p-0">
        <div className="text-primary-black">{<TooltipContentComponent />}</div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function GenerateVideoDialog() {
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
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full hover-card flex items-center justify-between transition duration-500 ring-1 ring-[#E7E7E7] p-6 rounded-2xl cursor-pointer group">
          <div className="space-y-3">
            <h1 className="text-[18px] font-semibold">Generate Video with AI</h1>
            <p className="text-primary-neutral">Create your video with AI</p>
          </div>
          <GenerateAi className="text-primary-neutral group-hover:text-primary-green transition duration-300" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] h-[90vh] p-10">
        <div className="relative w-full space-y-6 text-[15px]">
          <div className=" bg-white border-b pb-6">
            <h1 className="text-2xl font-semibold flex gap-x-3 capitalize items-center">
              Generate video with AI
              <TooltipComponent />
            </h1>
          </div>
          <main className="h-full flex ">
            <div className="w-full max-w-[426px] space-y-4">
            <div className="w-full space-y-3">
                <label htmlFor="topic" className="flex items-center font-semibold gap-x-3">
                  <span className="space-x-2">
                  Template 
                  </span>
                </label>
                <textarea
                  placeholder="Introduction to financial well-being"
                  className="border border-[#DEDEDE] bg-[#F5F5F5] resize-none h-[140px] w-full rounded-xl outline-none focus:border-primary-grey transition-all p-4"></textarea>
              </div>
              <div className="w-full space-y-3">
                <label htmlFor="topic" className="flex items-center font-semibold gap-x-3">
                  <span className="space-x-2">
                    Topic <span className="text-[#F93939]">*</span>
                  </span>
                </label>
                <textarea
                  placeholder="Introduction to financial well-being"
                  className="border border-[#DEDEDE] bg-[#F5F5F5] resize-none h-[140px] w-full rounded-xl outline-none focus:border-primary-grey transition-all p-4"></textarea>
              </div>
              <div className="w-full space-y-3">
                <label htmlFor="topic" className="flex items-center font-semibold gap-x-3">
                  <span className="space-x-2">
                    Audience <span className="text-[#F93939]">*</span>
                  </span>
                </label>
                <textarea
                  placeholder="Employees of a successful startup"
                  className="border border-[#DEDEDE] bg-[#F5F5F5] resize-none h-[140px] w-full rounded-xl outline-none focus:border-primary-grey transition-all p-4"></textarea>
              </div>
              <button className="border border-[#C3C3C3] py-3.5 w-full rounded-xl">Add more</button>
              <button className="bg-primary-green text-white py-3.5 w-full rounded-xl">Generate Again</button>
            </div>
            {/* <div className="w-full h-full grid place-content-center">
              <div className="flex flex-col justify-center items-center mb-40">
                <Image src="/gifs/empty-box.gif" alt="" width={300} height={300} />
                <h1 className="text-3xl text-center font-semibold">There is no content present.</h1>
                <p className="max-w-xl leading-loose text-center mt-4">
                  Deleted templates will be stored here, and any items in the trash will be permanently deleted after 30 days.
                </p>
              </div>
            </div> */}
             <div className=" gap-5 mt-8">
          {templates.map((template) => (
            <VideoTemplate key={template.id} image_url={template.image_url} title={template.title} />
          ))}
        </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
