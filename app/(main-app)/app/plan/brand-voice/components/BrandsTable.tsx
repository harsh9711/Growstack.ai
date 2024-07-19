"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { brands } from "./data";
interface Brand {
  name: string;
  description: string;
  products: number;
}
export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: () => <div className="uppercase">Brand Name</div>,
    cell: ({ row }) => <div className="capitalize flex items-center gap-3">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: () => <div className="uppercase">Description</div>,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <p>{row.getValue("description")}</p>
      </div>
    ),
  },
  {
    accessorKey: "products",
    header: () => <div className="uppercase">Products</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span>{row.getValue("products")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="uppercase">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
          <Edit size={20} className="text-gray-800 cursor-pointer" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
          <Trash2 size={20} className="text-gray-800 cursor-pointer" />
        </button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default function BrandsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: brands,
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
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">My brand voices</h2>
          <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
            <Search className="text-gray-500" size={20} />
            <input type="search" className="outline-none h-[40px] w-full" placeholder="Search" />
          </div>
        </div>
        <div className="bg-white rounded-lg border overflow-hidden mt-5 min-h-[50vh]">
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
