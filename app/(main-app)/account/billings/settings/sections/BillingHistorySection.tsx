"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { MailIcon, Phone, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { billHistoryData } from "./data/billhistory";
import { BillHistory } from "@/types/billHistory";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

const statusStyles = {
  Overdue: {
    text: "text-[#CF0000]",
    bg: "bg-[#FF00001A]",
  },
  Paid: {
    text: "text-primary-green",
    bg: "bg-[#0347371A]",
  },
  Pending: {
    text: "text-yellow-800",
    bg: "bg-yellow-100",
  },
};

export const columns: ColumnDef<BillHistory>[] = [
  {
    accessorKey: "_id",
    header: () => <div className="uppercase">ID</div>,
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "user_id",
    header: () => <div className="uppercase">User ID</div>,
    cell: ({ row }) => <div>{row.getValue("user_id")}</div>,
  },
  {
    accessorKey: "plan_id",
    header: () => <div className="uppercase">Plan ID</div>,
    cell: ({ row }) => <div>{row.getValue("plan_id")}</div>,
  },
  {
    accessorKey: "Invoice",
    header: () => <div className="uppercase">Invoice</div>,
    cell: ({ row }) => <div>{row.getValue("payment_id")}</div>,
  },
  {
    accessorKey: "payment_type",
    header: () => <div className="uppercase">Payment Type</div>,
    cell: ({ row }) => <div>{row.getValue("payment_type")}</div>,
  },
  // {
  //   accessorKey: "stripe_customer_id",
  //   header: () => <div className="uppercase">Stripe Customer ID</div>,
  //   cell: ({ row }) => <div>{row.getValue("stripe_customer_id")}</div>,
  // },
  // {
  //   accessorKey: "stripe_session_id",
  //   header: () => <div className="uppercase">Stripe Session ID</div>,
  //   cell: ({ row }) => <div>{row.getValue("stripe_session_id")}</div>,
  // },
  {
    accessorKey: "amount",
    header: () => <div className="uppercase">Amount</div>,
    cell: ({ row }) => <div>${row.getValue("amount")}</div>,
  },
 
  {
    accessorKey: "status",
    header: () => <div className="uppercase">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusClass = statusStyles[status as keyof typeof statusStyles] || { text: "", bg: "" };
  
      return (
        <div className={`flex gap-2 items-center py-2 px-3 rounded-lg max-w-fit ${statusClass.bg}`}>
          <p className={statusClass.text}>{status}</p>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "payment_date",
  //   header: () => <div className="uppercase">Payment Date</div>,
  //   cell: ({ row }) => <div>{new Date(row.getValue("payment_date")).toLocaleDateString()}</div>,
  // },
  
  {
    accessorKey: "createdAt",
    header: () => <div className="uppercase">Created At</div>,
    cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>,
  },
  // {
  //   accessorKey: "updatedAt",
  //   header: () => <div className="uppercase">Updated At</div>,
  //   cell: ({ row }) => <div>{new Date(row.getValue("updatedAt")).toLocaleString()}</div>,
  // },
  {
    id: "actions",
    header: () => <div className="uppercase">Actions</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-between max-w-[200px]">
        <button className="hover:bg-primary-green/10 sheen px-3 py-2 text-primary-green font-medium rounded-lg transition-all duration-300">View</button>
        <button className="hover:bg-primary-green/10 sheen px-3 py-2 text-primary-green font-medium rounded-lg transition-all duration-300">Pay</button>
      </div>
    ),
  },
];


export default function BillingHistorySection() {
    const [data, setData] = useState<BillHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);  
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${API_URL}/users/api/v1/payments`);
        if (!response) {
          throw new Error('Network response was not ok');
        }
        const result = await response.data;
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const table = useReactTable({
    data: billHistoryData,
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
        <div className="rounded-lg border overflow-hidden mt-10 bg-white min-h-[50vh]">
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
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {table.getPageCount() > 1 ? (
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-2 items-center">{paginationButtons}</div>
              <div className="flex gap-4 items-center">
                <Button
                  className="bg-[#4B465C29] border-none h-[45px] px-4"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}>
                  Previous
                </Button>
                <Button
                  className="bg-[#4B465C29] border-none h-[45px] px-4"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}>
                  Next
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Motion>
  );
}
