import Motion from "@/components/Motion";
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
      </div>
    </Motion>
  );
}
