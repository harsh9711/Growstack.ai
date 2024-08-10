"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import { MailIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import FilterSheet from "./FilterSheet";
import Motion from "@/components/Motion";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";

interface Assistant {
  _id: string;
  totalprospects: string;
  title: string;
  phone: string;
  email: string;
  created_on: {
    date: string;
    time: string;
  };
  last_activity: string;
  tags: string[];
  profile_image: string;
}

export const columns: ColumnDef<Assistant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="w-[18px] h-[18px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="w-[18px] h-[18px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: () => <div className="uppercase">Name</div>,
    cell: ({ row }) => (
      <Link href={`/app/engage/contacts/assistant/${row.original._id}`}>
        <div className="capitalize flex items-center gap-3">{row.getValue("title")}</div>
      </Link>
    ),
  },

  {
    accessorKey: "totalprospects",
    header: () => <div className="uppercase">Total no of Prospect</div>,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <MailIcon size={20} className="text-primary-green" />
        <Link href={`/app/engage/contacts/assistant/${row.original._id}`}>
          {" "}
          <p>{row.getValue("totalprospects")}</p>
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "created_on",
    header: () => <div className="uppercase">Created</div>,
    cell: ({ row }) => (
      <div className="flex gap-3">
        <Link href={`/app/engage/contacts/assistant/${row.original._id}`}>
          <span>{row.original.created_on.date}</span> <span>{row.original.created_on.time}</span>
        </Link>
      </div>
    ),
  },
];

export default function ProspectsTable() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAssistants = async () => {
    setIsPending(true);
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/contacts/prospects`);
      if (response.data.data.docs) {
        const formattedAssistants = response.data.data.docs.map((assistant: any) => ({
          _id: assistant._id,
          title: assistant.title,
          created_on: {
            date: new Date(assistant.createdAt).toLocaleDateString().replace(/\//g, "-"),
            time: new Date(assistant.createdAt).toLocaleTimeString(),
          },
          businesses: assistant.businesses.map((business: any, index: number) => ({
            id: index,
            name: business.name,
            length: business.length,
          })),
          totalprospects: assistant.businesses.length || "",
        }));
        setAssistants(formattedAssistants);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const table = useReactTable({
    data: assistants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  useEffect(() => {
    table.setGlobalFilter(searchQuery);
  }, [searchQuery]);
  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => table.setPageIndex(i)}
        className={clsx(
          "w-12 h-[45px] rounded-lg mx-1 bg-[#4B465C14] transition-all duration-300",
          i === table.getState().pagination.pageIndex ? "!bg-primary-green hover:bg-opacity-50 text-white" : "hover:bg-[#4B465C29]"
        )}>
        {i + 1}
      </button>
    );
  }

  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="w-full">
        <div className="flex justify-between gap-10 items-center mt-5">
          <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
            <Search className="text-gray-500" size={20} />
            <input
              type="search"
              className="outline-none h-[40px] w-full"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />{" "}
          </div>
          {/* <div className="flex gap-x-2">
            <FilterSheet />
          </div> */}
        </div>
        <div className="rounded-lg border overflow-hidden mt-5">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow className="hover:bg-white">
                  <TableCell colSpan={columns.length} className="h-[50vh] text-center font-semibold text-lg hover:bg-white">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end mt-4">{paginationButtons}</div>
      </div>
    </Motion>
  );
}
