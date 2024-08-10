import { Plus, Search } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";
import BrandsTable from "./components/BrandsTable";

export default function BrandVoice() {
  return (
    <Fragment>
      <main className="space-y-7">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Brand Voice</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px] leading-relaxed">
              Create unique AI-generated content tailored specifically for your brand, eliminating the need for repetitive company introductions.
            </p>
          </div>
          <div className="w-full max-w-fit flex justify-end gap-2">
            <Link href="/app/plan/brand-voice/new">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2">
                <Plus size={20} />
                Add new brand
              </button>
            </Link>
          </div>
        </div>
        <BrandsTable />
      </main>
    </Fragment>
  );
}
