import Motion from "@/components/Motion";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
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
import RespondDialog from "./subsections/components/dialogs/RespondDialog";
import RatingStars from "@/components/ui/rating";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

export interface Document {
  report: string;
  date: string;
  source: string;
  rating: number;
  review: string;
  status: "pending" | "approved" | "rejected";
  reviewer: string;
  reviewText: string;
}

export const columns: ColumnDef<Document>[] = [
  {
    id: "report",
    accessorKey: "report",
    header: ({ table }) => (
      <div className="flex gap-2 items-center">
        {/* <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />{" "} */}
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <rect x="1.14883" y="1.00136" width="14.7341" height="14.7341" rx="3.30246" fill="#F2F9FE" />
          <rect x="1.14883" y="1.00136" width="14.7341" height="14.7341" rx="3.30246" stroke="#034737" stroke-width="1.52421" />
          <path
            d="M7.35937 11.35C7.19679 11.35 7.04234 11.285 6.92853 11.1712L4.62798 8.87061C4.39224 8.63487 4.39224 8.24467 4.62798 8.00892C4.86373 7.77318 5.25392 7.77318 5.48967 8.00892L7.35937 9.87863L11.5378 5.70025C11.7735 5.4645 12.1637 5.4645 12.3994 5.70025C12.6352 5.93599 12.6352 6.32619 12.3994 6.56193L7.79022 11.1712C7.67641 11.285 7.52196 11.35 7.35937 11.35Z"
            fill="#034737"
          />
        </svg>
        REPORT
      </div>
    ),
    cell: ({ row }) => (
      <div>
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value: any) => row.toggleSelected(!!value)} aria-label="Select row" /> {row.original.report}
      </div>
    ),
  },
  {
    id: "date",
    accessorKey: "DATE",
    header: () => <div>DATE</div>,
    cell: ({ row }) => <div> {row.original.date}</div>,
  },
  {
    accessorKey: "source",
    header: "SOURCE",
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3">
        <Image src="/icons/google.svg" alt="" width={30} height={30} />
        {row.getValue("source")}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "RATING",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <RatingStars rating={row.getValue("rating")} />
        <span className="ml-2 text-[15px] font-medium">{row.getValue("rating")}</span>
      </div>
    ),
  },
  {
    accessorKey: "review",
    header: () => "REVIEW",
    cell: ({ row }) => (
      <div className="space-y-1">
        <p>{row.getValue("review")}</p>
        <span className="text-xs text-primary-black text-opacity-50">Reviewer: {row.original.reviewer}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => "STATUS",
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
    header: "ACTIONS",
    cell: ({ row }) => {
      return <RespondDialog reviewData={row.original} />;
    },
  },
];

export default function ReviewInboxSection() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: [],
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
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white border border-[#E1E1E1] p-8 rounded-3xl flex items-center hover:shadow-2xl hover:shadow-gray-200/80 cursor-pointer transition-all duration-500">
          <div className="w-full space-y-3">
            <h1 className="text-6xl">0</h1>
            <p className="text-[#4B4B4B]">Unread</p>
          </div>
          <Image src="/icons/bmail.svg" alt="" width={80} height={80} className="select-none" />
        </div>
        <div className="bg-white border border-[#E1E1E1] p-8 rounded-3xl flex items-center hover:shadow-2xl hover:shadow-gray-200/80 cursor-pointer transition-all duration-500">
          <div className="w-full space-y-3">
            <h1 className="text-6xl">0</h1>
            <p className="text-[#4B4B4B]">Attention required</p>
          </div>
          <Image src="/icons/info-circle.svg" alt="" width={80} height={80} className="select-none" />
        </div>
        <div className="bg-white border border-[#E1E1E1] p-8 rounded-3xl flex items-center hover:shadow-2xl hover:shadow-gray-200/80 cursor-pointer transition-all duration-500">
          <div className="w-full space-y-3">
            <h1 className="text-6xl">0</h1>
            <p className="text-[#4B4B4B]">Do not repond</p>
          </div>
          <Image src="/icons/forbid.svg" alt="" width={80} height={80} className="select-none" />
        </div>
        <div className="bg-white border border-[#E1E1E1] p-8 rounded-3xl flex items-center hover:shadow-2xl hover:shadow-gray-200/80 cursor-pointer transition-all duration-500">
          <div className="w-full space-y-3">
            <h1 className="text-6xl">0</h1>
            <p className="text-[#4B4B4B]">Responded</p>
          </div>
          <Image src="/icons/gcheck.svg" alt="" width={80} height={80} className="select-none" />
        </div>
      </div>
      <div className="bg-white border border-[#E4E4E4] mt-5 rounded-3xl p-8">
        <div className="flex justify-between gap-10  items-center">
          <h1 className="text-2xl font-semibold">All my documents</h1>
          <div className="border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
            <Search className="text-gray-500" size={20} />
            <input type="search" className="bg-transparent outline-none h-[40px] w-full" placeholder="Search" />
          </div>
        </div>
        <div className="rounded-2xl border overflow-hidden mt-8">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#0347370D] rounded-t-2xl">
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
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-[50vh] text-center font-semibold text-[17px]">
                    Sorry, no reviews were found that match your chosen filter(s). Try choosing different filers.
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
    </Motion>
  );
}
