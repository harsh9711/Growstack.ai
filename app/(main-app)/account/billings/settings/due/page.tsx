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
import clsx from "clsx";
import "../../../../../../styles/loading.css";
import AddCreditDialog2 from "../../dialog/page";

interface BillingHistoryItem {
  amount_due: ReactNode;
  currency: string;
  due_date: string;
  subscription: string;
  invoice: string;
  status?: string; // Optional status field
}

export default function BillingHistorySection() {
  const [upcomingData, setUpcomingData] = useState<BillingHistoryItem | null>(
    null
  );
  const [unpaidData, setUnpaidData] = useState<BillingHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(
          `${API_URL}/users/api/v1/payments/pending-dues`
        );
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const { upcoming, unpaid } = response.data.pendingDues;
        setUpcomingData(upcoming);
        setUnpaidData(unpaid);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleAction(invoice: string): void {
    console.log("View action for invoice:", invoice);
  }
  const handleAddCreditClick = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/payments/payment-methods`
      );
      console.log("Payment methods:", response.data);
    } catch (error) {
      console.error("Failed to fetch payment methods", error);
    }
  };

  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="w-full p-6">
        <div className="rounded-lg border shadow-lg overflow-hidden bg-white">
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
              <p className="text-center mt-4"> Showing Dues</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center mt-4">Error: {error}</div>
          ) : (
            <div className="space-y-6">
              {/* Upcoming Dues Table */}
              {upcomingData ? (
                <div className="p-4 bg-[#034737] rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    Upcoming Dues
                  </h2>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#034737] text-white">
                        <TableHead className="py-3 px-4 text-left">
                          Amount Due
                        </TableHead>
                        <TableHead className="py-3 px-4 text-left">
                          Currency
                        </TableHead>
                        <TableHead className="py-3 px-4 text-left">
                          Due Date
                        </TableHead>
                        <TableHead className="py-3 px-4 text-left">
                          Subscription
                        </TableHead>
                        {/* <TableHead className="py-3 px-4 text-left">Action</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        key={upcomingData.invoice}
                        className="bg-white shadow-sm rounded-lg mb-2 hover:bg-blue-50"
                      >
                        <TableCell className="py-3 px-4 font-bold text-gray-700">
                          $ {upcomingData.amount_due}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-700">
                          {upcomingData.currency}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-500">
                          {new Date(upcomingData.due_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-gray-700">
                          {upcomingData.subscription}
                        </TableCell>
                        {/* <TableCell className="py-3 px-4">
                        <AddCreditDialog2 onAddCredit={handleAddCreditClick} />
                        </TableCell> */}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No upcoming dues available
                </div>
              )}

              {/* Unpaid Dues Table */}
              {unpaidData.length > 0 ? (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-red-600">
                    Unpaid Dues
                  </h2>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#0347370D] text-gray-700">
                        <TableHead className="py-3 px-4 text-left">
                          Amount Due
                        </TableHead>
                        <TableHead className="py-3 px-4 text-left">
                          Currency
                        </TableHead>
                        <TableHead className="py-3 px-4 text-left">
                          Due Date
                        </TableHead>
                        <TableHead className="py-3 px-4 text-left">
                          Subscription
                        </TableHead>
                        <TableHead className="py-3 px-4 text-left">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {unpaidData.map((item) => (
                        <TableRow key={item.invoice}>
                          <TableCell className="py-3 px-4 font-bold text-gray-700">
                            $ {item.amount_due}
                          </TableCell>
                          <TableCell className="py-3 px-4 font-semibold text-gray-700">
                            {item.currency}
                          </TableCell>
                          <TableCell className="py-3 px-4 text-gray-500">
                            {new Date(item.due_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="py-3 px-4 font-medium text-gray-700">
                            {item.subscription}
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <AddCreditDialog2 />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No unpaid dues available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Motion>
  );
}
