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

interface BrandVoice {
  name: string;
  brandVoice: string;
  document: string | null;
  _id: string;
}
const staticDocuments: BrandVoice[] = [
  {
    _id: "1",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "2",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "3",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "4",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "5",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "6",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "7",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "8",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "9",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "10",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "11",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "12",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "13",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
  {
    _id: "14",
    name: "Brand One",
    brandVoice: "Friendly and Approachable",
    document: "document1.pdf",
  },
];

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
  const [documents, setDocuments] = useState<BrandVoice[]>(staticDocuments);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const columns: ColumnDef<BrandVoice>[] = [
    {
      accessorKey: "name",
      header: () => <div className="uppercase"><Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="w-[14px] h-[14px]"
      /> Name</div>,
      cell: ({ row }) => <div className="capitalize"> <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        className="w-[14px] h-[14px]"
      /> {row.getValue("name")}</div>,
    },
    {
      accessorKey: "brandVoice",
      header: () => <div className="uppercase">Brand Voice</div>,
      cell: ({ row }) => <div className="capitalize">{row.getValue("brandVoice")}</div>,
    },
    {
      accessorKey: "document",
      header: () => <div className="uppercase">Document (if any)</div>,
      cell: ({ row }) => <div>{row.getValue("document") || "No document"}</div>,
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
                onClick={() => handleDeleteBranVoice(row.original._id)}
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

  const handleDeleteBranVoice = (id: string) => {
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

  return (<>
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div onClick={() => closeModel()} className="w-full bg-white border rounded-3xl">

        <div className="bg-white rounded-lg border overflow-hidden min-h-[50vh]">
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
        </div>
      </div>
    </Motion>
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex" style={{whiteSpace:"nowrap"}}>
        {"showing"}
      <Button
        variant="outline"
        size="sm" style={{height: "25px",width: "30px"}}
        className="bg-[#0347371A]  border-none ml-2 mr-2 h-[100%] w-[40%]"
      >
        {pagination.pageSize}
      </Button>
       <div>{documents?.length}{" of results"}</div> 
      </div><div></div>
      {table.getRowModel().rows?.length ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="space-x-2 flex">

            <Button
              variant="outline"
              size="sm"
              className="bg-[#4B465C14] hover:bg-[#4B465C29] border-none"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"Previous"}
            </Button>
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={clsx(
                  "onClick={() => closeModel()} hover:bg-[#4B465C29] border-none",
                  table.getState().pagination.pageIndex === index ? "bg-[#034737] text-slate-300" : ""
                )}
                onClick={() => table.setPageIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="bg-[#4B465C14] hover:bg-[#4B465C29] border-none"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {"Next"}
            </Button>

          </div>
        </div>
      ) : null}
    </div>
  </>
  );
}
