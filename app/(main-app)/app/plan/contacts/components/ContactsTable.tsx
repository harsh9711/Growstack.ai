"use client";

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
import { FilterIcon, MailIcon, Phone, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { contacts } from "./data/contacts";
import FilterSheet from "./FilterSheet";
import Motion from "@/components/Motion";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import {
  CircleIcon,
  DeleteIcon,
  SMSIcon,
  EmailIcon,
  UploadIcon,
} from "@/components/svgs/icons";
import instance from "@/config/axios.config";
import { formatDate } from "@/lib/utils";
import { ModalContent } from "./modal/modalEnums";

interface Contact {
  id: string;
  name: string;
  logo: string;
  phones: any;
  email: string[];
  created_on: string;
  contact_type: string;
  time_zone: string;
}

export const columns: ColumnDef<Contact>[] = [
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
    accessorKey: "name",
    header: () => <div className="uppercase">Name</div>,
    cell: ({ row }) => (
      <div className="capitalize flex items-center gap-3">
        <Image
          src={row.original.logo}
          alt=""
          width={100}
          height={100}
          className="h-[40px] w-[40px] object-cover rounded-full"
        />
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: () => <div className="uppercase">Phone</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Phone size={20} className="text-primary-green" />{" "}
        <span>
          {row.original.phones
            .map((phone: any) => `${phone.country_code}${phone.number}`)
            .join(", ")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="uppercase">Email</div>,
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <p>
          {row.original.email.length > 0 ? (
            <>
              {" "}
              <MailIcon size={20} className="text-primary-green" />{" "}
              {row.original.email.join(", ")}
            </>
          ) : (
            "-"
          )}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "created_on",
    header: () => <div className="uppercase">Created</div>,
    cell: ({ row }) => (
      <div className="flex gap-3">
        <span>{formatDate(row.original.created_on)}</span>
      </div>
    ),
  },
  {
    accessorKey: "contact_type",
    header: () => "CONTACT TYPE",
    cell: ({ row }) => <div>{row.getValue("contact_type")}</div>,
  },
  {
    accessorKey: "time_zone",
    header: "TIME ZONE",
    cell: ({ row }) => <div>{row.getValue("time_zone")}</div>,
  },
];

interface ContactsTableProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (value: ModalContent) => void;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ContactsTable({
  setToggleModal,
  handleModal,
  setSelectedIds,
}: ContactsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const getContacts = async () => {
      const response = await instance.get(
        `/users/api/v1/contacts?page=${pagination.pageIndex}&limit=${pagination.pageSize}`
      );
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

  const handleClick = (value: ModalContent) => {
    setToggleModal(true);
    handleModal(value);
    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    setSelectedIds(selectedRowIds);
  };

  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="w-full">
        <div className="flex justify-between gap-10 items-center mt-5">
          <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
            <Search className="text-gray-500" size={20} />
            <input
              type="search"
              className="outline-none h-[40px] w-full"
              placeholder="Search"
            />
          </div>
          {/* <Link href="/app/plan/web-scraping/add-prospect" className="w-full max-w-fit">
                <button className="flex items-center gap-3 hover:bg-primary-green/10 sheen min-w-fit py-3 px-4 rounded-lg transition-all duration-300">
                  <CiCirclePlus className="text-primary-green" />
                  Add prospect manually
                </button>
              </Link> */}
          <div className="flex justify-center items-center">
            <button
              className=" mr-1 w-[45px] h-[45px] flex border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black"
              onClick={() => {
                setToggleModal(true);
                handleModal(ModalContent.ADD_CONTACT);
              }}
            >
              <CircleIcon />
            </button>
            <button
              onClick={() => handleClick(ModalContent.DELETE_CONTACT)}
              className=" mr-1 w-[45px] h-[45px] flex border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black"
            >
              <DeleteIcon />
            </button>
            <button
              onClick={() => handleClick(ModalContent.SEND_SMS)}
              className=" mr-1 w-[45px] h-[45px] flex border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black"
            >
              <SMSIcon />
            </button>
            <button
              onClick={() => handleClick(ModalContent.SEND_EMAIL)}
              className=" mr-1 w-[45px] h-[45px] flex border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black"
            >
              <EmailIcon />
            </button>
            <button className=" mr-1 w-[45px] h-[45px] flex border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black">
              <UploadIcon />
            </button>
            <FilterSheet />
          </div>
        </div>
        <div className="rounded-lg border overflow-hidden mt-5">
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
