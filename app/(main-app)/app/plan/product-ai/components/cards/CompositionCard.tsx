import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  title: string;
  count: string;
};

const CompositionCard = ({ image, count, title }: Props) => {
  return (
    <div className="hover-card-sm px-3 py-4 rounded-[14px] cursor-pointer space-y-5 ring-1 ring-[#D6D6D6]/40 ring-inset">
      <Image src={image} alt="" width={400} height={400} className="rounded-xl" />
      <div className="flex  justify-between items-center">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-[#B0B7CB] text-sm">{count}</p>
      </div>
    </div>
  );
};

export default CompositionCard;
