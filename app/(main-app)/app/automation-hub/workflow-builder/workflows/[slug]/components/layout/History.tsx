"use client";

import React, { useState, useEffect } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Spinner from "@/components/Spinner";
import Motion from "@/components/Motion";
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, MoreHorizontal, Trash2 } from "lucide-react";
import clsx from "clsx";
import DeleteHistoryModal from "../DeleteHistoryModal";
import toast from "react-hot-toast";
import { formatDateTime } from "@/utils/dates";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  workflowId: string;
  runnerId: any;
}

interface Metadata {
  count: number;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

type RunnerDetail = {
  workflow_runner_id: string;
  status: "Success" | "Failed";
  updatedAt: string;
};

type WorkflowHistoryItem = {
  _id: string;
  user_id: string;
  workflow_id: string;
  history: string[];
  runnerDetails: RunnerDetail[];
};

type WorkflowHistoryResponse = {
  data: {
    data: WorkflowHistoryItem[];
    metadata: Metadata;
  };
};

const History: React.FC<Props> = ({ workflowId, runnerId }) => {
  const columns: ColumnDef<RunnerDetail>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "workflow_runner_id",
      header: "Workflow Runner ID",
      cell: ({ row }) => <div>{row.getValue("workflow_runner_id")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={clsx(
            "py-1.5 px-2 rounded max-w-fit",
            row.original.status === "Success"
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          )}
        >
          {row.getValue("status")}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => <div>{formatDateTime(row.getValue("updatedAt"))}</div>,
    },

    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const historyItem = row.original;

        return (
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => handleRedirect(0, historyItem.workflow_runner_id)}
              variant="outline"
              className="!bg-white hover:shadow-lg hover:shadow-gray-200 rounded-lg transition-all duration-300 h-10"
            >
              View Details
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link href="">
                  <Button variant="outline" className="h-8 w-8 p-0 !bg-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(
                      historyItem.workflow_runner_id
                    )
                  }
                >
                  Copy workflow Runner ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    handleRedirect(0, historyItem.workflow_runner_id)
                  }
                >
                  Rerun Workflow
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleDeleteHistoryItem(historyItem.workflow_runner_id)
                  }
                >
                  Delete item
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  const [workFlowHistory, setWorkFlowHistory] = useState<WorkflowHistoryItem[]>(
    []
  );
  const [runnerIdStatus, setRunnerIdStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const router = useRouter();

  const fetchWorkflowHistory = async (id: string) => {
    try {
      const response = await instance.get<WorkflowHistoryResponse>(
        `${API_URL}/workflow/api/v1/history/${id}`
      );
      setWorkFlowHistory(response.data.data.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (workflowId) {
      setLoading(true);
      fetchWorkflowHistory(workflowId);
    }
  }, [workflowId]);

  const [isDeleteHistoryModalOpen, setIsDeleteHistoryModalOpen] =
    useState(false);
  const [isDeleteRequestPending, setIsDeleteRequestPending] = useState(false);

  const handleDeleteHistory = async (workflowId: string) => {
    setIsDeleteRequestPending(true);
    try {
      const response = await instance.delete(
        `${API_URL}/workflow/api/v1/history/${workflowId}`
      );
      await fetchWorkflowHistory(workflowId);
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      console.error("Error deleting workflow history:", error);
    } finally {
      setIsDeleteRequestPending(false);
      setIsDeleteHistoryModalOpen(false);
    }
  };
  useEffect(() => {
    let intervalId: any;
    setRunnerIdStatus(true);
    if (runnerId) {
      const fetchData = async () => {
        try {
          const response = await instance.get(
            `${API_URL}/workflow/api/v1/runner/${runnerId}/status`
          );
          if (response.data.data != "Running") {
            clearInterval(intervalId);
            setRunnerIdStatus(false);
            runnerId = null;
            fetchWorkflowHistory(workflowId);
          }
        } catch (error) {
          clearInterval(intervalId);
          console.error("Error deleting status", error);
        }
      };

      intervalId = setInterval(fetchData, 5000);
      return () => clearInterval(intervalId);
    }
  }, [runnerId]);

  const handleDeleteHistoryItem = async (runner_id: string) => {
    try {
      const response = await instance.delete(
        `${API_URL}/workflow/api/v1/runner/${runner_id}`
      );
      await fetchWorkflowHistory(workflowId);
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleRedirect = (index: number, runner_id: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", index.toString());
    params.set("pre_filled", "true");
    params.set("runner_id", runner_id);
    router.push(`?${params.toString()}`);
  };

  const runnerDetails = workFlowHistory[0]?.runnerDetails || [];
  const table = useReactTable({
    data: runnerDetails,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  if (loading) {
    return (
      <div className="flex-1 flex flex-col gap-5 justify-center items-center min-h-[30vh]">
        <Spinner color="black" size={50} />
        Loading...
      </div>
    );
  }

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="w-full p-5">
        <h2 className="text-2xl font-semibold mb-4">Workflow History</h2>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter workflow runner IDs..."
            value={
              (table
                .getColumn("workflow_runner_id")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={event =>
              table
                .getColumn("workflow_runner_id")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="ml-auto flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 rounded-lg">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter(column => column.getCanHide())
                  .map(column => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              onClick={() => setIsDeleteHistoryModalOpen(true)}
              className="flex items-center gap-2 bg-red-100 px-3 rounded-lg h-11"
            >
              <Trash2 size={20} color="red" />
              Delete history
            </button>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border bg-white">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {cell.column.columnDef.header === "Status" &&
                        row.original.workflow_runner_id === runnerId &&
                        runnerId != null &&
                        runnerIdStatus ? (
                          <div className=" flex gap-2">
                            <Spinner color="black" size={15} />
                            Loading...
                          </div>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-white">
                  <TableCell
                    colSpan={columns.length}
                    className="h-80 text-center font-semibold text-lg hover:bg-white"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <DeleteHistoryModal
        show={isDeleteHistoryModalOpen}
        onHide={() => setIsDeleteHistoryModalOpen(false)}
        handleDeleteHistory={() => handleDeleteHistory(workflowId)}
        pending={isDeleteRequestPending}
      />
    </Motion>
  );
};

export default History;
