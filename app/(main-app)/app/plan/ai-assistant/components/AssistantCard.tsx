import Image from "next/image";
import React from "react";

export default function AssistantCard({ avatar, expertise, name }: { avatar: string; name: string; expertise: string }) {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-4">
      <div className="group relative rounded-2xl overflow-hidden group shadow-box">
        <Image src={avatar} alt="" width={400} height={400} className="group-hover:scale-110 transition-all duration-300 min-h-[255px] w-full object-cover max-h-[255px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-[1] flex flex-col justify-end text-white p-4 gap-2">
          <h1 className="text-xl font-semibold text-center">{name}</h1>
          <p className="text-center text-white text-opacity-80 text-sm">{expertise}</p>
        </div>
      </div>
      <button className="bg-[#CECECE] text-[#7C7C7C] h-12 w-full rounded-xl mt-3 hover:bg-primary-green hover:text-white transition-all duration-300">
        Chat now
      </button>
    </div>
  );
}
