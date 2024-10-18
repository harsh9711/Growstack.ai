"use client";

import Motion from "@/components/Motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Edit3, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import AddSegment from "../dialogs/AddSegment";

type Contact = {
  no: number;
  segments: string;
};

const data: Contact[] = [
  {
    no: 1,
    segments: "Default",
  },
  {
    no: 2,
    segments: "Default",
  },
  {
    no: 3,
    segments: "Default",
  },
];

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "no",
    header: ({ table }) => (
      <div className="uppercase flex items-center gap-4">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className="w-[18px] h-[18px]"
        />
        #
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
        {row.getValue("no")}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "segments",
    header: () => <div className="uppercase">Segments</div>,
    cell: ({ row }) => (
      <p className="flex gap-2 items-center">{row.getValue("segments")}</p>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="uppercase">Status</div>,
    cell: ({ row }) => (
      <p className="flex gap-2 items-center">
        <Switch />
      </p>
    ),
  },
  {
    id: "actions",
    header: () => <div className="uppercase">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
          <Edit3 size={20} className="text-gray-800 cursor-pointer" />
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

export default function SegmentsSection() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
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
      <div className="w-full bg-white mt-10 rounded-3xl border border-[#E4E4E4]">
        <div className="flex justify-between items-center px-7 pt-5">
          <h1 className="text-2xl font-semibold">Segments list</h1>
          <div className="flex justify-end gap-3 items-center w-full max-w-xl">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search"
              />
            </div>
            <AddSegment />
          </div>
        </div>
        <div className="rounded-b-3xl overflow-hidden mt-5 min-h-[50vh]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-white"
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-white">
                  <TableCell
                    colSpan={columns.length}
                    className="h-[50vh] text-center font-semibold text-lg hover:bg-white"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Motion>
  );
}
