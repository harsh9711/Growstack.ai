"use client";
import Spinner from "@/components/Spinner";
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
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { formatDateTime } from "@/utils/dates";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Edit, Search } from "lucide-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import DeleteAssistantDialog from "./DeleteTemplateDialog";
import EditAssistantDialog from "./EditDialogTemplateDialog";

type TemplatesTableProps = {
  refreshTemplatesTable: boolean;
  setRefreshTemplatesTable: Dispatch<SetStateAction<boolean>>;
};

interface Assistant {
  _id: string;
  "ASSISTANT NAME": string;
  "ASSISTANT DESCRIPTION": string;
  icon: string;
  category: string;
  favorite: boolean;
  CREATED: string;
  //STATUS: string;
  handleStatusChange: (id: string, status: string) => void;
  premium: boolean;
}

const TemplatesTable: React.FC<TemplatesTableProps> = ({
  refreshTemplatesTable,
  setRefreshTemplatesTable,
}) => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const columns = (
    handleDelete: (id: string) => void,
    handleFavorite: (method: "remove" | "add", id: string) => void,
    fetchAssistants: () => Promise<void>
  ): ColumnDef<Assistant>[] => [
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
      cell: ({ row }) => (
        <div className="capitalize flex items-center gap-3">
          {row.getValue("ASSISTANT NAME")}
        </div>
      ),
    },
    {
      accessorKey: "ASSISTANT DESCRIPTION",
      header: () => <div className="uppercase">Assistant Description</div>,
      cell: ({ row }) => (
        <div className="capitalize flex items-center gap-3">
          {row.getValue("ASSISTANT DESCRIPTION")}
        </div>
      ),
    },
    {
      accessorKey: "created",
      header: () => <div className="uppercase">Created</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-3">
            {formatDateTime(row.getValue("created"))}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="uppercase">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedRowId(row.original._id);
            }}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            <Edit size={20} />
          </button>
          <DeleteAssistantDialog
            id={row.original._id}
            handleDelete={handleDelete}
            fetchAssistants={fetchAssistants}
          />
        </div>
      ),
    },
  ];

  const fetchAssistants = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/ai/api/v1/chat-template?category=My Templates`
      );
      const data = response.data.data;
      if (data) {
        const formattedAssistants: Assistant[] = data.map(
          (assistant: Assistant) => ({
            _id: assistant._id,
            "ASSISTANT NAME": assistant["ASSISTANT NAME"],
            "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
            icon: assistant["icon"],
            category: assistant["category"],
            favorite: assistant["favorite"],
            created: assistant["CREATED"],
            handleStatusChange: async (id: string, status: string) => {
              const updateAssistantStatus = async () => {
                try {
                  await instance.put(
                    `${API_URL}/ai/api/v1/chat-template/${id}`,
                    {
                      STATUS: status,
                    }
                  );
                  await fetchAssistants();
                  const message = `${assistant["ASSISTANT NAME"]} ${status === "active" ? "activated" : "deactivated"} successfully!`;
                  toast.success(message);
                } catch (error) {
                  console.error("Error updating status:", error);
                  toast.error(
                    `Error updating ${assistant["ASSISTANT NAME"]} status.`
                  );
                }
              };

              setAssistants(prevAssistants =>
                prevAssistants.map(a =>
                  a._id === id ? { ...a, STATUS: status } : a
                )
              );
              await updateAssistantStatus();
            },
          })
        );
        setAssistants(formattedAssistants);
        setRefreshTemplatesTable(false);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching assistants:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleFavorite = async (method: string, templateId: string) => {
    try {
      const response = await instance.put(
        API_URL + `/ai/api/v1/chat-template/fav-apps/${templateId}`,
        { type: method }
      );
      toast.success(response.data.message);
      await fetchAssistants();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error:", error);
    }
  };

  const handleDelete = async (templateId: string) => {
    try {
      await instance.delete(`${API_URL}/ai/api/v1/chat-template/${templateId}`);
      await fetchAssistants();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (refreshTemplatesTable) {
      setIsPending(true);
      fetchAssistants();
    }
  }, [refreshTemplatesTable]);

  const table = useReactTable({
    data: assistants,
    columns: columns(handleDelete, handleFavorite, fetchAssistants),
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
          i === table.getState().pagination.pageIndex
            ? "!bg-[#2DA771] hover:bg-opacity-50 text-white"
            : "hover:bg-[#4B465C29]"
        )}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="flex justify-between gap-10 items-center mt-5">
          <h1 className="text-xl lg:text-xl md:text-lg font-semibold">
            My own AI Templates list
          </h1>
          <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-[40%] max-w-md">
            <Search className="text-gray-500 " size={20} />
            <input
              type="search"
              className="outline-none h-[40px] w-[50%]"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="rounded-lg border overflow-hidden mt-5 bg-white min-h-[50vh]">
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
            <TableBody>
              {isPending ? (
                <TableRow className="hover:bg-white">
                  <TableCell
                    colSpan={columns.length + 20}
                    className="h-[50vh] text-center font-semibold text-lg hover:bg-white"
                  >
                    <div className="flex-1 flex flex-col gap-5 justify-center items-center">
                      <Spinner color="black" size={80} />
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="bg-white"
                  >
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
                    colSpan={columns.length + 20}
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
                <div>{paginationButtons.map(u => u)}</div>
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
      {selectedRowId && (
        <EditAssistantDialog
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
      )}
    </>
  );
};

export default TemplatesTable;
