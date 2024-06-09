"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RatingStars from "@/components/ui/rating";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Review } from "@/types/reviews";
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
import { ChevronDown, Download } from "lucide-react";
import Image from "next/image";
import { sampleReviews } from "./data/reviews";
import RespondDialog from "./dialogs/RespondDialog";
import { useState } from "react";
import { MdOutlineRefresh } from "react-icons/md";

export const columns: ColumnDef<Review>[] = [
  {
    id: "date",
    accessorKey: "date",
    header: () => <div>Date</div>,
    cell: ({ row }) => <div>{row.original.date}</div>,
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3">
        <Image src="/icons/google.svg" alt="" width={30} height={30} />
        {row.getValue("source")}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <RatingStars rating={row.getValue("rating")} />
        <span className="ml-2 text-[15px] font-medium">{row.getValue("rating")}</span>
      </div>
    ),
  },
  {
    accessorKey: "review",
    header: () => "Review",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p>{row.getValue("review")}</p>
        <span className="text-xs text-primary-black text-opacity-50">Reviewer: {row.original.reviewer}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "pending" | "approved" | "rejected";
      const statusClasses = {
        pending: "text-yellow-500",
        approved: "text-green-500",
        rejected: "text-red-500",
      };

      return <div className={`text-left font-medium ${statusClasses[status] || ""}`}>{status}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <RespondDialog reviewData={row.original} />;
    },
  },
];

export default function ReviewsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: sampleReviews,
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
      <div className="flex items-center justify-between gap-5">
        <h1 className="text-xl font-semibold">Reviews</h1>
        <div className="flex items-center justify-end py-4 gap-2">
          <Select
            onValueChange={(value) => {
              if (value === "All Sources") return table.resetColumnFilters();
              table.getColumn("source")?.setFilterValue(value);
            }}>
            <SelectTrigger className="w-full h-12 rounded-lg max-w-[132px] border border-primary-green bg-white text-primary-green">
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Sources">All Sources</SelectItem>
              <SelectItem value="Google">Google</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
              <SelectItem value="Yelp">Yelp</SelectItem>
              <SelectItem value="TripAdvisor">TripAdvisor</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-full h-12 rounded-lg max-w-[132px] border border-primary-green bg-white text-primary-green">
              <Button variant="outline" className="px-2 font-normal">
                Columns <ChevronDown className="ml-4 h-5 w-5 opacity-70" />
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
            <SelectTrigger className="w-full h-12 rounded-lg max-w-[132px] border border-primary-green bg-white text-primary-green">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Time">All Time</SelectItem>
              <SelectItem value="2024s">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
          <button className="h-12 bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap">
            Reset
            <MdOutlineRefresh size={20} />
          </button>
          <button className="h-12 bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-3 rounded-lg flex items-center gap-2 whitespace-nowrap">
            <Download size={20} />
            CSV
          </button>
        </div>
      </div>
      <div className="rounded-2xl border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-[#0347370D] rounded-t-2xl">
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
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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
    </div>
  );
}
