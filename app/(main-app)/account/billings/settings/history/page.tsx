"use client";
import React, { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import "../../../../../../styles/loading.css";
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
import { ReactNode } from "react";
import { API_URL } from "@/lib/api";
// import { BillHistory } from "@/types/billHistory";
import clsx from "clsx";
// import "../../../../../../../styles/loading.css";
import AddCreditDialog from "../components/AddCreditDialog";
import Link from "next/link";
import router from "next/navigation";

interface BillingHistoryItem {
  payment_receipt_url: string;
  amount: ReactNode;
  payment_id: ReactNode;
  updatedAt: string | number | Date;
  plan_id: string;
  status: string;
  created_at: string;
  invoice: string;
}
const BillingHistorySection = () => {
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
        const result = response.data.data;
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
    window.location.href = `${invoice}`;
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
                {data.map(item => (
                  <TableRow key={item.plan_id}>
                    <TableCell className="text-[16px] font-medium">
                      {item.payment_id}
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
                        className="bg-primary-green text-white"
                        onClick={() => handleAction(item.payment_receipt_url)}
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
};

interface PlanUsage {
  usage_amount: number;
}

const OverViewSection = () => {
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false); // Add state for cancel button loading

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data.data;
      setPlanUsage(data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    try {
      const response = await instance.put(
        `${API_URL}/users/api/v1/payments/cancel-subscription`
      );
      toast.success("Subscription canceled successfully");
      window.location.href = "/Payment";
      console.log("Cancel Subscription Response:", response.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error cancelling subscription:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);

  if (loading) {
    return (
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
        <p>Showing your credits...</p>
      </div>
    );
  }

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="mt-10 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-primary-black text-opacity-50">Credit balance</h2>
          <h1 className="text-4xl font-semibold">{planUsage?.usage_amount}</h1>
        </div>
        <div className="flex flex-row gap-x-6 items-end">
          <AddCreditDialog />
          <button
            className={`w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-white border-red-500 border hover:font-semibold hover:border-2 text-red-500 sheen transition-all duration-300 ${
              cancelLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCancelSubscription}
            disabled={cancelLoading} // Disable button while canceling
          >
            {cancelLoading ? "Canceling..." : "Cancel Subscription"}
          </button>
        </div>
      </div>
    </Motion>
  );
};

export default function SettingsPage() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Overview", "Billing history"];

  return (
    <main>
      <div className="flex justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">Billing</h1>
          <p className="text-primary-black text-opacity-50">
            We believe Growstack should be accessible to all companies, no
            matter the Size
          </p>
        </div>
        {/* <div className="w-full max-w-[320px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
          <div className="w-full flex relative">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                  selectedTabIndex === index ? "!text-white" : "!text-primary-grey"
                }`}
                onClick={() => {
                  const totalTabs = tabs.length;
                  const percentage = (index / totalTabs) * 100;
                  setSelectedTabIndex(index);
                  setTabUnderlineLeft(percentage);
                }}>
                {tab}
              </div>
            ))}
            <div
              className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
              style={{ left: `calc(${tabUnderlineLeft}%)`, width: `${100 / tabs.length}%` }}></div>
          </div>
        </div> */}
      </div>
      {/* {renderContent()} */}
      <BillingHistorySection />
    </main>
  );
}
