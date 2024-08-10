import React, { Fragment } from "react";
import MultiPostsTable from "./MultiPostsTable";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function MultipostingPage() {
  return (
    <Fragment>
      <main>
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Scheduler</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[16px]">Multiposting </p>
          </div>
          <Link href="/app/publish/scheduler/multi-posting/create" className="w-full max-w-fit">
            <button className="h-12 bg-primary-green py-3 px-5 sheen flex items-center gap-3 rounded-xl text-white">
              <Plus size={20} />
              <span className="font-medium">Add new</span>
            </button>
          </Link>
        </div>
        <MultiPostsTable />
      </main>
    </Fragment>
  );
}
