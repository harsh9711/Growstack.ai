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
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import { EllipsisVertical } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import instance from "@/config/axios.config";

interface BrandVoice {
  _id: string;
  brand_name: string;
  brand_voice: string;
  document_url: string | null;
}

export default function DocumentsTable() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [documents, setDocuments] = useState<BrandVoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    fetchBrandVoice();
  }, []);

  const fetchBrandVoice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await instance.get(
        `https://testing.growstack.ai/users/api/v1/brand-voice?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}&search=Growstack`
      );
      const fetchedDocuments = response.data.data.docs.map((doc: any) => ({
        _id: doc._id,
        brand_name: doc.brand_name,
        brand_voice: doc.brand_voice,
        document_url: doc.document_url,
      }));
      setDocuments(fetchedDocuments);
    } catch (error) {
      setError("Failed to fetch brand voices.");
      toast.error("Failed to fetch brand voices.");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnDef<BrandVoice>[] = [
    {
      accessorKey: "brand_name",
      header: () => (
        <div className="uppercase">
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="w-[14px] h-[14px]"
          />{" "}
          Brand Name
        </div>
      ),
      cell: ({ row }) => (
        <div className="capitalize">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: any) => row.toggleSelected(!!value)}
            className="w-[14px] h-[14px]"
          />{" "}
          {row.getValue("brand_name")}
        </div>
      ),
    },
    {
      accessorKey: "brand_voice",
      header: () => <div className="uppercase">Brand Voice</div>,
      cell: ({ row }) => (
        <div className="capitalize relative group">
          <div className="truncate max-w-xs">
            {row.getValue("brand_voice")}
          </div>
          {/* Tooltip */}
          <div style={{zIndex:"100"}} className=" w-[50%] left-0 bottom-full mb-2 hidden group-hover:block p-2 bg-gray-800 text-white rounded-lg shadow-lg z-10 text-sm">
            {row.getValue("brand_voice")}
          </div>
        </div>
      ),
    },
    
    {
      accessorKey: "document_url",
      header: () => <div className="uppercase">Document (if any)</div>,
      cell: ({ row }) => {
        const document = row.getValue("document_url");
        return document ? <a href={document} target="_blank">View Document</a> : "No document";
      },
    },
    {
      id: "actions",
      header: () => <div className="uppercase">Actions</div>,
      cell: ({ row }) => (
        <div className="relative flex items-center">
          <button
            className="p-1 hover:bg-gray-200 rounded-lg transition duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdown(openDropdown === row.original._id ? null : row.original._id); // Toggle dropdown
            }}
          >
            <EllipsisVertical size={20} className="text-gray-800" />
          </button>
          {openDropdown === row.original._id && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              <button
                className="block w-full text-left p-2 hover:bg-gray-100"
                onClick={() => handleEdit(row.original._id)}
              >
                Edit
              </button>
              <button
                className="block w-full text-left p-2 hover:bg-gray-100"
                onClick={() => handleDeleteBrandVoice(row.original._id)}
              >
                Delete
              </button>
            </div>
          )}
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
    onPaginationChange: setPagination,

    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDeleteBrandVoice = (id: string) => {
    swal({
      title: "Delete Document",
      text: "Are you sure you want to delete it?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setDocuments((prev) => prev.filter((doc) => doc._id !== id));
        toast.success("Document deleted successfully");
        setOpenDropdown(null);
      }
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/account/create-brand-voice/${id}`);
    setOpenDropdown(null);
  };

  const closeModel = () => {
    setOpenDropdown(null);
  };

  return (
    <>
      <Motion
        transition={{ duration: 0.2 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div onClick={() => closeModel()} className="w-full bg-white border rounded-3xl">
          <div className="bg-white rounded-lg border overflow-hidden min-h-[50vh]">
            {loading ? (
              <div className="flex justify-center items-center h-[50vh]">
                Loading...
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-[50vh] text-red-500">
                {error}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="bg-white"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            )}
          </div>
        </div>
      </Motion>
    </>
  );
}
