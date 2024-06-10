import Image from "next/image";
import React from "react";

export default function SchedulerPage() {
  return (
    <div className="flex flex-col h-full flex-1">
      <div className="mt-8">
        <div className="space-y-2 w-full">
          <h1 className="text-2xl font-semibold">Scheduler</h1>
          <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Connect with social media account to schedule your post </p>
        </div>
      </div>
      <div className="flex-1 h-full w-full flex justify-center items-center mb-32">
        <div className="w-full max-w-4xl bg-white px-10 py-14 rounded-3xl shadow-2xl shadow-gray-400">
          <h1 className="text-[28px] font-semibold">Connect a profile</h1>
          <p className="text-primary-black text-opacity-70 mt-1">Attach a profile to see how growstack can help grow your business.</p>
          <div className="w-full grid grid-cols-3 gap-4 mt-8">
            <div className="h-14 w-full flex items-center gap-3 bg-[#217BEE] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/facebook-icon.svg" alt="" width={30} height={30} />
              Facebook
            </div>
            <div className="h-14 w-full flex items-center gap-3 bg-[#E4405F] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/instagram-icon.svg" alt="" width={30} height={30} />
              Instagram
            </div>
            <div className="h-14 w-full flex items-center gap-3 bg-[#0A66C2] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/linkedin-icon.svg" alt="" width={30} height={30} />
              Linkedin
            </div>
            <div className="h-14 w-full flex items-center gap-3 bg-[#070707] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/x-icon.svg" alt="" width={30} height={30} />X Profile
            </div>
            <div className="h-14 w-full flex items-center gap-3 bg-[#F06A35] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/blogger-icon.svg" alt="" width={30} height={30} />
              Blogger
            </div>
            <div className="h-14 w-full flex items-center gap-3 bg-[#D7143A] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/pinterest-icon.svg" alt="" width={30} height={30} />
              Pinterest
            </div>
            <div className="h-14 w-full flex items-center gap-3 bg-[#4989F5] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/google-my-business-icon.svg" alt="" width={30} height={30} />
              Google business
            </div>
            <div className="h-14 w-full flex items-center gap-3 bg-[#314358] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/tumblr-icon.svg" alt="" width={30} height={30} />
              Blogg
            </div>
            <div className="h-14 w-full flex items-center gap-3 bg-[#FF4500] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
              <Image src="/icons/reddit-icon.svg" alt="" width={40} height={40} />
              Reddit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
