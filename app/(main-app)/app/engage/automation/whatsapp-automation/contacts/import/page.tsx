import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ImportDataPage() {
  return (
    <div className="mt-8 flex-1 h-full w-full flex flex-col">
      <Link href="/app/integration/whatsapp-automation">
        <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2 rounded-full font-medium items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M11.8687 15.6313C12.2104 15.973 12.2104 16.527 11.8687 16.8687C11.527 17.2104 10.973 17.2104 10.6313 16.8687L11.8687 15.6313ZM6.25 11.25L5.63128 11.8687C5.46719 11.7046 5.375 11.4821 5.375 11.25C5.375 11.0179 5.46719 10.7954 5.63128 10.6313L6.25 11.25ZM10.6313 5.63128C10.973 5.28957 11.527 5.28957 11.8687 5.63128C12.2104 5.97299 12.2104 6.52701 11.8687 6.86872L10.6313 5.63128ZM6.25 12.125C5.76675 12.125 5.375 11.7332 5.375 11.25C5.375 10.7667 5.76675 10.375 6.25 10.375L6.25 12.125ZM18.75 22.125C18.2667 22.125 17.875 21.7332 17.875 21.25C17.875 20.7667 18.2667 20.375 18.75 20.375L18.75 22.125ZM10.6313 16.8687L5.63128 11.8687L6.86872 10.6313L11.8687 15.6313L10.6313 16.8687ZM5.63128 10.6313L10.6313 5.63128L11.8687 6.86872L6.86872 11.8687L5.63128 10.6313ZM6.25 10.375L20 10.375L20 12.125L6.25 12.125L6.25 10.375ZM20 10.375C23.2447 10.375 25.875 13.0053 25.875 16.25L24.125 16.25C24.125 13.9718 22.2782 12.125 20 12.125L20 10.375ZM25.875 16.25C25.875 19.4947 23.2447 22.125 20 22.125L20 20.375C22.2782 20.375 24.125 18.5282 24.125 16.25L25.875 16.25ZM20 22.125L18.75 22.125L18.75 20.375L20 20.375L20 22.125Z"
              fill="#212833"
            />
          </svg>{" "}
          Back
        </button>
      </Link>
      <div className="!bg-white shadow-box p-8 rounded-2xl mt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-4 max-w-2xl">
            <label className="font-medium">Contact photo</label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                id="contact_image"
                className="flex items-center"
              />
              <label
                htmlFor="contact_image"
                className="bg-[#F2F2F2] h-12 px-4 py-3 text-primary-black text-opacity-80 min-w-fit rounded-lg cursor-pointer"
              >
                Choose file
              </label>
            </div>
            <p className="text-sm text-[#CF0000] leading-relaxed">
              Note: Only .xlsx files are accepted. Please ensure that you upload
              the correct file format. You can download the sample file to
              understand the required structure.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="py-3.5 h-14 px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap">
              Confirm upload
            </button>
            <button className="py-3.5 h-14 px-6 border border-primary-green text-primary-green sheen rounded-xl  mt-6 flex items-center justify-center gap-3 whitespace-nowrap">
              Reset table
            </button>
            <button className="py-3.5 h-14 px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap">
              <Plus size={20} />
              Sample download
            </button>
          </div>
        </div>
        <table className="w-full border mt-8">
          <thead>
            <tr>
              <th className="border text-transparent">Name</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border text-center py-2">1</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">2</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">3</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">4</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">5</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">6</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">7</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">8</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">9</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
            <tr>
              <td className="border text-center py-2">10</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
              <td className="border text-end p-2">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
