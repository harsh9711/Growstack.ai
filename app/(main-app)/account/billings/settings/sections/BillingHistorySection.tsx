"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { BillHistory } from "@/types/billHistory";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";


export default function BillingHistorySection() {
  const [data, setData] = useState<BillHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${API_URL}/users/api/v1/payments`);
        if (!response) {
          throw new Error('Network response was not ok');
        }
        const result = await response.data;
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  

  
  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="w-full">
        <div className="rounded-lg border overflow-hidden mt-10 bg-white min-h-[50vh]">
          <Table>
            <TableHeader>
      
            </TableHeader>
            <TableBody>
            
            </TableBody>
          </Table>
     
        </div>
      </div>
    </Motion>
  );
}
