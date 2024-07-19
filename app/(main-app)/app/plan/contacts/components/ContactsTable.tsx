"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Contact } from "@/types/contact";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { FilterIcon, MailIcon, Phone, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { contacts } from "./data/contacts";
import FilterSheet from "./FilterSheet";
import Motion from "@/components/Motion";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

export const columns: ColumnDef<Contact>[] = [
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
    accessorKey: "name",
    header: () => <div className="uppercase">Name</div>,
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3">
        <Image src={row.original.profile_image} alt="" width={100} height={100} className="h-[40px] w-[40px] object-cover rounded-full" />
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="uppercase">Phone</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone size={20} className="text-primary-green" /> <span>{row.getValue("phone")}</span>
      </div>
    ),
  },
  {
    accessorKey: "website",
    header: () => <div className="uppercase">Website</div>,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <MailIcon size={20} className="text-primary-green" />
        <p>{row.getValue("website")}</p>
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
  {
    accessorKey: "last_activity",
    header: () => "LAST ACTIVITY",
    cell: ({ row }) => <div>{row.getValue("last_activity")}</div>,
  },
  {
    id: "tags",
    header: "TAGS",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {row.original.tags.map((tag) => (
            <div className="px-3 py-2 bg-[#0347370D] rounded-md">{tag}</div>
          ))}
        </div>
      );
    },
  },
];

export default function ContactsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: contacts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,

    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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
            <input type="search" className="outline-none h-[40px] w-full" placeholder="Search" />
          </div>
     {/* <Image src="/icon1.svg" alt="icon" width={40} height={40}/> */}
          <FilterSheet />
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="bg-white">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-white">
                  <TableCell colSpan={columns.length} className="h-[50vh] text-center font-semibold text-lg hover:bg-white">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {table.getRowModel().rows?.length ? (
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2 flex">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#4B465C14] hover:bg-[#4B465C29] border-none h-[45px]"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <div>
                <div>{paginationButtons.map((u) => u)}</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-[#4B465C14] hover:bg-[#4B465C29] border-none h-[45px] px-4"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Motion>
  );
}
