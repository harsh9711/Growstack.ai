import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreVertical, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";

export default function Workflows() {
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Workflows</h1>
          </div>
          <Link href="/app/create/workflow-builder/create-workflow" className="min-w-fit">
            <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2 whitespace-nowrap">
              <Plus size={20} />
              Create workflow
            </button>
          </Link>
        </div>
        <div className="flex gap-5 mt-5">
          <div className="w-full p-7 bg-white rounded-3xl border border-[#E8E8E8] flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">New workflow</h1>
              <p className="text-sm">
                Last edited <span className="font-medium text-primary-green">about 1 hour ago</span>
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-2 hover:bg-gray-100 h-10 w-10 rounded-full">
                  <MoreVertical size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                  <div className="flex gap-3">
                    <Edit size={20} />
                    <h2>Edit</h2>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                  <div className="flex gap-3">
                    <Trash2 size={20} />
                    <h2>Delete</h2>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                  <div className="flex gap-3">
                    <Copy size={20} />
                    <h2>Dublicate</h2>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full p-7 bg-white rounded-3xl border border-[#E8E8E8] flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">New workflow</h1>
              <p className="text-sm">
                Last edited <span className="font-medium text-primary-green">about 1 hour ago</span>
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-2 hover:bg-gray-100 h-10 w-10 rounded-full">
                  <MoreVertical size={20} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                  <div className="flex gap-3">
                    <Edit size={20} />
                    <h2>Edit</h2>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                  <div className="flex gap-3">
                    <Trash2 size={20} />
                    <h2>Delete</h2>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem inset className="min-w-[200px] flex justify-between gap-8 items-center my-1">
                  <div className="flex gap-3">
                    <Copy size={20} />
                    <h2>Dublicate</h2>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
