"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Campaign } from "@/types/campaign";
import { data } from "./constants/data/campaign";

const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "creator",
    header: "Creator",
    cell: ({ row }) => (
      <div className="flex items-center">
        <Image
          src={row.original.creatorAvatarUrl}
          alt=""
          width={100}
          height={100}
          className="w-10 h-10 object-cover rounded-full mr-3"
        />
        <p>{row.getValue("creator")}</p>
      </div>
    ),
  },
  {
    accessorKey: "campaign",
    header: "Campaign",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.original.campaignIcon}
          alt={row.original.campaign}
          width={200}
          height={200}
          className="w-12 h-12 mr-2"
        />
        <Link
          href={`https://${row.original.campaignUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="space-y-2"
        >
          <h1 className="font-medium">{row.getValue("campaign")}</h1>
          <p className="text-primary-black text-opacity-50">
            {row.original.campaignUrl}
          </p>
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "lastEdit",
    header: "Last Edit",
    cell: ({ row }) => (
      <div className="flex flex-col gap-2 text-[13px]">
        <span>{row.original.lastEdit.date}</span>
        <span className="text-primary-black text-opacity-50">
          {row.original.lastEdit.time}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let color;
      switch (status) {
        case "Success":
          color = "text-green-500 bg-green-500/10";
          break;
        case "Pending":
          color = "text-yellow-500 bg-yellow-500/10";
          break;
        case "Canceled":
          color = "text-red-500 bg-red-500/10";
          break;
        default:
          color = "";
      }
      return (
        <span className={`${color} py-2 px-3 rounded-full`}>
          {status as React.ReactNode}
        </span>
      );
    },
  },
];

export function CampaignTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Campaigns activity</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border-none">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className="border-none bg-[#F5F7FA] p-3"
              >
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
                  className="border-none"
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
                  className="h-24 text-center font-semibold text-lg hover:bg-white"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
