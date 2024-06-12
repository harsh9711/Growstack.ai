"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Assistant } from "@/types/assistants";
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
import { Check, Edit2, Search, Trash2, XIcon } from "lucide-react";
import { useState } from "react";
import { assistants } from "./data/assistants";

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
    accessorKey: "name",
    header: () => <div className="uppercase">Assistant Name</div>,
    cell: ({ row }) => <div className="capitalize flex items-center gap-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="uppercase">Assistant Description</div>,
    cell: ({ row }) => <p>{row.getValue("description")}</p>,
  },

  {
    accessorKey: "status",
    header: () => <div className="uppercase">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as "active" | "inactive" | "disabled";
      const statusClasses = {
        active: "text-green-500",
        inactive: "text-yellow-500",
        disabled: "text-red-500",
      };

      return <div className={`text-left font-medium capitalize ${statusClasses[status] || ""}`}>{status}</div>;
    },
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
    id: "actions",
    header: () => <div className="uppercase">Action</div>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <Edit2 size={15} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <Trash2 size={15} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <XIcon size={15} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <Check size={15} />
          </button>
        </div>
      );
    },
  },
];

export default function AssistantsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: assistants,
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
    <div className="w-full">
      <div className="flex justify-between gap-10 items-center mt-5">
        <h1 className="text-xl font-semibold">My own assistants lists</h1>
        <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
          <Search className="text-gray-500" size={20} />
          <input type="search" className="outline-none h-[40px] w-full" placeholder="Search" />
        </div>
      </div>
      <div className="rounded-lg border overflow-hidden mt-5 bg-white min-h-[50vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
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
                <TableCell colSpan={columns.length} className="h-24 text-center font-semibold text-lg hover:bg-white">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getRowModel().rows?.length && (
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
      )}
    </div>
  );
}
