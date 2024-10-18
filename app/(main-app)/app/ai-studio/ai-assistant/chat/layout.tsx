"use client";

import { ArrowBack } from "@/components/svgs";
import { useRouter } from "next/navigation";
import React from "react";

export default function AiAssistantChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col mt-6">
      <button
        onClick={() => router.back()}
        className="mb-3 max-w-fit text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-1.5 rounded-full font-medium items-center transition-all duration-300"
      >
        <ArrowBack />
        Back
      </button>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
