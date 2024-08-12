"use client";

import Layout from "./components/Layout";
import ShareChatDialog from "./components/ShareChatDialog";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { ISidebarItem } from "./interface/chat.interface";
import { ArrowBack } from "@/components/svgs";
import { useRouter } from "next/navigation";

export default function Home() {
  const [sidebarItems, setSidebarItems] = useState<ISidebarItem[]>([]);

  const fetchConversations = async () => {
    try {
      const response = await instance.get(`${API_URL}/ai/api/v1/conversation/`);
      const items = response.data.data.map((item: any) => ({
        _id: item._id,
        title: item.title,
        selected: item.selected,
        createdDate: item.createdAt,
        updatedDate: item.updatedAt,
      }));
      setSidebarItems(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col h-full w-full mt-6">
      <button
        onClick={() => router.back()}
        className="mb-3 max-w-fit text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-1.5 rounded-full font-medium items-center transition-all duration-300">
        <ArrowBack />
        Back
      </button>
      <Layout sidebarItems={sidebarItems} setSidebarItems={setSidebarItems} fetchConversations={fetchConversations} />
      <ShareChatDialog sidebarItems={sidebarItems} />
    </div>
  );
}
