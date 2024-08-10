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
import { Edit, FileDown, Search, DeleteIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { documents } from "./data";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import swal from "sweetalert";
import { useRouter } from "next-nprogress-bar";

interface BrandVoice {
  name: string;
  description: string;
  products: any;
  _id: string;
}

const categoryColors = {
  active: "text-green-500",
  inactive: "text-yellow-500",
  disabled: "text-red-500",
};

const languageFlags = {
  "English (USA)": "/assets/flags/us.svg",
  "English (UK)": "/assets/flags/uk.svg",
  Spanish: "/assets/flags/spain.svg",
  French: "/assets/flags/france.svg",
  Hindi: "/assets/flags/india.svg",
};

// export const columns: ColumnDef<Document>[] = [
//   {
//     accessorKey: "name",
//     header: () => <div className="uppercase">Name</div>,
//     cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "workbook",
//     header: () => <div className="uppercase">Description</div>,
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("workbook")}</div>
//     ),
//   },

//   {
//     accessorKey: "wordsUsed",
//     header: () => <div className="uppercase">Products</div>,
//     cell: ({ row }) => <div>{row.getValue("wordsUsed")}</div>,
//   },
//   {
//     id: "actions",
//     header: () => <div className="uppercase">Action</div>,
//     cell: ({ row }) => (
//       <div className="flex items-center gap-2">
//         <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
//           <Edit size={20} className="text-gray-800 cursor-pointer" />
//         </button>
//         <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
//           <DeleteIcon size={20} className="text-gray-800 cursor-pointer" />
//         </button>
//       </div>
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
// ];

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
  const [documents, setDocuments] = useState([]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "brand_name",
      header: () => <div className="uppercase">Brand Name</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("brand_name")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="uppercase">Description</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },

    {
      accessorKey: "products",
      header: () => <div className="uppercase">Products</div>,
      cell: ({ row }) => <div>{row.original.products.length}</div>,
    },
    {
      id: "actions",
      header: () => <div className="uppercase">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
            <Edit
              size={20}
              className="text-gray-800 cursor-pointer"
              onClick={() => handleEdit(row?.original._id)}
            />
          </button>
          <button
            className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300"
            onClick={() => handleDeleteBranVoice(row?.original?._id)}
          >
            <DeleteIcon size={20} className="text-gray-800 cursor-pointer" />
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

  const handleGetBrandVoiceData = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/brand-voice`
      );
      setDocuments(response?.data?.data?.docs);
    } catch (error) {
      console.log("Error fetching Documents:", error);
      toast.error("Error fetching Documents data");
    }
  };
  const handleDeleteBranVoice = (id: string) => {
    swal({
      title: "Delete Document",
      text: "Are you sure you want to delete it?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await instance.delete(
            `${API_URL}/users/api/v1/brand-voice/${id}`
          );
          if (response.data.success) {
            handleGetBrandVoiceData();
          }
        } catch (error) {
          toast.error("Error deleting document");
        }
      } else {
      }
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/account/create-brand-voice/${id}`);
  };

  useEffect(() => {
    handleGetBrandVoiceData();
  }, []);

  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-lg font-semibold">All my brand voice</h2>
          <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
            <Search className="text-[#5A5963]" />
            <input
              type="search"
              className="outline-none h-[40px] w-full"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg border overflow-hidden mt-5 min-h-[50vh]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                  {headerGroup.headers.map((header) => {
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
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-white"
                  >
                    {row.getVisibleCells().map((cell) => (
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
        {table.getRowModel().rows?.length ? (
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="space-x-2 flex">
              <Button
                variant="outline"
                size="sm"
                className="bg-[#4B465C14] hover:bg-[#4B465C29] border-none h-[45px]"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
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
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </Motion>
  );
}
