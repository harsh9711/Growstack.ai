"use client";

import React from "react";
import DocumentsTable from "./DocumentsTable";
import { ArrowBack } from "@/components/svgs";
import { useRouter } from "next/navigation";

export default function SavedDocuments() {
  const router = useRouter();

  return (
    <div>
      <div className="mt-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-semibold">All documents</h1>
          <button
            onClick={() => router.back()}
            className="text-[#212833] bg-primary-green/10 hover:bg-primary-green/20 sheen flex gap-2 px-3.5 py-1.5 rounded-full font-medium items-center">
            <ArrowBack />
            Back
          </button>
        </div>
        <div className="bg-white border rounded-3xl mt-5">
          <DocumentsTable />
        </div>
      </div>
    </div>
  );
}
