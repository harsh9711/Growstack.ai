"use client";
import React, { useState, useEffect } from "react";
import DocumentsTable from "./DocumentsTable";
import { Plus, Search } from "lucide-react";
import CreateBrandVoice from "./components/createBrandVoice";

export default function BrandVoice() {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [openCreateBrandVoice, setOpenCreateBrandVoice] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="align-top">
            <h1 className="text-2xl font-semibold">Brand voice</h1>
            <p style={{ opacity: "50%" }}>
              Choose different brand voices to use in various instances - ensuring consistency of your AI-generated content.
            </p>
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-md flex gap-3 items-center w-[30%] mt-2 cursor-text">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[30px] w-full"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
            </div>

          </div>
          <button
            onClick={() => setOpenCreateBrandVoice(true)}
            className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2"
          >
            <Plus size={20} />
            Create brand voice
          </button>
        </div>

        <div className="mt-5">
          <DocumentsTable search={debouncedSearch} />
        </div>
      </div>

      <CreateBrandVoice
        isOpen={openCreateBrandVoice}
        setIsOpen={setOpenCreateBrandVoice}
      />
    </div>
  );
}
