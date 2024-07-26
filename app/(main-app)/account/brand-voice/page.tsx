import React from "react";
import DocumentsTable from "./DocumentsTable";

export default function BrandVoice() {
  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold">All brand voice</h1>
        <div className="bg-white border rounded-3xl mt-5">
          <DocumentsTable />
        </div>
      </div>
    </div>
  );
}
