"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConnectAccount() {
  const params = useSearchParams();

  // State to keep track of checked pages
  const [checkedPages, setCheckedPages] = useState<string[]>([]);

  // Function to handle checkbox change
  const handleCheckboxChange = (pageName: string) => {
    if (checkedPages.includes(pageName)) {
      setCheckedPages(prev => prev.filter(item => item !== pageName));
    } else {
      setCheckedPages(prev => [...prev, pageName]);
    }
  };

  // Function to toggle select all / unselect all
  const handleSelectAll = () => {
    if (checkedPages.length === dummyPages.length) {
      // If all pages are already checked, clear the selection
      setCheckedPages([]);
    } else {
      // Otherwise, select all pages
      setCheckedPages(dummyPages.map(page => page.name));
    }
  };

  // Effect to update select all label dynamically
  useEffect(() => {
    const allSelected = checkedPages.length === dummyPages.length;
    setSelectAllLabel(allSelected ? "Remove all" : "Select all");
  }, [checkedPages]);

  // Dummy pages data
  const dummyPages = [
    {
      name: "DeadShot08 Gaming",
      imageUrl: "/dummy/dummy-page1.png",
      username: "DeadShot_gaming",
    },
    {
      name: "aamazon.in_",
      imageUrl: "/dummy/dummy-page2.png",
      username: "aamazon.in_",
    },
  ];

  // State for select all label
  const [selectAllLabel, setSelectAllLabel] = useState("Select all");

  return (
    <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-2xl shadow-gray-400 space-y-6">
      <h1 className="text-[28px] font-semibold">
        Choose {params.get("profile")} page
      </h1>
      <div className="flex justify-end !mt-2">
        {/* Toggle select all / unselect all */}
        <p
          className="underline text-primary-green cursor-pointer font-medium"
          onClick={handleSelectAll}
        >
          {selectAllLabel}
        </p>
      </div>
      <div className="space-y-4">
        {dummyPages.map((page, index) => (
          <div
            key={index}
            onClick={() => handleCheckboxChange(page.name)}
            className="bg-[#F9F9F9] hover:bg-[#F0F0F0] transition-all duration-300 cursor-pointer rounded-3xl p-5 w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
              <Image src={page.imageUrl} alt="" width={60} height={60} />
              <div className="space-y-2">
                <h1 className="text-xl font-semibold">{page.name}</h1>
                <p className="text-primary-black text-opacity-50">
                  {page.username}
                </p>
              </div>
            </div>
            <Checkbox
              checked={checkedPages.includes(page.name)}
              onCheckedChange={() => handleCheckboxChange(page.name)}
            />
          </div>
        ))}
      </div>
      <p className="text-primary-black text-opacity-70">
        You will have <span className="font-semibold">4</span> profiles
        remaining in your current plan.
      </p>
      <div className="flex justify-end gap-4">
        <Link href="/app/publish/scheduler/quick-posting/profiles">
          <button className="h-12 py-3.5 px-10 bg-white border border-primary-green text-primary-green rounded-xl mt-6">
            Back
          </button>
        </Link>
        <Link
          href={{
            pathname:
              "/app/publish/scheduler/quick-posting/profiles/connect-account/finish",
            query: { profile: params.get("profile") },
          }}
        >
          <button className="h-12 py-3.5 px-10 bg-primary-green sheen rounded-xl text-white mt-6">
            Connect
          </button>
        </Link>
      </div>
    </div>
  );
}
