"use client";

import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import {
  editDocument,
  savedDecument,
} from "@/lib/features/documents/document.slice";
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
import { Edit, FileDown, Search, Delete } from "lucide-react";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { downloadTxt } from "../../app/plan/custom-gpts/new/components/utils/downloadHelpers";

interface Document {
  name: string;
  workbook: string;
  category: "active" | "inactive" | "disabled";
  created: string;
  language: "English (USA)" | "English (UK)" | "Spanish" | "French" | "Hindi";
  wordsUsed: number;
  _id: string;
}

const languageFlags = {
  "English (USA)": "/assets/flags/us.svg",
  English: "/assets/flags/uk.svg",
  Spanish: "/assets/flags/spain.svg",
  French: "/assets/flags/france.svg",
  Hindi: "/assets/flags/india.svg",
};


export default function DocumentsTable() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const downloadTxtFile = (rowData: any) => {
    const textData = `
      ID: ${rowData._id}
      User ID: ${rowData.user_id}
      Document Type: ${rowData.doc_type}
      Document Name: ${rowData.doc_name}
      Language: ${rowData.doc_language}
      Word Count: ${rowData.doc_words}
      Category: ${rowData.category}
      Content: ${rowData.doc_content}
      Created At: ${rowData.createdAt}
      Updated At: ${rowData.updatedAt}
    `;

    const blob = new Blob([textData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${rowData.doc_name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: "doc_name",
      header: () => <div className="uppercase">Document Name</div>,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("doc_name")}</div>
      ),
    },
    // {
    //   accessorKey: "workbook",
    //   header: () => <div className="uppercase">Workbook</div>,
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("workbook")}</div>
    //   ),
    // },
    // {
    //   accessorKey: "category",
    //   header: () => <div className="uppercase">Category</div>,
    //   cell: ({ row }) => (
    //     <div
    //       className={clsx(
    //         "uppercase bg-gray-100 px-2 py-1.5 max-w-fit rounded-md text-[13px]"
    //       )}
    //     >
    //       {row.getValue("category")}
    //     </div>
    //   ),
    // },
    {
      accessorKey: "createdAt",
      header: () => <div className="uppercase">Created</div>,
      cell: ({ row }: any) => (
        <div className="capitalize">
          {row.original.createdAt
            ? moment(row.original.createdAt).format("MMMM DD YYYY • hh:mm A")
            : "—"}
        </div>
      ),
    },
    {
      accessorKey: "doc_language",
      header: () => <div className="uppercase">Language</div>,
      cell: ({ row }: any) =>
        row.original.language ? (
          <div className="flex items-center gap-2.5">
            {row.original.doc_language && (
              <Image
                src={
                  languageFlags[
                    row.getValue("doc_language") as keyof typeof languageFlags
                  ]
                }
                alt=""
                width={20}
                height={20}
              />
            )}
            {row.getValue("doc_language")}
          </div>
        ) : (
          <div>—</div>
        ),
    },
    {
      accessorKey: "doc_words",
      header: () => <div className="uppercase">Words Used</div>,
      cell: ({ row }) =>
        row.getValue("doc_words") ? (
          <div>{row.getValue("doc_words")}</div>
        ) : (
          <div>—</div>
        ),
    },
    {
      id: "actions",
      header: () => <div className="uppercase">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {/* <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300" onClick={() => handleEdit(row?.original)}>
              <Edit size={20} className="text-gray-800 cursor-pointer" />
            </button> */}
            <button
              className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300"
              onClick={() => handleDeleteDocs(row?.original?._id)}
            >
              <MdDelete size={20} className="text-gray-800 cursor-pointer" />
            </button>
            <button className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300">
              <FileDown
                size={20}
                className="text-gray-800 cursor-pointer"
                onClick={() => downloadTxtFile(row?.original)}
              />
            </button>
          </div>
        );
      },
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

  useEffect(() => {
    setLoading(true);
    handleGetDocumentsData();
  }, [pagination.pageIndex]);

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

  const handleGetDocumentsData = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/docs?page=${pagination.pageIndex + 1}&limit=10`
      );
      setDocuments(response?.data?.data?.docs);
    } catch (error) {
      console.log("Error fetching Documents:", error);
      toast.error("Error fetching Documents data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocs = (id: string) => {
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
            `${API_URL}/users/api/v1/docs/${id}`
          );
          if (response.data.success) {
            handleGetDocumentsData();
          }
        } catch (error) {
          toast.error("Error deleting document");
        }
      } else {
      }
    });
  };

  const handleEdit = (row: any) => {
    switch (row.doc_type) {
      case "TEXT":
        //TODO: remove this static ID
        return router.push(`/app/plan/ai-templates/668fba4cda6b851455c8caf0`);
      case "HTML":
        return router.push(`/app/create/website-builder`);
      case "VIDEO":
        return router.push(`/app/plan/text-to-video`);
      case "IMAGE":
        return router.push(`/app/create/product-ai`);
    }
    dispatch(editDocument(true));
    dispatch(savedDecument(row));
  };

  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="w-full">
        <div className="flex items-center justify-between px-5 pt-5">
          <h2 className="text-lg font-semibold">All my documents</h2>
          <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
            <Search className="text-[#5A5963]" />
            <input
              type="search"
              className="outline-none h-[40px] w-full"
              placeholder="Search"
            />
          </div>
        </div>
        {loading ? (
          <div className="min-h-[50vh] flex-1 flex flex-col gap-5 justify-center items-center">
            <Spinner color="black" size={70} />
            Loading...
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg border border-x-0 overflow-hidden mt-5 min-h-[50vh]">
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
          </>
        )}
      </div>
    </Motion>
  );
}
