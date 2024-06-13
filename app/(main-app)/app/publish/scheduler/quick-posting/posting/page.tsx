import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Posting() {
  return (
    <div className="w-full flex gap-5">
      <div className="w-full shadow-box !bg-white p-10 pb-16 rounded-3xl flex flex-col items-center justify-center space-y-5">
        <Image src="/gifs/quickposting.gif" alt="" width={300} height={300} unoptimized className="max-h-[300px] min-h-[300px]" />
        <h1 className="text-2xl font-semibold text-center">Quick posting</h1>
        <p className="text-primary-black text-opacity-70 text-center text-[16px] leading-relaxed max-w-2xl">
          Lorem ipsum dolor sit amet consectetur. Tristique lacinia donec iaculis turpis justo id gravida quam fusce.
        </p>
        <Link href="/app/publish/scheduler/quick-posting">
          <button className="h-14 py-3.5 px-10 bg-primary-green sheen rounded-xl text-white mt-6">Go to Quick posting</button>
        </Link>
      </div>
      <div className="w-full shadow-box !bg-white p-10 pb-16 rounded-3xl flex flex-col items-center justify-center space-y-5">
        <Image src="/gifs/multitasking.gif" alt="" width={550} height={550} unoptimized className="max-h-[300px] min-h-[300px]" />
        <h1 className="text-2xl font-semibold text-center">Multi posting</h1>
        <p className="text-primary-black text-opacity-70 text-center text-[16px] leading-relaxed max-w-2xl">
          Lorem ipsum dolor sit amet consectetur. Tristique lacinia donec iaculis turpis justo id gravida quam fusce.
        </p>
        <Link href="/app/publish/scheduler/multi-posting">
          <button className="h-14 py-3.5 px-10 bg-primary-green sheen rounded-xl text-white mt-6">Go to Multi posting</button>
        </Link>
      </div>
    </div>
  );
}
