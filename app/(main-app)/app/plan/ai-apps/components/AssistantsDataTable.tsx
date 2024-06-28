"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { API_URL } from "@/lib/api";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import clsx from "clsx";
import { Check, Search, XIcon } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import DeleteAssistantDialog from "./DeleteAssistantDialog";
import EditAssistantDialog from "./EditDialogAssistantDialog";
import toast from "react-hot-toast";

type AssistantsTableProps = {
  refreshAssistantsTable: boolean;
  setRefreshAssistantsTable: Dispatch<SetStateAction<boolean>>;
};

interface Assistant {
  _id: string;
  "ASSISTANT NAME": string;
  "ASSISTANT DESCRIPTION": string;
  STATUS: string;
  CREATED?: string;
  handleStatusChange: (id: string, status: string) => void;
}

const handleDelete = async (templateId: string, fetchAssistants: () => Promise<void>) => {
  try {
    await axios.delete(`${API_URL}/ai/api/v1/chat-template/${templateId}`);
    await fetchAssistants();
  } catch (error) {
    console.error("Error deleting assistant:", error);
  }
};

const columns = (handleDelete: (id: string, fetchAssistants: () => Promise<void>) => void, fetchAssistants: () => Promise<void>): ColumnDef<Assistant>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="w-[18px] h-[18px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="w-[18px] h-[18px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ASSISTANT NAME",
    header: () => <div className="uppercase">Assistant Name</div>,
    cell: ({ row }) => <div className="capitalize flex items-center gap-3">{row.getValue("ASSISTANT NAME")}</div>,
  },
  {
    accessorKey: "ASSISTANT DESCRIPTION",
    header: () => <div className="uppercase">Assistant Description</div>,
    cell: ({ row }) => <div className="capitalize flex items-center gap-3">{row.getValue("ASSISTANT DESCRIPTION")}</div>,
  },
  {
    accessorKey: "STATUS",
    header: () => <div className="uppercase">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("STATUS") as "active" | "inactive" | "disabled";
      const statusClasses = {
        active: "text-green-500",
        inactive: "text-yellow-500",
        disabled: "text-red-500",
      };

      return <div className={`text-left font-medium capitalize ${statusClasses[status] || ""}`}>{status}</div>;
    },
  },
  {
    accessorKey: "CREATED",
    header: () => <div className="uppercase">Created</div>,
    cell: ({ row }) => {
      const createdDate = new Date(row.getValue("CREATED"));
      return (
        <div className="flex gap-3">
          <span>{createdDate.toLocaleDateString()}</span>
          <span>{createdDate.toLocaleTimeString()}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="uppercase">Action</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <EditAssistantDialog id={row.original._id} />
        <DeleteAssistantDialog id={row.original._id} handleDelete={handleDelete} fetchAssistants={fetchAssistants} />
        <button
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300"
          onClick={() => {
            row.original.handleStatusChange(row.original._id, "inactive");
          }}>
          <XIcon size={15} />
        </button>
        <button
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300"
          onClick={() => {
            row.original.handleStatusChange(row.original._id, "active");
          }}>
          <Check size={15} />
        </button>
      </div>
    ),
  },
];

const AssistantsTable: React.FC<AssistantsTableProps> = ({ refreshAssistantsTable, setRefreshAssistantsTable }) => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isPending, setIsPending] = useState(false);

  const fetchAssistants = async () => {
    setIsPending(true);
    try {
      const response = await axios.get(`${API_URL}/ai/api/v1/chat-template/user?page=1&limit=20`);
      if (response.data.data && response.data.data.chatTemplates) {
        const formattedAssistants = response.data.data.chatTemplates.map((assistant: any) => ({
          _id: assistant._id,
          "ASSISTANT NAME": assistant["ASSISTANT NAME"],
          "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
          STATUS: assistant["STATUS"],
          CREATED: assistant["CREATED"] || new Date().toISOString(),
          handleStatusChange: async (id: string, status: string) => {
            const updateAssistantStatus = async () => {
              try {
                await axios.put(`${API_URL}/ai/api/v1/chat-template/${id}`, { STATUS: status });
                await fetchAssistants();
                const message = `${assistant["ASSISTANT NAME"]} ${status === "active" ? "activated" : "deactivated"} successfully!`;
                toast.success(message);
              } catch (error) {
                console.error("Error updating status:", error);
                toast.error(`Error updating ${assistant["ASSISTANT NAME"]} status.`);
              }
            };

            setAssistants((prevAssistants) => prevAssistants.map((a) => (a._id === id ? { ...a, STATUS: status } : a)));
            await updateAssistantStatus();
          },
        }));
        setAssistants(formattedAssistants);
        setRefreshAssistantsTable(false);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (refreshAssistantsTable) {
      fetchAssistants();
    }
  }, [refreshAssistantsTable]);

  const table = useReactTable({
    data: assistants,
    columns: columns(handleDelete, fetchAssistants),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
    <div className="w-full">
      <div className="flex justify-between gap-10 items-center mt-5">
        <h1 className="text-xl font-semibold">My own assistants lists</h1>
        <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
          <Search className="text-gray-500" size={20} />
          <input type="search" className="outline-none h-[40px] w-full" placeholder="Search" />
        </div>
      </div>
      <div className="rounded-lg border overflow-hidden mt-5 bg-white min-h-[50vh]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow className="hover:bg-white">
                <TableCell colSpan={columns.length + 20} className="h-[50vh] text-center font-semibold text-lg hover:bg-white">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="bg-white">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-white">
                <TableCell colSpan={columns.length + 20} className="h-[50vh] text-center font-semibold text-lg hover:bg-white">
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
              disabled={!table.getCanPreviousPage()}>
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
              disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AssistantsTable;
