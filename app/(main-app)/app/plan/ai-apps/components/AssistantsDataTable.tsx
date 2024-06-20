  "use client";

  import { useEffect, useState } from "react";
  import axios from "axios";
  import { Button } from "@/components/ui/button";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  import { Check, Edit2, Search, Trash2, XIcon } from "lucide-react";
  import { API_URL } from "@/lib/api";

  export const columns: ColumnDef<any>[] = [

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
      cell: ({ row }) => <p>{row.getValue("ASSISTANT DESCRIPTION")}</p>,
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
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <Edit2 size={15} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <Trash2 size={15} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <XIcon size={15} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
            <Check size={15} />
          </button>
        </div>
      ),
    },
  ];

  export default function AssistantsTable() {
    const [assistants, setAssistants] = useState<Assistant[]>([]);

    useEffect(() => {
      fetchAssistants();
    }, []);  const [isPending, setIsPending] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

    const fetchAssistants = async () => {
      setIsPending(true);
      try {
        const response = await axios.get(`${API_URL}/ai/api/v1/chat-template/user`);
        console.log("API response:", response.data); // Debugging log
        if (response.data.data && response.data.data.chatTemplates) {
          const formattedAssistants = response.data.data.chatTemplates.map((assistant: any) => ({
            "ASSISTANT NAME": assistant["ASSISTANT NAME"],
            "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
            "STATUS": assistant["STATUS"],
            "CREATED": assistant["CREATED"] || new Date().toISOString(), // Default to current date if not provided
          }));
          setAssistants(formattedAssistants);
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
      fetchAssistants();
    }, []);
    interface Assistant {
      "ASSISTANT NAME": string;
      "ASSISTANT DESCRIPTION": string;
      "STATUS": string;
      "CREATED"?: string; // Optional, if it might not always be present
    }
    
    const handleFormSubmit = async (newAssistantData: Assistant) => {
      try {
        // Optimistically update state
        setAssistants((prevAssistants: Assistant[]) => [...prevAssistants, newAssistantData]);

        // Simulate form submission
        await axios.post(`${API_URL}/ai/api/v1/chat-template`, newAssistantData);

        // Fetch updated data
        await fetchAssistants();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    const table = useReactTable({
      data: assistants,
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
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow className="hover:bg-white">
                  <TableCell colSpan={columns.length} className="h-24 text-center font-semibold text-lg hover:bg-white">
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
                  <TableCell colSpan={columns.length} className="h-24 text-center font-semibold text-lg hover:bg-white">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {table.getRowModel().rows?.length && (
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
        )}
      </div>
    );
  }
