"use client";

import swal from "sweetalert";
import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
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
import { DeleteIcon } from "@/components/svgs/icons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

type Logs = {
  id: string;
  content: string;
  social_type: string;
  status: string;
};

export default function MultiPostsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [postingLogs, setPostingLogs] = useState([]);
  const router = useRouter();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleLogDelete = async (id: string) => {
    swal({
      title: "Delete Posting Log",
      text: "Are you sure you want to delete it?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await instance.delete(`${API_URL}/users/api/v1/social-media/posts/${id}`);
          if (response.data.success) {
            handleGetPostingLogsData();
          }
        } catch (error) {
          toast.error("Error deleting document");
        }
      } else {
      }
    });
  };

  const columns: ColumnDef<Logs>[] = [
    {
      accessorKey: "content",
      header: ({ table }) => (
        <div className="uppercase flex gap-3">
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
          <span>Content</span>
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
          <span className="capitalize">{row.getValue("content")}</span>
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "social_type",
      header: () => <div className="uppercase">Social Type</div>,
      cell: ({ row }) => <span className="capitalize">{row.getValue("social_type")}</span>,
    },
    {
      accessorKey: "status",
      header: () => <div className="uppercase">Status</div>,
      cell: ({ row }) => <span className="capitalize">{row.getValue("status")}</span>,
    },
    {
      id: "actions",
      header: () => <div className="uppercase">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <button
              className="p-1.5 hover:bg-gray-200 rounded-lg transition duration-300"
              onClick={() => handleLogDelete(row?.original?.id)}
            >
              <DeleteIcon />
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: postingLogs,
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

  const handleGetPostingLogsData = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/posts/history?limit=10&page=${
          pagination.pageIndex + 1
        }`
      );
      if(response?.data?.data?.length<1){
        Swal.fire({
          title: "Social Media Account Required",
          text: `Please connect your social media account to proceed.`,
          icon: "warning",
          showCancelButton: false,
          confirmButtonText: "Yes, connect now!",
          cancelButtonText: "Cancel",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/app/publish/scheduler/quick-posting/profiles");
          }
        });
      }
      const logs = response?.data?.data?.history.map((log: any) => ({
        id: log.id,
        content: log.post,
        social_type: log.platforms.join(", "),
        status: log.status,
      }));
      setPostingLogs(logs);
    } catch (error) {
      console.log("Error fetching posting logs:", error);
    }
  };

  useEffect(() => {
    handleGetPostingLogsData();
  }, [pagination.pageIndex]);

  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="w-full">
        <div className="rounded-lg border overflow-hidden mt-5 bg-white min-h-[50vh]">
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
                    No logs found.
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
