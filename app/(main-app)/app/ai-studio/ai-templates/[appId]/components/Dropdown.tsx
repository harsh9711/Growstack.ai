"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "jspdf-autotable";
import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Dropdown = ({
  label,
  items,
  infoIcon,
  hideLabel,
  value,
  onChange,
  placeholder,
  info,
}: any) => (
  <div className="space-y-3">
    {!hideLabel && (
      <h2 className="font-medium flex items-center gap-2">
        {label}{" "}
        {!!infoIcon ? (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={18}
                    className="text-primary-black text-opacity-50"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>{info}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        ) : null}
      </h2>
    )}
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border-none">
        <SelectValue placeholder={placeholder ? placeholder : label} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: any, index: number) => (
          <SelectItem value={item} key={index}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default Dropdown;
