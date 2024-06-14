"use client";

import clsx from "clsx";
import { Plus, Search, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import aiAssistantsData from "./components/data/data";

export default function MarketingPage() {
  const [selectedTag, setSelectedTag] = useState(tags[0].name);

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI apps</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">AI marketing and sales assistant </p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input type="search" className="outline-none h-[40px] w-full" placeholder="Search for articles and contents" />
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
                selectedTag === tag.name ? "bg-primary-green text-white" : "bg-[#E9E9E9] text-primary-green"
              )}>
              <Image src={tag.icon} alt="" width={20} height={20} />
              <span>{tag.name}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-5 mt-9">
          {aiAssistantsData
            .filter((data) => data.category === selectedTag)[0]
            .items.map((assistant, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-5 bg-white border border-[#EEF0F4] rounded-2xl p-6 shadow-xl shadow-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer">
                <div className="flex gap-4 items-start">
                  <Image src={assistant.icon} alt="" width={80} height={80} className="w-[64px] h-[64px]" />
                  <div className="space-y-2">
                    <h1 className="text-lg font-semibold">{assistant.title}</h1>
                    <p className="text-primary-black text-opacity-70 text-[14px] leading-relaxed">{assistant.description}</p>
                  </div>
                </div>
                <div className="cursor-pointer w-full max-w-fit hover:bg-gray-50 p-1 rounded transition">
                  <StarIcon className="text-[#ADADAD]" />
                </div>
              </div>
            ))}
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
    name: "Blog posts",
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
];
