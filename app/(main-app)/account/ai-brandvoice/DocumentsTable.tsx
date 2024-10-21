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
import { EllipsisVertical, MoreHorizontal, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import instance from "@/config/axios.config";
import { Input } from "@/components/ui/input";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BrandVoiceModal from "./components/BrandVoiceModalProps";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { EditIcon, Edit, Target } from "@/components/svgs";
import { API_URL } from "@/lib/api";
import DotsLoader from "@/components/DotLoader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import GlobalModal from "@/components/modal/global.modal";
import { BrandVoice } from "@/types/common";
import Spinner from "@/components/Spinner";

interface BrandVoiceSetDefault {
  _id: string;
  brand_name: string;
  websites: string[];
  brand_voice: string;
  description?: string;
  document_url: string | null;
  is_default?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DocumentsTableProps {
  triggerFetchingBrandVoice?: number;
  search: string;
  setTotalBrandVoiceCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function ({
  search,
  setTotalBrandVoiceCount,
  triggerFetchingBrandVoice,
}: DocumentsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [documents, setDocuments] = useState<BrandVoice[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    fetchBrandVoice(search, pagination.pageIndex + 1, pagination.pageSize);
  }, [search, triggerFetchingBrandVoice]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedDeletedBrandVoice, setSelectedDeletedBrandVoice] =
    useState<BrandVoice | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBrandVoice = async (
    search: string,
    page: number,
    limit: number
  ) => {
    try {
      setIsFetching(true);
      const response = await instance.get(
        `${API_URL}/users/api/v1/brand-voice`,
        { params: { page, limit, search } }
      );
      const { docs, totalDocs, totalPages } = response.data.data;
      setDocuments(docs);
      setTotalDocs(totalDocs);
      setTotalPages(totalPages);
      setTotalBrandVoiceCount(totalDocs);
    } catch (error) {
      console.error("Error fetching brand voices", error);
    } finally {
      setIsFetching(false);
    }
  };
  const handleOpenModal = (brandId: string) => {
    setSelectedBrandId(brandId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchBrandVoice(search, pagination.pageIndex + 1, pagination.pageSize);
    setSelectedBrandId(null);
  };

  const setAsDefault = async (brandData: Partial<BrandVoiceSetDefault>) => {
    setLoading(true);
    brandData.is_default = true;
    await instance.put(
      `${API_URL}/users/api/v1/brand-voice/${brandData._id}`,
      brandData
    );
    setOpenDropdown(null);
    fetchBrandVoice(search, pagination.pageIndex + 1, pagination.pageSize);
    setLoading(false);
    toast.success("Brand voice updated successfully!");
  };

  const columns: ColumnDef<BrandVoice>[] = [
    {
      accessorKey: "brand_name",
      header: () => (
        <div className="uppercase flex " style={{ whiteSpace: "nowrap" }}>
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value: any) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="w-[14px] h-[14px] mr-1"
          />
          &nbsp; Brand&nbsp;Name
        </div>
      ),
      cell: ({ row }) => (
        <div className="capitalize flex" style={{ whiteSpace: "nowrap" }}>
          {" "}
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value: any) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            className="w-[14px] h-[14px] mr-1"
          />
          &nbsp; {row.getValue("brand_name")}
        </div>
      ),
    },
    {
      accessorKey: "brand_voice",
      header: () => <div className="uppercase">Brand Voice</div>,
      cell: ({ row }) => {
        const brandVoice = row.getValue("brand_voice") as string;
        const truncatedBrandVoice =
          brandVoice.length > 200
            ? brandVoice.slice(0, 200) + "..."
            : brandVoice;

        return (
          <div
            className="capitalize text-ellipsis overflow-hidden"
            data-tooltip-id={`tooltip-${row.id}`}
            data-tooltip-content={brandVoice}
          >
            <ReactMarkdown
              children={truncatedBrandVoice}
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw]}
              className="markdown-content"
            />
          </div>
        );
      },
    },

    {
      accessorKey: "document_url",
      header: () => <div className="uppercase">Document</div>,
      cell: ({ row }) => (
        <div>
          {row.getValue("document_url") ? (
            <>
              <a
                href={row.getValue("document_url")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.getValue("document_url") ? "View Document" : "-"}
              </a>
            </>
          ) : (
            <>-</>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="uppercase">Actions</div>,
      cell: ({ row }) => (
        <div className="relative flex items-center">
          <button
            className="p-1 hover:bg-gray-200 rounded-lg transition duration-300"
            onClick={e => {
              e.stopPropagation();
              setOpenDropdown(
                openDropdown === row.original._id ? null : row.original._id
              );
            }}
          ></button>
          <Select>
            <SelectTrigger
              showChevronDownIcon={false}
              className="px-1 py-[5px] bg-white border-0 h-fit hover:bg-gray-100 rounded-lg"
            >
              <EllipsisVertical size={20} className="text-gray-800" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {!row.original.is_default && (
                  <button
                    style={{ whiteSpace: "nowrap" }}
                    className="w-full text-left p-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setAsDefault(row.original);
                    }}
                  >
                    <Target /> Set as default
                  </button>
                )}
                <button
                  className="w-full text-left p-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => handleOpenModal(row.original._id)}
                >
                  <Edit /> &nbsp;Edit
                </button>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100 hover:text-bookmark-red-1   flex items-center gap-2"
                  onClick={() => setSelectedDeletedBrandVoice(row.original)}
                >
                  <span className="text-bookmark-red-1 ">
                    <Trash2 />
                  </span>
                  Delete
                </button>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const handleDeleteBrandVoice = async (id: string) => {
    setIsDeleting(true);
    try {
      await instance.delete(`${API_URL}/users/api/v1/brand-voice/${id}`);
      setDocuments(prev => prev.filter(doc => doc._id !== id));
      setTotalBrandVoiceCount(prev => prev - 1);
      toast.success("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting brand voice");
    } finally {
      setIsDeleting(false);
      setSelectedDeletedBrandVoice(null);
    }
  };

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
      <Motion
        transition={{ duration: 0.2 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div
          className="w-full bg-white border rounded-3xl"
          onClick={() => {
            setOpenDropdown(null);
          }}
        >
          <div className="bg-white rounded-lg border overflow-hidden min-h-[50vh]">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="mb-4">
                {isFetching ? (
                  <TableRow className="hover:bg-white">
                    <TableCell
                      colSpan={columns.length + 20}
                      className="h-[50vh] text-center font-semibold text-lg hover:bg-white"
                    >
                      <div className="flex-1 flex flex-col gap-5 justify-center items-center">
                        <Spinner color="black" size={56} />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} className="bg-white">
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
                      className="h-[50vh] text-center font-semibold text-lg"
                    >
                      No Brand Voice Found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Motion>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center">
          Showing
          <Button
            variant="outline"
            size="sm"
            className="bg-[#0347371A] border-none ml-2 mr-2"
          >
            {documents?.length}
          </Button>
          of {totalDocs} results
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="bg-[#4B465C14]"
            size="sm"
            onClick={() => {
              if (pagination.pageIndex > 0) {
                setPagination((prev: { pageIndex: number }) => ({
                  ...prev,
                  pageIndex: prev.pageIndex - 1,
                }));
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
              style={{ width: "35px", height: "35px", borderRadius: "8px" }}
              onClick={() =>
                setPagination((prev: any) => ({ ...prev, pageIndex: index }))
              }
              className={
                pagination.pageIndex === index
                  ? "bg-[#034737] text-white"
                  : "bg-[#4B465C14] text-black"
              }
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="bg-[#4B465C14]"
            onClick={() => {
              if (pagination.pageIndex < totalPages - 1) {
                setPagination((prev: { pageIndex: number }) => ({
                  ...prev,
                  pageIndex: prev.pageIndex + 1,
                }));
              }
            }}
            disabled={pagination.pageIndex >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>

      {isModalOpen && selectedBrandId && (
        <BrandVoiceModal brandId={selectedBrandId} onClose={handleCloseModal} />
      )}

      <GlobalModal
        className=""
        showCloseButton={false}
        open={!!selectedDeletedBrandVoice}
        setOpen={() => {
          setSelectedDeletedBrandVoice(null);
        }}
      >
        <div className="flex flex-col items-start justify-center px-6 pt-4 pb-8 gap-6 ">
          <h3 className="text-center text-xl font-semibold">
            Are you sure you want to delete{" "}
            <strong>{selectedDeletedBrandVoice?.brand_name}</strong> Brand
            Voice?
          </h3>
          <p className="text-left text-gray-700 text-sm md:text-base">
            This action is irreversible. Once deleted, you will not be able to
            recover this Brand Voice.
          </p>
          <div className="flex items-center justify-start gap-3">
            <button
              className="text-gray-500 border border-gray-500 bg-transparent text-nowrap py-2 px-8 rounded-md transition duration-300"
              onClick={() => setSelectedDeletedBrandVoice(null)}
            >
              Cancel
            </button>
            <button
              disabled={isDeleting}
              className="text-white bg-red-500 text-nowrap flex items-center gap-1 py-2 px-6 rounded-md transition duration-300 hover:bg-red-600"
              onClick={() =>
                selectedDeletedBrandVoice &&
                handleDeleteBrandVoice(selectedDeletedBrandVoice._id)
              }
            >
              {isDeleting ? <DotsLoader /> : <Trash2 size={18} />}
              Delete
            </button>
          </div>
        </div>
      </GlobalModal>
    </>
  );
}
