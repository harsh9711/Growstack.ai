import { aiModelOptions } from "@/app/(main-app)/app/create/ai-articles/constants/options";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import clsx from "clsx";
import { Download, Settings, Share2, UserCircle } from "lucide-react";
import { useState } from "react";
import { downloadDocx, downloadPdf, downloadTxt } from "./utils/downloadHelpers";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Downbar() {
  const [selectedAiModel, setSelectedAiModel] = useState(aiModelOptions[0].value);

  return (
    <div className="px-10 ">
      <div className="flex justify-between">
       
        <div className="opacity-0 flex items-center gap-3">
        
      
     
Create
        
        </div>
      </div>
    </div>
  );
}
