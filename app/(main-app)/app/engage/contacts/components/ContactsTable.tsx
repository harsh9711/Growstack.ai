"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import instance from "@/config/axios.config";
import { formatDate } from "@/lib/utils";
import { Contact } from "@/types/contacts";
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
import { MailIcon, Phone, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FilterSheet from "./FilterSheet";
import AddContact from "./modal/AddContact";
import DeleteContact from "./modal/DeleteContact";
import SendEmail from "./modal/SendEmail";
import SendSMS from "./modal/SendSMS";

export const columns: ColumnDef<Contact>[] = [
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
    accessorKey: "name",
    header: () => <div className="uppercase">Name</div>,
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3 min-w-[240px] max-w-lg">
        {row.original.logo ? (
          <Image src={row.original.logo} alt="" width={100} height={100} className="h-11 w-11 object-cover rounded-full" />
        ) : (
          <div className="bg-red-100 text-gray-500 w-11 h-11 rounded-full grid place-content-center text-xl border border-white">
            {row.original.name.slice(0, 1)}
          </div>
        )}
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="uppercase">Phone</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-3 max-w-xl">
        <Phone size={20} className="text-primary-green w-full max-w-fit" />{" "}
        <span>
          {row.original.phones
            .map(
              (phone: any) => `
            ${!phone.number.startsWith("+") ? "+" : ""}
            ${phone.number.slice(0, phone.country_code.length)}  ${phone.number.slice(phone.country_code.length)}`
            )
            .join(", ")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="uppercase">Email</div>,
    cell: ({ row }) => (
      <div className="flex gap-3 items-start max-w-2xl">
        <MailIcon size={20} className="text-primary-green w-full max-w-fit" />
        <span>{row.original.email.length > 0 ? <>{row.original.email.join(", ")}</> : "-"}</span>
      </div>
    ),
  },
  {
    accessorKey: "created_on",
    header: () => <div className="uppercase">Created</div>,
    cell: ({ row }) => (
      <div className="flex gap-3 min-w-[170px]">
        <span>{formatDate(row.original.created_on)}</span>
      </div>
    ),
  },
  {
    accessorKey: "contact_type",
    header: () => "CONTACT TYPE",
    cell: ({ row }) => <div className="min-w-[120px]">{row.getValue("contact_type")}</div>,
  },
  {
    accessorKey: "time_zone",
    header: "TIME ZONE",
    cell: ({ row }) => <div className="min-w-[100px]">{row.getValue("time_zone")}</div>,
  },
];

export default function ContactsTable() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getContacts = async () => {
    setLoading(true);
    const response = await instance.get(`/users/api/v1/contacts?page=${pagination.pageIndex}&limit=${pagination.pageSize}`);
    setLoading(false);
    const data = response.data.data.contacts;

    const formattedContacts = data.map((item: any) => ({
      id: item.contacts._id,
      name: `${item.contacts.first_name} ${item.contacts.last_name}`,
      email: item.contacts.emails,
      phones: item.contacts.phones,
      logo: item.contacts.logo,
      created_on: item.contacts.createdAt,
      contact_type: item.contacts.contact_type,
      time_zone: item.contacts.time_zone,
    }));

    setContacts(formattedContacts);
  };

  useEffect(() => {
    getContacts();
  }, [pagination.pageIndex, pagination.pageSize]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getContacts();
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable({
    data: contacts,
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

  const onRowSelect = setSelectedIds;
  useEffect(() => {
    if (onRowSelect) {
      const selected = table.getSelectedRowModel().rows.map(({ original }) => original.id);
      onRowSelect(selected);
    }
  }, [onRowSelect, rowSelection, table]);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setContacts(contacts);
    } else {
      setContacts(contacts.filter((contant: any) => contant.name.toLowerCase().includes(searchQuery)));
    }
  }, [searchQuery]);

  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="w-full">
        <div className="flex justify-between gap-10 items-center mt-5">
          <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
            <Search className="text-gray-500" size={20} />
            <input type="search" className="outline-none h-[40px] w-full" placeholder="Search" value={searchQuery} onChange={handleSearch} />
          </div>

          <div className="flex justify-center items-center space-x-2">
            <AddContact getContacts={getContacts} />
            <DeleteContact getContacts={getContacts} selectedIds={selectedIds} />
            <SendSMS contacts={contacts} selectedIds={selectedIds} />
            <SendEmail contacts={contacts} selectedIds={selectedIds} />
            {/* <button className="w-[45px] h-[45px] border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black">
              <UploadIcon />
            </button> */}
            <FilterSheet />
          </div>
        </div>
        <div className="rounded-lg border overflow-hidden mt-5 flex justify-center">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="hover:bg-white">
                  <TableCell colSpan={columns.length} className="h-[50vh] text-center font-semibold text-lg hover:bg-white">
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
                  <TableCell colSpan={columns.length} className="h-[50vh] text-center font-semibold text-lg hover:bg-white">
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
    </Motion>
  );
}
