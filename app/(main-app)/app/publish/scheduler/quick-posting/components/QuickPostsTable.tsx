"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuickPost } from "@/types/quickposts";
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
import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { quickposts } from "./data/posts";

export const columns: ColumnDef<QuickPost>[] = [
  {
    accessorKey: "name",
    header: ({ table }) => (
      <div className="uppercase flex gap-3">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="w-[18px] h-[18px]"
        />
        <span>Name</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="w-[18px] h-[18px]"
        />
        <span>{row.getValue("name")}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "created_on",
    header: () => <div>Updated</div>,
    cell: ({ row }) => (
      <div className="flex gap-3">
        <span>
          {row.original.created_on.date} at {row.original.created_on.time}
        </span>
      </div>
    ),
  },

  {
    id: "actions",
    header: () => <div>Action</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <span className="hover:bg-gray-200 p-1.5 transition-all rounded-lg cursor-pointer">
            <Trash2 size={18} />
          </span>
        </div>
      );
    },
  },
];

export default function QuickPostsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: quickposts,
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
    <Motion transition={{ duration: 0.4 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="w-full">
        <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full">
          <Search className="text-gray-500" size={20} />
          <input type="search" className="outline-none h-[35px] w-full" placeholder="Search" />
        </div>
        <div className="rounded-lg border overflow-hidden mt-5 bg-white min-h-[30vh]">
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
                  <TableCell colSpan={columns.length} className="h-[30vh] text-center font-semibold text-lg hover:bg-white">
                    No logs found.
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
