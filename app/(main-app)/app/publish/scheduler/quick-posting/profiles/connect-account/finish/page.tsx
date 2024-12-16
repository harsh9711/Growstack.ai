"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SchedulerPage() {
  const params = useSearchParams();

  return (
    <div className="w-full max-w-4xl bg-white px-10 py-14 rounded-3xl shadow-2xl shadow-gray-400">
      <h1 className="text-[28px] font-semibold">Connection successful</h1>
      <p className="text-primary-black text-opacity-70 mt-3 text-[16px] leading-relaxed">
        You <span className="font-semibold">{params.get("profile")}</span> Page
        were successfully connected! Connect more profiles or click{" "}
        <span className="font-semibold">”Next”</span> to finish setting up your
        account.
      </p>
      <p></p>
      <div className="w-full grid grid-cols-3 gap-4 mt-8">
        <div className="h-14 w-full flex items-center gap-3 bg-[#217BEE] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image src="/icons/facebook-icon.svg" alt="" width={30} height={30} />
          Facebook
        </div>
        <div className="h-14 w-full flex items-center gap-3 bg-[#E4405F] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image
            src="/icons/instagram-icon.svg"
            alt=""
            width={30}
            height={30}
          />
          Instagram
        </div>
        <div className="h-14 w-full flex items-center gap-3 bg-[#0A66C2] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image src="/icons/linkedin-icon.svg" alt="" width={30} height={30} />
          Linkedin
        </div>
        <div className="h-14 w-full flex items-center gap-3 bg-[#070707] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image src="/icons/x-icon.svg" alt="" width={30} height={30} />X
          Profile
        </div>
        <div className="h-14 w-full flex items-center gap-3 bg-[#F06A35] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image src="/icons/blogger-icon.svg" alt="" width={30} height={30} />
          Blogger
        </div>
        <div className="h-14 w-full flex items-center gap-3 bg-[#D7143A] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image
            src="/icons/pinterest-icon.svg"
            alt=""
            width={30}
            height={30}
          />
          Pinterest
        </div>
        <div className="h-14 w-full flex items-center gap-3 bg-[#4989F5] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image
            src="/icons/google-my-business-icon.svg"
            alt=""
            width={30}
            height={30}
          />
          Google business
        </div>
        <div className="h-14 w-full flex items-center gap-3 bg-[#314358] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image src="/icons/tumblr-icon.svg" alt="" width={30} height={30} />
          Blogger
        </div>
        <div className="h-14 w-full flex items-center gap-3 bg-[#FF4500] hover:bg-opacity-90 transition-all duration-300 rounded-xl py-2.5 px-8 text-white">
          <Image src="/icons/reddit-icon.svg" alt="" width={40} height={40} />
          Reddit
        </div>
      </div>
      <p className="text-primary-black text-opacity-70 mt-6">
        You will have <span className="font-semibold">4</span> profiles
        remaining in your current plan.
      </p>
      <div className="flex justify-end gap-4">
        <Link href="/app/publish/scheduler/quick-posting/posting">
          <button className="h-12 py-3.5 px-10 bg-primary-green sheen rounded-xl text-white mt-6">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
