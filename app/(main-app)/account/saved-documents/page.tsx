import React from "react";
import DocumentsTable from "./DocumentsTable";

export default function SavedDocuments() {
  return (
    <div>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold">All documents</h1>
        <div className="bg-white border rounded-3xl mt-5">
          <DocumentsTable />
        </div>
      </div>
    </div>
  );
}
