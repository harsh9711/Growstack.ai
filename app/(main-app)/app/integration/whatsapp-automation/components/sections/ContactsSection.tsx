"use client";

import Motion from "@/components/Motion";
import { CancelIcon, MessageDotsIcon } from "@/components/svgs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
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
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AddContactDialog from "../dialogs/AddContactDialog";
import Link from "next/link";

type Contact = {
  no: number;
  contact: {
    image: string;
    name: string;
  };
};

const data: Contact[] = [
  {
    no: 1,
    contact: {
      image: "/dummy/person-0.png",
      name: "Floyd Miles",
    },
  },
  {
    no: 2,
    contact: {
      image: "/dummy/person-2.png",
      name: "Leslie Alexander",
    },
  },
  {
    no: 3,
    contact: {
      image: "/dummy/person-3.png",
      name: "Savannah Nguyen",
    },
  },
];

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
    accessorKey: "no",
    header: () => <div className="uppercase">#</div>,
    cell: ({ row }) => <div className="capitalize flex items-center gap-3">{row.getValue("no")}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="uppercase">Name</div>,
    cell: ({ row }) => (
      <p className="flex gap-3 items-center">
        <Image src={row.original.contact.image} alt="" width={160} height={160} className="h-[40px] w-[40px] rounded-full object-cover" />
        <span className="text-primary-black font-medium">{row.original.contact.name}</span>
      </p>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="uppercase">Phone</div>,
    cell: ({ row }) => <p className="flex gap-2 items-center">+*************</p>,
  },
  {
    accessorKey: "readby",
    header: () => <div className="uppercase">Contact list</div>,
    cell: ({ row }) => <p className="flex gap-2 items-center">Uncategorized</p>,
  },
  {
    id: "status",
    header: () => <div className="uppercase">Segments</div>,
    cell: ({ row }) => <div>Default</div>,
  },
  {
    id: "status",
    header: () => <div className="uppercase">Status</div>,
    cell: ({ row }) => <Switch />,
  },
  {
    id: "actions",
    header: () => <div className="uppercase">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
          <MessageDotsIcon size={20} className="text-gray-800 cursor-pointer" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
          <Edit3 size={20} className="text-gray-800 cursor-pointer" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
          <Trash2 size={20} className="text-gray-800 cursor-pointer" />
        </button>
        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
          <CancelIcon size={20} className="text-gray-800 cursor-pointer" />
        </button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];

export default function RestoreContactsTable() {
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
          i === table.getState().pagination.pageIndex ? "!bg-primary-green hover:bg-opacity-50 text-white" : "hover:bg-[#4B465C29]"
        )}>
        {i + 1}
      </button>
    );
  }

  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="w-full bg-white mt-10 rounded-3xl border border-[#E4E4E4]">
        <div className="flex justify-between items-center px-7 pt-5">
          <h1 className="text-2xl font-semibold">Contacts management</h1>
          <div className="flex justify-end gap-3 items-center w-full max-w-5xl">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full">
              <Search className="text-gray-500" size={20} />
              <input type="search" className="outline-none h-[40px] w-full" placeholder="Search" />
            </div>
            <Link href="/app/integration/whatsapp-automation/create/new-contact">
              <button className="flex items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit whitespace-nowrap">
                <Plus size={20} /> Add new contact
              </button>
            </Link>
            <button className="flex items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit">Segments</button>
            <button className="flex items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit">Import</button>
          </div>
        </div>
        <div className=" overflow-hidden mt-5 min-h-[50vh]">
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
    </Motion>
  );
}
