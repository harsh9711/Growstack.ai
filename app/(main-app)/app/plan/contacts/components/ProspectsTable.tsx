"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RxCross2 } from "react-icons/rx";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowRight, FilterIcon, MailIcon, MenuIcon, Phone, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import FilterSheet from "./FilterSheet";
import Motion from "@/components/Motion";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { API_URL } from "@/lib/api";
import axios from "axios";
import toast from "react-hot-toast";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { Switch } from "@radix-ui/react-switch";
import { Input } from "@/components/ui/input";

interface AddProspectProps {
    isOpen: boolean;
    onClose: () => void;
    onProspectAdded: (newProspect: Place) => void; // Callback to add new prospect to the list

}

interface Assistant {
    _id: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    created_on: {
        date: string;
        time: string;
    };
    last_activity: string;
    tags: string[];
    profile_image: string; // Assuming this is part of your API response
}
interface Place {
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    phoneNumber: string;
    rating: number;
    ratingCount: number;
    website: string;
    category: string;
}

const AddProspectModal: React.FC<AddProspectProps> = ({ isOpen, onClose, onProspectAdded }) => {
    const [formData, setFormData] = useState({
        businessName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        website: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });
    const [isChecked, setIsChecked] = useState(false);
    const [prospects, setProspects] = useState<Place[]>([]);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Add any necessary initialization logic here
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const newProspect: Place = {
            latitude: 0,
            longitude: 0,
            title: formData.businessName,
            address: formData.address,
            phoneNumber: formData.phoneNumber,
            rating: 0,
            ratingCount: 0,
            website: formData.website,
            category: "Custom",
        };
        onProspectAdded(newProspect);
        setProspects([...prospects, newProspect]);
        setFormData({
            businessName: '',
            phoneNumber: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            website: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        });
        setShowTable(true);
        onClose();
    };



    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="flex-1 h-full w-full flex justify-center items-center mt-10 mb-20">
                        <div className="w-full max-w-3xl bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10">
                          <div className="flex flex-row justify-between w-full">  <h1 className="text-xl font-semibold border-b border-[#EDEFF0] pb-4">Contact</h1><RxCross2 />

                        </div>    <div className="mt-4 flex flex-col gap-5">
                                {/* Form fields */}
                                <div className="flex items-center gap-3">
                                    <Switch checked={isChecked} onCheckedChange={() => setIsChecked((prev) => !prev)} />
                                    Do you have a point of contact at this business?
                                </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="font-medium">First name</label>
                                            <Input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="Type First name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-medium">Last name</label>
                                            <Input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="Type Last name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-medium">Email</label>
                                            <Input
                                                type="text"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Type Email"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="font-medium">Phone</label>
                                            <Input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Type Phone"
                                            />
                                        </div>
                                    </div>
                                {/* Buttons */}
                                <div className="flex justify-end gap-4 w-full">
                               
                                    <button
                                        className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
                                        onClick={handleSubmit}
                                    >
                                        Save 
                                        <span className="relative p-2 text-primary-green bg-white rounded-full">
                                            <ArrowRight size={20} />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export const columns: ColumnDef<Assistant>[] = [
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
            <div className="capitalize flex items-center gap-3">
                {/* <Image src={row.original.profile_image} alt="" width={100} height={100} className="h-[40px] w-[40px] object-cover rounded-full" /> */}
                {`${row.getValue("firstname")} ${row.getValue("lastname")}`}
            </div>
        ),
    },

    {
        accessorKey: "phone",
        header: () => <div className="uppercase">Phone</div>,
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Phone size={20} className="text-primary-green" /> <span>{row.getValue("phone")}</span>
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: () => <div className="uppercase">Email</div>,
        cell: ({ row }) => (
            <div className="flex gap-2 items-center">
                <MailIcon size={20} className="text-primary-green" />
                <p>{row.getValue("email")}</p>
            </div>
        ),
    },
    {
        accessorKey: "created_on",
        header: () => <div className="uppercase">Created</div>,
        cell: ({ row }) => (
            <div className="flex gap-3">
                <span>{row.original.created_on.date}</span>
                <span>{row.original.created_on.time}</span>
            </div>
        ),
    },
    {
        accessorKey: "last_activity",
        header: () => "LAST ACTIVITY",
        cell: ({ row }) => <div>{row.getValue("last_activity")}</div>,
    },
    {
        id: "tags",
        header: "TAGS",
        cell: ({ row }) => {
            return (
                <div className="flex gap-2">
                    {row.original.tags.map((tag) => (
                        <div key={tag} className="px-3 py-2 bg-[#0347370D] rounded-md">
                            {tag}
                        </div>
                    ))}
                </div>
            );
        },
    },
];

export default function ContactsTable() {
    const [assistants, setAssistants] = useState<Assistant[]>([]);
    const [isPending, setIsPending] = useState(false);
      const [places, setPlaces] = useState<Place[]>([]);
  const [showTable, setShowTable] = useState(false);

    const [isModalOpen2, setIsModalOpen2] = useState(false); // State for modal open/close
      const handleProspectAdded = (newProspect: Place) => {
    // Update places state with the new prospect
    setPlaces([...places, newProspect]);
    setShowTable(true); // Show the table after adding a prospect
  };
 const openModal2 = () => {
        setIsModalOpen2(true);
    };

    const closeModal2 = () => {
        setIsModalOpen2(false);
    };

    const fetchAssistants = async () => {
        setIsPending(true);
        try {
            const response = await axios.get(`${API_URL}/users/api/v1/contacts/prospects`);
            console.log(response.data.data.docs);
            if (response.data.data.docs) {
                const formattedAssistants = response.data.data.docs.map((assistant: any) => ({
                    _id: assistant._id,
                    firstname: assistant.businesses[0]?.business_contact?.first_name,
                    lastname: assistant.businesses[0]?.business_contact?.last_name,

                    phone: assistant.businesses[0]?.business_contact?.phone || "",
                    email: assistant.businesses[0]?.business_contact?.email || "",
                    created_on: {
                        date: new Date(assistant.createdAt).toLocaleDateString('en-US', {
                            month: 'long', // Full month name (e.g., "May")
                            day: 'numeric', // Numeric day of the month (e.g., "27")
                            year: 'numeric' // Full year (e.g., "2024")
                        }),
                        time: new Date(assistant.createdAt).toLocaleTimeString(),
                    },
                    last_activity: formatLastActivity(new Date(assistant.updatedAt)),
                    tags: assistant.tags || [],
                    profile_image: assistant.profile_image || "",
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
    const formatLastActivity = (updatedAt: Date): string => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - updatedAt.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else {
            return updatedAt.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
            });
        }
    };
    useEffect(() => {
        fetchAssistants();
    }, []);

    const table = useReactTable({
        data: assistants,
        columns,
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
        <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
            <div className="w-full">
                <div className="flex justify-between gap-10 items-center mt-5">
                    <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
                        <Search className="text-gray-500" size={20} />
                        <input type="search" className="outline-none h-[40px] w-full" placeholder="Search" />
                    </div>
                    <div className="flex gap-x-2">
                        <Button   onClick={openModal2} className="flex items-center gap-3 border border-white hover:bg-primary-green/10 sheen min-w-fit py-3 px-4 rounded-lg transition-all duration-300">
                            <CiCirclePlus className="text-primary-green text-2xl" />
                        </Button>
                        <FilterSheet /></div>
                </div>
                <div className="rounded-lg border overflow-hidden mt-5">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="bg-[#0347370D]">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex justify-end mt-4">{paginationButtons}</div>
                   <AddProspectModal isOpen={isModalOpen2} onClose={closeModal2} onProspectAdded={handleProspectAdded} />
            </div>
        </Motion>
    );
}
