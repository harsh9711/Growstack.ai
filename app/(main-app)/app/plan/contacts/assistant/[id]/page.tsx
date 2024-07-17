"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Motion from "@/components/Motion";
import { API_URL } from "@/lib/api";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, Phone } from "lucide-react";
import FilterSheet from "../../components/FilterSheet";

interface Assistant {
  _id: string;
  name: string;
  phone: string;
  website: string;
  email: string;
  created_on: {
    date: string;
    time: string;
  };
  last_activity: string;
  tags: string[];
  profile_image: string;
}

interface PageProps {
  params: {
    id: string;
  };
}

const columns: ColumnDef<Assistant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
    accessorKey: "business_name",
    header: () => <div className="uppercase">Business Name</div>,
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3">
        {row.getValue("business_name")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="uppercase">Phone</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone size={20} className="text-primary-green" />
        <span>{row.getValue("phone")}</span>
      </div>
    ),
  },
  {
    accessorKey: "website",
    header: () => <div className="uppercase">Website</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>{row.getValue("website")}</span>
      </div>
    ),
  },
  {
    accessorKey: "created_on",
    header: () => <div className="uppercase">Created</div>,
    cell: ({ row }) => (
      <div className="flex gap-3">
        <span>{row.original.created_on.date}</span>
        <span>{row.original.created_on.time}</span>
      </div>
    ),
  },
];

const ContactsTable: React.FC<PageProps> = ({ params: { id } }) => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAssistants = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(`${API_URL}/users/api/v1/contacts/prospects/${id}`);
        const { businesses } = response.data.data;

        const formattedAssistants = businesses.map((assistant: any) => ({
          business_name: assistant.business_name || "-",
          phone: assistant.business_contact?.phone || "-",
          email: assistant?.business_contact?.email || "-",
          website: assistant?.website || "-",
          created_on: {
            date: new Date(assistant.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            time: new Date(assistant.createdAt).toLocaleTimeString(),
          },
          last_activity: formatLastActivity(new Date(assistant.updatedAt)),
          tags: assistant.tags || [],
          profile_image: assistant.profile_image || "",
        }));

        setAssistants(formattedAssistants);
      } catch (error) {
        console.error("Error fetching assistants:", error);
        toast.error("Failed to fetch assistants. Please try again.");
      } finally {
        setIsPending(false);
      }
    };

    fetchAssistants();
  }, [id]);

  const formatLastActivity = (updatedAt: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      return updatedAt.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

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
          i === table.getState().pagination.pageIndex
            ? "!bg-primary-green hover:bg-opacity-50 text-white"
            : "hover:bg-[#4B465C29]"
        )}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
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
            />
          </div>
          <FilterSheet />
        </div>
        <div className="rounded-lg border overflow-hidden mt-5">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {isPending ? "Loading data..." : "No data available"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-center py-8">
          {paginationButtons}
        </div>
      </div>
    </Motion>
  );
};

export default ContactsTable;
