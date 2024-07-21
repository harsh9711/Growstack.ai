"use client";

import Motion from "@/components/Motion";
import { Info } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import VideoTemplateCard from "../components/VideoTemplateCard";
import { Template } from "../components/types";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import TemplateLoader from "../components/TemplateLoader";

export default function TrashPage() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Videos", "Templates"];

  const renderContent = () => {
    switch (selectedTabIndex) {
      case 0:
        return <VideosComponent />;
      case 1:
        return <TemplatesComponent />;
    }
  };

  return (
    <Fragment>
      <main className="flex-1 h-full w-full flex flex-col">
        <div className="flex justify-between items-center mt-8">
          <h1 className="flex items-center gap-2 text-2xl font-semibold">
            Trash <Info size={20} />
          </h1>
          <div className="w-full flex items-center justify-end gap-3">
            <div className="w-full max-w-[320px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
              <div className="w-full flex relative">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                      selectedTabIndex === index
                        ? "!text-white"
                        : "!text-primary-grey"
                    }`}
                    onClick={() => {
                      const totalTabs = tabs.length;
                      const percentage = (index / totalTabs) * 100;
                      setSelectedTabIndex(index);
                      setTabUnderlineLeft(percentage);
                    }}
                  >
                    {tab}
                  </div>
                ))}

                <div
                  className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
                  style={{
                    left: `calc(${tabUnderlineLeft}%)`,
                    width: `${100 / tabs.length}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        {renderContent()}
      </main>
    </Fragment>
  );
}

const VideosComponent = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_URL}/ai/api/v1/video/templates`;
        console.log("Fetching data from:", url); // Log the constructed URL for debugging
        const response = await instance.get<{
          data: { templates: Template[] };
        }>(url);
        console.log("Response data:", response.data.data.templates); // Log the response data
        setTemplates(response.data.data.templates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="grid grid-cols-4 gap-5 mt-8">
        {!templates
          ? Array(10)
              .fill(null)
              .map((_, index) => <TemplateLoader key={index} />)
          : templates.map((template) => (
              <VideoTemplateCard key={template.id} {...template} />
            ))}
      </div>
    </Motion>
  );
};
const TemplatesComponent = () => {
  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      classNames="flex-1 w-full h-full grid place-content-center"
    >
      <div className="flex flex-col justify-center items-center mb-40">
        <Image src="/gifs/empty-box.gif" alt="" width={300} height={300} />
        <h1 className="text-3xl text-center font-semibold">
          There is no content present.
        </h1>
        <p className="max-w-xl leading-loose text-center mt-4">
          Deleted templates will be stored here, and any items in the trash will
          be permanently deleted after 30 days.
        </p>
      </div>
    </Motion>
  );
};
