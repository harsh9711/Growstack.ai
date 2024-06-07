import Motion from "@/components/Motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MainSection() {
  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="bg-white border border-[#E4E4E4] rounded-3xl p-20 flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-center">Monitor your reputation on all major review sites!</h1>
        <p className="text-primary-black text-opacity-50 max-w-4xl text-center mx-auto mt-3 leading-relaxed">
          Set up your first review tracking report to start monitoring your reputation across the web. Get alerts for new reviews, respond to them quickly, and
          track changes to your reputation score over time.
        </p>
        <Link href="/app/reputation-manager/create-report">
          <button className="py-4 px-6 bg-primary-green hover:bg-opacity-90 rounded-xl text-white mt-6">Create reputation manager report</button>
        </Link>
        <div className="mx-auto max-h-[430px] mt-10 max-w-fit relative">
          <div className="bg-black bg-opacity-70 absolute inset-0 w-full h-full z-[1] rounded-3xl"></div>
          <button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2] hover:scale-110 transition-all duration-150">
            <Image src="/icons/play-btn.svg" alt="" width={100} height={100} />
          </button>
          <Image src="/assets/reputation-vid.png" alt="" width={1000} height={2000} />
        </div>
      </div>
    </Motion>
  );
}
