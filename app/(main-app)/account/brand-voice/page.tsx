import React from "react";
import DocumentsTable from "./DocumentsTable";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function BrandVoice() {
  return (
    <div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Add new brand</h1>

          <Link href="/account/create-brand-voice/">
            <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
              <Plus size={20} />
              Create brand voice
            </button>
          </Link>
        </div>
        <div className="bg-white border rounded-3xl mt-5">
          <DocumentsTable />
        </div>
      </div>
    </div>
  );
}
