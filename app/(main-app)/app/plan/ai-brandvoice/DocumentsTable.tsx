"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { EllipsisVertical } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import instance from "@/config/axios.config";
import { Input } from "@/components/ui/input";

interface BrandVoice {
  _id: string;
  brand_name: string;
  brand_voice: string;
  document_url: string | null;
}
interface DocumentsTableProps {
  search: string;
} 
export default function ({ search }: DocumentsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10, 
  });
  const [documents, setDocuments] = useState<BrandVoice[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fetchBrandVoice(search, pagination.pageIndex + 1, pagination.pageSize);
  }, [search]);

  const fetchBrandVoice = async (search: string, page: number, limit: number) => {
    try {
      const response = await instance.get(
        `https://testing.growstack.ai/users/api/v1/brand-voice`,
        { params: { page, limit, search } }
      );
      const { docs, totalDocs, totalPages } = response.data.data;
      setDocuments(docs);
      setTotalDocs(totalDocs);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching brand voices", error);
    }
  };
  const columns: ColumnDef<BrandVoice>[] = [
    {
      accessorKey: "brand_name",
      header: () => <div className="uppercase flex "><Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="w-[14px] h-[14px] mr-1"
      />&nbsp; Brand&nbsp;Name</div>,
      cell: ({ row }) => <div className="capitalize flex"> <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        className="w-[14px] h-[14px] mr-1"
      />&nbsp; {row.getValue("brand_name")}</div>,
    },
    {
      accessorKey: "brand_voice",
      header: () => <div className="uppercase">Brand Voice</div>,
      cell: ({ row }) => {
        const brandVoice = row.getValue("brand_voice") as string;
    
        return (
          <div
            className="capitalize text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]"
            data-tooltip-id={`tooltip-${row.id}`}
            data-tooltip-content={brandVoice} 
          >
            {brandVoice}
         
          </div>
        );
      },
    },
    {
      accessorKey: "document_url",
      header: () => <div className="uppercase">Document</div>,
      cell: ({ row }) => (
        <a href={row.getValue("document_url")} target="_blank" rel="noopener noreferrer">
          {row.getValue("document_url") ? "View Document" : "No document"}
        </a>
      ),
    },
    {
      id: "actions",
      header: () => <div className="uppercase">Actions</div>,
      cell: ({ row }) => (
        <div className="relative flex items-center">
          <button className="p-1 hover:bg-gray-200 rounded-lg transition duration-300">
            <EllipsisVertical size={20} className="text-gray-800" />
          </button>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data: documents,
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
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        <div className="w-full bg-white border rounded-3xl">
          <div className="bg-white rounded-lg border overflow-hidden min-h-[50vh]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="bg-white">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="hover:bg-white">
                    <TableCell colSpan={columns.length} className="h-[50vh] text-center font-semibold text-lg">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Motion>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex">
          Showing
          <Button variant="outline" size="sm" className="bg-[#0347371A] border-none ml-2 mr-2">
            {pagination.pageSize}
          </Button>
          of {totalDocs} results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (pagination.pageIndex > 0) {
                setPagination((prev: { pageIndex: number; }) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
              }
            }}
            disabled={pagination.pageIndex === 0}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setPagination((prev: any) => ({ ...prev, pageIndex: index }))}
              className={pagination.pageIndex === index ? "bg-[#034737] text-white" : ""}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (pagination.pageIndex < totalPages - 1) {
                setPagination((prev: { pageIndex: number; }) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
              }
            }}
            disabled={pagination.pageIndex >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
