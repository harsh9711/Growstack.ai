"use client";

import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode, useEffect, useState } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
// import { BillHistory } from "@/types/billHistory";
import clsx from "clsx";
import "../../../../../../styles/loading.css";

interface BillingHistoryItem {
  amount_due: ReactNode;
  amount: ReactNode;
  payment_id: ReactNode;
  updatedAt: string | number | Date;
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
        const response = await instance.get(`${API_URL}/users/api/v1/payments/pending-dues`);
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const result = response.data.pendingDues.unpaid;
        const upcoming = response.data.pendingDues.upcoming;
        console.log("r", result);
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
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="w-full">
        <div className="rounded-lg border overflow-hidden mt-10 bg-white min-h-[50vh]">
          {loading ? (
            <div className="loading-container">
            <div className="loading-card">
              <div className="card-chip"></div>
              <div className="card-lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <div className="card-wave"></div>
            </div>
            <p>Billing History...</p>
          </div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <Table className="">
              <TableHeader>
                <TableRow className="bg-[#0347370D]">
                  <TableHead>Payment_ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item) => (
                  <TableRow key={item.plan_id}>
                    <TableCell className="text-[16px] font-medium">
                      {item.amount_due}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "text-[14px] flex gap-2 items-center justify-center py-2 mt-4 px-3 rounded-lg max-w-fit",
                        item.status === "SUCCESS"
                          ? " text-primary-green bg-[#0347371A]"
                          : item.status === " Pending"
                          ? "text-yellow-8 bg-yellow-100"
                          : "text-[#CF0000] bg-[#FF00001A]"
                      )}
                    >
                      {item.status}
                    </TableCell>
                    <TableCell className="text-[16px] font-semibold">
                      ${item.amount}
                    </TableCell>
                    <TableCell className="text-[14px] text-gray-500">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-blue-500 text-white"
                        onClick={() => handleAction(item.invoice)}
                      >
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
