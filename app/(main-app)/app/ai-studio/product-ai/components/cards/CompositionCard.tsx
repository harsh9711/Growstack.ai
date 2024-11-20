import Image from "next/image";
import React from "react";
import { historyProps } from "../../interface/history";
import { formatDate } from "@/lib/utils";

const CompositionCard = ({ img_url, updatedAt, doc_name }: historyProps) => {
  return (
    <div className="hover-card-sm px-3 py-4 rounded-[14px] cursor-pointer space-y-5 ring-1 ring-[#D6D6D6]/40 ring-inset mb-4">
      <div className="w-full h-[150px]">
        <Image
          src={img_url}
          alt={doc_name}
          width={400}
          height={400}
          className="rounded-xl object-contain w-full h-full"
        />
      </div>
      <div className="">
        <h1 className="text-lg font-semibold">{doc_name}</h1>
        <p className="text-[#B0B7CB] text-sm">{formatDate(updatedAt)}</p>
      </div>
    </div>
  );
};

export default CompositionCard;
