"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
// import { BillHistory } from "@/types/billHistory";
import clsx from "clsx";
interface BillingHistoryItem {
  plan_id: string;
  status: string;
  created_at: string;
  invoice: string;
}
export default function BillingHistorySection() {
  const [data, setData] = useState<BillingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`${API_URL}/users/api/v1/payments`);
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const result =  response.data;
        console.log("r",result);
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleAction(invoice: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="w-full">
        <div className="rounded-lg border overflow-hidden mt-10 bg-white min-h-[50vh]">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <Table className="">
              <TableHeader>
                <TableRow className="bg-[#0347370D]">
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.plan_id}>
                    <TableCell className="text-[16px] font-medium">{item.plan_id}</TableCell>
                    <TableCell
                      className={clsx(
                        "text-[14px]",
                        item.status === "Paid" ? "text-green-500" : 
                        item.status === "Pending" ? "text-yellow-500" : 
                        "text-red-500"
                      )}
                    >
                      {item.status}
                    </TableCell>
                    {/* <TableCell className="text-[14px] text-gray-500">{new Date(item.created_at).toLocaleDateString()}</TableCell> */}
                    <TableCell>
                      <Button className="bg-blue-500 text-white" onClick={() => handleAction(item.invoice)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </Motion>
  );

 
}
