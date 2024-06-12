"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BulkAction } from "@/types/bulkactions";
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
import { ChevronDown, Download, MoreVertical, Search } from "lucide-react";
import { useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";
import { bulkdata } from "./data/bulkdata";

export const columns: ColumnDef<BulkAction>[] = [
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
    cell: ({ row }) => <div className="capitalize flex items-center gap-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "bulk_operation",
    header: "BULK OPERATION (TYPE)",
    cell: ({ row }) => <div className="flex items-center gap-2">{row.getValue("bulk_operation")}</div>,
  },
  {
    accessorKey: "status",
    header: () => "STATUS",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2">
        <p className="text-[#00A006] capitalize text-[15px]">{row.getValue("status")}</p>
        <span className="text-xs cursor-pointer">View details </span>
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
    accessorKey: "user",
    header: () => "USER",
    cell: ({ row }) => <div>{row.getValue("user")}</div>,
  },
  {
    accessorKey: "completed_on",
    header: () => "COMPLETED",
    cell: ({ row }) => (
      <div className="flex gap-3">
        <span>{row.original.completed_on.date}</span>
        <span>{row.original.completed_on.time}</span>
      </div>
    ),
  },
  {
    accessorKey: "statistics",
    header: () => "STATISTICS",
    cell: ({ row }) => <div className="flex gap-3 text-primary-green font-medium cursor-pointer">Show Statistics</div>,
  },
  {
    id: "actions",
    header: () => <div className="uppercase">Action</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-2 hover:bg-gray-200 h-10 w-10 rounded-full">
                <MoreVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="gap-2 w-[250px]">
                <MdOutlineRefresh size={20} />
                Restore
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default function BulkActionsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: bulkdata,
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
          <div className="flex items-center justify-end gap-2">
            <Select>
              <SelectTrigger className="w-full h-12 rounded-lg border border-primary-green bg-white text-primary-green">
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Sources">All Actions</SelectItem>
                <SelectItem value="Bulk contact delete">Bulk contact delete</SelectItem>
                <SelectItem value="Bulk contact update">Bulk contact update</SelectItem>
                <SelectItem value="Bulk contact create">Bulk contact create</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full h-12 rounded-lg border border-primary-green bg-white text-primary-green">
                <SelectValue placeholder="All Users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Users">All Users</SelectItem>
                <SelectItem value="Bulk contact delete">Bulk contact delete</SelectItem>
                <SelectItem value="Bulk contact update">Bulk contact update</SelectItem>
                <SelectItem value="Bulk contact create">Bulk contact create</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full h-12 rounded-lg border border-primary-green bg-white text-primary-green">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any Status">Any status</SelectItem>
                <SelectItem value="complete">complete</SelectItem>
                <SelectItem value="In progress">In progress</SelectItem>
                <SelectItem value="Incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full h-12 rounded-lg border border-primary-green bg-white text-primary-green">
                <Button variant="outline" className="px-2 font-normal">
                  Columns <ChevronDown className="ml-4 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Select>
              <SelectTrigger className="w-full h-12 rounded-lg border border-primary-green bg-white text-primary-green">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sun, Apr 14th - Thu, Jub 13th">Sun, Apr 14th - Thu, Jub 13th</SelectItem>
                <SelectItem value="Sun, Apr 14th - Thu, Jub 13th">Sun, Apr 14th - Thu, Jub 13th</SelectItem>
                <SelectItem value="Sun, Apr 14th - Thu, Jub 13th">Sun, Apr 14th - Thu, Jub 13th</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
        </div>
        <div className="rounded-lg border overflow-hidden mt-5 h-[60vh] bg-white">
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
    </Motion>
  );
}
