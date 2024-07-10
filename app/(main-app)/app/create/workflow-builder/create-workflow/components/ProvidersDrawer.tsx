//@ts-nocheck
"use client";
import { ChevronRight, X } from "lucide-react";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Image from "next/image";
import { useState } from "react";
import { tools } from "./data/tools";

export default function ProvidersDrawer({ trigger }: { trigger: React.ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Text", "Image", "Stable diffusion", "Audio", "Music", "Video", "Integrations", "Utilities", "Email", "Workflows"];

  const filteredTools = selectedCategory === "All" ? tools : tools.filter((tool) => tool.category === selectedCategory);

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="h-full max-h-[85vh]">
        <div className="mx-auto max-w-[90%] w-full relative h-full pb-40">
          <DrawerHeader>
            <DrawerTitle>Create a new step in your workflow</DrawerTitle>
            <DrawerDescription>Browse our list of providers to add a new step to your workflow.</DrawerDescription>
          </DrawerHeader>
          <DrawerClose
            asChild
            className="absolute right-3 top-0 rounded-lg transition-opacity p-2 hover:bg-[#ff00001f] hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <div>
              <X className="h-5 w-5 text-[#ff00009d]" />
              <span className="sr-only">Close</span>
            </div>
          </DrawerClose>
          <div className="flex items-start gap-6 mt-5 h-full">
            {/* Sidebar */}
            <div className="w-full max-w-[350px] border border-[#E8E8E8] !bg-white shadow-box p-4 !rounded-2xl">
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`w-full flex justify-between text-left px-4 py-3 mt-2 rounded-xl ${
                        selectedCategory === category ? "bg-primary-green text-white" : ""
                      }`}
                      onClick={() => setSelectedCategory(category)}>
                      {category}
                      <ChevronRight size={20} className="text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content */}
            <div className="w-full p-4 h-full overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredTools.map((data) => (
                  <ToolCard {...data} key={data.id} onClick={() => {}} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// components/ToolCard.tsx

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  onClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, name, description, category, onClick }) => {
  return (
    <div className="border border-[#E4E4E4] p-7 rounded-3xl flex flex-col items-start relative space-y-3 hover:shadow-2xl hover:shadow-gray-200 cursor-pointer transition-all duration-300">
      <Image src={icon} alt="" width={50} height={50} />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-600 text-[15px] leading-relaxed">{description}</p>
      <span className="mt-auto text-xs px-2 py-1 bg-gray-100 rounded-full absolute top-4 right-6 text-primary-black text-opacity-70">{category}</span>
    </div>
  );
};
